<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\SpecialOffers;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function searchFlights(Request $request)
    {
        try {
            // Validate input fields
            $validated = $request->validate([
                'origin' => 'required|string',
                'destination' => 'nullable|string',
                'departure_date' => 'nullable|date',
                'return_date' => 'nullable|date',
            ]);

            // Query to get flights
            $flightsQuery = Destination::query();
            
            // Apply filters to the query
            $flightsQuery->where('origin', $validated['origin'])
                         ->when(isset($validated['destination']), function ($query) use ($validated) {
                             return $query->where('destination', $validated['destination']);
                         })
                         ->when(isset($validated['departure_date']), function ($query) use ($validated) {
                             return $query->where('departure_date', $validated['departure_date']);
                         })
                         ->when(isset($validated['return_date']), function ($query) use ($validated) {
                             return $query->where('return_date', $validated['return_date']);
                         });

            // Execute flight query and fetch results
            $flights = $flightsQuery->get();

            // Query to get special offers
            $specialOffersQuery = SpecialOffers::query();

            // Apply filters to special offers query
            $specialOffersQuery->where('origin', $validated['origin'])
                               ->when(isset($validated['destination']), function ($query) use ($validated) {
                                   return $query->where('destination', $validated['destination']);
                               })
                               ->when(isset($validated['departure_date']), function ($query) use ($validated) {
                                   return $query->where('departure_date', $validated['departure_date']);
                               })
                               ->when(isset($validated['return_date']), function ($query) use ($validated) {
                                   return $query->where('return_date', $validated['return_date']);
                               });

            // Execute special offers query and fetch results
            $specialOffers = $specialOffersQuery->get();

            // Return the results as JSON
            return response()->json([
                'flights' => $flights,
                'special_offers' => $specialOffers,
            ]);

        } catch (\Exception $e) {
            // Catch and return any errors
            return response()->json([
                'error' => 'An error occurred while searching for flights',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
