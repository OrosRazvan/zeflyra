<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destination;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        Destination::truncate();
        $destinations = [
            [
                'name' => "Santorini",
                'price' => 150,
                'location' => "Greece",
                'description' => "Luxurious cliffside villas with infinity pools",
                'photo' => "photos/santorini.jpg",
                'category' => json_encode(["Sailing", "Wine Tasting", "Sunset Tours"]),
                'origin' => "Athens",
                'destination' => "Santorini",
                'departure_date' => "2025-06-15",
                'return_date' => "2025-06-22",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 0,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Bali",
                'price' => 185,
                'location' => "Indonesia",
                'description' => "Spiritual journey in tropical paradise",
                'photo' => "photos/bali.jpg",
                'category' => json_encode(["Yoga", "Surfing", "Temple Visits"]),
                'origin' => "Jakarta",
                'destination' => "Bali",
                'departure_date' => "2025-07-10",
                'return_date' => "2025-07-20",
                'passenger_details' => json_encode([
                    'adults' => 1,
                    'children' => 1,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Swiss Alps",
                'price' => 50,
                'location' => "Switzerland",
                'description' => "Exclusive mountain retreat with panoramic views",
                'photo' => "photos/swiss.jpg",
                'category' => json_encode(["Skiing", "Hiking", "Spa"]),
                'origin' => "Zurich",
                'destination' => "Swiss Alps",
                'departure_date' => "2025-12-01",
                'return_date' => "2025-12-10",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 0,
                    'infants' => 1,
                ]),
            ],
            [
                'name' => "Dubai",
                'price' => 624,
                'location' => "UAE",
                'description' => "Ultimate luxury in the heart of Dubai",
                'photo' => "photos/dubai.jpg",
                'category' => json_encode(["Shopping", "Desert Safari", "Fine Dining"]),
                'origin' => "Abu Dhabi",
                'destination' => "Dubai",
                'departure_date' => "2025-03-15",
                'return_date' => "2025-03-25",
                'passenger_details' => json_encode([
                    'adults' => 3,
                    'children' => 2,
                    'infants' => 1,
                ]),
            ],
            [
                'name' => "Tokyo",
                'price' => 107,
                'location' => "Japan",
                'description' => "Experience the vibrant culture and technology of Tokyo",
                'photo' => "photos/tokyo.jpg",
                'category' => json_encode(["City Tour", "Tech Exhibits", "Traditional Tea Ceremony"]),
                'origin' => "Osaka",
                'destination' => "Tokyo",
                'departure_date' => "2025-09-01",
                'return_date' => "2025-09-07",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 1,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Crete",
                'price' => 104,
                'location' => "Greece",
                'description' => "Explore the ancient ruins and beautiful beaches",
                'photo' => "photos/crete.jpg",
                'category' => json_encode(["Cultural Tours", "Hiking", "Beach Relaxation"]),
                'origin' => "Athens",
                'destination' => "Crete",
                'departure_date' => "2025-08-01",
                'return_date' => "2025-08-10",
                'passenger_details' => json_encode([
                    'adults' => 4,
                    'children' => 1,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Venice",
                'price' => 134,
                'location' => "Italy",
                'description' => "Romantic gondola rides in the canals of Venice",
                'photo' => "photos/venice.jpg",
                'category' => json_encode(["Canal Tour", "Gondola Ride", "Fine Dining"]),
                'origin' => "Cluj",
                'destination' => "Venice",
                'departure_date' => "2025-06-10",
                'return_date' => "2025-06-17",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 0,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Rome",
                'price' => 62,
                'location' => "Italy",
                'description' => "Explore the ancient wonders of Rome",
                'photo' => "photos/rome.jpg",
                'category' => json_encode(["Historical Sites", "Cultural Tours", "Roman Architecture"]),
                'origin' => "Bucharest",
                'destination' => "Rome",
                'departure_date' => "2025-05-01",
                'return_date' => "2025-05-07",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 0,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Osaka",
                'price' => 112,
                'location' => "Japan",
                'description' => "A futuristic tour in the heart of Osaka",
                'photo' => "photos/osaka.jpg",
                'category' => json_encode(["Modern Architecture", "City Tours", "Tech Exhibits"]),
                'origin' => "Narita",
                'destination' => "Osaka",
                'departure_date' => "2025-08-10",
                'return_date' => "2025-08-15",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 1,
                    'infants' => 0,
                ]),
            ],
            [
                'name' => "Abu Dhabi",
                'price' => 915,
                'location' => "UAE",
                'description' => "Luxury experience in Abu Dhabi with private tours",
                'photo' => "photos/abudaby.jpg",
                'category' => json_encode(["Cultural Tours", "Luxury Experience", "Private Tours"]),
                'origin' => "Washington",
                'destination' => "Abu Dhabi",
                'departure_date' => "2025-04-01",
                'return_date' => "2025-04-10",
                'passenger_details' => json_encode([
                    'adults' => 2,
                    'children' => 1,
                    'infants' => 0,
                ]),
            ],
        ];

        foreach ($destinations as $destinationData) {
            Destination::updateOrCreate(
                ['name' => $destinationData['name']], // Căutăm modelul existent în funcție de 'name'
                $destinationData // Dacă există, actualizăm datele, altfel le creăm
            );
        }
    }
}
