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
        Schema::table('destinations', function (Blueprint $table) {
            $table->string('origin')->after('name'); // Plecare
            $table->string('destination')->after('origin'); // Destinație
            $table->date('departure_date')->default('2025-01-01')->after('destination'); // Data implicită
            $table->date('return_date')->nullable()->after('departure_date'); // Data întoarcerii
            $table->json('passenger_details')->nullable()->after('category'); // Detalii pasageri
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn(['origin', 'destination', 'departure_date', 'return_date', 'passenger_details']);
        });
    }
};
