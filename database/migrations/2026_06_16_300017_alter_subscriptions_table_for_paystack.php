<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->foreignId('subscription_plan_id')->nullable()->after('user_id')->constrained('subscription_plans')->nullOnDelete();
            $table->string('paystack_subscription_code')->nullable()->after('subscription_plan_id');
            $table->string('paystack_email_token')->nullable()->after('paystack_subscription_code');

            // Drop the old package enum as we use plan relations now
            $table->dropColumn('package');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropForeign(['subscription_plan_id']);
            $table->dropColumn(['subscription_plan_id', 'paystack_subscription_code', 'paystack_email_token']);
            $table->enum('package', ['starter', 'growth', 'premium'])->after('user_id');
        });
    }
};
