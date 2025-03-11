<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('specialoffers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('origin'); // Plecare
            $table->string('destination'); // Destinație
            $table->date('departure_date')->default('2025-01-01'); // Data implicită
            $table->date('return_date')->nullable(); // Data întoarcerii
            $table->string('price')->comment('Vechiul preț'); // Vechiul preț
            $table->string('new_price')->nullable()->comment('Noul preț'); // Noul preț
            $table->string('location');
            $table->text('description');
            $table->string('photo')->nullable();
            $table->json('category');
            $table->json('passenger_details')->nullable(); // Detalii pasageri
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specialoffers');
    }
};
