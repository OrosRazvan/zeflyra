import React from "react";
import { Users, Sparkles, Target, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      {/* Hero Section */}
      <div className="top-1/3 md:top-[25%] xl:top-[calc(100vh-600px)]">
        <div className="relative h-96 bg-blue-600 mt-20">
          <div className="absolute inset-0 bg-black bg-opacity-40">
            <div className="container mx-auto px-6 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <h1 className="text-5xl font-bold mb-4">Discover Zeflyra</h1>
                <p className="text-xl opacity-90">
                  Transforming the future of e-commerce through innovation and
                  memorable shopping experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed text-justify">
                At Zeflyra, we are dedicated to revolutionizing the way people
                shop online. We believe in the power of technology to connect
                merchants with their customers in an authentic and efficient
                way. Through continuous innovation and a focus on user
                experience, we are shaping the future of e-commerce.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Users className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-xl mb-2">2M+ Users</h3>
                <p className="text-gray-600">Using our platform daily.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Sparkles className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Innovation</h3>
                <p className="text-gray-600">State-of-the-art technologies</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Target className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-xl mb-2">99.9%</h3>
                <p className="text-gray-600">Customer Satisfaction</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Clock className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-xl mb-2">24/7</h3>
                <p className="text-gray-600">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-4">Customer Orientation</h3>
              <p className="text-gray-600">
                We prioritize the needs of our customers in everything we do.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-4">Continuous Innovation</h3>
              <p className="text-gray-600">
                We are constantly seeking ways to improve and innovate our
                services.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive to deliver the best possible solutions and services.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
