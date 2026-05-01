import Wishlist from "../models/wishlist.js";

// GET wishlist
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.json({ products: [] });
    }

    res.json({ products: wishlist.products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD to wishlist
export const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        products: [],
      });
    }

    const id = String(productId);

    if (!wishlist.products.includes(id)) {
      wishlist.products.push(id);
    }

    await wishlist.save();

    res.json({ message: "Added", products: wishlist.products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE from wishlist
export const removeFromWishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.json({ products: [] });
    }

    const id = String(productId);

    wishlist.products = wishlist.products.filter(
      (item) => item !== id
    );

    await wishlist.save();

    res.json({ message: "Removed", products: wishlist.products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};