import React, { useState } from "react";
import { Calendar, Plane, Users, ArrowRightLeft, Search } from "lucide-react";

const FlightSearch = () => {
  const [isOriginFocused, setIsOriginFocused] = useState(false);
  const [isDestinationFocused, setIsDestinationFocused] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    if (!origin) {
        alert("Please fill in the origin!");
        return;
    }

    const requestData = {
        origin,
        destination: destination || undefined,
        departure_date: departureDate || undefined,
        return_date: returnDate || undefined,
        passengers,
    };

    try {
        const response = await fetch("http://localhost:8000/api/flights/search", {  // Modificat aici
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch flight data.');
        }

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

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl max-w-4xl mx-auto transition-all my-4 sm:my-20">
      <div className="grid grid-cols-1 gap-4">
        {/* Origin Field */}
        <div
          className={`relative transition-all duration-300 w-full ${isOriginFocused ? "scale-105" : ""}`}
        >
          <div className={`absolute left-4 top-4 transition-all duration-300 ${isOriginFocused ? "text-blue-500" : "text-gray-400"}`}>
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

        {/* Switch Button */}
        <div className="flex items-center justify-center">
          <button className="bg-[#4c8ee0] text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110">
            <ArrowRightLeft size={24} />
          </button>
        </div>

        {/* Destination Field */}
        <div
          className={`relative transition-all duration-300 w-full ${isDestinationFocused ? "scale-105" : ""}`}
        >
          <div className={`absolute left-4 top-4 transition-all duration-300 ${isDestinationFocused ? "text-blue-500" : "text-gray-400"}`}>
            <Plane size={24} className="transform rotate-90" />
          </div>
          <input
            type="text"
            placeholder="To where?"
            className="w-full pl-12 pr-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-lg"
            onFocus={() => setIsDestinationFocused(true)}
            onBlur={() => setIsDestinationFocused(false)}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
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
        <div className="relative mt-4">
          <button
            onClick={() => setShowPassengers(!showPassengers)}
            className="w-full pl-12 pr-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-left bg-white text-lg"
          >
            <Users size={24} className="absolute left-4 top-4 text-gray-400" />
            <span>
              {totalPassengers} Passenger{totalPassengers !== 1 ? "s" : ""}
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
                  setPassengers({
                    ...passengers,
                    infants: passengers.infants + 1,
                  })
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

      {/* Search Results */}
      {searchResults && (
        <div className="mt-6">
          <h3 className="font-semibold text-xl">Search Results</h3>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} className="py-2 border-b">
                <div>
                  <strong>{result.origin}</strong> to <strong>{result.destination}</strong>
                </div>
                <div>Price: ${result.price}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
