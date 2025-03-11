import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/client";
import backgroundVideo from "../assets/sky-cloud-video.mp4"; // Asigură-te că ai calea corectă

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before submitting
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");

    // Validare câmpuri
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Parolele nu se potrivesc.");
      return;
    }

    if (!formData.firstName) {
      setFirstNameError("Te rog completează prenumele.");
      return;
    }
    if (!formData.lastName) {
      setLastNameError("Te rog completează numele.");
      return;
    }
    if (!formData.email) {
      setEmailError("Te rog completează emailul.");
      return;
    }
    if (!formData.password) {
      setPasswordError("Te rog completează parola.");
      return;
    }

    try {
      // Obține CSRF token-ul
      await api.get("/sanctum/csrf-cookie");

      // Trimite cererea de înregistrare
      const response = await api.post("/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword, // Asigură-te că folosești `password_confirmation` în loc de `confirmPassword`
      });

      // Salvează datele utilizatorului și token-ul în localStorage
      console.log("Registration successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Salvează utilizatorul în localStorage

      // Redirecționează utilizatorul la pagina principală
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      // Verifică dacă există un mesaj de eroare din backend
      setGeneralError(error.response?.data?.message || "Înregistrarea a eșuat.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-auto py-10 px-4 lg:px-0">
      {/* Fundal video */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 bg-white bg-opacity-80 p-6 sm:p-10 rounded-3xl shadow-lg max-w-md md:max-w-lg lg:max-w-xl w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#003366] mb-4 md:mb-6">
          Welcome To ZeFlyra!
        </h2>
        <p className="text-center text-lg md:text-2xl text-gray-500 mb-6 md:mb-8">
          Let's create your account!
        </p>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full">
              <label htmlFor="firstName" className="block text-lg font-medium text-[#003366] ml-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {firstNameError && <div className="text-lg text-red-500 mt-1 ml-1">{firstNameError}</div>}
            </div>

            <div className="w-full mt-4 md:mt-0">
              <label htmlFor="lastName" className="block text-lg font-medium text-[#003366] ml-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {lastNameError && <div className="text-lg text-red-500 mt-1 ml-1">{lastNameError}</div>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-[#003366] ml-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && <div className="text-lg text-red-500 mt-1 ml-1">{emailError}</div>}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-[#003366] ml-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordError && <div className="text-lg text-red-500 mt-1 ml-1">{passwordError}</div>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-[#003366] ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {confirmPasswordError && <div className="text-lg text-red-500 mt-1 ml-1">{confirmPasswordError}</div>}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full py-3 bg-[#003366] text-white font-semibold text-lg rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>

          {generalError && <div className="text-lg text-red-500 mt-2 text-center">{generalError}</div>}

          <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
            <p className="text-gray-600">Do you have an account?</p>
            <Link to="/login" className="ml-2 underline text-[#003366] cursor-pointer hover:text-indigo-700">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
