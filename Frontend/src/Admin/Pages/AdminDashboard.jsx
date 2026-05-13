import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import AdminNavbar from "../Components/AdminNavbar";

const AdminDashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: []
  });

  useEffect(() => {

    async function fetchDashboard() {

      try {
        const res = await fetch("https://western-ivy.onrender.com/api/products");
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

        const ordersRes = await fetch("https://western-ivy.onrender.com/api/orders", {
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

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 h-full w-60 z-50
    transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 transition-transform duration-300
  `}
      >
        <AdminSidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 overflow-y-auto md:ml-60">

        <AdminNavbar toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-4 sm:p-6">

          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Admin Dashboard
          </h2>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">

            <div className="bg-white p-4 sm:p-6 shadow rounded">
              <p className="text-gray-500 text-sm">Products</p>
              <h3 className="text-2xl sm:text-3xl font-bold">
                {stats.totalProducts}
              </h3>
            </div>

            <div className="bg-white p-4 sm:p-6 shadow rounded">
              <p className="text-gray-500 text-sm">Orders</p>
              <h3 className="text-2xl sm:text-3xl font-bold">
                {stats.totalOrders}
              </h3>
            </div>

            <div className="bg-white p-4 sm:p-6 shadow rounded">
              <p className="text-gray-500 text-sm">Users</p>
              <h3 className="text-2xl sm:text-3xl font-bold">
                {stats.totalUsers}
              </h3>
            </div>

          </div>

          {/* Recent Orders */}
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 overflow-x-auto">

            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Recent Orders
            </h3>

            <table className="min-w-[600px] w-full text-sm">

              <thead>
                <tr className="border-b">
                  <th className="p-2 sm:p-3 text-left">Image</th>
                  <th className="p-2 sm:p-3 text-left">Product</th>
                  <th className="p-2 sm:p-3 text-left">Customer</th>
                  <th className="p-2 sm:p-3 text-left">Price</th>
                  <th className="p-2 sm:p-3 text-left">Status</th>
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

                      <td className="p-2 sm:p-3">
                        {imagePath && (
                          <img
                            src={`http://localhost:5173${imagePath}`}
                            alt={item?.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded"
                          />
                        )}
                      </td>

                      <td className="p-2 sm:p-3">{item?.name}</td>

                      <td className="p-2 sm:p-3">
                        {order.shippingAddress?.fullName}
                      </td>

                      <td className="p-2 sm:p-3">
                        ₹{order.totalPrice}
                      </td>

                      <td className="p-2 sm:p-3 text-yellow-600">
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