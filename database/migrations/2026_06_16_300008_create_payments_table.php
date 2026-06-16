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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('invoice_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('amount', 10, 2);
            $table->string('payment_method');
            $table->string('reference')->nullable();
            $table->string('proof_url')->nullable();
            $table->enum('status', ['pending', 'approved', 'failed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
