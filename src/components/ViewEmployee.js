import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/ViewEmployee.css";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8085/api/v1/employees/${id}`)
      .then(res => setEmployee(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p><b>Code:</b> {employee.employeeCode}</p>
      <p><b>Name:</b> {employee.firstName} {employee.lastName}</p>
      <p><b>Email:</b> {employee.personalEmail}</p>
      <p><b>Designation:</b> {employee.designation}</p>
      <p><b>Department:</b> {employee.department}</p>
      <Link to="/">Back</Link>
    </div>
  );
};

export default ViewEmployee;
