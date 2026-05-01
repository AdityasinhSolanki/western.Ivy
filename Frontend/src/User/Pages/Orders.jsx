import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5050/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        setOrders(data);

      } catch (error) {
        console.error(error);
      }

    };

    fetchOrders();

  }, []);

  const cancelOrder = async (orderId) => {

    try {

      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5050/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: "Cancelled" })
      });

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId
            ? { ...order, status: "Cancelled" }
            : order
        )
      );

      toast.success("Order cancelled successfully");

    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel order");
    }

  };

  const confirmCancel = (orderId, e) => {

    e.preventDefault();

    const toastId = toast.info(
      <div className="flex flex-col gap-2">

        <p className="text-sm">Cancel this order?</p>

        <div className="flex gap-2">

          <button
            onClick={() => {
              cancelOrder(orderId);
              toast.dismiss(toastId);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-xs"
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss(toastId)}
            className="bg-gray-300 px-3 py-1 rounded text-xs"
          >
            No
          </button>

        </div>

      </div>,
      { autoClose: false }
    );

  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-6 min-h-screen bg-gray-50">

      <h1 className="text-2xl sm:text-3xl font-semibold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <Link
              key={order._id}
              to={`/order/${order._id}`}
              className="block bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">

                {/* LEFT SIDE */}
                <div className="flex gap-4 sm:gap-6">

                  {/* Product Images */}
                  <div className="flex -space-x-3">
                    {order.items.slice(0, 2).map((item, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded flex items-center justify-center border"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Order Info */}
                  <div>
                    <p className="font-medium text-base sm:text-lg">
                      Order #{order._id.slice(-6)}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-xs sm:text-sm mt-2 text-gray-600">
                      {order.items.length} item(s)
                    </p>
                  </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="text-left sm:text-right">

                  <p className="font-semibold text-base sm:text-lg">
                    ₹{order.totalPrice}
                  </p>

                  <p className={`text-sm mt-1
                    ${order.status === "Processing" ? "text-yellow-600" :
                      order.status === "Shipped" ? "text-blue-600" :
                      order.status === "Delivered" ? "text-green-600" :
                      "text-red-600"}
                  `}>
                    {order.status}
                  </p>

                  {/* ORDER TRACKING */}
                  <div className="flex items-center gap-2 mt-3">

                    <div className={`w-3 h-3 rounded-full ${
                      order.status !== "Cancelled" ? "bg-green-500" : "bg-gray-300"
                    }`} />

                    <div className="w-10 h-[2px] bg-gray-300" />

                    <div className={`w-3 h-3 rounded-full ${
                      order.status === "Processing" ||
                      order.status === "Shipped" ||
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`} />

                    <div className="w-10 h-[2px] bg-gray-300" />

                    <div className={`w-3 h-3 rounded-full ${
                      order.status === "Shipped" ||
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`} />

                    <div className="w-10 h-[2px] bg-gray-300" />

                    <div className={`w-3 h-3 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`} />

                  </div>

                  {order.status === "Processing" && (

                    <button
                      onClick={(e) => confirmCancel(order._id, e)}
                      className="mt-3 text-xs bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel Order
                    </button>

                  )}

                </div>

              </div>

            </Link>

          ))}

        </div>
      )}

    </div>
  );
};

export default Orders;