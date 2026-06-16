import React, { useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Index({ auth, plans, activeSubscription, paystackPublicKey }) {
    const user = auth.user;

    const initiatePaystack = (plan) => {
        if (!window.PaystackPop) {
            alert("Paystack is still loading, please try again in a few seconds.");
            return;
        }

        const handler = window.PaystackPop.setup({
            key: paystackPublicKey,
            email: user.email,
            amount: plan.price, // in kobo/cents
            plan: plan.paystack_plan_code,
            currency: 'NGN', // Assuming NGN for Paystack, adjust as needed
            ref: '' + Math.floor((Math.random() * 1000000000) + 1),
            callback: function(response) {
                // Verify payment on our backend
                router.post('/client/subscriptions/verify', {
                    reference: response.reference,
                    plan_id: plan.id
                }, {
                    preserveScroll: true,
                    onSuccess: () => {
                        // Handled by redirect
                    }
                });
            },
            onClose: function() {
                alert('Payment window closed.');
            }
        });

        handler.openIframe();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title="Subscriptions">
                <script src="https://js.paystack.co/v1/inline.js"></script>
            </Head>

            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
                                &larr; Back to Dashboard
                            </Link>
                            <h1 className="text-xl font-bold text-gray-800">Your Subscriptions</h1>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                
                {activeSubscription && (
                    <div className="mb-12 bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold text-indigo-900">Active Subscription: {activeSubscription.plan?.name}</h2>
                                <p className="text-indigo-700 mt-1">
                                    Your next billing date is roughly {new Date(activeSubscription.expires_at).toLocaleDateString()}.
                                </p>
                            </div>
                            <div>
                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pricing Plans</h2>
                    <p className="mt-4 text-xl text-gray-500">Subscribe to a monthly retainer to keep our team dedicated to your projects.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
                    {plans.map((plan) => (
                        <div key={plan.id} className="relative bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col p-8 hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                <p className="mt-4 flex items-baseline text-5xl font-extrabold text-gray-900">
                                    ₦{(plan.price / 100).toLocaleString()}
                                    <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
                                </p>
                            </div>
                            
                            <ul role="list" className="mb-8 space-y-4 flex-1">
                                {plan.features && plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="ml-3 text-base text-gray-700">{feature}</p>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => initiatePaystack(plan)}
                                className={`w-full flex justify-center py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                                    activeSubscription?.subscription_plan_id === plan.id 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                                disabled={activeSubscription?.subscription_plan_id === plan.id}
                            >
                                {activeSubscription?.subscription_plan_id === plan.id ? 'Current Plan' : 'Subscribe Now'}
                            </button>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
