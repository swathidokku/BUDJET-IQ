import { Link } from "react-router-dom";

function Sidebar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={sidebar}>

      <h2 style={{ color: "white", marginBottom: "30px" }}>
        💰 BudgetIQ
      </h2>

      <Link to="/dashboard" style={link}>Dashboard</Link>
      <Link to="/analytics" style={link}>Analytics</Link>
      <Link to="/reports" style={link}>Reports</Link>
      <Link to="/expenses" style={link}>Expenses</Link>

      <button onClick={logout} style={logoutBtn}>
        Logout
      </button>

    </div>
  );
}

const sidebar = {
  width: "220px",
  height: "100vh",
  background: "#2c3e50",
  padding: "20px",
  position: "fixed",
  left: 0,
  top: 0,
  display: "flex",
  flexDirection: "column"
};

const link = {
  color: "white",
  textDecoration: "none",
  marginBottom: "15px",
  fontSize: "16px"
};

const logoutBtn = {
  marginTop: "auto",
  padding: "10px",
  background: "#e74c3c",
  color: "white",
  border: "none",
  cursor: "pointer"
};

export default Sidebar;