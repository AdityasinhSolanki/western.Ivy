import express from "express";
import protect from "../models/middleware/authMiddleware.js";
import User from "../models/user.js";

const router = express.Router();

router.put("/activate", protect, async (req, res) => {

  try {

    const user = await User.findById(req.user);

    user.isPremium = true;

    await user.save();

    res.json({ message: "Premium activated", isPremium: true });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

export default router;