import express from "express";
import Product from "../models/product.js";
import Order from "../models/order.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/dashboard", async (req, res) => {

  try {

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const recentProducts = await Product
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      recentProducts
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server Error" });

  }

});

export default router;