import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PremiumContext } from "../../Context/PremiumContext";
const Premium = () => {
  const { isPremium } = useContext(PremiumContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 lg:px-16 py-16">

      {/* HEADER */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
          Western Ivy Premium
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Designed for our most loyal customers.  
          Unlock savings, priority perks, and exclusive drops.
        </p>
      </div>

      {/* PLANS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* MONTHLY PLAN */}
        <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-200 flex flex-col justify-between transition hover:shadow-xl">

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Monthly Membership
            </h2>

            <div className="mb-8">
              <span className="text-4xl font-bold">₹199</span>
              <span className="text-gray-500 ml-2">/ month</span>
            </div>

            <ul className="space-y-4 text-gray-600 text-sm sm:text-base">
              <li>✔ Free Shipping on all orders</li>
              <li>✔ Extra 10% discount sitewide</li>
              <li>✔ Premium profile badge</li>
              <li>✔ Early access to new drops</li>
            </ul>
          </div>

          <div className="mt-10">
            {isPremium ? (
              <div className="text-green-600 font-medium text-center">
                Your Membership is Active
              </div>
            ) : (
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { premiumPlan: "monthly", price: 199 }
                  })
                }
                className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Start Monthly Plan
              </button>
            )}
          </div>
        </div>

        {/* YEARLY PLAN */}
        <div className="bg-black text-white rounded-3xl shadow-2xl p-8 relative flex flex-col justify-between transition hover:scale-[1.02]">

          <div className="absolute top-5 right-5 text-xs bg-white text-black px-3 py-1 rounded-full font-medium">
            MOST POPULAR
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">
              Yearly Membership
            </h2>

            <div className="mb-2">
              <span className="text-4xl font-bold">₹1499</span>
              <span className="text-gray-300 ml-2">/ year</span>
            </div>

            <p className="text-sm text-gray-400 mb-8">
              Save ₹889 compared to monthly payments
            </p>

            <ul className="space-y-4 text-gray-200 text-sm sm:text-base">
              <li>✔ Free Shipping on all orders</li>
              <li>✔ Extra 10% discount sitewide</li>
              <li>✔ Premium profile badge</li>
              <li>✔ Early access to new drops</li>
              <li>✔ Priority customer support</li>
            </ul>
          </div>

          <div className="mt-10">
            {isPremium ? (
              <div className="text-green-400 font-medium text-center">
                Your Membership is Active
              </div>
            ) : (
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { premiumPlan: "yearly", price: 1499 }
                  })
                }
                className="w-full bg-white text-black py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Start Yearly Plan
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Premium;