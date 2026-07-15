<?php

declare(strict_types=1);

namespace App\Services;

use App\Jobs\SendContactEmailJob;

class ContactService
{
    /**
     * Submit contact form message.
     *
     * @param  array{name: string, email: string, subject: string, message: string}  $data
     */
    public function submitContactForm(array $data): void
    {
        SendContactEmailJob::dispatch(
            $data['name'],
            $data['email'],
            $data['subject'],
            $data['message']
        );
    }
}
