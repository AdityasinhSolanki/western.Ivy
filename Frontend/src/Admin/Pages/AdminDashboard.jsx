import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import AdminNavbar from "../Components/AdminNavbar";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: []
  });

  useEffect(() => {

    async function fetchDashboard() {

      try {
        const res = await fetch("http://localhost:5050/api/products");
        const products = await res.json();

        setStats(prev => ({
          ...prev,
          totalProducts: products.length
        }));

      } catch (error) {
        console.error("Products fetch error:", error);
      }

      try {

        const token = localStorage.getItem("token");

        const ordersRes = await fetch("http://localhost:5050/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const orders = await ordersRes.json();

        setStats(prev => ({
          ...prev,
          totalOrders: Array.isArray(orders) ? orders.length : 0,
          recentOrders: Array.isArray(orders) ? orders.slice(0, 5) : []
        }));

      } catch (error) {
        console.error("Orders fetch error:", error);
      }

    }

    fetchDashboard();

  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      <AdminSidebar />

      <div className="flex-1 overflow-y-auto">

        <AdminNavbar />

        <div className="p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Admin Dashboard
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-10">

            <div className="bg-white p-6 shadow rounded">
              <p className="text-gray-500 text-sm">Products</p>
              <h3 className="text-3xl font-bold">
                {stats.totalProducts}
              </h3>
            </div>

            <div className="bg-white p-6 shadow rounded">
              <p className="text-gray-500 text-sm">Orders</p>
              <h3 className="text-3xl font-bold">
                {stats.totalOrders}
              </h3>
            </div>

            <div className="bg-white p-6 shadow rounded">
              <p className="text-gray-500 text-sm">Users</p>
              <h3 className="text-3xl font-bold">
                {stats.totalUsers}
              </h3>
            </div>

          </div>

          {/* Recent Orders */}

          <div className="bg-white shadow rounded-lg p-6">

            <h3 className="text-lg font-semibold mb-4">
              Recent Orders
            </h3>

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>

                {stats.recentOrders.map(order => {

                  const item = order.items?.[0];
                  const imagePath = item?.image
                    ? item.image.replace("/src", "")
                    : "";

                  return (
                    <tr key={order._id} className="border-b">

                      <td className="p-3">
                        {imagePath && (
                          <img
                            src={`http://localhost:5173${imagePath}`}
                            alt={item?.name}
                            className="w-12 h-12 object-contain rounded"
                          />
                        )}
                      </td>

                      <td className="p-3">
                        {item?.name}
                      </td>

                      <td className="p-3">
                        {order.shippingAddress?.fullName}
                      </td>

                      <td className="p-3">
                        ₹{order.totalPrice}
                      </td>

                      <td className="p-3 text-yellow-600">
                        {order.status}
                      </td>

                    </tr>
                  );

                })}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;