import React, { useEffect, useState } from "react";
import DestinationCard from "./DestinationCard";
import { Link } from "react-router-dom";
import {
  Star,
  Plane,
  Clock,
  Tag,
  ArrowRight,
  Navigation,
} from "lucide-react";

const TopDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetch destinations from the API
    fetch("http://localhost:8000/api/destinations")
      .then((response) => response.json())
      .then((data) => {
        // Limit to the first 3 destinations
        const limitedDestinations = data.slice(0, 3);
        setDestinations(limitedDestinations);
      })
      .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-blue-50/50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
          Top Destinations
        </h3>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our most popular destinations, handpicked just for you.
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link to="/destinations">
          <button
            className="inline-flex items-center space-x-2 bg-[#4c8ee0] text-white px-6 py-3 rounded-full
                          hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <span>View Flights</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopDestinations;
