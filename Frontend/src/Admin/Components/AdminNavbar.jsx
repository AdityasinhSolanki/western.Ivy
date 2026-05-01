import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleVisitSite = () => {
    window.location.href = "/";
  };

  return (
    <div className="w-full bg-white border-b px-4 sm:px-6 py-4 flex justify-between items-center">

      <div className="flex items-center gap-3">

        {/* ✅ Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-xl"
        >
          ☰
        </button>

        <h1 className="text-base sm:text-lg font-semibold">
          Western Ivy Admin
        </h1>

      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">

        <button
          onClick={handleVisitSite}
          className="text-gray-600 hover:text-black transition"
        >
          Visit Site
        </button>

        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default AdminNavbar;