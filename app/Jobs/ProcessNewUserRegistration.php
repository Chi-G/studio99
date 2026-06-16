<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessNewUserRegistration implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public readonly User $user)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Simulate sending a welcome email, provisioning remote folders, etc.
        \Illuminate\Support\Facades\Log::info("Processing new registration for: {$this->user->email}");
    }
}
