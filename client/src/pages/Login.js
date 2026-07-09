import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.name);

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>Login</h2>

        <input
          style={input}
          placeholder="Email"
          onChange={(e) => {
  setEmail(e.target.value);
  setError("");
}}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
         onChange={(e) => {
  setPassword(e.target.value);
  setError("");
}}
        />
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <button style={btn} onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <span style={link} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#eef2f7",
};

const box = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "300px",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#3498db",
  color: "white",
  border: "none",
};

const link = {
  color: "blue",
  cursor: "pointer",
};

export default Login;
