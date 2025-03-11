import React, { useState } from "react";
import { Clock } from "lucide-react";

const DestinationCard = ({
  name,
  location,
  photo,
  price,
  description,
  category,
  departure_date: departure,
  rating = "4.5", // Default rating if not provided
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const parsedCategory = category ? JSON.parse(category) : [];

  return (
    <div
      className="group relative w-full rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={`http://localhost:8000/photos/${photo}`}
          alt={`${name}, ${location}`}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-3xl font-bold mb-1 drop-shadow-lg">{name}</h3>
            <p className="text-sm text-gray-100 drop-shadow-lg">{location}</p>
          </div>
          <div className="flex items-center space-x-1 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20">
            <svg
              className="w-4 h-4 text-yellow-400 fill-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
            </svg>
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        {/* Departure and Price Info */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium drop-shadow-lg">
              Departure: {departure}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-200 drop-shadow-lg">from</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold drop-shadow-lg text-blue-500">
                €{price}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-200 mt-4 drop-shadow-lg leading-relaxed">
          {description}
        </p>

        {/* Animated Button */}
        <a
          href="#book-now"
          className="w-full mt-6 py-3 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg 
                         flex items-center justify-center space-x-2 transition-all duration-300
                         border border-white/20 transform translate-y-0 group-hover:-translate-y-1"
        >
          <span className="font-medium tracking-wide">View Destination</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 12H6.75M12 17.25l5.25-5.25M12 6.75l5.25 5.25"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default DestinationCard;
