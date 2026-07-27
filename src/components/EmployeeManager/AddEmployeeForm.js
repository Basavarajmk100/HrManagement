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
    source: "Form",
    photo: "",
  });

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

    try {
      const payload = {
        ...employee,
        doj: employee.doj ? new Date(employee.doj).toISOString() : null,
      };

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

        throw new Error(`Failed to add employee: ${errorText}`);
      }

      alert("Employee added successfully!");

      navigate("/employee-manager");
    } catch (error) {
      console.error("Error adding employee:", error);

      alert("Error adding employee. Check backend connection and data format.");
    }
  };

  const handleCancel = () => {
    navigate("/employee-manager");
  };

  return (
    <form onSubmit={handleSubmit} className="add-employee-form">
      <h2>Add Employee</h2>

      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={employee.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="father"
        placeholder="Father's Name"
        value={employee.father}
        onChange={handleChange}
      />

      <input
        type="date"
        name="doj"
        value={employee.doj}
        onChange={handleChange}
      />

      <input
        type="text"
        name="pfNo"
        placeholder="PF Number"
        value={employee.pfNo}
        onChange={handleChange}
      />

      <input
        type="text"
        name="esiNo"
        placeholder="ESI Number"
        value={employee.esiNo}
        onChange={handleChange}
      />

      <input
        type="text"
        name="pan"
        placeholder="PAN Number"
        value={employee.pan}
        onChange={handleChange}
      />

      <input
        type="text"
        name="bankName"
        placeholder="Bank Name"
        value={employee.bankName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="accountNo"
        placeholder="Account Number"
        value={employee.accountNo}
        onChange={handleChange}
      />

      <input
        type="text"
        name="ifsc"
        placeholder="IFSC Code"
        value={employee.ifsc}
        onChange={handleChange}
      />

      <input
        type="text"
        name="designation"
        placeholder="Designation"
        value={employee.designation}
        onChange={handleChange}
      />

      <input
        type="text"
        name="occupation"
        placeholder="Occupation"
        value={employee.occupation}
        onChange={handleChange}
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
      />

      <input
        type="text"
        name="branch"
        placeholder="Branch"
        value={employee.branch}
        onChange={handleChange}
      />

      <input
        type="text"
        name="grade"
        placeholder="Grade"
        value={employee.grade}
        onChange={handleChange}
      />

      <input
        type="text"
        name="uan"
        placeholder="UAN"
        value={employee.uan}
        onChange={handleChange}
      />

      <input
        type="text"
        name="aadhaar"
        placeholder="Aadhaar Number"
        value={employee.aadhaar}
        onChange={handleChange}
      />

      <label>Employee Photo</label>

      <input type="file" accept="image/*" onChange={handlePhotoUpload} />

      {employee.photo && (
        <img
          src={employee.photo}
          alt="Employee Preview"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
      )}

      <div className="form-buttons">
        <button type="submit">Add Employee</button>

        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEmployeePage;
