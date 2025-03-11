<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialOffers extends Model
{
    use HasFactory;

    // Define the table name 
    protected $table = 'specialoffers';

    // Define the fields that can be mass-assigned (inserted into the table)
    protected $fillable = [
        'name',
        'price',        
        'new_price',     
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

    // Enable automatic timestamps (created_at and updated_at)
    public $timestamps = true;
}
