import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";
import { addProduct, deleteProduct, updateProduct } from "../controllers/productController.js";


const router = express.Router();
router.post("/", addProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;