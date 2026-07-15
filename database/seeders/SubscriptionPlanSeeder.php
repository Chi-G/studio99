<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SubscriptionPlan::create([
            'name' => 'Starter Retainer',
            'paystack_plan_code' => 'PLN_starter123',
            'price' => 50000, // $500
            'interval' => 'monthly',
            'features' => ['Up to 5 design requests', '48-hour delivery', 'Standard Support'],
        ]);

        SubscriptionPlan::create([
            'name' => 'Pro Retainer',
            'paystack_plan_code' => 'PLN_pro456',
            'price' => 150000, // $1500
            'interval' => 'monthly',
            'features' => ['Unlimited design requests', '24-hour delivery', 'Priority Support', 'Dedicated Manager'],
        ]);
    }
}
