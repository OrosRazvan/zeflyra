import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Ticket, Plane, LogOut } from "lucide-react";

const Profile = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch('http://localhost:8000/api/bookings', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setBookingsCount(data.length);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchBookings();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl text-gray-600">Please sign in to view your profile</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 mt-10 mb-10">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Top Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                  <Plane className="w-16 h-16 text-blue-600 transform -rotate-45" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 pb-8 px-6">
            {/* User Info */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-gray-500 mt-1">Explorer</p>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Ticket className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {isLoading ? "..." : error ? "?" : bookingsCount}
                </div>
                <div className="text-gray-500">Total Flights</div>
                {error && (
                  <p className="text-red-500 text-sm mt-2">Could not load bookings</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {/* My Tickets Button */}
              <Link
                to="/mytickets"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <Ticket className="w-5 h-5" />
                View My Tickets
              </Link>

              {/* Logout Button */}
              <button
                onClick={logoutUser}
                className="flex items-center justify-center gap-2 w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;