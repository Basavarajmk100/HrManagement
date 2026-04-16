import React, { useState } from "react";
import "../../styles/Companies.css";

const plans = ["Monthly", "Quarterly", "Yearly"];
const statuses = ["Active", "Inactive"];

export default function AddCompanyModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    loginId: "",
    password: "",
    website: "",
    address: "",
    employees: "",
    plan: "Monthly",
    status: "Active",
    contactPersonName: "",
    contactPersonDesignation: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    contactPersonEmailID:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    console.log("Submit clicked");
    console.log("Sending data:", formData);

    if (!formData.name || !formData.loginId) {
      alert("Company Name and Login ID are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5133/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          loginId: formData.loginId,
          passwordHash: formData.password,
          website: formData.website,
          address: formData.address,
          employees: Number(formData.employees),
          plan: formData.plan,
          status: formData.status,
          contactPersonName: formData.contactPersonName,
          contactPersonDesignation: formData.contactPersonDesignation,
          contactPersonPhone: formData.contactPersonPhone,
          contactPersonEmail: formData.contactPersonEmail
        })
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Saved successfully:", data);
        alert("Company login created successfully!");
        onClose();
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        alert("Failed to save company: " + errorText);
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Server connection error");
    }
  };

  return (
    <div className

="modalOverlay" onClick={onClose}>
      <div className

="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add Company</h3>

        <input name="name" value={formData.name} onChange={handleChange} placeholder="Company Name" />
        <input name="loginId" value={formData.loginId} onChange={handleChange} placeholder="Login ID" />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <input name="employees" type="number" value={formData.employees} onChange={handleChange} placeholder="Number of Employees" />

        <select name="plan" value={formData.plan} onChange={handleChange}>
          {plans.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <hr />
        <h4>Contact Person Details</h4>

        <input name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} placeholder="Contact Person Name" />
        <input name="contactPersonDesignation" value={formData.contactPersonDesignation} onChange={handleChange} placeholder="Designation" />
        <input name="contactPersonPhone" value={formData.contactPersonPhone} onChange={handleChange} placeholder="Phone" />
        <input name="contactPersonEmail" value={formData.contactPersonEmail} onChange={handleChange} placeholder="Email" />

        <div className

="modalButtons">
          <button type="button" onClick={handleSubmit} className

="addBtn">
            Add
          </button>

          <button type="button" onClick={onClose} className

="cancelBtn">
            Cancel 
          </button>
        </div>
      </div>
    </div>
  );
}
