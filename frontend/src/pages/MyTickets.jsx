import React, { useState, useEffect } from "react";
import { Ticket, ArrowRight, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const MyTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token"); // Preia token-ul utilizatorului
        const response = await axios.get("http://localhost:8000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`, // Trimite token-ul în cerere
          },
        });
        setBookings(response.data); // Setează biletele pentru utilizatorul conectat
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch tickets");
        console.error("Error fetching tickets:", error);
      }
    };

    fetchBookings();
  }, []);

  const getTimeUntil = (departureDate) => {
    const now = new Date();
    const departure = new Date(departureDate);
    const diffTime = departure - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);

    if (diffDays < 0) return null;
    if (diffMonths > 0) return `${diffMonths} months left`;
    return `${diffDays} days left`;
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-20">
        <h1 className="text-4xl font-bold text-center mb-8">My Tickets</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {bookings.map((ticket) => {
            const isPastFlight = new Date(ticket.departure_date) < new Date();
            const timeUntil = getTimeUntil(ticket.departure_date);

            return (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-6">
                    <div className="text-2xl font-bold text-gray-800">
                      {ticket.origin}
                    </div>
                    <div className="w-24 h-px bg-gradient-to-r from-blue-500 to-blue-600 relative">
                      <Ticket className="absolute -top-2 left-1/2 -translate-x-1/2 text-blue-500 w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {ticket.destination}
                    </div>
                  </div>
                  <span
                    className={`px-6 py-2 rounded-full text-sm font-semibold ${
                      isPastFlight
                        ? "bg-gray-100 text-gray-500"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {isPastFlight ? "Completed" : "Confirmed"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span>
                      {new Date(ticket.departure_date).toLocaleDateString()}
                    </span>
                    {timeUntil && (
                      <span className="ml-2 text-blue-500 font-medium">
                        ({timeUntil})
                      </span>
                    )}
                  </div>

                  {(ticket.source_type === "specialoffers" ||
                    ticket.source_type === "destinations") && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {ticket.source_type === "specialoffers" && (
                          <span className="line-through text-gray-400 text-lg">
                            €{ticket.original_price}
                          </span>
                        )}
                        <span
                          className={`text-xl font-bold ${
                            ticket.source_type === "destinations"
                              ? "text-blue-500"
                              : "text-green-500"
                          }`}
                        >
                          €{ticket.final_price}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {bookings.length === 0 && !error && (
            <div className="flex items-center justify-center min-h-[400px] p-8">
              <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full">
                <div className="space-y-8 text-center">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      No Tickets Found
                    </h3>
                    <p className="text-gray-500">
                      Start your journey by exploring available flights
                    </p>
                  </div>

                  <div className="pt-4 flex justify-center gap-4">
                    <Link to="/destinations">
                      <button className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center space-x-2">
                        <span>Browse Flights</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>

                    <Link to="/specialoffers">
                      <button className="group bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center space-x-2">
                        <span>Special Offers</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
