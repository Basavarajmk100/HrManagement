import React, { useEffect, useState } from "react";
import "../../styles/CreateEmployeeCredentials.css";

function CreateEmployeeCredentials() {
  // Employee list fetched from EmployeeManager API
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    email: "",
    username: "",
    password: "",
  });

  const [credentials, setCredentials] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  // ==============================
  // FETCH EMPLOYEES FROM BACKEND
  // ==============================
  useEffect(() => {
    fetchEmployees();
    fetchCredentials();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);

      const response = await fetch("http://localhost:5133/api/EmployeeManager");

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();

      console.log("Employees from backend:", data);

      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Error fetching employees from backend");
    } finally {
      setLoadingEmployees(false);
    }
  };

  // ==============================
  // FETCH CREATED CREDENTIALS
  // ==============================
  const fetchCredentials = async () => {
    try {
      const response = await fetch(
        "http://localhost:5133/api/EmployeeCredentials/all",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch credentials");
      }

      const data = await response.json();

      console.log("Credentials from backend:", data);

      setCredentials(data);
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  };

  // ==============================
  // SELECT EMPLOYEE
  // ==============================
  const handleEmployeeChange = (e) => {
    const employeeId = Number(e.target.value);

    const emp = employees.find((employee) => employee.id === employeeId);

    if (!emp) {
      setFormData({
        ...formData,
        employeeId: emp.id,
        email: "",
        username: emp.name ? emp.name.toLowerCase().replace(/\s+/g, "") : "",
      });

      return;
    }

    setFormData({
      ...formData,
      employeeId: emp.id,
      email: emp.email || "",
      username: emp.name ? emp.name.toLowerCase().replace(/\s+/g, "") : "",
    });
  };

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // GENERATE PASSWORD
  // ==============================
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#";

    let password = "";

    for (let i = 0; i < 10; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    setFormData({
      ...formData,
      password: password,
    });
  };

  // ==============================
  // PASSWORD STRENGTH
  // ==============================
  const getStrength = () => {
    if (formData.password.length > 8) return "Strong";
    if (formData.password.length > 5) return "Medium";
    if (formData.password.length > 0) return "Weak";

    return "";
  };

  // ==============================
  // CREATE CREDENTIALS
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);

      const response = await fetch(
        "http://localhost:5133/api/EmployeeCredentials/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      console.log("Response status:", response.status);

      const responseText = await response.text();

      console.log("Backend response:", responseText);

      if (!response.ok) {
        throw new Error(responseText || "Failed to create credentials");
      }

      const data = JSON.parse(responseText);

      alert(data.message);

      // Refresh credentials from database
      await fetchCredentials();

      // Reset form
      setFormData({
        employeeId: "",
        email: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("CREATE CREDENTIAL ERROR:", error);

      alert("Error creating credentials. Check backend console.");
    }
  };

  return (
    <div className="create-credentials-container">
      <div className="credentials-form">
        <h2>Create Employee Credentials</h2>

        <form onSubmit={handleSubmit}>
          {/* SELECT EMPLOYEE */}
          <div className="input-group">
            <label>Select Employee</label>

            <select
              value={formData.employeeId}
              onChange={handleEmployeeChange}
              required
            >
              <option value="">
                {loadingEmployees ? "Loading Employees..." : "Select Employee"}
              </option>

              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter employee email"
              required
            />
          </div>

          {/* USERNAME */}
          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <span className={`strength ${getStrength().toLowerCase()}`}>
              {getStrength()}
            </span>
          </div>

          {/* BUTTONS */}
          <div className="button-row">
            <button
              type="button"
              className="generate-btn"
              onClick={generatePassword}
            >
              Generate Password
            </button>

            <button type="submit" className="submit-btn">
              Create Credentials
            </button>
          </div>
        </form>
      </div>

      {/* CREATED CREDENTIALS */}
      <div className="credentials-table">
        <h3>Created Credentials</h3>

        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Created Date</th>
            </tr>
          </thead>

          <tbody>
            {credentials.length > 0 ? (
              credentials.map((cred, index) => (
                <tr key={index}>
                  <td>{cred.employeeId}</td>

                  <td>{cred.email}</td>

                  <td>{cred.username}</td>

                  <td>
                    {cred.createdAt
                      ? new Date(cred.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No credentials created yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateEmployeeCredentials;
