import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(""); // ✅ DATE STATE
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get(
  `${process.env.REACT_APP_API_URL}/expenses`,
  {
    headers: { Authorization: token }
  }
);
    setExpenses(res.data);
  };

  // 💰 ADD INCOME
  const addIncome = async () => {
    if (!incomeAmount) return alert("Enter income");

    await axios.post(
  `${process.env.REACT_APP_API_URL}/income/add`,
  { amount: incomeAmount, source: "Income" },
  { headers: { Authorization: token } }
);

    setIncomeAmount("");
    navigate("/dashboard");
  };

  // 💸 ADD / UPDATE EXPENSE
  const addExpense = async () => {
    if (!expenseAmount || !category)
      return alert("Enter all fields");

    if (editId) {
      await axios.put(
  `${process.env.REACT_APP_API_URL}/expenses/${editId}`,
  { amount: expenseAmount, category, date },
  { headers: { Authorization: token } }
);
    } else {
      await axios.post(
  `${process.env.REACT_APP_API_URL}/expenses/add`,
  { amount: expenseAmount, category, date },
  { headers: { Authorization: token } }
);
    }

    setExpenseAmount("");
    setCategory("");
    setDate(""); // reset date
    setEditId(null);

    navigate("/dashboard");
  };

  // ❌ DELETE
  const deleteExpense = async (id) => {
    await axios.delete(
  `${process.env.REACT_APP_API_URL}/expenses/${id}`,
  { headers: { Authorization: token } }
);
    fetchExpenses();
  };

  // ✏️ EDIT
  const startEdit = (e) => {
    setExpenseAmount(e.amount);
    setCategory(e.category);
    setDate(e.date ? e.date.split("T")[0] : ""); // ✅ FORMAT DATE
    setEditId(e._id);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={main}>
        <h2>Expenses & Income 💸</h2>

        {/* 💰 INCOME */}
        <div style={box}>
          <h4>Add Income</h4>

          <input
            style={input}
            placeholder="Income Amount"
            value={incomeAmount}
            onChange={e => setIncomeAmount(e.target.value)}
          />

          <button
            style={{ ...btn, background: "#2ecc71" }}
            onClick={addIncome}
          >
            Add Income
          </button>
        </div>

        {/* 💸 EXPENSE */}
        <div style={box}>
          <h4>{editId ? "Edit Expense" : "Add Expense"}</h4>

          <input
            style={input}
            placeholder="Expense Amount"
            value={expenseAmount}
            onChange={e => setExpenseAmount(e.target.value)}
          />

          <select
            style={input}
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
          </select>

          {/* 📅 DATE PICKER */}
          <input
            type="date"
            style={input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button style={btn} onClick={addExpense}>
            {editId ? "Update Expense" : "Add Expense"}
          </button>
        </div>

        {/* 📋 LIST */}
        <div style={box}>
          <h4>All Expenses</h4>

          {expenses.map(e => (
            <div key={e._id} style={listItem}>
              <span>{e.category}</span>
              <span>₹{e.amount}</span>
              <span>
                {new Date(e.date).toLocaleDateString()}
              </span>

              <div>
                <button
                  style={editBtn}
                  onClick={() => startEdit(e)}
                >
                  Edit
                </button>

                <button
                  style={deleteBtn}
                  onClick={() => deleteExpense(e._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* STYLES */

const main = {
  marginLeft: "240px",
  padding: "30px",
  width: "100%",
  background: "#eef2f7",
  minHeight: "100vh"
};

const box = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#3498db",
  color: "white",
  border: "none",
  marginTop: "10px"
};

const listItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0"
};

const editBtn = {
  marginRight: "5px",
  background: "#3498db",
  color: "white",
  border: "none"
};

const deleteBtn = {
  background: "#e74c3c",
  color: "white",
  border: "none"
};

export default Expenses;