const express = require("express");
const router = express.Router();
const Income = require("../models/Income");
const auth = require("../middleware/authMiddleware");

// Add Income
router.post("/add", auth, async (req, res) => {
  try {
    const { amount, source } = req.body;

    const newIncome = new Income({
      userId: req.user.id,
      amount,
      source
    });

    await newIncome.save();

    res.status(201).json({ message: "Income added 💰" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get All Income
router.get("/", auth, async (req, res) => {
  try {
    const income = await Income.find({ userId: req.user.id });
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;