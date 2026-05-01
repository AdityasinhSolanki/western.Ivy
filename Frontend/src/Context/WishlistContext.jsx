import { createContext, useState, useEffect, useRef } from "react";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const isFirstLoad = useRef(true); // ✅ added

  // ✅ LOAD (robust - handles timing issue)
  useEffect(() => {
    const loadWishlist = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id || user?.id;

      if (!userId) return;

      const stored = localStorage.getItem(`wishlist_${userId}`);

      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    };

    loadWishlist();

    const timer = setTimeout(loadWishlist, 100);
    return () => clearTimeout(timer);
  }, []);

  // ✅ SAVE (fixed - no overwrite on first render)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.id;

    if (!userId) return;

    // 🚫 prevent initial empty overwrite
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    localStorage.setItem(
      `wishlist_${userId}`,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // ✅ ADD
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item._id === product._id)) return prev;
      return [...prev, product];
    });
  };
  // ✅ REMOVE
  const removeFromWishlist = (productId) => {
    setWishlist((prev) =>
      prev.filter((item) => item._id !== productId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;