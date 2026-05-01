import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { PremiumContext } from "../../Context/PremiumContext";
import { ToastContext } from "../../Context/ToastContext";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { activatePremium, isPremium } = useContext(PremiumContext);
  const { showToast } = useContext(ToastContext);

  const navigate = useNavigate();
  const location = useLocation();

  const premiumPlan = location.state?.premiumPlan;
  const premiumPrice = location.state?.price;

  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const rawSubtotal = premiumPlan
    ? premiumPrice
    : cartItems.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
      );

  const discount = isPremium && !premiumPlan ? rawSubtotal * 0.1 : 0;

  const subtotal = rawSubtotal - discount;

  const shipping = premiumPlan ? 0 : isPremium ? 0 : subtotal > 0 ? 99 : 0;

  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!premiumPlan) {
      const { fullName, phone, address, city, state, pincode } = formData;

      if (!fullName || !phone || !address || !city || !state || !pincode) {
        showToast("Please fill all required fields.", "error");
        return false;
      }

      if (phone.length < 10) {
        showToast("Enter valid phone number.", "error");
        return false;
      }

      if (pincode.length < 6) {
        showToast("Enter valid pincode.", "error");
        return false;
      }
    }

    if (!method) {
      showToast("Please select a payment method.", "error");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!premiumPlan && cartItems.length === 0) return;
    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (premiumPlan) {
        await fetch("http://localhost:5050/api/premium/activate", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
          user.isPremium = true;
          localStorage.setItem("user", JSON.stringify(user));
        }

        activatePremium();

        showToast("Premium membership activated!", "success");

        navigate("/payment-success", { state: { premiumPlan } });

        setLoading(false);
        return;
      }

      const orderData = {
        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image,
        })),
        totalPrice: total,
        paymentMethod: method,
        shippingAddress: formData,
      };

      const res = await fetch("http://localhost:5050/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Order failed", "error");
        setLoading(false);
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        user.address = formData;
        localStorage.setItem("user", JSON.stringify(user));
      }

      setCartItems([]);

      showToast("Order placed successfully!", "success");

      navigate("/payment-success", {
        state: { premiumPlan },
      });

    } catch (error) {
      console.error(error);
      showToast("Server error", "error");
    }

    setLoading(false);
  };

  return (
    <div className="px-4 sm:px-8 lg:px-20 py-12 min-h-screen bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-10 text-center">
        Checkout
      </h1>

      <div
        className={
          premiumPlan
            ? "flex justify-center"
            : "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        }
      >
        {!premiumPlan && (
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-6">
              Shipping Details
            </h2>

            <div className="space-y-4">
              <input type="text" name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg" />
              <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg" />
              <input type="email" name="email" placeholder="Email (optional)" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg" />
              <input type="text" name="address" placeholder="Address *" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg" />

              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="city" placeholder="City *" value={formData.city} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg" />
                <input type="text" name="state" placeholder="State *" value={formData.state} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg" />
              </div>

              <input type="text" name="pincode" placeholder="Pincode *" value={formData.pincode} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg" />
            </div>
          </div>
        )}

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm h-fit">
          <h2 className="text-lg sm:text-xl font-semibold mb-6">
            {premiumPlan ? "Premium Membership Checkout" : "Order Summary"}
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{rawSubtotal}</span>
            </div>

            {isPremium && discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Premium Discount</span>
                <span>-₹{discount.toFixed(0)}</span>
              </div>
            )}

            {!premiumPlan && (
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
            )}

            <div className="border-t pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-4">
              Select Payment Method *
            </h3>

            <div className="space-y-3">
              {["UPI", "Card", "COD"].map((option) => (
                <div
                  key={option}
                  onClick={() => setMethod(option)}
                  className={`border rounded-xl p-4 cursor-pointer ${
                    method === option
                      ? "border-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-black text-white py-3 mt-6 rounded-lg"
          >
            {loading
              ? "Processing..."
              : premiumPlan
              ? "Activate Membership"
              : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;