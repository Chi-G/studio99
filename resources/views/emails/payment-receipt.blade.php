<x-mail::message>
# Payment Receipt

Hi {{ $invoice->client->name }},

Thank you for your payment! We have successfully received your payment for Invoice **INV-{{ str_pad($invoice->id, 4, '0', STR_PAD_LEFT) }}**.

<x-mail::panel>
**Description:** {{ $invoice->description }}  
**Amount Paid:** ₦{{ number_format($payment->amount, 2) }}  
**Payment Method:** {{ ucfirst($payment->payment_method) }}  
**Reference:** {{ $payment->reference }}  
**Date:** {{ $payment->created_at->format('F j, Y g:i A') }}  
</x-mail::panel>

Your project status has been updated to **In Progress**. You can track your project and download this invoice directly from your dashboard.

<x-mail::button :url="$url">
Go to Dashboard
</x-mail::button>

If you have any questions, feel free to reply to this email.

Best regards,<br>
The **{{ config('app.name') }}** Team
</x-mail::message>
