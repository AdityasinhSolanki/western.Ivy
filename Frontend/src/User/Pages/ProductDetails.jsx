import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { ToastContext } from "../../Context/ToastContext";
import { WishlistContext } from "../../Context/wishlistContext";
const ProductDetails = () => {

  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      fetch(`http://localhost:5050/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.error(err));
    }
  }, [id, location.state]);

  const isWishlisted = wishlist.some(
    (item) => String(item._id) === String(product?._id)
  );

  useEffect(() => {
    if (!product) return;

    const saved =
      JSON.parse(localStorage.getItem(`reviews_${product._id}`)) || [];

    setReviews(saved);
  }, [product]);

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-semibold mb-4">
          Product Not Found
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {

    if (!selectedSize) {
      showToast("Please select a size", "error");
      return;
    }

    addToCart({
      ...product,
      size: selectedSize
    });

    showToast("Added to Cart", "success");
  };

  const handleSubmitReview = () => {

    if (!user) {
      showToast("Login to write a review", "error");
      navigate("/login");
      return;
    }

    if (!rating || !comment.trim()) {
      showToast("Please add rating and comment", "error");
      return;
    }

    const review = {
      user: user.name || "User",
      rating,
      comment,
      date: new Date().toLocaleDateString()
    };

    const existing =
      JSON.parse(localStorage.getItem(`reviews_${product._id}`)) || [];

    const updated = [...existing, review];

    localStorage.setItem(
      `reviews_${product._id}`,
      JSON.stringify(updated)
    );

    setReviews(updated);
    setRating(0);
    setComment("");

    showToast("Review added", "success");
  };

  const handleShare = async () => {

    const productUrl = window.location.href;

    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name}`,
      url: productUrl
    };

    try {

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(productUrl);
        showToast("Link copied to clipboard");
      }

    } catch (error) {
      console.log("Share cancelled");
    }

  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-16">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-gray-100 rounded-xl flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[550px] w-auto object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-center">

          <div className="flex justify-between items-start gap-4 mb-4">

            <h1 className="text-3xl font-semibold leading-tight max-w-[80%]">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">

              {/* ❤️ Wishlist */}
              <button
                onClick={() => {
                  if (isWishlisted) {
                    removeFromWishlist(product);
                    showToast("Removed from Wishlist");
                  } else {
                    addToWishlist(product);
                    showToast("Added to Wishlist");
                  }
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white/60 backdrop-blur hover:bg-white hover:scale-110 transition"
              >
                {isWishlisted ? "❤️" : "🤍"}
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-black transition whitespace-nowrap"
              >
                Share
              </button>

            </div>

          </div>

          <p className="text-2xl font-medium mb-6">
            ₹{product.price}
          </p>

          {/* SIZE SELECT */}
          <div className="mb-6">
            <p className="font-medium mb-2">Select Size</p>

            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? "" : size)
                  }
                  className={`px-4 py-2 rounded border transition
                  ${selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {/* EXTRA INFO */}
          <div className="mt-8 text-sm text-gray-600 space-y-2">
            <p>✔ Premium Cotton Fabric</p>
            <p>✔ Oversized Street Fit</p>
            <p>✔ Easy 7-Day Returns</p>
          </div>

        </div>

      </div>

      {/* REVIEWS SECTION */}

      <div className="mt-16">

        <h2 className="text-2xl font-semibold mb-6">
          Reviews
        </h2>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">

          <p className="font-medium mb-2">Your Rating</p>

          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-3 mb-4"
          />

          <button
            onClick={handleSubmitReview}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Submit Review
          </button>

        </div>

        <div className="space-y-6">

          {reviews.length === 0 && (
            <p className="text-gray-500">
              No reviews yet.
            </p>
          )}

          {reviews.map((r, index) => (
            <div
              key={index}
              className="border-b pb-4"
            >
              <p className="font-medium">{r.user}</p>
              <p className="text-yellow-500">
                {"★".repeat(r.rating)}
              </p>
              <p className="text-gray-700">{r.comment}</p>
              <p className="text-sm text-gray-400">
                {r.date}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;