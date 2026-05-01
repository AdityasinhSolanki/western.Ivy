import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";
import connectDB from "./config/db.js";

dotenv.config();

const products = [

  // WOMEN
  {
    image: "/assets/Women/Roadtrip.png",
    name: "Roadtrip Oversized T-Shirt",
    price: 2499,
    category: "women",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Women/Styles.png",
    name: "Styles Oversized T-Shirt",
    price: 1999,
    category: "women",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Women/Signature.png",
    name: "Signature Oversized T-shirt",
    price: 3499,
    category: "women",
    description: "Oversized T-shirt",
    stock: 0
  },
  {
    image: "/assets/Women/Ruffle-It-Up.png",
    name: "Ruffle-It-Up Oversized T-shirt",
    price: 4999,
    category: "women",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Women/GoodVibes.png",
    name: "Good Vibes Oversized T-shirt",
    price: 998,
    category: "women",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Women/DirtyPotePink.png",
    name: "Dirty Pote Pink Oversized T-Shirt",
    price: 999,
    category: "women",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Women/MoonChild.png",
    name: "Moon Child Oversized T-shirt",
    price: 899,
    category: "women",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Women/StayWeird.png",
    name: "Style Weird Oversized T-shirt",
    price: 999,
    category: "women",
    description: "Oversized T-shirt",
    stock: 20
  },

  // MEN
  {
    image: "/assets/Men/No-Mercy.png",
    name: "No-Mercy Oversized T-shirt",
    price: 2999,
    category: "men",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Men/Cosmic.png",
    name: "Cosmic Oversized T-shirt",
    price: 2999,
    category: "men",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Men/Yeezus.png",
    name: "Yeezus Oversized T-shirt",
    price: 2999,
    category: "men",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Men/Utopia.png",
    name: "Utopia Oversized T-shirt",
    price: 2999,
    category: "men",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Men/Imagination.png",
    name: "Imagination Oversized T-shirt",
    price: 2999,
    category: "men",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Men/LostIn.png",
    name: "Lost In Oversized T-shirt",
    price: 2999,
    category: "men",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Men/ItsOkay.png",
    name: "Its Okay Oversized T-shirt",
    price: 2999,
    category: "men",
    description: "Oversized T-shirt",
    stock: 20
  },
  {
    image: "/assets/Men/InspirePosibilities.png",
    name: "Inspire Possibilities Oversized T-shirt",
    price: 2999,
    category: "men",
    description: "Oversized T-shirt",
    stock: 20
  },

  // KIDS
  {
    image: "/assets/Kids/OliveBreezeSet.png",
    name: "Olive Breeze Set",
    price: 998,
    category: "kids",
    description: "Kids outfit",
    stock: 20
  },
  {
    image: "/assets/Kids/MintGeoSet.png",
    name: "Mint Geo Printed Shirt Set",
    price: 999,
    category: "kids",
    description: "Kids outfit",
    stock: 20
  },
  {
    image: "/assets/Kids/ClassyBrownShirt.png",
    name: "Classy Brown Shirt",
    price: 899,
    category: "kids",
    description: "Kids shirt",
    stock: 20
  },
  {
    image: "/assets/Kids/PinkStriped.png",
    name: "Pink Striped Shirt",
    price: 999,
    category: "kids",
    description: "Kids shirt",
    stock: 20
  },
  {
    image: "/assets/Kids/TropicalPrintSet.png",
    name: "Tropical Print Set",
    price: 1699,
    category: "kids",
    description: "Kids set",
    stock: 20
  },
  {
    image: "/assets/Kids/PinkStreet.png",
    name: "Pink Street Set",
    price: 1499,
    category: "kids",
    description: "Kids set",
    stock: 20
  },
  {
    image: "/assets/Kids/FloralPrintSet.png",
    name: "Floral Print Set",
    price: 1599,
    category: "kids",
    description: "Kids set",
    stock: 20
  },
  {
    image: "/assets/Kids/BlossomSet.png",
    name: "Blossom Set",
    price: 999,
    category: "kids",
    description: "Kids set",
    stock: 20
  }

];

const seedProducts = async () => {

  try {

    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products inserted successfully");

    process.exit();

  } catch (error) {

    console.error(error);
    process.exit(1);

  }

};

seedProducts();