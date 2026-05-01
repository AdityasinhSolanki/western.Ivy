import React, { useEffect, useContext, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import AdminNavbar from "../Components/AdminNavbar";
const AdminProducts = () => {

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

      const res = await fetch("http://localhost:5050/api/products");
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

      await fetch("http://localhost:5050/api/products", {
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
      sizes: product.sizes?.join(",") || "",  // 🔥 ADD THIS LINE
      description: product.description
    });

  };

  const updateProduct = async (id) => {

    try {

      await fetch(`http://localhost:5050/api/products/${id}`, {
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

      await fetch(`http://localhost:5050/api/products/${id}`, {
        method: "DELETE"
      });

      setProducts(products.filter(p => p._id !== id));

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      <AdminSidebar />

      <div className="flex-1 overflow-y-auto">

        <AdminNavbar />

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-semibold">
              Product Management
            </h2>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm"            >
              {showAddForm ? "Close" : "Add Product"}
            </button>

          </div>

          {showAddForm && (

            <div className="bg-white shadow rounded p-6 mb-6">

              <h3 className="text-lg font-semibold mb-4">
                Add Product
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <input
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="image"
                  placeholder="/assets/men/example.png"
                  value={formData.image}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
                <input
                  name="sizes"
                  placeholder="Sizes (e.g. S,M,L)"
                  value={formData.sizes}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
                <input
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2 rounded col-span-2"
                />

                <button
                  onClick={addProduct}
                  className="bg-green-600 text-white py-2 rounded col-span-2"
                >
                  Add Product
                </button>

              </div>

            </div>

          )}

          <div className="bg-white shadow rounded-lg overflow-hidden">

            {loading ? (

              <div className="p-6 text-gray-500">
                Loading products...
              </div>

            ) : (

              <table className="w-full text-sm">

                <thead className="bg-gray-50 border-b">

                  <tr>

                    <th className="p-4">Image</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {products.map(product => (

                    <React.Fragment key={product._id}>

                      <tr className="border-b hover:bg-gray-50">

                        <td className="p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 object-contain rounded"
                          />
                        </td>

                        <td className="p-4 font-medium">
                          {product.name}
                        </td>

                        <td className="p-4">
                          {product.category}
                        </td>

                        <td className="p-4">
                          ₹{product.price}
                        </td>

                        <td className="p-4">
                          {product.stock}
                        </td>

                        <td className="p-4 text-gray-600 max-w-xs truncate">
                          {product.description}
                        </td>

                        <td className="p-4 flex gap-2">

                          <button
                            onClick={() => startEdit(product)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                      {editingId === product._id && (

                        <tr className="bg-gray-50">

                          <td colSpan="7" className="p-6">

                            <div className="grid grid-cols-2 gap-4">

                              <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
                              <input name="price" value={formData.price} onChange={handleChange} className="border p-2 rounded" />
                              <input name="image" value={formData.image} onChange={handleChange} className="border p-2 rounded" />
                              <input name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded" />
                              <input name="stock" value={formData.stock} onChange={handleChange} className="border p-2 rounded" />
                              <input
                                name="sizes"
                                placeholder="Sizes (e.g. S,M,L)"
                                value={formData.sizes}
                                onChange={handleChange}
                                className="border p-2 rounded"
                              />
                              <input name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded col-span-2" />

                              <div className="col-span-2 flex gap-3">

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