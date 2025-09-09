import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditEmployee.css";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    personalEmail: "",
    designation: "",
    department: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8085/api/v1/employees/${id}`)
      .then(res => setEmployee(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8085/api/v1/employees/${id}`, employee)
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="personalEmail"
          value={employee.personalEmail}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          placeholder="Designation"
        />
        <input
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditEmployee;
