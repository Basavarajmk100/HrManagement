import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/ViewEmployee.css";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/v1/employees/${id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error("Error fetching employee:", error));
  }, [id]);

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  const handleUpload = () => {
    alert("Upload document feature coming soon!");
  };

  return (
    <div className="employee-details">
  
    {/* Profile Section */}
<div className="profile-header">
  <img
    src={employee.profileImageUrl || "/default-profile.png"}
    alt={`${employee.firstName} ${employee.lastName}`}
    className="profile-img"
  />
  <h2 className="profile-name">{employee.firstName} {employee.lastName}</h2>
  <p className="designation">{employee.designation}</p>
  <p className="department">{employee.department}</p>
</div>

<div className="profile-card">
  <p><strong>Code:</strong> {employee.employeeCode}</p>
  <p><strong>Email:</strong> {employee.personalEmail}</p>
  <p><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
  <p><strong>Phone Number:</strong> {employee.phoneNumber || "Not Provided"}</p>
</div>



      {/* Documents Section */}
      <h3>Documents</h3>
      <div className="documents">
        <div>
          <p><strong>Aadhaar Card:</strong></p>
          {employee.aadhaarUrl ? (
            <img src={employee.aadhaarUrl} alt="Aadhaar" width="200" />
          ) : (
            <span className="missing">Not Uploaded</span>
          )}
        </div>

        <div>
          <p><strong>PAN Card:</strong></p>
          {employee.panUrl ? (
            <img src={employee.panUrl} alt="PAN" width="200" />
          ) : (
            <span className="missing">Not Uploaded</span>
          )}
        </div>

        <div>
          <p><strong>Previous Employment:</strong></p>
          {employee.previousEmploymentUrl ? (
            <a href={employee.previousEmploymentUrl} target="_blank" rel="noreferrer">
              View Document
            </a>
          ) : (
            <span className="missing">Not Uploaded</span>
          )}
        </div>

        <button onClick={handleUpload}>Upload Documents</button>
      </div>

      <Link to="/employees" className="back-btn">⬅ Back</Link>
    </div>
  );
};

export default ViewEmployee;
