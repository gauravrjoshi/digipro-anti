<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_domains', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_id')->constrained()->onDelete('cascade');
            $table->string('domain')->unique();
            $table->boolean('verified')->default(false);
            $table->string('verification_token')->nullable();
            $table->boolean('dns_configured')->default(false);
            $table->enum('ssl_status', ['pending', 'active', 'failed'])->default('pending');
            $table->timestamps();
            
            $table->index('domain');
            $table->index(['portfolio_id', 'verified']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_domains');
    }
};
