import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { CheckCircle2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SubscriptionsIndex({ auth, subscription, plans = [] }) {

  // Mocks if empty
  const availablePlans = plans.length > 0 ? plans : [
    {
      id: 1,
      name: 'Starter',
      price: 299,
      interval: 'month',
      description: 'Perfect for small businesses needing occasional design work.',
      features: ['2 Requests per month', '48-hour delivery', 'Unlimited revisions', 'Dedicated account manager']
    },
    {
      id: 2,
      name: 'Pro',
      price: 999,
      interval: 'month',
      isPopular: true,
      description: 'Ideal for growing agencies that need constant creative output.',
      features: ['Unlimited requests', '24-hour delivery', 'Unlimited revisions', 'Dedicated design team', 'Source files included']
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 2499,
      interval: 'month',
      description: 'For massive scale. Full stack development and design.',
      features: ['Everything in Pro', 'Custom web development', 'Priority support', 'Dedicated Slack channel', 'Weekly strategy calls']
    }
  ];

  return (
    <ClientLayout onNewRequest={() => { }}>
      <Head title="Subscriptions | Studio99" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">My Subscription</h1>
          <p className="text-[#94A3B8]">Manage your retainer plans and billing cycle.</p>
        </div>
      </div>

      {subscription ? (
        <div className="bg-gradient-to-br from-[#1A1A28] to-[#111118] border border-[#6C3CE1]/30 rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C3CE1]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">{subscription.plan?.name || 'Pro Retainer'}</h2>
                <span className="bg-[#6C3CE1]/20 text-[#6C3CE1] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
              </div>
              <p className="text-[#94A3B8] max-w-md">Your subscription is currently active. Your next billing date is <span className="text-white font-medium">{subscription.next_billing_date ? new Date(subscription.next_billing_date).toLocaleDateString() : 'Nov 1, 2026'}</span>.</p>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-white hover:text-red-400 font-medium text-sm transition-colors">
                Cancel Plan
              </button>
              <button className="bg-[#6C3CE1] hover:bg-[#5b32be] text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#1A1A28] border border-[#2A2A3A] rounded-2xl p-6 mb-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">No Active Subscription</h3>
              <p className="text-[#94A3B8] text-sm">You are currently on the pay-per-project model. Upgrade to a retainer for priority service.</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-display font-bold text-white mb-2">Available Retainers</h2>
          <p className="text-[#94A3B8]">Save money and get priority turnaround times with a monthly retainer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {availablePlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#111118] rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 ${plan.isPopular ? 'border-[#6C3CE1] shadow-[0_0_30px_-10px_rgba(108,60,225,0.3)]' : 'border-[#2A2A3A] hover:border-[#4b4b5a]'
                }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#6C3CE1] text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-[#94A3B8] text-sm h-10 mb-6">{plan.description}</p>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-white">${plan.price}</span>
                <span className="text-[#94A3B8]">/{plan.interval}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#6C3CE1] shrink-0" />
                    <span className="text-sm text-[#E2E8F0]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${plan.isPopular
                ? 'bg-[#6C3CE1] hover:bg-[#5b32be] text-white'
                : 'bg-[#1A1A28] hover:bg-[#2A2A3A] text-white border border-[#2A2A3A]'
                }`}>
                Subscribe Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex items-center justify-center gap-2 text-[#94A3B8] text-sm">
        <ShieldCheck className="w-4 h-4" /> Secure payments via Stripe & Paystack
      </div>
    </ClientLayout>
  );
}
