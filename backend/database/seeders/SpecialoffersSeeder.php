<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SpecialOffers;


class SpecialoffersSeeder extends Seeder
{
    public function run(): void
    {

        SpecialOffers::truncate();
        $specialoffers = [
            [
                'name' => "Maldives",
                'price' => 835,
                'new_price' => 600,
                'location' => "Indian Ocean",
                'description' => "Exclusive overwater villa experience",
                'photo' => "photos/maldive.jpg",
                'category' => json_encode(["Private Beach", "Unlimited Spa", "Gourmet Dining"]),
                'origin' => "London",
                'destination' => "Maldives",
                'departure_date' => "2025-11-15",
                'return_date' => "2025-11-25",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 1,
                    'infants' => 1,
                ]),
            ],
            [
                'name' => "Tanzania",
                'price' => 1126,
                'new_price' => 912,
                'location' => "Tanzania",
                'description' => "Immersive wildlife adventure",
                'photo' => "photos/safari.jpg",
                'category' => json_encode(["Game Drives", "Luxury Camps", "Expert Guides"]),
                'origin' => "New York",
                'destination' => "Tanzania",
                'departure_date' => "2025-01-05",
                'return_date' => "2025-01-15",
                'passenger_details' => json_encode([
                    'adults' => 4,
                    'children' => 1,
                    'infants' => 1,
                ]),
            ],
            [
                'name' => "Athens",
                'price' => 136,
                'new_price' => 100,
                'location' => "Greece",
                'description' => "All-inclusive luxury cruise experience",
                'photo' => "photos/medi.jpg",
                'category' => json_encode(["Multiple Destinations", "Game Drives", "Festive Food"]),
                'origin' => "Barcelona",
                'destination' => "Athens",
                'departure_date' => "2025-02-10",
                'return_date' => "2025-02-20",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 2,
                    'infants' => 1,
                ]),
            ],
            [
                'name' => "Grand Canyon",
                'price' => 698,
                'new_price' => 490,
                'location' => "USA",
                'description' => "Explore the iconic Grand Canyon with guided tours",
                'photo' => "photos/canion.jpg",
                'category' => json_encode(["Guided Hikes", "Helicopter Ride", "Camping"]),
                'origin' => "Berlin",
                'destination' => "Phoenix",
                'departure_date' => "2025-03-05",
                'return_date' => "2025-03-12",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 0,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Munich",
                'price' => 200,
                'new_price' => 100,
                'location' => "Germany",
                'description' => "Visit the most enchanting Christmas markets in Bavaria",
                'photo' => "photos/bavarian.jpg",
                'category' => json_encode(["Traditional Crafts", "Festive Food", "Historical Sites"]),
                'origin' => "Oradea",
                'destination' => "Munich",
                'departure_date' => "2025-12-15",
                'return_date' => "2025-12-20",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 1,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Caribbean Island",
                'price' => 293,
                'new_price' => 200,
                'location' => "Bahamas",
                'description' => "Relax on pristine beaches with an all-inclusive stay",
                'photo' => "photos/caribean.jpg",
                'category' => json_encode(["Private Beaches", "Snorkeling", "Luxury Accommodation"]),
                'origin' => "Miami",
                'destination' => "Nassau",
                'departure_date' => "2025-04-10",
                'return_date' => "2025-04-20",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 0,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Iceland",
                'price' => 406,
                'new_price' => 200,
                'location' => "Iceland",
                'description' => "Witness the magical Northern Lights on this guided adventure",
                'photo' => "photos/island.jpg",
                'category' => json_encode(["Aurora Viewing", "Glacier Hikes", "Hot Springs"]),
                'origin' => "New York",
                'destination' => "Reykjavik",
                'departure_date' => "2025-03-10",
                'return_date' => "2025-03-17",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 0,
                    'infants' => 0,
                ]),
            ],
            
        ];

        foreach ($specialoffers as $specialofferData) {
            SpecialOffers::updateOrCreate(
                ['name' => $specialofferData['name']], // Căutăm modelul existent în funcție de 'name'
                $specialofferData // Dacă există, actualizăm datele, altfel le creăm
            );
        }
    }
}
