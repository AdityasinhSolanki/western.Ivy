import React, { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  // use wishlist directly (no ProductContext, no filter)
  const wishlistProducts = wishlist;

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-8">

      <h1 className="text-2xl font-bold mb-6">Your Wishlist ❤️</h1>

      {wishlistProducts.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

          {wishlistProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >

              <img
                src={p.image}
                className="w-full h-[300px] object-contain bg-white"
                alt={p.name}
              />

              <div className="p-3 bg-slate-100">

                <h1 className="text-sm text-center">
                  {p.name}
                </h1>

                <div className="flex justify-between items-center mt-2">

                  <span className="font-semibold text-sm">
                    ₹{p.price}
                  </span>

                  <button
                    onClick={() => removeFromWishlist(p._id)}
                    className="text-red-500 text-lg"
                  >
                    ❌
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Wishlist;