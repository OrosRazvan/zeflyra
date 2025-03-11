<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DestinationsController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\SpecialoffersController;
use App\Http\Controllers\BookingController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['status' => 'CSRF token generated']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/destinations', [DestinationsController::class, 'destinations']);
Route::get('/destinations/{destination}', [DestinationsController::class, 'show']);

Route::post('/flights/search', [FlightController::class, 'searchFlights']);

Route::get('/specialoffers', [SpecialoffersController::class, 'specialoffers']);
Route::get('/specialoffers/{specialoffer}', [SpecialoffersController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings', [BookingController::class, 'index']);
});
