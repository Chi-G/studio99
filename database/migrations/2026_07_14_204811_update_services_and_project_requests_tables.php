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
        Schema::table('services', function (Blueprint $table) {
            $table->string('category')->default('one_off');
        });

        Schema::table('project_requests', function (Blueprint $table) {
            $table->foreignId('package_id')->nullable()->change();
            $table->string('company_name')->nullable();
            $table->string('website')->nullable();
            $table->string('preferred_contact')->nullable();
            $table->text('business_goals')->nullable();
            $table->boolean('existing_branding')->default(false);
            $table->text('reference_links')->nullable();
            $table->string('timeline')->nullable();
            $table->string('budget_range')->nullable();
            $table->string('hear_about_us')->nullable();
            $table->text('additional_info')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        Schema::table('project_requests', function (Blueprint $table) {
            $table->foreignId('package_id')->nullable(false)->change();
            $table->dropColumn([
                'company_name',
                'website',
                'preferred_contact',
                'business_goals',
                'existing_branding',
                'reference_links',
                'timeline',
                'budget_range',
                'hear_about_us',
                'additional_info',
            ]);
        });
    }
};
