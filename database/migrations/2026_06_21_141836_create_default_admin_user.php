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
        \App\Models\User::updateOrCreate(
            ['email' => 'admin@studio99.com'],
            [
                'name' => 'Studio99 Admin',
                'password' => \Illuminate\Support\Facades\Hash::make('Admin123!'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        \App\Models\User::where('email', 'admin@studio99.com')->delete();
    }
};
