import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {

  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5050/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        const foundOrder = data.find(o => o._id === id);

        setOrder(foundOrder);

      } catch (error) {
        console.error(error);
      }

    };

    fetchOrder();

  }, [id]);

  if (!order) {
    return (
      <div className="p-10 md:p-20 text-center">
        <h2 className="text-lg md:text-xl">Order not found.</h2>
      </div>
    );
  }

  const steps = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
  const currentStep = steps.indexOf(order.status);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-12 min-h-screen bg-gray-50">

      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Order Details
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Order #{order._id.slice(-6)} • {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">

        <div className="md:col-span-2 bg-white p-5 md:p-6 rounded-xl shadow-sm">

          <h2 className="font-semibold mb-6 text-base md:text-lg">
            Order Status
          </h2>

          <div className="relative flex justify-between items-center">

            {steps.map((step, index) => (
              <div key={step} className="flex-1 text-center relative">

                {index !== steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-1 
                      ${index < currentStep ? "bg-black" : "bg-gray-300"}
                    `}
                  />
                )}

                <div
                  className={`relative z-10 w-7 h-7 md:w-8 md:h-8 mx-auto rounded-full flex items-center justify-center text-xs md:text-sm
                    ${index <= currentStep
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-600"
                    }`}
                >
                  {index + 1}
                </div>

                <p className="text-[11px] md:text-sm mt-2 md:mt-3">
                  {step}
                </p>

              </div>
            ))}

          </div>

        </div>

        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm h-fit">

          <h2 className="font-semibold mb-6 text-base md:text-lg">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.totalPrice - 99}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹99</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>

          </div>

        </div>

      </div>

      <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm">

        <h2 className="font-semibold mb-6 md:mb-8 text-base md:text-lg">
          Items in this Order
        </h2>

        <div className="space-y-6">

          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-6 gap-4"
            >

              <div className="flex items-center gap-4 md:gap-6">

                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 flex items-center justify-center rounded">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="font-medium text-sm md:text-base">
                    {item.name}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-xs md:text-sm text-gray-500">
                    Price: ₹{item.price}
                  </p>
                </div>

              </div>

              <div className="text-left sm:text-right">
                <p className="font-semibold text-sm md:text-base">
                  ₹{item.price * item.quantity}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;