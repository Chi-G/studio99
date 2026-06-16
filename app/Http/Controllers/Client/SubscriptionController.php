<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        $plans = SubscriptionPlan::all();
        $user = auth()->user();
        
        $activeSubscription = Subscription::with('plan')
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        return Inertia::render('Client/Subscriptions/Index', [
            'plans' => $plans,
            'activeSubscription' => $activeSubscription,
            'paystackPublicKey' => config('services.paystack.public_key', env('PAYSTACK_PUBLIC_KEY')),
        ]);
    }

    public function verifyPaystack(Request $request)
    {
        $request->validate([
            'reference' => 'required|string',
            'plan_id' => 'required|exists:subscription_plans,id',
        ]);

        // Verify with Paystack API
        $response = Http::withToken(env('PAYSTACK_SECRET_KEY'))
            ->get("https://api.paystack.co/transaction/verify/{$request->reference}");

        if ($response->successful() && $response->json('data.status') === 'success') {
            $data = $response->json('data');
            
            // Note: If a plan was passed during checkout, Paystack handles recurring billing.
            // But we will record the subscription locally.
            // Ideally, the real subscription_code comes via webhook. We'll set a placeholder
            // or see if it's available in the transaction data.
            
            $paystackPlanCode = $data['plan']['plan_code'] ?? null;
            
            // Mark existing active subscriptions for this user as canceled/replaced
            Subscription::where('user_id', auth()->id())->where('status', 'active')->update(['status' => 'replaced']);

            Subscription::create([
                'user_id' => auth()->id(),
                'subscription_plan_id' => $request->plan_id,
                'status' => 'active',
                'expires_at' => now()->addMonth(), // Temporary until webhook updates next payment
            ]);

            return redirect()->route('client.subscriptions.index')->with('success', 'Successfully subscribed to the retainer plan.');
        }

        return back()->withErrors(['payment' => 'Payment verification failed.']);
    }
}
