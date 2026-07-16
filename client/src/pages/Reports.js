import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Reports() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [showMonthly, setShowMonthly] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

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

  // 📊 CALCULATE MONTHLY REPORTS
  const calculateMonthlyReports = () => {
    const months = {};

    expenses.forEach(e => {
      const d = new Date(e.date);
      const key = d.getMonth() + "-" + d.getFullYear();

      if (!months[key]) {
        months[key] = { expense: 0, income: 0 };
      }

      months[key].expense += e.amount;
    });

    income.forEach(i => {
      const d = new Date(i.date);
      const key = d.getMonth() + "-" + d.getFullYear();

      if (!months[key]) {
        months[key] = { expense: 0, income: 0 };
      }

      months[key].income += i.amount;
    });

    const result = Object.keys(months).map(key => {
      const [month, year] = key.split("-");
      return {
        month,
        year,
        expense: months[key].expense,
        income: months[key].income
      };
    });

    setMonthlyData(result);
  };

  // 📅 MONTH NAME
  const getMonthName = (m) => {
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    return months[m];
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={main}>
        <h2>Reports 📊</h2>

        {/* BUTTON */}
        <button
          style={btn}
          onClick={() => {
            setShowMonthly(true);
            calculateMonthlyReports();
          }}
        >
          View Monthly Reports 📅
        </button>

        {/* MONTHLY REPORT */}
        {showMonthly && (
          <div style={box}>
            <h3>Monthly Reports</h3>

            {monthlyData.length === 0 ? (
              <p>No data available</p>
            ) : (
              monthlyData.map((m, index) => (
                <div key={index} style={listItem}>
                  <span>
                    {getMonthName(m.month)} {m.year}
                  </span>

                  <span>Expense: ₹{m.expense}</span>
                  <span>Income: ₹{m.income}</span>
                  <span>Saving: ₹{m.income - m.expense}</span>
                </div>
              ))
            )}
          </div>
        )}

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

const btn = {
  padding: "10px 15px",
  background: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginBottom: "20px"
};

const box = {
  background: "white",
  padding: "20px",
  borderRadius: "10px"
};

const listItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #eee"
};

export default Reports;