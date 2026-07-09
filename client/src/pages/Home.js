import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={container}>

      {/* NAVBAR */}
      <div style={navbar}>
        <h2>💰 BudgetIQ</h2>
      </div>

      {/* HERO SECTION */}
      <div style={hero}>
        <h1 style={title}>Manage Your Money Smartly</h1>
        <p style={subtitle}>
          Track expenses, visualize data, and stay in control 💯
        </p>

        <button style={btnPrimary} onClick={() => navigate("/login")}>
          Get Started →
        </button>
      </div>

    </div>
  );
}

/* STYLES */

const container = {
  height: "100vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white"
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 40px",
  background: "rgba(0,0,0,0.5)"
};

const hero = {
  height: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
};

const title = { fontSize: "50px", fontWeight: "bold" };
const subtitle = { fontSize: "20px", margin: "20px 0" };


const btnPrimary = {
  padding: "10px 20px",
  background: "#ff5100",
  border: "none",
  color: "white",
  margin: "5px"
};

export default Home;