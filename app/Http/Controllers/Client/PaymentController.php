<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Mail\PaymentReceipt;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Calculate the total charge for the client so the merchant gets the exact $amount.
     * Paystack fee in Nigeria: 1.5% + NGN 100 (capped at NGN 2000).
     */
    private function calculateTotalWithFee($amount)
    {
        if ($amount < 2500) {
            $total = $amount / (1 - 0.015);
        } else {
            $total = ($amount + 100) / (1 - 0.015);
        }

        $fee = $total - $amount;

        if ($fee > 2000) {
            $fee = 2000;
            $total = $amount + $fee;
        }

        return round($total, 2);
    }

    public function initializePaystack(Request $request, Invoice $invoice)
    {
        // Calculate amount including fee
        $amountToCharge = $this->calculateTotalWithFee($invoice->amount);

        // Paystack expects amount in Kobo
        $amountInKobo = (int) ($amountToCharge * 100);

        // Call Paystack
        $response = Http::withToken(config('paystack.secretKey'))->post(config('paystack.paymentUrl').'/transaction/initialize', [
            'email' => $request->user()->email,
            'amount' => $amountInKobo,
            'callback_url' => route('client.payments.callback'),
            'metadata' => [
                'invoice_id' => $invoice->id,
                'user_id' => $request->user()->id,
            ],
        ]);

        if ($response->successful() && $response->json('status')) {
            // Redirect the user via Inertia
            return Inertia::location($response->json('data.authorization_url'));
        }

        return redirect()->back()->withErrors(['payment' => 'Could not connect to payment gateway. Please try again.']);
    }

    public function callbackPaystack(Request $request)
    {
        if (! $request->has('reference')) {
            return redirect()->route('client.dashboard')->withErrors(['payment' => 'Payment reference missing.']);
        }

        // Verify transaction with Paystack API
        $response = Http::withToken(config('paystack.secretKey'))->get(config('paystack.paymentUrl')."/transaction/verify/{$request->reference}");

        if (! $response->successful() || $response->json('data.status') !== 'success') {
            return redirect()->route('client.dashboard')->withErrors(['payment' => 'Payment verification failed. Please contact support.']);
        }

        $data = $response->json('data');
        $invoiceId = $data['metadata']['invoice_id'] ?? null;

        if (! $invoiceId) {
            return redirect()->route('client.dashboard')->withErrors(['payment' => 'Invalid payment data.']);
        }

        $invoice = Invoice::findOrFail($invoiceId);

        // Ensure we don't process it twice
        if ($invoice->status === 'paid') {
            return redirect()->route('client.dashboard')->with('success', 'Payment was already processed successfully.');
        }

        $payment = Payment::create([
            'user_id' => auth()->id(),
            'invoice_id' => $invoice->id,
            'amount' => $invoice->amount,
            'payment_method' => 'paystack',
            'reference' => $request->reference,
            'status' => 'approved',
        ]);

        $invoice->update([
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        // Queue the payment receipt email
        Mail::to(auth()->user()->email)->send(new PaymentReceipt($invoice, $payment));

        return redirect()->route('client.dashboard')->with('success', 'Payment successful! Your project request is now fully confirmed.');
    }

    public function submitBankTransfer(Request $request, Invoice $invoice)
    {
        $request->validate([
            'proof' => 'required|image|max:5120',
        ]);

        $path = $request->file('proof')->store('payment-proofs', 'public');

        Payment::create([
            'user_id' => auth()->id(),
            'invoice_id' => $invoice->id,
            'amount' => $invoice->amount,
            'payment_method' => 'bank_transfer',
            'proof_url' => $path,
            'status' => 'pending',
        ]);

        $invoice->update([
            'status' => 'pending_confirmation',
        ]);

        return redirect()->route('client.dashboard')->with('success', 'Proof of payment uploaded! We will verify it shortly.');
    }
}
