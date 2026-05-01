import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { PremiumContext } from "../../Context/PremiumContext";
import { ToastContext } from "../../Context/ToastContext";

const Cart = () => {
  const { isPremium } = useContext(PremiumContext);
  const { showToast } = useContext(ToastContext);
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = isPremium ? subtotal * 0.1 : 0;

  const shipping = isPremium ? 0 : 99;

  const total = subtotal - discount + shipping;

  return (
    <div className="px-4 sm:px-8 lg:px-20 py-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold mb-10">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* CART ITEMS */}
          <div className="col-span-2 space-y-6">

            {cartItems.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex flex-col sm:flex-row justify-between sm:items-center bg-white p-4 sm:p-6 rounded-xl shadow-sm gap-6"
              >

                <div className="flex items-center gap-6">

                  {/* IMAGE */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* DETAILS */}
                  <div>
                    <h2 className="font-medium text-lg">
                      {item.name}
                    </h2>

                    {/* SIZE */}
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size}
                    </p>

                    <p className="text-gray-600 mt-2">
                      ₹{item.price}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-4 mt-4">

                      <button
                        onClick={() => decreaseQty(item._id, item.size)}
                        className="px-3 py-1 border rounded"
                      >
                        −
                      </button>

                      <span className="font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id, item.size)}
                        className="px-3 py-1 border rounded"
                      >
                        +
                      </button>

                    </div>
                  </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="text-left sm:text-right">
                  <p className="font-semibold text-lg">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => {
                      removeFromCart(item._id, item.size);
                      showToast("Removed from Cart", "error");
                    }}
                    className="text-red-500 mt-4 hover:underline"
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">

            <h2 className="text-xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-black text-white py-3 mt-6 rounded hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;