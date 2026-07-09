import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports.js";
import Expenses from"./pages/Expenses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  );
}

export default App;