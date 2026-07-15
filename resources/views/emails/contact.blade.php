<x-mail::message>
# New Contact Inquiry

You have received a new contact message from the Studio99 Digital website.

<x-mail::panel>
**From:** {{ $name }} ({{ $email }})  
**Subject:** {{ $subjectText }}
</x-mail::panel>

### Message:
{{ $messageText }}

<x-mail::button :url="config('app.url')">
Go to Dashboard
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
