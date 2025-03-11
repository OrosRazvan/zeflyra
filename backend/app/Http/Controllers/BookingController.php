<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'source_type' => 'required|in:destinations,specialoffers',
            'source_id' => 'required|integer',
            'name' => 'required|string',
            'origin' => 'required|string',
            'destination' => 'required|string',
            'departure_date' => 'required|date',
            'return_date' => 'nullable|date',
            'original_price' => 'required|numeric',
            'final_price' => 'required|numeric',
            'passenger_details' => 'required|json',
        ]);

        $booking = Booking::create(array_merge($validated, [
            'user_id' => Auth::id(), // Asociază biletul cu utilizatorul conectat
        ]));

        return response()->json($booking, 201);
    }

    public function index()
    {
        $user = Auth::user(); // Preia utilizatorul conectat
        $bookings = Booking::where('user_id', $user->id)->latest()->get(); // Filtrează biletele pentru user

        return response()->json($bookings);
    }
}
