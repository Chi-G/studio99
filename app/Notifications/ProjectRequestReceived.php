<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\ProjectRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectRequestReceived extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public readonly ProjectRequest $projectRequest,
        public readonly ?string $tempPassword = null
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage)
            ->subject('We have received your request: '.$this->projectRequest->title)
            ->greeting('Hello '.$notifiable->name.'!')
            ->line('Thank you for contacting Studio99 Digital. We have successfully received your project inquiry and our team is currently reviewing your requirements.')
            ->line('**Inquiry Details:**')
            ->line('- **Service:** '.$this->projectRequest->service->name)
            ->line('- **Estimated Budget:** '.($this->projectRequest->budget_range ?? 'Under review'))
            ->line('- **Timeline:** '.($this->projectRequest->timeline ?? 'Under review'));

        if ($this->tempPassword) {
            $mail->line('**Your Client Portal account has been automatically created!**')
                ->line('- **Login Email:** '.$notifiable->email)
                ->line('- **Temporary Password:** '.$this->tempPassword)
                ->line('Please log in and update your password under settings.');
        }

        return $mail->action('Track Inquiry Status', url('/dashboard'))
            ->line('We will follow up with a customized quotation within 24 hours. Once the quotation is approved, we will begin the active project workspace.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'project_request_id' => $this->projectRequest->id,
            'message' => 'Your request for '.$this->projectRequest->title.' is under review.',
        ];
    }
}
