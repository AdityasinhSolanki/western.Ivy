import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PremiumContext } from "../../Context/PremiumContext";
import { CartContext } from "../../Context/CartContext";

const Profile = () => {

  const { isPremium } = useContext(PremiumContext);
  const { setCartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">
          Please login first
        </h1>
      </div>
    );
  }

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setCartItems([]);

    navigate("/login");
  };

  return (

    <div className="max-w-4xl mx-auto mt-10 p-6">

      <h1 className="text-2xl font-semibold mb-6">
        My Profile
      </h1>

      {/* Personal Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">

        <h2 className="text-lg font-medium mb-4">
          Personal Information
        </h2>

        <div className="flex items-center gap-3">

          <p className="font-medium">
            Name: {user.name}
          </p>

          {isPremium && (
            <span className="px-2 py-1 text-xs bg-black text-white rounded">
              PREMIUM
            </span>
          )}

        </div>

        <p className="mt-2 text-gray-600">
          Email: {user.email}
        </p>

      </div>

      {/* Orders */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <Link
          to="/orders"
          className="block text-lg font-medium hover:text-blue-600 transition"
        >
          My Orders →
        </Link>
      </div>

      {/* Address */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">

        <h2 className="text-lg font-medium mb-2">
          Saved Address
        </h2>

        {user.address ? (
          <div className="text-gray-600 space-y-1">
            <p>{user.address.fullName}</p>
            <p>{user.address.phone}</p>
            <p>{user.address.address}</p>
            <p>{user.address.city}, {user.address.state}</p>
            <p>{user.address.pincode}</p>
          </div>
        ) : (
          <p>No address saved yet.</p>
        )}

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Logout
      </button>

    </div>
  );
};

export default Profile;