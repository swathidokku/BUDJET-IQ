const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  limit: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Budget", budgetSchema);