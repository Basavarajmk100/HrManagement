import React, { useState } from "react";
import "../../styles/AddUserForm.css";

const AddUserForm = ({ closeForm, users, setUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "Employee",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5133/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save user");
      }

      const savedUser = await response.json();

      // Update table with data from database
      setUsers([...users, savedUser]);

      alert("User saved successfully ✅");

      closeForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving user. Check backend or CORS.");
    }
  };

  return (
    <div className

="user-modal-overlay" onClick={closeForm}>
      <div className

="user-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add User</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className

="form-buttons">
            <button type="submit" className

="save-btn">
              Save
            </button>

              <button
    type="button"
    className

="cancel-btn"
    onClick={closeForm} // closes the modal
  >
    Cancel
  </button>

          
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
