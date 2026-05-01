import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import AdminNavbar from "../Components/AdminNavbar";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5050/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      }

    } catch (error) {
      console.error(error);
    }

  };

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5050/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      fetchOrders();

    } catch (error) {
      console.error(error);
    }

  };

  const getStatusColor = (status) => {

    if (status === "Processing") return "text-yellow-600";
    if (status === "Shipped") return "text-blue-600";
    if (status === "Delivered") return "text-green-600";
    if (status === "Cancelled") return "text-red-600";

    return "text-gray-600";

  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminNavbar />

        <div className="p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Orders
          </h2>

          <div className="bg-white shadow rounded-lg overflow-hidden">

            <table className="w-full text-sm">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="p-4">Product</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>

                </tr>

              </thead>

              <tbody>

                {orders.map(order => (

                  order.items.map((item, index) => (

                    <tr key={order._id + index} className="border-b hover:bg-gray-50">

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <img
                            src={item.image.replace("/src/assets", "/assets")}
                            alt={item.name}
                            className="w-12 h-12 object-contain bg-gray-100 rounded"
                          />

                          <span className="font-medium">
                            {item.name}
                          </span>

                        </div>

                      </td>

                      <td className="p-4">
                        {item.quantity}
                      </td>

                      <td className="p-4">
                        {order.shippingAddress?.fullName}
                      </td>

                      <td className="p-4 text-gray-600">
                        {order.shippingAddress?.address}, {order.shippingAddress?.city}
                      </td>

                      <td className={`p-4 font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </td>

                      <td className="p-4 flex gap-2">

                        <button
                          onClick={() => updateStatus(order._id, "Shipped")}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Ship
                        </button>

                        <button
                          onClick={() => updateStatus(order._id, "Delivered")}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Delivered
                        </button>

                        <button
                          onClick={() => updateStatus(order._id, "Cancelled")}
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Cancel
                        </button>

                      </td>

                    </tr>

                  ))

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminOrders;