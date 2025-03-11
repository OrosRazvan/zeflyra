<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    // Define the table name 
    protected $table = 'destinations';

    // Define the fields that can be mass-assigned (inserted into the table)
    protected $fillable = [
        'name',
        'price',
        'location',
        'description',
        'photo',
        'category',
        'origin',
        'destination',
        'departure_date',
        'return_date',
        'passenger_details',
    ];

    // Dacă vrei să adaugi automat timestampuri (created_at și updated_at), poți să le setezi la true.
    public $timestamps = true;

}