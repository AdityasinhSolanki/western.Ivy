import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {

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
    <div className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">

      <h1 className="text-lg font-semibold">
        Western Ivy Admin
      </h1>

      <div className="flex items-center gap-6 text-sm">

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