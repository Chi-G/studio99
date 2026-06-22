<?php

namespace App\Mail;

use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentReceipt extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $invoice;
    public $payment;
    public $url;

    /**
     * Create a new message instance.
     */
    public function __construct(Invoice $invoice, Payment $payment)
    {
        $this->invoice = $invoice;
        $this->payment = $payment;
        $this->url = url('/dashboard');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Receipt - Studio99 Digital',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.payment-receipt',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
