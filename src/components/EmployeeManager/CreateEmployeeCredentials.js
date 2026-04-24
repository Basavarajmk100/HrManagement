import React, { useState } from "react";
import "../../styles/CreateEmployeeCredentials.css";

function CreateEmployeeCredentials() {

const employees = [
  { id: 1, name: "Basavaraj", email: "basavaraj@gmail.com" },
  { id: 2, name: "Deepak", email: "deepak@gmail.com" },
  { id: 3, name: "Arun", email: "arun@gmail.com" },
  { id: 4, name: "Rahul", email: "rahul@gmail.com" },
  { id: 5, name: "Sneha", email: "sneha@gmail.com" },
  { id: 6, name: "Priya", email: "priya@gmail.com" },
  { id: 7, name: "Kiran", email: "kiran@gmail.com" },
  { id: 8, name: "Anjali", email: "anjali@gmail.com" },
  { id: 9, name: "Vikram", email: "vikram@gmail.com" },
  { id: 10, name: "Megha", email: "megha@gmail.com" }
];

const [formData, setFormData] = useState({
  employeeId: "",
  email: "",
  username: "",
  password: ""
});

const [credentials, setCredentials] = useState([]);
const [showPassword, setShowPassword] = useState(false);

const handleEmployeeChange = (e) => {
  const emp = employees.find(emp => emp.id === Number(e.target.value));

  setFormData({
    ...formData,
    employeeId: emp.id,
    email: emp.email,
    username: emp.name.toLowerCase().replace(" ", "")
  });
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const generatePassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#";
  let password = "";

  for (let i = 0; i < 10; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  setFormData({
    ...formData,
    password: password
  });
};

const getStrength = () => {
  if (formData.password.length > 8) return "Strong";
  if (formData.password.length > 5) return "Medium";
  if (formData.password.length > 0) return "Weak";
  return "";
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await fetch("http://localhost:5133/api/EmployeeCredentials/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    alert(data.message);

    // Add to local table
    setCredentials([...credentials, formData]);

    // Reset form
    setFormData({
      employeeId: "",
      email: "",
      username: "",
      password: ""
    });

  } catch (error) {
    console.error("Error creating credentials:", error);
  }
};

return (
<div className="credentials-page">

  <div className="credentials-card">

    <h2>Create Employee Credentials</h2>

    <form onSubmit={handleSubmit}>

      <div className="input-group">
        <label>Select Employee</label>
        <select onChange={handleEmployeeChange} required>
          <option value="">Select Employee</option>

          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}

        </select>
      </div>

      <div className="input-group">
        <label>Email</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
        />
      </div>

      <div className="input-group">
        <label>Username</label>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Password</label>

        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
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

  <div className="credentials-table">

    <h3>Created Credentials</h3>

    <table>

      <thead>
        <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Password</th>
        </tr>
      </thead>

      <tbody>

        {credentials.map((cred, index) => (

          <tr key={index}>
            <td>{cred.email}</td>
            <td>{cred.username}</td>
            <td>{cred.password}</td>
          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>
);
}

export default CreateEmployeeCredentials;