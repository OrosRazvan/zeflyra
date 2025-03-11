<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'flights/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173'], // Adaugă aici URL-ul frontend-ului React

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => false,

    'max_age' => 0,

    'supports_credentials' => true, // IMPORTANT pentru cookie-uri (Sanctum)
];
