import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AddEmployeeForm.css";

const AddEmployeePage = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    father: "",
    doj: "",
    pfNo: "",
    esiNo: "",
    pan: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    designation: "",
    occupation: "",
    department: "",
    branch: "",
    grade: "",
    uan: "",
    aadhaar: "",
    photo: "",
    source: "Form",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setEmployee((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...employee,
        doj: employee.doj ? new Date(employee.doj).toISOString() : null,
      };

      console.log("Submitting employee:", payload);

      const response = await fetch("http://localhost:5133/api/EmployeeManager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unknown backend error");
      }

      alert("✅ Employee added successfully!");
      navigate("/employee-manager");
    } catch (err) {
      console.error("Error adding employee:", err);
      setError(`Error adding employee:\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate("/employee-manager");

  return (
    <div className

="add-employee-container">
      <h2 className

="form-title">Add New Employee</h2>
      {error && <p className

="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className

="add-employee-form">
        {/* 3-column grid input fields */}
        <input type="text" name="name" placeholder="Employee Name" value={employee.name} onChange={handleChange} required />
        <input type="text" name="father" placeholder="Father's Name" value={employee.father} onChange={handleChange} />
        <input type="date" name="doj" value={employee.doj} onChange={handleChange} />

        <input type="text" name="pfNo" placeholder="PF Number" value={employee.pfNo} onChange={handleChange} />
        <input type="text" name="esiNo" placeholder="ESI Number" value={employee.esiNo} onChange={handleChange} />
        <input type="text" name="pan" placeholder="PAN" value={employee.pan} onChange={handleChange} />

        <input type="text" name="bankName" placeholder="Bank Name" value={employee.bankName} onChange={handleChange} />
        <input type="text" name="accountNo" placeholder="Account Number" value={employee.accountNo} onChange={handleChange} />
        <input type="text" name="ifsc" placeholder="IFSC Code" value={employee.ifsc} onChange={handleChange} />

        <input type="text" name="designation" placeholder="Designation" value={employee.designation} onChange={handleChange} />
        <input type="text" name="occupation" placeholder="Occupation" value={employee.occupation} onChange={handleChange} />
        <input type="text" name="department" placeholder="Department" value={employee.department} onChange={handleChange} />

        <input type="text" name="branch" placeholder="Branch" value={employee.branch} onChange={handleChange} />
        <input type="text" name="grade" placeholder="Grade" value={employee.grade} onChange={handleChange} />
        <input type="text" name="uan" placeholder="UAN" value={employee.uan} onChange={handleChange} />

        <input type="text" name="aadhaar" placeholder="Aadhaar Number" value={employee.aadhaar} onChange={handleChange} />

        {/* File upload spans all columns */}
        <div className

="file-upload">
          <label htmlFor="photo">Upload Photo:</label>
          <input type="file" name="photo" id="photo" accept="image/*" onChange={handlePhotoUpload} />
        </div>

        {/* Buttons below full width */}
        <div className

="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Employee"}
          </button>
          <button type="button" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePage;
