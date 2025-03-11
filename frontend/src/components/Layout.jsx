import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Afișează Navbar doar dacă nu suntem pe /login sau /register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}

      {/* Conținutul principal al paginii */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Afișează Footer doar dacă nu suntem pe /login sau /register */}
    </div>
  );
};

export default Layout;
