import Product from "../models/product.js";


// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// ADMIN: ADD PRODUCT
export const addProduct = async (req, res) => {
  try {

    const { name, price, image, description, category, stock } = req.body;

    const product = new Product({
      name,
      price,
      image,
      description,
      category,
      stock
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// ADMIN: DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// ADMIN: UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    product.image = req.body.image ?? product.image;
    product.description = req.body.description ?? product.description;
    product.category = req.body.category ?? product.category;
    product.stock = req.body.stock ?? product.stock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};