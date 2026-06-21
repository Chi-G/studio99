<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Auth\Notifications\ResetPassword::toMailUsing(function ($notifiable, $token) {
            return (new \Illuminate\Notifications\Messages\MailMessage)
                ->subject(\Illuminate\Support\Facades\Lang::get('Reset Password Notification'))
                ->greeting('Hello ' . $notifiable->name . ',')
                ->line(\Illuminate\Support\Facades\Lang::get('You are receiving this email because we received a password reset request for your account.'))
                ->action(\Illuminate\Support\Facades\Lang::get('Reset Password'), url(route('password.reset', [
                    'token' => $token,
                    'email' => $notifiable->getEmailForPasswordReset(),
                ], false)))
                ->line(\Illuminate\Support\Facades\Lang::get('This password reset link will expire in :count minutes.', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]))
                ->line(\Illuminate\Support\Facades\Lang::get('If you did not request a password reset, no further action is required.'));
        });

        \Illuminate\Auth\Notifications\VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new \Illuminate\Notifications\Messages\MailMessage)
                ->subject(\Illuminate\Support\Facades\Lang::get('Verify Email Address'))
                ->greeting('Hello ' . $notifiable->name . ',')
                ->line(\Illuminate\Support\Facades\Lang::get('Please click the button below to verify your email address.'))
                ->action(\Illuminate\Support\Facades\Lang::get('Verify Email Address'), $url)
                ->line(\Illuminate\Support\Facades\Lang::get('If you did not create an account, no further action is required.'));
        });
    }
}
