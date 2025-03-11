<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SpecialOffers;

class SpecialoffersController extends Controller
{
    public function specialoffers()
    {
        $specialoffers = SpecialOffers::all()->map(function ($specialoffer) {
            // Correcting the variable used in the mapping function
            $specialoffer->photo = basename($specialoffer->photo);
            return $specialoffer; // Correctly returning the modified object
        });

        return response()->json($specialoffers); // Returning the JSON response
    }

    public function show($id)
{
    $specialoffer = SpecialOffers::findOrFail($id);

    // Asigură-te că datele sunt procesate corect
    $specialoffer->photo = basename($specialoffer->photo);

    return response()->json($specialoffer); // Verifică răspunsul JSON
}
}
