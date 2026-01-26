<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Handling ENUM modification can be tricky in some DBs.
        // For MySQL, we can use raw statement or change().
        Schema::table('portfolios', function (Blueprint $table) {
            // Add template column first
            $table->string('resume_template')->default('modern')->nullable()->after('resume_type');
        });

        // Modify ENUM using raw SQL for broader compatibility or doctrine/dbal if available (assuming MySQL here)
        DB::statement("ALTER TABLE portfolios MODIFY COLUMN resume_type ENUM('upload', 'url', 'generated') NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE portfolios MODIFY COLUMN resume_type ENUM('upload', 'url') NULL");

        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropColumn('resume_template');
        });
    }
};
