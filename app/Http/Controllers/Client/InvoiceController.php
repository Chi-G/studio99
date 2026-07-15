<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::where('client_id', auth()->id())->latest()->get();

        return Inertia::render('Client/Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    public function show(Invoice $invoice)
    {
        if ($invoice->client_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Client/Payments/Checkout', [
            'invoice' => $invoice,
            'paystackPublicKey' => config('services.paystack.public_key', env('PAYSTACK_PUBLIC_KEY')),
        ]);
    }
}
