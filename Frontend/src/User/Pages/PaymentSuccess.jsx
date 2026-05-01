import React from "react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const premiumPlan = location.state?.premiumPlan;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">

      {premiumPlan ? (
        <>
          <h1 className="text-3xl font-semibold mb-4 text-green-600">
            Premium Activated 🎉
          </h1>

          <p className="text-gray-600 mb-6 text-center max-w-md">
            Your {premiumPlan} membership is now active.
            Enjoy exclusive benefits and premium perks.
          </p>

          <Link
            to="/profile"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Go To Profile
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold mb-4 text-green-600">
            Payment Successful 🎉
          </h1>

          <p className="text-gray-600 mb-6">
            Your order has been placed successfully.
          </p>

          <Link
            to="/profile"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            View My Orders
          </Link>
        </>
      )}

    </div>
  );
};

export default PaymentSuccess;