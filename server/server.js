require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const budgetRoutes = require("./routes/budgetRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/budget", budgetRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("BudgetIQ Backend Running 🚀");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});