import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";

import connectDB from "../Backend/config/db.js";

import authRoutes from "../Backend/routes/authRoutes.js";
import productRoutes from "../Backend/routes/productRoutes.js";
import orderRoutes from "../Backend/routes/orderRoutes.js";
import adminRoutes from "../Backend/routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

export default serverless(app);