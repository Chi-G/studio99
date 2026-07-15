<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Mail\ContactMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendContactEmailJob implements ShouldQueue
{
    use Queueable;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     */
    public array $backoff = [5, 10, 20];

    /**
     * Create a new job instance.
     */
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $subjectText,
        public readonly string $messageText
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to('hello@studio99digital.com')
            ->send(new ContactMail(
                name: $this->name,
                email: $this->email,
                subjectText: $this->subjectText,
                messageText: $this->messageText
            ));
    }
}
