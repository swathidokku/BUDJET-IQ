import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom"; // ✅ ADD THIS

import { Pie, Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [budget, setBudget] = useState(0);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") || "User";
  const location = useLocation(); // ✅ ADD THIS

  useEffect(() => {
    fetchData();
  }, [location]); // ✅ THIS IS THE MAIN FIX

  const fetchData = async () => {
    try {
      const exp = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: token },
      });

      const inc = await axios.get("http://localhost:5000/api/income", {
        headers: { Authorization: token },
      });

      const currentMonth = new Date().toISOString().slice(0, 7);

      const budgetRes = await axios.get(
        `http://localhost:5000/api/budget/status/${currentMonth}`,
        {
          headers: { Authorization: token },
        },
      );

      if (budgetRes.data.budget) {
        setBudget(budgetRes.data.budget);
      }

      setExpenses(exp.data);
      setIncome(inc.data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };
  const saveBudget = async (value) => {
    setBudget(value);

    try {
      const currentMonth = new Date().toISOString().slice(0, 7);

      await axios.post(
        "http://localhost:5000/api/budget/set",
        {
          limit: value,
          month: currentMonth,
        },
        {
          headers: { Authorization: token },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const balance = totalIncome - totalExpense;
  const budgetUsed =
    budget > 0 ? Math.min((totalExpense / budget) * 100, 100) : 0;

  const budgetRemaining = budget - totalExpense;

  let alertMsg = "Safe";
  let alertColor = "#2ecc71";

  if (totalExpense > budget) {
    alertMsg = "Exceeded";
    alertColor = "#e74c3c";
  } else if (totalExpense > budget * 0.8) {
    alertMsg = "Warning";
    alertColor = "#f39c12";
  }

  let insight = balance > 0 ? "Saving 👍" : "Control expenses";

  const categoryData = {};
  expenses.forEach((e) => {
    categoryData[e.category] = (categoryData[e.category] || 0) + e.amount;
  });
  // SMART INSIGHTS

  const highestCategory =
    Object.keys(categoryData).length > 0
      ? Object.keys(categoryData).reduce((a, b) =>
          categoryData[a] > categoryData[b] ? a : b,
        )
      : "No Expenses";

  const savings = balance;

  const budgetPercentage =
    budget > 0 ? ((totalExpense / budget) * 100).toFixed(0) : 0;
  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50"],
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#2ecc71", "#e74c3c"],
      },
    ],
  };
  const pieOptions = {
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 11
        },
        formatter: (value, context) => {
  const total = context.dataset.data.reduce(
    (a, b) => a + b,
    0
  );

  const percentage = (
    (value / total) * 100
  ).toFixed(0);

  return `${percentage}%`;
}
      }
    }
  };
  const chartBox = {
  width: "250px",
  height: "250px",
  margin: "0 auto"
};

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={main}>
        <h2>Dashboard</h2>
        <p>Welcome, {user} 👋</p>

        <input
          type="number"
          placeholder="Set Monthly Budget"
          style={input}
          value={budget}
          onChange={(e) => saveBudget(Number(e.target.value))}
        />

        <p style={{ color: alertColor }}>
          {alertMsg} • {insight}
        </p>

        <div style={grid}>
          <div style={card}>
            <p>Income</p>
            <h3>₹{totalIncome}</h3>
          </div>

          <div style={card}>
            <p>Expense</p>
            <h3>₹{totalExpense}</h3>
          </div>

          <div style={card}>
            <p>Balance</p>
            <h3
              style={{
                color: balance < 0 ? "#e74c3c" : "#2ecc71",
              }}
            >
              ₹{balance.toLocaleString()}
            </h3>
          </div>
        </div>
        {/* BUDGET PROGRESS */}

        <div style={budgetCard}>
          <h3>🎯 Budget Overview</h3>

          <p>
            ₹{totalExpense.toLocaleString()} / ₹{budget.toLocaleString()} Used
          </p>

          <div style={progressContainer}>
            <div
              style={{
                ...progressBar,
                width: `${budgetUsed}%`,
                background:
                  budgetUsed > 90
                    ? "#e74c3c"
                    : budgetUsed > 70
                      ? "#f39c12"
                      : "#2ecc71",
              }}
            />
          </div>

          <p style={{ marginTop: "10px" }}>
            {budgetRemaining >= 0
              ? `₹${budgetRemaining.toLocaleString()} Remaining`
              : `Exceeded by ₹${Math.abs(budgetRemaining).toLocaleString()}`}
          </p>
        </div>
        {/* SMART INSIGHTS */}

        <div style={insightCard}>
          <h3>💡 Smart Insights</h3>

          <p>
            📌 Highest Expense Category:
            <strong> {highestCategory}</strong>
          </p>

          <p>
            <strong>
              {savings >= 0
                ? `💰 Savings: ₹${savings.toLocaleString()}`
                : `⚠️ Overspent: ₹${Math.abs(savings).toLocaleString()}`}
            </strong>
          </p>

          <p>
            📊 Budget Usage:
            <strong> {budgetPercentage}%</strong>
          </p>

          <p>
            {budgetPercentage < 70
              ? "✅ Spending is under control"
              : budgetPercentage < 90
                ? "⚠️ Spending is getting high"
                : "🚨 Budget almost exhausted"}
          </p>
        </div>

        <div style={chartContainer}>
          <div style={chartCard}>
            <h4>Expense Breakdown</h4>

            <div style={chartBox}>
              <Pie
                data={pieData}
                options={pieOptions}
              />
            </div>
          </div>

          <div style={chartCard}>
            <h4>Income vs Expense</h4>
            <Bar data={barData} />
          </div>
          {/* RECENT TRANSACTIONS */}

          <div style={recentCard}>
            <h3>📋 Recent Transactions</h3>

            {expenses
              .slice(-5)
              .reverse()
              .map((item, index) => (
                <div key={index} style={transactionRow}>
                  <span>
                    {item.category === "Food" && "🍔"}
                    {item.category === "Travel" && "✈️"}
                    {item.category === "Bills" && "💡"}
                    {item.category === "Shopping" && "🛍️"} {item.category}
                  </span>

                  <span>₹{item.amount}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const main = {
  marginLeft: "240px",
  width: "100%",
  background: "#1e1e2f",
  minHeight: "100vh",
  padding: "30px",
  color: "white",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  background: "#2c2c3e",
  padding: "20px",
  borderRadius: "12px",
};

const chartContainer = {
  display: "flex",
  gap: "30px",
  marginTop: "30px",
  flexWrap: "wrap",
};

const chartCard = {
  flex: 1,
  minWidth: "300px",
  maxWidth: "380px",
  background: "#2c2c3e",
  padding: "20px",
  borderRadius: "12px",
};
const budgetCard = {
  background: "#2c2c3e",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "25px",
};
const insightCard = {
  background: "#2c2c3e",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "25px",
  lineHeight: "2",
};

const progressContainer = {
  width: "100%",
  height: "15px",
  background: "#444",
  borderRadius: "20px",
  overflow: "hidden",
  marginTop: "10px",
};

const progressBar = {
  height: "100%",
  borderRadius: "20px",
  transition: "0.5s ease",
};

const input = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #444",
  background: "#2c2c3e",
  color: "white",
  fontSize: "16px",
  width: "250px",
  marginTop: "10px",
};
const recentCard = {
  flex: 1,
  minWidth: "300px",
  maxWidth: "380px",
  background: "#2c2c3e",
  padding: "20px",
  borderRadius: "12px",
};

const transactionRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};
export default Dashboard;
