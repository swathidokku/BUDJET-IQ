import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
  try {
    await axios.post(
  `${process.env.REACT_APP_API_URL}/auth/register`,
  {
    name,
    email,
    password,
  }
);

    alert("Registered Successfully ✅");
    navigate("/login");
  } catch (err) {
    alert("Error ❌");
  }
};

  return (
    <div className="container mt-5 text-center">
  <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
    <h3>Register 📝</h3>

    <input className="form-control my-2" placeholder="Name" 
      onChange={e => setName(e.target.value)} />

    <input className="form-control my-2" placeholder="Email"
      onChange={e => setEmail(e.target.value)} />

    <input type="password" className="form-control my-2" placeholder="Password"
      onChange={e => setPassword(e.target.value)} />

    <button className="btn btn-success mt-3" onClick={handleRegister}>
      Register
    </button>
  </div>
</div>
  );
}

export default Register;