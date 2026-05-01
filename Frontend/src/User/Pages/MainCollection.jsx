import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { ToastContext } from "../../Context/ToastContext";
import { WishlistContext } from "../../Context/wishlistContext"; // ✅ added

const MainProducts = ({ selectedCategory = "all" }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext); // ✅ added
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  const [sortOption, setSortOption] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);


  useEffect(() => {
    fetch("http://localhost:5050/api/products")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);
  let filteredProducts = [...products];

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  if (selectedSize) {
    filteredProducts = filteredProducts.filter((p) => {
      if (!p.sizes) return true; // ✅ don't filter out products with no sizes field
      const sizesArray = Array.isArray(p.sizes)
        ? p.sizes.flatMap(s => s.split(",").map(s => s.trim()).filter(Boolean))
        : typeof p.sizes === "string"
          ? p.sizes.split(",").map(s => s.trim()).filter(Boolean)
          : [];
      return sizesArray.some(s => s.toLowerCase() === selectedSize.toLowerCase());
    });
  }

  if (priceRange === "below1000") {
    filteredProducts = filteredProducts.filter((p) => p.price < 1000);
  }

  if (priceRange === "1000to3000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= 1000 && p.price <= 3000
    );
  }

  if (inStockOnly) {
    filteredProducts = filteredProducts.filter((p) => p.stock > 0);
  }

  if (sortOption === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-8">

      <div className="flex justify-between items-center mb-8">

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="border px-4 py-2 text-sm rounded-md hover:bg-gray-100"
        >
          Filter
        </button>

        <div className="relative">

          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="border px-4 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            Sort By ▾
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded shadow-lg z-20">

              <div
                onClick={() => {
                  setSortOption("lowToHigh");
                  setIsSortOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Price: Low to High
              </div>

              <div
                onClick={() => {
                  setSortOption("highToLow");
                  setIsSortOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Price: High to Low
              </div>

            </div>
          )}

        </div>

      </div>

      <div className="flex gap-8">

        {isFilterOpen && (
          <div className="w-72 border rounded-xl p-5 bg-white shadow-lg h-fit">

            <p className="text-xs text-gray-500 mb-2 uppercase">Size</p>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? "" : size)
                  }
                  className={`h-9 text-sm border rounded-md ${selectedSize === size
                    ? "bg-black text-white"
                    : "hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mb-2 uppercase">Price</p>

            <div className="flex flex-col gap-2 mb-6">

              <button
                onClick={() =>
                  setPriceRange(priceRange === "below1000" ? "" : "below1000")
                }
                className={`border py-2 px-3 text-sm rounded-md text-left ${priceRange === "below1000"
                  ? "bg-black text-white"
                  : "hover:border-black"
                  }`}
              >
                Below ₹1000
              </button>

              <button
                onClick={() =>
                  setPriceRange(priceRange === "1000to3000" ? "" : "1000to3000")
                }
                className={`border py-2 px-3 text-sm rounded-md text-left ${priceRange === "1000to3000"
                  ? "bg-black text-white"
                  : "hover:border-black"
                  }`}
              >
                ₹1000 – ₹3000
              </button>

            </div>

            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`border w-full py-2 text-sm rounded-md mb-4 ${inStockOnly ? "bg-black text-white" : "hover:border-black"
                }`}
            >
              In Stock Only
            </button>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              Apply & Close
            </button>

          </div>
        )}

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredProducts.map((p) => {

            const isWishlisted = wishlist.some(item => item._id == p._id);
            return (
              <div
                key={p._id}
                className="group relative bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >

                {/* ❤️ Wishlist */}
                <button
                  onClick={() => {
                    if (isWishlisted) {
                      removeFromWishlist(p._id);
                      showToast("Removed from Wishlist");
                    } else {
                      addToWishlist(p);
                      showToast("Added to Wishlist");
                    }
                  }}
                  className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white/70 backdrop-blur hover:scale-110 transition"
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </button>

                <Link to={`/product/${p._id}`} state={{ product: p }}>
                  <img
                    src={p.image}
                    className="w-full h-[360px] object-contain bg-white"
                    alt={p.name}
                  />

                </Link>

                <div className="p-3 bg-slate-100">

                  <h1 className="text-sm font-medium text-center h-10 overflow-hidden">
                    {p.name}
                  </h1>

                  <div className="flex justify-center items-center gap-4 mt-2">

                    <span className="font-semibold text-sm">
                      ₹{p.price}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(p);
                        showToast("Added to Cart");
                      }}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white rounded-full"
                    >
                      🛒
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default MainProducts;
