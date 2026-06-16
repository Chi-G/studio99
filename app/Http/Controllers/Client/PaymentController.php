<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function verifyPaystack(Request $request, Invoice $invoice)
    {
        $request->validate([
            'reference' => 'required|string'
        ]);

        // Verify transaction with Paystack API
        $response = Http::withToken(env('PAYSTACK_SECRET_KEY'))->get("https://api.paystack.co/transaction/verify/{$request->reference}");

        if (!$response->successful() || $response->json('data.status') !== 'success') {
            return redirect()->back()->withErrors(['payment' => 'Payment verification failed. Please contact support.']);
        }
        Payment::create([
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

        return redirect()->route('client.dashboard')->with('success', 'Payment successful! Your project request is now fully confirmed.');
    }

    public function submitBankTransfer(Request $request, Invoice $invoice)
    {
        $request->validate([
            'proof' => 'required|image|max:5120', // 5MB max
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
