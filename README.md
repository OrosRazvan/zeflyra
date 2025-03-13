✈️ Flight Booking System

🌍 Overview
This project is a Flight Booking System, a web application that allows users to search, book, and manage flight tickets. The system is built with:

🛠 Backend: Laravel
🎨 Frontend: React (Vite) with Tailwind CSS
🗄 Database: MySQL (designed using MySQL Workbench)

🚀 Features
Public Pages
🏠 Home Page – Overview of the platform with key functionalities.
📍 Destinations Page – Displays available destinations.
🎟 Special Offers Page – Allows users to search for flights by:
✈️ Origin
🌍 Destination
👥 Number of passengers
📅 Date of travel
🔀 Sorting options: Alphabetically and by price.
📞 Contact Page – Users can send inquiries.
🔐 User Functionality
User Authentication
📝 Register an account
🔑 Log in securely
User Dashboard

Backend
🖥 Laravel (PHP framework for handling business logic and API endpoints)
🗄 MySQL (Relational database for storing user and flight data)

Frontend
⚡ React (Vite) (for fast development and optimized builds)
🎨 Tailwind CSS (for modern and responsive UI design)
🔄 React Router DOM (for seamless navigation)
🔧 React Icons (for UI enhancements)

🛠 Installation & Setup
📌 Prerequisites
Ensure you have the following installed:
🐘 PHP 8+
📦 Composer
📌 Node.js & npm
🗄 MySQL Server
🔙 Backend Setup

Clone the repository:
git clone https://github.com/your-username/flight-booking.git
cd flight-booking

Install dependencies:
composer install

Set up the environment:
cp .env.example .env

Update .env file with your database credentials.

Generate application key:
php artisan key:generate
Run database migrations:
php artisan migrate --seed

Start the Laravel development server:
php artisan serve

🎨 Frontend Setup
Navigate to the frontend folder:
cd frontend

Install dependencies:
npm install

Install Tailwind CSS:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Install React Router and React Icons:
npm install react-router-dom react-icons

Start the development server:
npm run dev

🎯 Usage
Open your browser and visit:
🌐 Backend API: http://127.0.0.1:8000
🖥 Frontend: http://localhost:5173

Register a new user and log in to explore booking features.
