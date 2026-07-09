const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const auth = require("../middleware/authMiddleware");

// Set Budget
router.post("/set", auth, async (req, res) => {
  try {
    const { limit, month } = req.body;

    let budget = await Budget.findOne({
      userId: req.user.id,
      month
    });

    if (budget) {
      budget.limit = limit;
      await budget.save();
    } else {
      budget = new Budget({
        userId: req.user.id,
        limit,
        month
      });
      await budget.save();
    }

    res.json({ message: "Budget set successfully 🎯" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Check Budget Status
router.get("/status/:month", auth, async (req, res) => {
  try {
    const { month } = req.params;

    const budget = await Budget.findOne({
      userId: req.user.id,
      month
    });

   const expenses = await Expense.find({
  userId: req.user.id
});

const monthlyExpenses = expenses.filter(expense => {
  const expenseMonth = new Date(expense.date)
    .toISOString()
    .slice(0, 7);

  return expenseMonth === month;
});

const totalExpense = monthlyExpenses.reduce(
  (sum, e) => sum + e.amount,
  0
);

    if (!budget) {
      return res.json({ message: "No budget set" });
    }

    let alert = "Safe ✅";

    if (totalExpense > budget.limit) {
      alert = "Budget Exceeded ❌";
    } else if (totalExpense > budget.limit * 0.8) {
      alert = "Warning ⚠️ (80% used)";
    }

    res.json({
      budget: budget.limit,
      spent: totalExpense,
      alert
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;