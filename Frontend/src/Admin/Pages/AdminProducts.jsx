import React, { useEffect, useContext, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import AdminNavbar from "../Components/AdminNavbar";

const AdminProducts = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    sizes: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await fetch("https://western-ivy.onrender.com/api/products");
      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const addProduct = async () => {

    try {

      await fetch("https://western-ivy.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          sizes: formData.sizes
            ? formData.sizes.split(",").map(s => s.trim()).filter(Boolean)
            : []
        })
      });
      setShowAddForm(false);

      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
        stock: "",
        sizes: ""
      });

      fetchProducts();

    } catch (error) {
      console.error(error);
    }

  };

  const startEdit = (product) => {

    setEditingId(product._id);

    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      sizes: product.sizes?.join(",") || "",
      description: product.description
    });

  };

  const updateProduct = async (id) => {

    try {

      await fetch(`https://western-ivy.onrender.com/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          sizes: formData.sizes
            ? formData.sizes.split(",").map(s => s.trim()).filter(Boolean)
            : []
        })
      });

      setEditingId(null);
      fetchProducts();

    } catch (error) {
      console.error(error);
    }

  };

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) return;

    try {

      await fetch(`https://western-ivy.onrender.com/api/products/${id}`, {
        method: "DELETE"
      });

      setProducts(products.filter(p => p._id !== id));

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-50
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300
      `}>
        <AdminSidebar />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 overflow-y-auto">

        <AdminNavbar toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

            <h2 className="text-xl sm:text-2xl font-semibold">
              Product Management
            </h2>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm w-full sm:w-auto"
            >
              {showAddForm ? "Close" : "Add Product"}
            </button>

          </div>

          {showAddForm && (

            <div className="bg-white shadow rounded p-4 sm:p-6 mb-6">

              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Add Product
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
                <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 rounded" />
                <input name="image" placeholder="/assets/men/example.png" value={formData.image} onChange={handleChange} className="border p-2 rounded" />
                <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 rounded" />
                <input name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="border p-2 rounded" />
                <input name="sizes" placeholder="Sizes (e.g. S,M,L)" value={formData.sizes} onChange={handleChange} className="border p-2 rounded" />

                <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded sm:col-span-2" />

                <button
                  onClick={addProduct}
                  className="bg-green-600 text-white py-2 rounded sm:col-span-2"
                >
                  Add Product
                </button>

              </div>

            </div>

          )}

          <div className="bg-white shadow rounded-lg overflow-x-auto">

            {loading ? (
              <div className="p-6 text-gray-500">
                Loading products...
              </div>
            ) : (

              <table className="min-w-[800px] w-full text-sm">

                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-2 sm:p-4 text-left">Image</th>
                    <th className="p-2 sm:p-4 text-left">Product</th>
                    <th className="p-2 sm:p-4 text-left">Category</th>
                    <th className="p-2 sm:p-4 text-left">Price</th>
                    <th className="p-2 sm:p-4 text-left">Stock</th>
                    <th className="p-2 sm:p-4 text-left">Description</th>
                    <th className="p-2 sm:p-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map(product => (
                    <React.Fragment key={product._id}>
                      <tr className="border-b hover:bg-gray-50">

                        <td className="p-2 sm:p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded"
                          />
                        </td>

                        <td className="p-2 sm:p-4 font-medium">
                          {product.name}
                        </td>

                        <td className="p-2 sm:p-4">
                          {product.category}
                        </td>

                        <td className="p-2 sm:p-4">
                          ₹{product.price}
                        </td>

                        <td className="p-2 sm:p-4">
                          {product.stock}
                        </td>

                        <td className="p-2 sm:p-4 text-gray-600 max-w-xs truncate">
                          {product.description}
                        </td>

                        <td className="p-2 sm:p-4 flex flex-wrap gap-2">

                          <button
                            onClick={() => startEdit(product)}
                            className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                      {editingId === product._id && (

                        <tr className="bg-gray-50">

                          <td colSpan="7" className="p-4 sm:p-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                              <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
                              <input name="price" value={formData.price} onChange={handleChange} className="border p-2 rounded" />
                              <input name="image" value={formData.image} onChange={handleChange} className="border p-2 rounded" />
                              <input name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded" />
                              <input name="stock" value={formData.stock} onChange={handleChange} className="border p-2 rounded" />
                              <input name="sizes" value={formData.sizes} onChange={handleChange} className="border p-2 rounded" />

                              <input name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded sm:col-span-2" />

                              <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-3">

                                <button
                                  onClick={() => updateProduct(product._id)}
                                  className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                  Save
                                </button>

                                <button
                                  onClick={() => setEditingId(null)}
                                  className="bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                  Cancel
                                </button>

                              </div>

                            </div>

                          </td>

                        </tr>

                      )}

                    </React.Fragment>
                  ))}
                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminProducts;