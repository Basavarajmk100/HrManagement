import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const LoginPage = () => 
  {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Admin"
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const users = [

    { email: "demo@gmail.com", password: "123", role: "Admin" },
    { email: "demo@gmail.com", password: "123", role: "HR" },
    { email: "demo@gmail.com", password: "123", role: "Employee" }
  ];
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password &&
        u.role === form.role
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.role) {
   
        case "Admin":
          navigate("/dashboard");
          break;
        case "HR":
          navigate("/employee-manager");
          break;
        case "Employee":
          navigate("/employee-dashboard");
          break;
        default:
          navigate("/");
      }

    } 
    else {
      setError("Invalid email, password or role");
    }
  };

  return (
    <div className

="login-container">
      <div className

="login-wrapper">
        <div className

="login-card">
          <h2>ItsMyHr</h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className

="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <select name="role" value={form.role} onChange={handleChange}>
             
              <option value="Admin">Admin</option>
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
            </select>

            {error && <p className

="error">{error}</p>}

            <button type="submit" className

="login-btn">
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;