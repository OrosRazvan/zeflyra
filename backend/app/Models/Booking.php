<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'source_type',
        'source_id',
        'user_id', // Adăugat user_id pentru asocierea biletului cu utilizatorul
        'name',
        'origin',
        'destination',
        'departure_date',
        'return_date',
        'original_price',
        'final_price',
        'passenger_details',
    ];

    protected $casts = [
        'passenger_details' => 'array',
        'departure_date' => 'date',
        'return_date' => 'date',
        'original_price' => 'decimal:2',
        'final_price' => 'decimal:2',
    ];

    public function source()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
