import React, { useState, useEffect } from 'react';
import { Plane, Cloud, Sun, Wind, Map, Calendar, Users, Trophy } from 'lucide-react';

const CloudCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative w-64 h-48 transition-all duration-300 hover:scale-105">
      {/* Cloud shape background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-white rounded-3xl shadow-lg 
                      before:content-[''] before:absolute before:top-[-30%] before:left-[20%] before:w-[60%] before:h-[60%] 
                      before:bg-white before:rounded-full
                      after:content-[''] after:absolute after:top-[-40%] after:left-[40%] after:w-[40%] after:h-[40%] 
                      after:bg-white after:rounded-full">
        </div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const StatsCloud = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev < 98 ? prev + 1 : prev));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[30px] p-6 text-white
                    shadow-lg transform hover:scale-105 transition-all duration-300
                    relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[20%] left-[10%] w-16 h-16 bg-white/10 rounded-full" />
        <div className="absolute top-[40%] right-[20%] w-20 h-20 bg-white/10 rounded-full" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-2">{count}%</h3>
        <p className="text-lg">Satisfied Travelers</p>
        <div className="mt-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          <span className="text-sm">Top Rated Airlines</span>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Fly With Us?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          <CloudCard 
            icon={Plane}
            title="Direct Flights"
            description="Find the fastest routes to your destination"
          />
          <CloudCard 
            icon={Map}
            title="Global Coverage"
            description="Access to worldwide destinations"
          />
          <CloudCard 
            icon={Calendar}
            title="Flexible Dates"
            description="Easy rebooking and scheduling"
          />
          <CloudCard 
            icon={Users}
            title="Group Travel"
            description="Special rates for group bookings"
          />
        </div>
      </div>
    </div>
  );
};

const WeatherBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-xl shadow-lg
                    flex items-center justify-between text-white
                    transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center gap-4">
        <Sun className="w-10 h-10 animate-spin-slow" />
        <div>
          <h3 className="text-xl font-semibold">Perfect Flying Conditions</h3>
          <p className="text-sm opacity-90">Check real-time weather updates</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Wind className="w-6 h-6" />
        <span className="text-lg font-medium">23°C</span>
      </div>
    </div>
  );
};

const Cloud = () => {
  return (
    <div className="space-y-12 py-8">
      <WeatherBanner />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatsCloud />
        <div className="md:col-span-2">
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
};

export default Cloud;