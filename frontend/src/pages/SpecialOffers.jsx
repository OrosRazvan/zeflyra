import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  MapPin,
  Heart,
  Star,
  ArrowRight,
  Search,
  Calendar,
  Users,
  ArrowRightLeft,
  ArrowUpDown,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function SpecialOffers() {
  const [specialoffers, setSpecialoffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeBookmark, setActiveBookmark] = useState(null);
  const [isOriginFocused, setIsOriginFocused] = useState(false);
  const [isSpecialofferFocused, setIsSpecialofferFocused] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [origin, setOrigin] = useState("");
  const [specialoffer, setSpecialoffer] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [priceSort, setPriceSort] = useState("none");
  const [nameSort, setNameSort] = useState("none");

  // Fetch specialoffer data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/specialoffers")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setSpecialoffers(response.data);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching specialoffers:", error);
      });
  }, []);

  const handleBookmarkClick = (id) => {
    setActiveBookmark((prevState) => (prevState === id ? null : id));
  };

  const getImagePath = (photo) => {
    return `http://localhost:8000/photos/${photo}`;
  };

  const handleSearch = async () => {
    if (!origin) {
      setSearchResults(null);
      return;
    }

    const requestData = {
      origin,
      destination: specialoffer || undefined,
      departure_date: departureDate || undefined,
      return_date: returnDate || undefined,
      passengers,
    };

    try {
      const response = await fetch("http://localhost:8000/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch flight data.");
      }

      console.log("Search results:", data); // Inspect search results
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for flights:", error);
      alert(error.message || "Something went wrong. Please try again later.");
    }
  };

  const PassengerCounter = ({ type, count, onIncrement, onDecrement }) => (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="font-medium text-lg">{type}</p>
        <p className="text-sm text-gray-500">
          {type === "Adults"
            ? "12+ years"
            : type === "Children"
            ? "2-11 years"
            : "0-2 years"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onDecrement}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            count === 0
              ? "bg-gray-100 text-gray-400"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
          disabled={count === 0}
        >
          -
        </button>
        <span className="w-8 text-lg">{count}</span>
        <button
          onClick={onIncrement}
          className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition-all"
        >
          +
        </button>
      </div>
    </div>
  );

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  const filteredSpecialoffers =
    searchResults?.special_offers?.length > 0
      ? specialoffers.filter((specialoffer) =>
          searchResults.special_offers.some(
            (result) => result.id === specialoffer.id
          )
        )
      : specialoffers;

      const handlePriceSort = (order) => {
        setPriceSort(order);
        let sortedSpecialoffers = [...specialoffers];
    
        if (order === "asc") {
          sortedSpecialoffers.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
        } else if (order === "desc") {
          sortedSpecialoffers.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
        }
    
        setSpecialoffers(sortedSpecialoffers);
      };
    
      const handleNameSort = (order) => {
        setNameSort(order);
        setPriceSort("none"); // Reset price sort when sorting by name
        let sortedSpecialoffers = [...specialoffers];
        
        if (order === "name-asc") {
          sortedSpecialoffers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === "name-desc") {
          sortedSpecialoffers.sort((a, b) => b.name.localeCompare(a.name));
        }
        
        setSpecialoffers(sortedSpecialoffers);
      };

  return (
    <div className="relative min-h-screen bg-[#f4f5f7]">
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-br from-[#4c8ee0]/10 via-transparent to-transparent" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-12 md:pt-24 pb-8 md:pb-12 overflow-hidden mt-20"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className=" mb-12 container mx-auto px-4 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-gray-800 mb-6 text-center">
            Exclusive 
            <span className="text-[#4c8ee0]"> Special</span>
            <br className="hidden md:block" />
            <span>Travel Offers</span>
          </h1>

          {/* Search Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="w-full max-w-md bg-white shadow-lg rounded-2xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-center gap-4 hover:shadow-xl transition-all duration-300 mx-auto"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6 text-[#4c8ee0]" />
            <span className="text-sm md:text-base text-gray-500">
              Where would you like to go?
            </span>
          </motion.button>

          {/* Search Panel */}
          <AnimatePresence>
            {isSearchVisible && (
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl max-w-4xl mx-auto transition-all my-4 sm:my-20">
                <div className="grid grid-cols-1 gap-4">
                <p className="flex justify-center text-[#4c8ee0] text-2xl mb-5 font-bold">All flights are round-trip!</p>
                  {/* Origin Field */}
                  <div
                    className={`relative transition-all duration-300 w-full ${
                      isOriginFocused ? "scale-105" : ""
                    }`}
                  >
                    <div
                      className={`absolute left-4 top-4 transition-all duration-300 ${
                        isOriginFocused ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      <Plane size={24} />
                    </div>
                    <input
                      type="text"
                      placeholder="From where?"
                      className="w-full pl-12 pr-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-lg"
                      onFocus={() => setIsOriginFocused(true)}
                      onBlur={() => setIsOriginFocused(false)}
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>

                  {/* Specialoffer Field */}
                  <div
                    className={`relative transition-all duration-300 w-full ${
                      isSpecialofferFocused ? "scale-105" : ""
                    }`}
                  >
                    <div
                      className={`absolute left-4 top-4 transition-all duration-300 ${
                        isSpecialofferFocused
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    >
                      <Plane size={24} className="transform rotate-90" />
                    </div>
                    <input
                      type="text"
                      placeholder="To where?"
                      className="w-full pl-12 pr-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-lg"
                      onFocus={() => setIsSpecialofferFocused(true)}
                      onBlur={() => setIsSpecialofferFocused(false)}
                      value={specialoffer}
                      onChange={(e) => setSpecialoffer(e.target.value)}
                    />
                  </div>

                  {/* Date Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="relative group">
                      <div className="absolute left-4 top-4 text-gray-400 group-hover:text-blue-500 transition-all duration-300">
                        <Calendar size={24} />
                      </div>
                      <input
                        type="date"
                        className="w-full pl-12 pr-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 cursor-pointer text-lg"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-4 text-gray-400 group-hover:text-blue-500 transition-all duration-300">
                        <Calendar size={24} />
                      </div>
                      <input
                        type="date"
                        className="w-full pl-12 pr-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 cursor-pointer text-lg"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Passengers Dropdown */}
                  <div className="relative mt-4 z-20">
                    <button
                      onClick={() => setShowPassengers(!showPassengers)}
                      className="w-full pl-12 pr-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-left bg-white text-lg"
                    >
                      <Users
                        size={24}
                        className="absolute left-4 top-4 text-gray-400"
                      />
                      <span>
                        {totalPassengers} Passenger
                        {totalPassengers !== 1 ? "s" : ""}
                      </span>
                    </button>

                    {/* Passengers Dropdown Panel */}
                    {showPassengers && (
                      <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-xl shadow-2xl p-6 z-50 border animate-fadeIn">
                        <PassengerCounter
                          type="Adults"
                          count={passengers.adults}
                          onIncrement={() =>
                            setPassengers({
                              ...passengers,
                              adults: passengers.adults + 1,
                            })
                          }
                          onDecrement={() =>
                            setPassengers({
                              ...passengers,
                              adults: passengers.adults - 1,
                            })
                          }
                        />
                        <PassengerCounter
                          type="Children"
                          count={passengers.children}
                          onIncrement={() =>
                            setPassengers({
                              ...passengers,
                              children: passengers.children + 1,
                            })
                          }
                          onDecrement={() =>
                            setPassengers({
                              ...passengers,
                              children: passengers.children - 1,
                            })
                          }
                        />
                        <PassengerCounter
                          type="Infants"
                          count={passengers.infants}
                          onIncrement={() =>
                            setPassengers((prevState) => ({
                              ...prevState,
                              adults: prevState.adults + 1,
                            }))
                          }
                          onDecrement={() =>
                            setPassengers({
                              ...passengers,
                              infants: passengers.infants - 1,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="w-full mt-6 bg-[#4c8ee0] text-white py-5 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <Search
                      size={24}
                      className="group-hover:rotate-12 transition-transform duration-300"
                    />
                    <span>Find Flights</span>
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Sort Dropdowns */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex justify-end items-center gap-4">
          {/* Name Sort Dropdown */}
          <div className="relative">
            <select
              value={nameSort}
              onChange={(e) => handleNameSort(e.target.value)}
              className="bg-white px-4 py-2 rounded-xl shadow-md appearance-none pr-10 cursor-pointer hover:bg-gray-50 transition-colors duration-200 min-w-[160px]"
            >
              <option value="none">Sort by Name</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none w-4 h-4" />
          </div>

          {/* Price Sort Dropdown */}
          <div className="relative">
            <select
              value={priceSort}
              onChange={(e) => handlePriceSort(e.target.value)}
              className="bg-white px-4 py-2 rounded-xl shadow-md appearance-none pr-10 cursor-pointer hover:bg-gray-50 transition-colors duration-200 min-w-[160px]"
            >
              <option value="none">Sort by Price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Specialoffers Grid */}
      <div className="container mx-auto px-4 pb-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredSpecialoffers.map((specialoffer) => (
            <SpecialofferCard
              key={specialoffer.id}
              specialoffer={specialoffer}
              onBookmarkClick={handleBookmarkClick}
              isBookmarked={activeBookmark === specialoffer.id}
              getImagePath={getImagePath}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Specialoffer Card Component
const SpecialofferCard = ({
  specialoffer,
  onBookmarkClick,
  isBookmarked,
  getImagePath,
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const passengerDetails = JSON.parse(specialoffer.passenger_details);
  const discountPercentage = Math.round(
    ((specialoffer.price - specialoffer.new_price) / specialoffer.price) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
    >
      <div className="absolute top-6 right-6 z-10">
        <div className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm">
          {discountPercentage}% OFF
        </div>
      </div>

      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={getImagePath(specialoffer.photo || "default-photo.jpg")}
          alt={specialoffer.name || "Special Offer"}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">
              {specialoffer.name}
            </h3>
            <p className="text-sm md:text-base text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[#4c8ee0]" />
              {specialoffer.location}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-base text-gray-500 line-through">
              {specialoffer.price}€
            </span>
            <span className="text-xl md:text-2xl font-bold text-green-500">
              {specialoffer.new_price}€
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 my-4"></div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#4c8ee0]" />
              <div>
                <span className="text-gray-500">From</span>
                <p className="font-medium text-gray-800">
                  {specialoffer.origin}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-gray-500">To</span>
              <p className="font-medium text-gray-800">
                {specialoffer.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4c8ee0]" />
              <div className="flex flex-col">
                <span className="text-gray-600">Departure</span>
                <span className="font-medium">
                  {formatDate(specialoffer.departure_date)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4c8ee0]" />
              <div className="flex flex-col">
                <span className="text-gray-600">Return</span>
                <span className="font-medium">
                  {formatDate(specialoffer.return_date)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-[#4c8ee0]" />
            <div className="flex gap-4">
              {passengerDetails.adults > 0 && (
                <span className="text-gray-600">
                  {passengerDetails.adults}{" "}
                  {passengerDetails.adults === 1 ? "Adult" : "Adults"}
                </span>
              )}
              {passengerDetails.children > 0 && (
                <span className="text-gray-600">
                  {passengerDetails.children}{" "}
                  {passengerDetails.children === 1 ? "Child" : "Children"}
                </span>
              )}
              {passengerDetails.infants > 0 && (
                <span className="text-gray-600">
                  {passengerDetails.infants}{" "}
                  {passengerDetails.infants === 1 ? "Infant" : "Infants"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 my-4"></div>

        <p className="text-sm md:text-base text-gray-600 mb-4">
          {specialoffer.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {JSON.parse(specialoffer.category).map((activity, idx) => (
            <span
              key={idx}
              className="px-2 md:px-3 py-1 bg-[#f4f5f7] rounded-full text-xs md:text-sm text-gray-600"
            >
              {activity}
            </span>
          ))}
        </div>

        <Link
          to={`/specialoffers/${specialoffer.id}`}
          className="w-full bg-[#4c8ee0] hover:bg-[#4c8ee0]/90 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-xl transition duration-300 flex items-center justify-center gap-2 group"
          onClick={() =>
            console.log(`Navigating to /specialoffers/${specialoffer.id}`)
          }
        >
          View Flight
        </Link>
        
      </div>
      
    </motion.div>
  );
};
