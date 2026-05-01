import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
const Navbar = ({ onCategorySelect }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5050/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdminPage = window.location.pathname.startsWith("/admin");

  const handleCategoryClick = (category) => {
    if (onCategorySelect) onCategorySelect(category);
    navigate("/");
    setMenuOpen(false);
  };

  /* SEARCH SUGGESTIONS FROM PRODUCTS */

  const filteredSuggestions =
    search.length > 0
      ? (products || [])
        .filter((p) =>
          p.name?.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 5)
      : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/?search=${search}`);
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* TOP NAVBAR */}

      <nav
        className={`bg-black text-white h-14 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <h1
          onClick={() => handleCategoryClick("all")}
          className="font-serif font-bold text-lg cursor-pointer"
        >
          Western Ivy
        </h1>

        <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">

          {!user && (
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          )}

          <Link to="/premium" className="text-gray-300 hover:text-white">
            Premium
          </Link>

          {user?.isAdmin && !isAdminPage && (
            <Link
              to="/admin/dashboard"
              className="text-gray-300 hover:text-white"
            >
              Admin
            </Link>
          )}

          {user?.isAdmin && isAdminPage && (
            <Link
              to="/"
              className="text-yellow-400 hover:text-yellow-300"
            >
              Visit Site
            </Link>
          )}

          <Link to="/profile" className="hover:text-white">
            👤
          </Link>

        </div>
      </nav>

      {/* SECOND NAVBAR */}

      <nav
        className={`sticky top-0 z-50 bg-slate-100 transition-all duration-300 ${scrolled ? "h-12 text-base" : "h-14 text-lg"
          } flex items-center justify-between px-4 sm:px-6 relative`}
      >

        {/* MOBILE MENU */}

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl"
          >
            ☰
          </button>
        </div>

        {/* CATEGORIES */}

        <div className="hidden md:flex flex-1 justify-center font-serif space-x-10">

          <button onClick={() => handleCategoryClick("all")} className="hover:text-red-500">
            Home
          </button>

          <button onClick={() => handleCategoryClick("men")} className="hover:text-red-500">
            Men
          </button>

          <button onClick={() => handleCategoryClick("women")} className="hover:text-red-500">
            Women
          </button>

          <button onClick={() => handleCategoryClick("kids")} className="hover:text-red-500">
            Kids
          </button>

        </div>

        {/* RIGHT ICONS */}

        <div className="flex items-center gap-4 relative">

          {/* SEARCH */}

          <div className="relative">

            <form
              onSubmit={handleSearchSubmit}
              className={`absolute right-10 top-1/2 -translate-y-1/2 transition-all duration-300 overflow-hidden ${searchOpen ? "w-36 sm:w-44 md:w-48 opacity-100" : "w-0 opacity-0"
                }`}
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="border px-2 sm:px-3 py-1 rounded text-sm w-full"
                autoFocus={searchOpen}
              />
            </form>

            {/* SEARCH ICON */}

            <span
              onClick={() => setSearchOpen(!searchOpen)}
              className="cursor-pointer hover:text-red-500 text-lg"
            >
              🔍
            </span>

            {/* SEARCH SUGGESTIONS */}

            {searchOpen && filteredSuggestions.length > 0 && (
              <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg border rounded text-sm z-50">

                {filteredSuggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/?search=${item.name}`);
                      setSearch("");
                      setSearchOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />

                    <span>{item.name}</span>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* ❤️ WISHLIST (added cleanly) */}

          <Link to="/wishlist" className="relative text-xl hover:text-red-500">
            ❤️

            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* CART */}

          <Link to="/cart" className="relative hover:text-red-500 text-xl">

            🛒

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}

          </Link>

        </div>

      </nav>

      {/* MOBILE DROPDOWN */}

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">

          <div className="flex flex-col text-center py-4 space-y-4 font-serif">

            <button onClick={() => handleCategoryClick("all")}>Home</button>
            <button onClick={() => handleCategoryClick("men")}>Men</button>
            <button onClick={() => handleCategoryClick("women")}>Women</button>
            <button onClick={() => handleCategoryClick("kids")}>Kids</button>

            {user?.isAdmin && (
              <Link to="/admin/dashboard">
                Admin Panel
              </Link>
            )}

          </div>

        </div>
      )}

    </>
  );
};

export default Navbar;