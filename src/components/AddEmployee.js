import React, { useState } from "react";
import axios from "axios";
import "../styles/AddEmployee.css";

function AddEmployee({ onAdd }) {
  const [formData, setFormData] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    personalEmail: "",
    dateOfJoining: "",
    designation: "",
    department: ""
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5133/api/v1/employees",
        formData
      );
      onAdd(response.data); // update list in parent
      setFormData({
        employeeCode: "",
        firstName: "",
        lastName: "",
        personalEmail: "",
        dateOfJoining: "",
        designation: "",
        department: ""
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee");
    }
  };

  return (
    <div className

="add-employee-container">
      <h2>Add New Employee</h2>
      <form className

="add-employee-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="employeeCode"
          value={formData.employeeCode}
          onChange={handleChange}
          placeholder="Employee Code"
          required
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="personalEmail"
          value={formData.personalEmail}
          onChange={handleChange}
          placeholder="Personal Email"
          required
        />
        <input
          type="date"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Designation"
          required
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
