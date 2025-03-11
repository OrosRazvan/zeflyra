import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Importă contextul
import axios from "axios";
import React from "react";
import backgroundVideo from "../assets/sky-cloud-video.mp4"; // Importă video-ul de fundal
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext); // Obține funcția loginUser din context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validateInputData = async (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    let valid = true;

    // Validate email
    if(formData.email.trim() === "") {
      setEmailError("Email is required!");
      valid = false;
    } else if(!validateEmail(formData.email)) {
      setEmailError("Email format is incorrect!");
      valid = false;
    }

    // Validate password
    if(formData.password === "") {
      setPasswordError("Password is required!");
      valid = false;
    } else if(formData.password.length < 6 || formData.password.length > 20) {
      setPasswordError("Password must be between 6 and 20 characters!");
      valid = false;
    }

    // If validations pass, attempt login
    if (valid) {
      try {
        // Obține CSRF token-ul
        await axios.get("http://localhost:8000/api/sanctum/csrf-cookie");

        // Trimite cererea de login
        const response = await axios.post(
          "http://localhost:8000/api/login",
          formData
        );

        // Actualizează contextul și localStorage
        loginUser(response.data.user, response.data.token);

        // Redirecționează utilizatorul la pagina principală
        navigate("/");
      } catch (error) {
        setGeneralError(error.response?.data?.message || "Login failed");
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Video de fundal */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Formularul Login */}
      <div className="relative z-10 bg-white bg-opacity-80 p-10 rounded-3xl shadow-[0_10px_20px_rgba(0,0,0,0.15),0_20px_40px_rgba(0,0,0,0.10),0_30px_60px_rgba(0,0,0,0.05)] max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-center text-[#003366] mb-6">
          Welcome Back!
        </h2>

        {generalError && (
          <div className="text-red-500 text-center mb-4">{generalError}</div>
        )}

        <form className="space-y-6" onSubmit={validateInputData}>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-[#003366] ml-5"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {emailError && <div className="text-lg text-red-500 mt-1 ml-1">{emailError}</div>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-[#003366] ml-5"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {passwordError && <div className="text-lg text-red-500 mt-1 ml-1">{passwordError}</div>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#003366] text-white font-semibold text-lg rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>

          <div className="flex flex-row justify-center">
            <p className="text-gray-600">Don't have an account?</p>
            <Link to="/register" className="ml-2 underline text-[#003366] cursor-pointer hover:text-indigo-700">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
