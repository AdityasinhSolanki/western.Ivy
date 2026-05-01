import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-60 h-screen bg-black text-white p-6">

      <h2 className="text-2xl font-bold mb-10">
        Admin
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          to="/admin/dashboard"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="hover:text-gray-300"
        >
          Products
        </Link>

        <Link
          to="/admin/orders"
          className="hover:text-gray-300"
        >
          Orders
        </Link>

      </nav>
    </div>
  );
};

export default AdminSidebar;