<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Subscription;
use App\Models\Payment;
use App\Models\Invoice;

class PaystackWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // 1. Verify Signature
        $signature = $request->header('x-paystack-signature');
        $secret = env('PAYSTACK_SECRET_KEY');
        
        $computedSignature = hash_hmac('sha512', $request->getContent(), $secret);

        if ($signature !== $computedSignature) {
            Log::warning('Paystack Webhook: Invalid Signature');
            return response()->json(['status' => 'error', 'message' => 'Invalid signature'], 400);
        }

        $event = $request->input('event');
        $data = $request->input('data');

        Log::info("Paystack Webhook Received: {$event}", ['data' => $data]);

        switch ($event) {
            case 'charge.success':
                $this->handleChargeSuccess($data);
                break;
            case 'subscription.create':
                $this->handleSubscriptionCreate($data);
                break;
            case 'subscription.disable':
                $this->handleSubscriptionDisable($data);
                break;
        }

        return response()->json(['status' => 'success']);
    }

    protected function handleChargeSuccess($data)
    {
        // First check if it's an invoice payment (we used metadata for this previously)
        $invoiceId = $data['metadata']['custom_fields'][0]['value'] ?? null;
        if ($invoiceId) {
            $invoice = Invoice::find($invoiceId);
            if ($invoice && $invoice->status !== 'paid') {
                $invoice->update(['status' => 'paid']);
                
                Payment::updateOrCreate(
                    ['reference' => $data['reference']],
                    [
                        'user_id' => $invoice->client_id,
                        'invoice_id' => $invoice->id,
                        'amount' => $data['amount'] / 100, // stored as decimals in DB
                        'method' => 'paystack',
                        'status' => 'approved',
                    ]
                );
            }
        }
        
        // Next, check if this charge is part of a subscription
        if (isset($data['plan']) && isset($data['customer'])) {
            // Find subscription based on email
            $user = \App\Models\User::where('email', $data['customer']['email'])->first();
            if ($user) {
                $subscription = Subscription::where('user_id', $user->id)->where('status', 'active')->first();
                if ($subscription) {
                    $subscription->update([
                        'expires_at' => now()->addMonth(), // Extend by 1 month
                    ]);
                }
            }
        }
    }

    protected function handleSubscriptionCreate($data)
    {
        $user = \App\Models\User::where('email', $data['customer']['email'])->first();
        if ($user) {
            $plan = \App\Models\SubscriptionPlan::where('paystack_plan_code', $data['plan']['plan_code'])->first();
            if ($plan) {
                // Find pending or active subscription to update its codes
                $subscription = Subscription::where('user_id', $user->id)
                    ->where('subscription_plan_id', $plan->id)
                    ->latest()
                    ->first();

                if ($subscription) {
                    $subscription->update([
                        'paystack_subscription_code' => $data['subscription_code'],
                        'paystack_email_token' => $data['email_token'],
                        'status' => 'active',
                    ]);
                }
            }
        }
    }

    protected function handleSubscriptionDisable($data)
    {
        $subscription = Subscription::where('paystack_subscription_code', $data['subscription_code'])->first();
        if ($subscription) {
            $subscription->update(['status' => 'canceled']);
        }
    }
}
