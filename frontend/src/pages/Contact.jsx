import React, { useState } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulăm trimiterea
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setShowAlert(true);
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] ">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16 mt-20 w-full">
        {/* Header Section with floating effect */}
        <div className="text-center mb-16 ">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Let's talk</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are here to turn your ideas into reality. Write to us and let's
            get started.
          </p>
        </div>

        {/* Contact Info Cards with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div className="bg-[#4c8ee0]/10 p-4 rounded-full w-fit mb-6 group-hover:bg-[#4c8ee0] transition-colors duration-300">
              <Mail className="h-6 w-6 text-[#4c8ee0] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Email</h3>
            <p className="text-gray-600">ZeFlyra@gmail.com</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div className="bg-[#4c8ee0]/10 p-4 rounded-full w-fit mb-6 group-hover:bg-[#4c8ee0] transition-colors duration-300">
              <MapPin className="h-6 w-6 text-[#4c8ee0] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xl mb-2">
              Address
            </h3>
            <p className="text-gray-600">Oradea, Bihor</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div className="bg-[#4c8ee0]/10 p-4 rounded-full w-fit mb-6 group-hover:bg-[#4c8ee0] transition-colors duration-300">
              <Phone className="h-6 w-6 text-[#4c8ee0] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xl mb-2">Phone</h3>
            <p className="text-gray-600">0771 067 965</p>
          </div>
        </div>

        {/* Enhanced Contact Form */}
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4c8ee0]/20 to-blue-500/20 transform rotate-12 rounded-3xl blur-xl transition-all duration-300"></div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 relative transform hover:scale-[1.01] transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Animated Input Fields */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-transparent focus:border-[#4c8ee0] focus:ring-0 outline-none transition-all duration-300 placeholder-transparent"
                  placeholder="Nume complet"
                  required
                />
                <label
                  className={`absolute left-2 -top-2.5 bg-white px-2 text-sm transition-all duration-300 
                  ${focusedField === "name" || formData.name
                      ? "text-[#4c8ee0]"
                      : "text-gray-500"
                    }
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                  peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-[#4c8ee0]`}
                >
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-transparent focus:border-[#4c8ee0] focus:ring-0 outline-none transition-all duration-300 placeholder-transparent"
                  placeholder="Email"
                  required
                />
                <label
                  className={`absolute left-2 -top-2.5 bg-white px-2 text-sm transition-all duration-300 
                  ${focusedField === "email" || formData.email
                      ? "text-[#4c8ee0]"
                      : "text-gray-500"
                    }
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                  peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-[#4c8ee0]`}
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows="4"
                  className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-transparent focus:border-[#4c8ee0] focus:ring-0 outline-none transition-all duration-300 resize-none placeholder-transparent"
                  placeholder="Mesaj"
                  required
                ></textarea>
                <label
                  className={`absolute left-2 -top-2.5 bg-white px-2 text-sm transition-all duration-300 
                  ${focusedField === "message" || formData.message
                      ? "text-[#4c8ee0]"
                      : "text-gray-500"
                    }
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                  peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-[#4c8ee0]`}
                >
                  Message
                </label>
              </div>

              {/* Animated Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-[#4c8ee0] text-white font-medium py-4 px-6 rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#4c8ee0]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#4c8ee0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send message
                      <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>

        {/* Modern Floating Alert */}
        {showAlert && (
          <div className="fixed bottom-4 right-4">
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-3 transform hover:scale-105 transition-all duration-300 border-2 border-[#4c8ee0]/20">
              <div className="bg-[#4c8ee0]/10 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-[#4c8ee0]" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Message sent successfully!
                </p>
                <p className="text-sm text-gray-500">
                  We will contact you soon.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}