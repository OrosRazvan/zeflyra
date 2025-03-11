import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { UserContext } from "../context/UserContext";
import { User, Ticket, Heart, LogOut, Settings } from "lucide-react";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle navigation click - closes menus and scrolls to top
  const handleNavClick = () => {
    setIsOpen(false);
    setDropDown(false);
    scrollToTop();
  };

  // Scroll to top when route changes
  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  const toggleDropdown = () => {
    setDropDown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed w-full top-0 z-30 bg-[#4c8ee0]">
      <nav className="container mx-auto flex items-center justify-between p-6 md:px-8 md:py-6 lg:p-7 lg:px-16 xl:px-14">
        {/* Brand Logo */}
        <div className="font-bold text-2xl md:text-3xl">
          <p>
            Ze<span className="text-[#003366]">Flyra</span>
          </p>
        </div>

        {/* Links for larger screens */}
        <ul className="hidden md:flex space-x-4 md:text-sm lg:space-x-10 lg:text-lg font-medium text-white">
          <li className="hover:text-white hover:bg-[#003366] px-2 py-1 rounded-lg transition-all duration-300">
            <Link to="/" onClick={handleNavClick}>
              Home
            </Link>
          </li>
          <li className="hover:text-white hover:bg-[#003366] px-2 py-1 rounded-lg transition-all duration-300">
            <Link to="/destinations" onClick={handleNavClick}>
              Destinations
            </Link>
          </li>
          <li className="hover:text-white hover:bg-[#003366] px-2 py-1 rounded-lg transition-all duration-300">
            <Link to="/specialoffers" onClick={handleNavClick}>
              Special Offers
            </Link>
          </li>
          <li className="hover:text-white hover:bg-[#003366] px-2 py-1 rounded-lg transition-all duration-300">
            <Link to="/aboutus" onClick={handleNavClick}>
              About Us
            </Link>
          </li>
          <li className="hover:text-white hover:bg-[#003366] px-2 py-1 rounded-lg transition-all duration-300">
            <Link to="/contact" onClick={handleNavClick}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Profile (for larger screens) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="p-2 text-white">
              <FiUser className="h-6 w-6" />
            </button>

            {dropDown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                {user ? (
                  <div className="divide-y divide-gray-100">
                    {/* User Info Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                      <span className="block text-lg font-semibold text-white">
                        {user.first_name} {user.last_name}
                      </span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                        onClick={handleNavClick}
                      >
                        <User size={18} className="mr-3 text-blue-500" />
                        <span>Profile</span>
                      </Link>

                      <Link
                        to="/mytickets"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                        onClick={handleNavClick}
                      >
                        <Ticket size={18} className="mr-3 text-blue-500" />
                        <span>My Tickets</span>
                      </Link>
                    </nav>

                    {/* Logout Button */}
                    <div className="py-2">
                      <Link
                      to="/login"
                        onClick={() => {
                          logoutUser();
                          handleNavClick();
                        }}
                        className="flex items-center w-full px-6 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut size={18} className="mr-3" />
                        <span className="font-medium">Logout</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="py-2">
                    <Link
                      to="/login"
                      className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                      onClick={handleNavClick}
                    >
                      <User size={18} className="mr-3 text-blue-500" />
                      <span>Login</span>
                    </Link>

                    <Link
                      to="/register"
                      className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                      onClick={handleNavClick}
                    >
                      <Settings size={18} className="mr-3 text-blue-500" />
                      <span>Register</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-[#003366] hover:text-white transition-all duration-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden shadow-md text-white p-6 space-y-4 h-screen w-screen bg-[#84b5ed]">
          <li className="mb-16">
            <a
              href="#"
              className="text-gray-800 flex flex-col justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-12 w-12"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="mt-2 text-xl text-[#003366] font-bold">
                {user ? `${user.first_name} ${user.last_name}` : "Guest"}
              </p>
            </a>
          </li>
          <li className="hover:bg-[#003366] hover:text-white px-3 py-1 rounded-lg transition-all duration-300 text-lg">
            <Link to="/" onClick={handleNavClick}>
              Home
            </Link>
            <hr className="mt-1 bg-black" />
          </li>
          <li className="hover:bg-[#003366] hover:text-white px-3 py-1 rounded-lg transition-all duration-300 text-lg">
            <Link to="/destinations" onClick={handleNavClick}>
              Destinations
            </Link>
            <hr className="mt-1 bg-black" />
          </li>
          <li className="hover:bg-[#003366] hover:text-white px-3 py-1 rounded-lg transition-all duration-300 text-lg">
            <Link to="/specialoffers" onClick={handleNavClick}>
              Special Offers
            </Link>
            <hr className="mt-1 bg-black" />
          </li>
          <li className="hover:bg-[#003366] hover:text-white px-3 py-1 rounded-lg transition-all duration-300 text-lg">
            <Link to="/aboutus" onClick={handleNavClick}>
              About Us
            </Link>
            <hr className="mt-1 bg-black" />
          </li>
          <li className="hover:bg-[#003366] hover:text-white px-3 py-1 rounded-lg transition-all duration-300 text-lg">
            <Link to="/contact" onClick={handleNavClick}>
              Contact
            </Link>
          </li>
          {user && (
            <>
              <hr className=" ml-2 mr-2 mt-1 bg-black" />

              <Link
                to="/profile"
                className="flex items-center text-white hover:bg-[#003366] px-3 py-1 rounded-lg transition-all duration-300 text-lg"
                onClick={handleNavClick}
              >
                <User size={18} className="mr-3 text-white" />
                <span>Profile</span>
              </Link>
              <hr className=" ml-2 mr-2 mt-1 bg-black" />
              <Link
                to="/mytickets"
                className="flex items-center text-white hover:bg-[#003366] px-3 py-1 rounded-lg transition-all duration-300 text-lg"
                onClick={handleNavClick}
              >
                <Ticket size={18} className="mr-3 text-white" />
                <span>My Tickets</span>
              </Link>
              <li className="text-red-600 transition-all duration-300 text-lg font-bold absolute bottom-[88px] hover:bg-red-600 hover:text-white px-3 py-1 rounded-lg">
                <hr className="mb-1 bg-black w-80" />
                <Link
                  onClick={() => {
                    logoutUser();
                    handleNavClick();
                  }}
                  to="/login"
                >
                  Log Out
                </Link>
              </li>
            </>
          )}
        </ul>
      )}

      <hr className="blur-[1px]" />
    </header>
  );
};

export default Navbar;
