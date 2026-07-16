const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/authMiddleware");


// Add Expense
router.post("/add", auth, async (req, res) => {
  try {
    const { amount, category, date } = req.body;

const newExpense = new Expense({
  userId: req.user.id,
  amount,
  category,
  date
});

    await newExpense.save();

    res.status(201).json({ message: "Expense added ✅" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get All Expenses
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update all expenses
router.put("/:id", auth, async (req, res) => {
  try {
    const { amount, category, date } = req.body;

await Expense.findByIdAndUpdate(req.params.id, {
  amount,
  category,
  date
});

    res.json({ message: "Expense updated ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Delete Expense
router.delete("/:id", auth, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted 🗑️" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;