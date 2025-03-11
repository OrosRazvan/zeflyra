import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Heart,
  Plane,
  MapPin,
  ChevronLeft,
  Calendar,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import ConfirmDialog from "../components/ConfirmDialog";

const Flight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isSpecialOffer = window.location.pathname.includes("specialoffers");
        const endpoint = isSpecialOffer ? 'specialoffers' : 'destinations';
        const response = await axios.get(`http://localhost:8000/api/${endpoint}/${id}`);
        setFlight(response.data);
      } catch (error) {
        console.error("Error fetching flight:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const getImagePath = (photo) => `http://localhost:8000/photos/${photo}`;
  const category = flight.category ? JSON.parse(flight.category) : {};
  const passengerDetails = flight.passenger_details ? JSON.parse(flight.passenger_details) : {};
  const isSpecialOffer = window.location.pathname.includes("specialoffers");

  const formatDate = (dateString) => 
    new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getTotalPassengers = () =>
    passengerDetails.adults +
    (passengerDetails.children || 0) +
    (passengerDetails.infants || 0);

  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    if (originalPrice && discountedPrice) {
      return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    }
    return 0;
  };

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token"); // Preia token-ul stocat
      if (!token) {
        alert("You must be signed in");
        return;
      }
  
      const bookingData = {
        source_type: isSpecialOffer ? "specialoffers" : "destinations",
        source_id: flight.id,
        name: flight.name,
        origin: flight.origin,
        destination: flight.destination,
        departure_date: flight.departure_date,
        return_date: flight.return_date,
        original_price: isSpecialOffer ? flight.price : flight.price,
        final_price: isSpecialOffer ? flight.new_price : flight.price,
        passenger_details: flight.passenger_details,
      };
  
      const response = await axios.post(
        "http://localhost:8000/api/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adaugă token-ul în header
          },
        }
      );
  
      if (response.status === 201) {
        navigate("/mytickets");
      }
    } catch (error) {
      console.error("Error booking flight:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4 md:p-10 xl:mt-24 mt-20">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="relative h-96">
          {flight.photo ? (
            <motion.img
              src={getImagePath(flight.photo)}
              alt={flight.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-black text-blue-900">{flight.name}</h1>
          </div>

          {/* Flight Details */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            {/* From, To, Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin and Destination */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Plane className="text-blue-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-semibold text-blue-900">
                      {flight.origin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-semibold text-blue-900">
                      {flight.destination}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-blue-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-semibold text-blue-900">
                      {formatDate(flight.departure_date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-blue-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Return</p>
                    <p className="font-semibold text-blue-900">
                      {formatDate(flight.return_date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="mt-6 pt-6 border-t border-blue-200">
              <div className="flex items-center space-x-3">
                <Users className="text-blue-500" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Passengers</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-6">
                      {passengerDetails.adults > 0 && (
                        <p className="text-blue-900">
                          <span className="font-semibold">
                            {passengerDetails.adults}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            Adults
                          </span>
                        </p>
                      )}
                      {passengerDetails.children > 0 && (
                        <p className="text-blue-900">
                          <span className="font-semibold">
                            {passengerDetails.children}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            Children
                          </span>
                        </p>
                      )}
                      {passengerDetails.infants > 0 && (
                        <p className="text-blue-900">
                          <span className="font-semibold">
                            {passengerDetails.infants}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            Infants
                          </span>
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-medium text-blue-500">
                      Total: {getTotalPassengers()} passengers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {flight.description}
          </p>

          {/* Categories */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(category).map(([key, value]) => (
                <div
                  key={key}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <span className="text-blue-500">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offers Discount */}
          {window.location.pathname.includes("specialoffers") &&
            flight.price &&
            flight.new_price && (
              <div className="flex items-center justify-between mb-6">
                {/* Price and Discount */}
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-bold text-gray-800 line-through">
                    {flight.price}€
                  </span>
                  <div className="flex flex-row items-center space-x-2">
                    <span className="text-xl md:text-2xl font-bold text-green-500">
                      {flight.new_price}€
                    </span>
                    <span className="text-sm text-red-500 font-semibold">
                      Save{" "}
                      {calculateDiscountPercentage(
                        flight.price,
                        flight.new_price
                      )}
                      %
                    </span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plane size={20} />
                  <span>Book Now</span>
                </button>
              </div>
            )}

          {/* Regular Price and Book Now Button */}
          {!window.location.pathname.includes("specialoffers") && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-2xl font-bold text-blue-900">
                {flight.new_price ? flight.new_price : flight.price} €
              </p>
              <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plane size={20} />
                  <span>Book Now</span>
                </button>
            </div>
          )}
        </div>
      </motion.div>
      <ConfirmDialog
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleBooking}
          flightDetails={flight}
        />
    </div>
  );
};

export default Flight;
