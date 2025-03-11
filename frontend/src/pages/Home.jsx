import React from "react";
import sky from "../assets/sky.webp";
import fly from "../assets/videoAvion.mp4";
import { Cloud } from "lucide-react";
import TopDestinations from "../components/TopDestinations";
import FlightDashboard from "../components/FlightDashboard";
import Offers from "../components/Offers";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


function Home() {
  return (
    <div className="relative bg-[#f4f5f7] min-h-screen">
      <img
        src={sky}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        alt="Sky background"
      />

      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/3 md:top-[25%] xl:top-[calc(100vh-590px)] text-center z-10 w-full px-4 sm:px-8 md:px-10 lg:px-16">
        <p className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-full mx-auto leading-tight text-black drop-shadow-lg animate-fadeIn">
          Fly worry-free,
        </p>

        <p className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-1 sm:mt-2 max-w-full mx-auto leading-tight text-gradient bg-clip-text text-transparent bg-black drop-shadow-md animate-fadeIn delay-300">
          your tickets are just a click away!
        </p>

        <div className="flex justify-center mt-4 md:mt-5 animate-fadeIn delay-500">
          <div className="relative w-full max-w-5xl h-64 sm:h-72 md:h-80 lg:h-96 rounded-l-full rounded-r-full overflow-hidden shadow-xl">
            {/* Video with Hover Animation */}
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-1"
            >
              <source src={fly} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Color Overlay for Hover Effect */}
            <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-30 transition-opacity duration-500 rounded-l-full rounded-r-full pointer-events-none"></div>
          </div>
        </div>
        <TopDestinations />
        <Offers />
        <Cloud />
        <FlightDashboard />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
