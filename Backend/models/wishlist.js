import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true, // one wishlist per user
    },
    products: [
      {
        type: String, // ✅ changed from ObjectId → String
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("wishlist", wishlistSchema);

export default Wishlist;