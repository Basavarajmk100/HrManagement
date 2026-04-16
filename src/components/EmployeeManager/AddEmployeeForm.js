import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/AddEmployeeForm.css';

const AddEmployeePage = () => {
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
      source: "Form", // ✅ Important
    photo: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setEmployee(prev => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert DOJ to ISO string for ASP.NET backend
      const payload = {
        ...employee,
        doj: employee.doj ? new Date(employee.doj).toISOString() : null
      };

      const response = await fetch("http://localhost:5133/api/EmployeeManager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add employee: ${errorText}`);
      }

      alert("Employee added successfully!");
      navigate("/employee-manager"); // go back to dashboard
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Error adding employee. Check backend connection and data format.");
    }
  };

  const handleCancel = () => {
    navigate("/employee-manager"); // go back to dashboard
  };

  return (
    <form onSubmit={handleSubmit} className

="add-employee-form">
      <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
      <input type="text" name="father" placeholder="Father's Name" value={employee.father} onChange={handleChange} />
      <input type="date" name="doj" value={employee.doj} onChange={handleChange} />
      <input type="text" name="pfNo" placeholder="PF No" value={employee.pfNo} onChange={handleChange} />
      <input type="text" name="esiNo" placeholder="ESI No" value={employee.esiNo} onChange={handleChange} />
      <input type="text" name="pan" placeholder="PAN No" value={employee.pan} onChange={handleChange} />
      <input type="text" name="bankName" placeholder="Bank Name" value={employee.bankName} onChange={handleChange} />
      <input type="text" name="accountNo" placeholder="Account No" value={employee.accountNo} onChange={handleChange} />
      <input type="text" name="ifsc" placeholder="IFSC" value={employee.ifsc} onChange={handleChange} />
      <input type="text" name="designation" placeholder="Designation" value={employee.designation} onChange={handleChange} />
      <input type="text" name="occupation" placeholder="Occupation" value={employee.occupation} onChange={handleChange} />
      <input type="text" name="department" placeholder="Department" value={employee.department} onChange={handleChange} />
      <input type="text" name="branch" placeholder="Branch" value={employee.branch} onChange={handleChange} />
      <input type="text" name="grade" placeholder="Grade" value={employee.grade} onChange={handleChange} />
      <input type="text" name="uan" placeholder="UAN" value={employee.uan} onChange={handleChange} />
      <input type="text" name="aadhaar" placeholder="Aadhaar No" value={employee.aadhaar} onChange={handleChange} />
      <input type="file" name="photo" onChange={handlePhotoUpload} />
      <button type="submit">Add Employee</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default AddEmployeePage;
