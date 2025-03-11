import { Link } from "react-router-dom";
import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-primary text-primary-content p-10 bg-[#4c8ee0] fixed left-0 right-0">
      <aside>
        <div className="font-bold text-2xl md:text-3xl">
          <p>
            Ze<span className="text-[#003366]">Flyra</span>
          </p>
        </div>
        <p>Copyright © {new Date().getFullYear()} - Oros Razvan-Andrei</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4 mt-10 text-lg font-bold">
          <Link to="/destinations" className="text-white">
            Destination
          </Link>

          <Link to="/specialoofers" className="text-white">
            Special Offers
          </Link>

          <Link to="/aboutus" className="text-white">
            About Us
          </Link>

          <Link to="/contact" className="text-white">
            Contact
          </Link>
        </div>
      </nav>
    </footer>
  );
}
