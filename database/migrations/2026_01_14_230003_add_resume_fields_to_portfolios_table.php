<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->enum('resume_type', ['upload', 'url'])->nullable()->after('theme_color');
            $table->string('resume_file_path')->nullable()->after('resume_type');
            $table->string('resume_url')->nullable()->after('resume_file_path');
            $table->timestamp('resume_uploaded_at')->nullable()->after('resume_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropColumn(['resume_type', 'resume_file_path', 'resume_url', 'resume_uploaded_at']);
        });
    }
};
