import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale);

function Analytics() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  const token = localStorage.getItem("token");

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    const exp = await axios.get(
  `${process.env.REACT_APP_API_URL}/expenses`,
  {
    headers: { Authorization: token }
  }
);

const inc = await axios.get(
  `${process.env.REACT_APP_API_URL}/income`,
  {
    headers: { Authorization: token }
  }
);
    setExpenses(exp.data);
    setIncome(inc.data);
  };

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);

  const savings = totalIncome - totalExpense;

  // PIE DATA
  const categoryData = {};
  expenses.forEach(e => {
    categoryData[e.category] = (categoryData[e.category] || 0) + e.amount;
  });

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50"]
      }
    ]
  };

  // BAR DATA
  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#2ecc71", "#e74c3c"]
      }
    ]
  };

  return (
  <div style={{ display: "flex" }}>

    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div style={{
      marginLeft: "240px",
      width: "100%",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      minHeight: "100vh",
      padding: "30px",
      color: "white"
    }}>

      <h2 style={{ marginBottom: "20px" }}>
        Analytics Dashboard 📊
      </h2>

      {/* Summary Cards */}
      <div style={grid}>

        <div style={{ ...card, background: "#2ecc71" }}>
          <p>Income</p>
          <h3>₹{totalIncome}</h3>
        </div>

        <div style={{ ...card, background: "#e74c3c" }}>
          <p>Expense</p>
          <h3>₹{totalExpense}</h3>
        </div>

        <div style={{ ...card, background: "#3498db" }}>
          <p>Savings</p>
          <h3>₹{totalIncome - totalExpense}</h3>
        </div>

      </div>

      {/* Charts */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
        marginTop: "30px"
      }}>

        <div style={chartCard}>
          <h4>Expense Breakdown</h4>
          <div style={chartBox}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div style={chartCard}>
          <h4>Income vs Expense</h4>
          <div style={chartBox}>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

      </div>

    </div>
  </div>
);
}

/* STYLES */

const page = {
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  minHeight: "100vh",
  padding: "30px",
  fontFamily: "Arial"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginBottom: "30px"
};

const card = {
  color: "white",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
};

const chartContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap"
};

const chartCard = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  width: "350px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

const chartBox = {
  width: "280px",
  height: "280px",
  margin: "0 auto"
};

export default Analytics;