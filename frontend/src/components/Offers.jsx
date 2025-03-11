import React, { useState } from "react";
import {
  Star,
  Plane,
  Clock,
  Tag,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { Link } from "react-router-dom";
import { offers } from "../constants/Offers";

const OfferCard = ({
  title,
  country,
  price,
  oldPrice,
  departure,
  rating,
  description,
  image,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative w-full rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={image || `/api/placeholder/${400}/${320}`}
          alt={`${title}, ${country}`}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay - More subtle and gradual */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-3xl font-bold mb-1 drop-shadow-lg">{title}</h3>
            <p className="text-sm text-gray-100 drop-shadow-lg">{country}</p>
          </div>
          <div className="flex items-center space-x-1 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
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
              <p className="text-2xl font-bold drop-shadow-lg text-green-500">{price}</p>
              <p className="text-sm text-gray-300 line-through drop-shadow-lg">
                {oldPrice}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-200 mt-4 drop-shadow-lg leading-relaxed">
          {description}
        </p>

        {/* Animated Button */}
        <Link to="specialoffers"
          className="w-full mt-6 py-3 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg 
                         flex items-center justify-center space-x-2 transition-all duration-300
                         border border-white/20 transform translate-y-0 group-hover:-translate-y-1"
        >
          <span className="font-medium tracking-wide">Book Now</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Special Offer Tag - Animated */}
      <div
        className="absolute top-4 left-4 flex items-center space-x-2 backdrop-blur-sm px-3 py-1.5 rounded-full
                    border border-white/20 transform -translate-y-12 group-hover:translate-y-0 transition-all duration-500"
      >
        <Tag className="w-4 h-4" />
        <span className="text-white text-sm font-medium">Special Offer</span>
      </div>
    </div>
  );
};

const Offers = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-blue-50/50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center space-x-2 mb-4 bg-blue-100 px-4 py-2 rounded-full">
          <Plane className="w-6 h-6 text-blue-600" />
          <h2 className="text-blue-600 font-medium">Limited Time Offers</h2>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
          Special Offers
        </h3>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Grab these exclusive deals before they fly away! Limited seats
          available.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <OfferCard key={index} {...offer} />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link to="/specialoffers">
          <button
            className="inline-flex items-center space-x-2 bg-[#4c8ee0] text-white px-6 py-3 rounded-full
                          hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <span>View All Offers</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Offers;
