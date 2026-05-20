import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Admin",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const users = [
    { email: "admin@hrms.com", password: "Admin@1234", role: "Admin" },
    { email: "hr@hrms.com", password: "Hr@1234", role: "HR" },
    { email: "employee@hrms.com", password: "Emp@1234", role: "Employee" },
    {
      email: "maintenance@hrms.com",
      password: "Maint@1234",
      role: "System Maintenance",
    },
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
        u.role === form.role,
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.role) {
        case "Admin":
          navigate("/admin");
          break;
        case "HR":
          navigate("/hr-manager");
          break;
        case "Employee":
          navigate("/employee-dashboard");
          break;

        case "System Maintenance":
          navigate("/provider-dashboard");
          break;

        default:
          navigate("/");
      }
    } else {
      setError("Invalid email, password or role");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
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

            <div className="password-field">
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
              <option value="System Maintenance" style={{ color: "#9ca3af" }}>
                System Maintenance
              </option>
            </select>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
