<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolio_clicks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_id')->constrained()->onDelete('cascade');
            $table->string('link_type'); // 'project', 'social', 'email', 'phone'
            $table->string('link_url');
            $table->string('link_label')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamp('clicked_at');
            $table->index(['portfolio_id', 'clicked_at']);
            $table->index(['portfolio_id', 'link_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_clicks');
    }
};
