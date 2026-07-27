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

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setEmployee((prev) => ({
        ...prev,
        photo: reader.result,
      }));
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

      const response = await fetch(
        "http://localhost:5133/api/EmployeeManager",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(errorText || "Unknown backend error");
      }

      alert("Employee added successfully!");

      navigate("/employee-manager");
    } catch (err) {
      console.error("Error adding employee:", err);

      setError(`Error adding employee: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/employee-manager");
  };

  return (
    <div className="add-employee-page">
      <h2>Add New Employee</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="add-employee-form">
        {/* Employee Name */}
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={employee.name}
          onChange={handleChange}
          required
        />

        {/* Father's Name */}
        <input
          type="text"
          name="father"
          placeholder="Father's Name"
          value={employee.father}
          onChange={handleChange}
        />

        {/* Date of Joining */}
        <input
          type="date"
          name="doj"
          value={employee.doj}
          onChange={handleChange}
        />

        {/* PF */}
        <input
          type="text"
          name="pfNo"
          placeholder="PF Number"
          value={employee.pfNo}
          onChange={handleChange}
        />

        {/* ESI */}
        <input
          type="text"
          name="esiNo"
          placeholder="ESI Number"
          value={employee.esiNo}
          onChange={handleChange}
        />

        {/* PAN */}
        <input
          type="text"
          name="pan"
          placeholder="PAN"
          value={employee.pan}
          onChange={handleChange}
        />

        {/* Bank Name */}
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={employee.bankName}
          onChange={handleChange}
        />

        {/* Account Number */}
        <input
          type="text"
          name="accountNo"
          placeholder="Account Number"
          value={employee.accountNo}
          onChange={handleChange}
        />

        {/* IFSC */}
        <input
          type="text"
          name="ifsc"
          placeholder="IFSC Code"
          value={employee.ifsc}
          onChange={handleChange}
        />

        {/* Designation */}
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
        />

        {/* Occupation */}
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={employee.occupation}
          onChange={handleChange}
        />

        {/* Department */}
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
        />

        {/* Branch */}
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={employee.branch}
          onChange={handleChange}
        />

        {/* Grade */}
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={employee.grade}
          onChange={handleChange}
        />

        {/* UAN */}
        <input
          type="text"
          name="uan"
          placeholder="UAN"
          value={employee.uan}
          onChange={handleChange}
        />

        {/* Aadhaar */}
        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar Number"
          value={employee.aadhaar}
          onChange={handleChange}
        />

        {/* Photo Upload */}
        <div className="file-upload">
          <label htmlFor="photo">Upload Photo:</label>

          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </div>

        {/* Photo Preview */}
        {employee.photo && (
          <div className="photo-preview">
            <img
              src={employee.photo}
              alt="Employee Preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="form-buttons">
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
