import express from "express";
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import protect from "../models/middleware/authMiddleware.js";

const router = express.Router();

/* PLACE ORDER */
router.post("/", protect, placeOrder);

/* USER: get their own orders */
router.get("/myorders", protect, getMyOrders);

/* ADMIN: get all orders */
router.get("/", protect, getAllOrders);

/* UPDATE ORDER STATUS */
router.put("/:id/status", protect, updateOrderStatus);

export default router;