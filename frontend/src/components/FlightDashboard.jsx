import React, { useState, useEffect } from 'react';
import { 
  Sun, Cloud, Wind, Plane, Shield, Users, 
  Award, Timer, ThermometerSun, CloudRain,
  Sunset, MapPin, RefreshCw, CheckCircle, Clock, AlertCircle
} from 'lucide-react';
import { features } from "../constants/Features";

const FlightConditions = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=47.0465&lon=21.9189&units=metric&appid=18c5f57436377fc905ce403bf544caa6`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        setWeather({
          temperature: data.main.temp,
          windSpeed: data.wind.speed,
          weatherDescription: data.weather[0].description,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 relative overflow-hidden border border-gray-200">
      <div className="relative">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Flight Conditions</h3>
        {weather ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-2">
                <ThermometerSun className="w-5 h-5 text-orange-600" />
                <span className="text-lg font-semibold text-gray-800">
                  {weather.temperature}°C
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Temperature</p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-2">
                <Wind className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-semibold text-gray-800">
                  {weather.windSpeed} km/h
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Wind Speed</p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-2">
                <Sun className="w-5 h-5 text-yellow-600" />
                <span className="text-lg font-semibold text-gray-800 capitalize">
                  {weather.weatherDescription}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Weather</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading weather data...</div>
        )}
      </div>
    </div>
  );
};



const TravelStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { icon: Plane, count: "500+", label: "Daily Flights" },
        { icon: Users, count: "1M+", label: "Happy Travelers" },
        { icon: MapPin, count: "100+", label: "Destinations" }
      ].map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200
                                  hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const UpcomingDepartures = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const requestOptions = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        const [specialOffersRes, destinationsRes] = await Promise.all([
          fetch("http://localhost:8000/api/specialoffers", requestOptions),
          fetch("http://localhost:8000/api/destinations", requestOptions),
        ]);

        if (!specialOffersRes.ok)
          throw new Error(`Special offers error: ${specialOffersRes.statusText}`);
        if (!destinationsRes.ok)
          throw new Error(`Destinations error: ${destinationsRes.statusText}`);

        const specialOffers = await specialOffersRes.json();
        const destinations = await destinationsRes.json();

        const allFlights = [
          ...specialOffers.map((offer) => ({
            time: new Date(offer.departure_date),
            origin: offer.origin || "Local",
            destination: offer.destination,
            type: "special",
            price: offer.new_price || offer.price,
          })),
          ...destinations.map((dest) => ({
            time: new Date(dest.departure_date),
            origin: dest.origin,
            destination: dest.destination,
            type: "regular",
            price: dest.price,
          })),
        ];

        // Filtrăm zborurile cu data viitoare și le sortăm
        const now = new Date();
        const sortedFlights = allFlights
          .filter((flight) => flight.time > now) // doar zboruri viitoare
          .sort((a, b) => a.time - b.time) // sortăm după data plecării
          .slice(0, 3); // afișăm doar 3 cele mai apropiate

        setFlights(sortedFlights);
        setError(null);
      } catch (error) {
        console.error("Detailed error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const getFlightStatus = (flightTime) => {
    const now = new Date();
    const hoursDiff = (flightTime - now) / (1000 * 60 * 60);

    if (hoursDiff < 1) {
      return { status: "Boarding", className: "text-green-600" };
    }
    if (hoursDiff < 2) {
      return { status: "Check-in", className: "text-blue-600" };
    }
    return { status: "Scheduled", className: "text-blue-600" };
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Upcoming Departures</h3>
        <RefreshCw
          className="w-5 h-5 text-gray-500 cursor-pointer hover:rotate-180 transition-transform duration-500"
          onClick={() => window.location.reload()}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-40 text-red-500 space-y-2">
          <AlertCircle className="w-8 h-8" />
          <p className="text-center">{error}</p>
          <p className="text-sm text-gray-500">Check the console for more details</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight, index) => {
            const { status, className } = getFlightStatus(flight.time);

            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-50 p-2 rounded-full">
                    {status === "Departed" ? (
                      <Plane className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {flight.time.toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      From <span className="font-bold">{flight.origin}</span> to{" "}
                      <span className="font-bold">{flight.destination}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${className}`}>{status}</p>
                  <p className="text-sm text-gray-600">
                    {flight.type === "special" ? "Special Offer" : "Regular Flight"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const QuickFeatures = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <div key={index} 
             className={`${feature.bgColor} p-4 rounded-xl shadow-sm hover:shadow-md transition-all 
                        transform hover:-translate-y-1 duration-300 cursor-pointer border border-gray-200`}>
          <div className={feature.textColor}>
            <feature.icon className="w-6 h-6" />
          </div>
          <h4 className="font-medium text-gray-800 mt-2">{feature.title}</h4>
        </div>
      ))}
    </div>
  );
};

const FlightDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FlightConditions />
        <UpcomingDepartures />
      </div>
      
      <TravelStats />
      
      <QuickFeatures />
    </div>
  );
};

export default FlightDashboard;