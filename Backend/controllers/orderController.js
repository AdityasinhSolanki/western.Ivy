import Order from "../models/order.js";
import User from "../models/user.js";
import { sendOrderEmail } from "../utils/sendOrderEmail.js";

/* PLACE ORDER */

export const placeOrder = async (req, res) => {
  try {

    const { items, totalPrice, paymentMethod, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user,
      items: items.map(item => ({
        ...item,
        image: item.image ? item.image.replace("/src/assets", "/assets") : ""
      })),
      totalPrice,
      paymentMethod,
      shippingAddress
    });

    const createdOrder = await order.save();

    await User.findByIdAndUpdate(
      req.user,
      { address: shippingAddress },
      { new: true }
    );

    // 👉 AFTER response → do email
    const user = await User.findById(req.user);

    res.status(201).json(createdOrder);

    if (user) {
      sendOrderEmail(user.email, createdOrder)
        .catch(err => console.log("Email error:", err));
    }

  } catch (error) {

    console.log("ORDER ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
      stack: error.stack
    });

  }
};



/* UPDATE ORDER STATUS */

export const updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;

    if (req.body.status === "Cancelled") {
      order.cancelledAt = new Date();
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};



/* USER: get logged in user's orders */

export const getMyOrders = async (req, res) => {

  try {

    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    await Order.deleteMany({
      status: "Cancelled",
      cancelledAt: { $lt: threeDaysAgo }
    });

    const orders = await Order
      .find({ user: req.user })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};



/* ADMIN: get all orders */

export const getAllOrders = async (req, res) => {

  try {

    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    await Order.deleteMany({
      status: "Cancelled",
      cancelledAt: { $lt: threeDaysAgo }
    });

    const orders = await Order
      .find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};