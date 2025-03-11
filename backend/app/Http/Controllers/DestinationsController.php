<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Destination;

class DestinationsController extends Controller
{
    public function destinations()
    {
        $destinations = Destination::all()
            ->map(function ($destination) {
                $destination->photo = basename($destination->photo);
                return $destination;
            });
        return response()->json($destinations);
    }

    public function show($id)
    {
        $destination = Destination::findOrFail($id);
        $destination->photo = basename($destination->photo);
        return response()->json($destination);
    }
}
