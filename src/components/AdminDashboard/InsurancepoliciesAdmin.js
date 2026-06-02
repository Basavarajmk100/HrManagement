import React, { useState } from "react";
import "../../styles/Insurancepolicies2.css";

function Insurancepolicies2() {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingRequests = [
    {
      id: 1,
      name: "Basavaraj",
      department: "IT",
      policyType: "Health",
      requestDate: "12-05-2026",
    },
    {
      id: 2,
      name: "Deepak",
      department: "HR",
      policyType: "Life",
      requestDate: "10-05-2026",
    },
    {
      id: 3,
      name: "Anita",
      department: "Finance",
      policyType: "Health",
      requestDate: "08-05-2026",
    },
    {
      id: 4,
      name: "Ramesh",
      department: "Marketing",
      policyType: "Accident",
      requestDate: "06-05-2026",
    },
    {
      id: 5,
      name: "Priya",
      department: "IT",
      policyType: "Life",
      requestDate: "04-05-2026",
    },
  ];

  const issuedPolicies = [
    {
      id: 1,
      name: "Ravi",
      department: "Finance",
      policyNumber: "POL12345",
      policyType: "Health",
      startDate: "01-05-2026",
      endDate: "01-05-2027",
    },
    {
      id: 2,
      name: "Sneha",
      department: "IT",
      policyNumber: "POL67890",
      policyType: "Life",
      startDate: "15-04-2026",
      endDate: "15-04-2027",
    },
    {
      id: 3,
      name: "Kiran",
      department: "HR",
      policyNumber: "POL54321",
      policyType: "Accident",
      startDate: "10-03-2026",
      endDate: "10-03-2027",
    },
    {
      id: 4,
      name: "Megha",
      department: "Marketing",
      policyNumber: "POL98765",
      policyType: "Health",
      startDate: "20-02-2026",
      endDate: "20-02-2027",
    },
    {
      id: 5,
      name: "Suresh",
      department: "IT",
      policyNumber: "POL45678",
      policyType: "Life",
      startDate: "05-01-2026",
      endDate: "05-01-2027",
    },
  ];

  return (
    <div className="insurance-page">
      <h2>Insurance Policies</h2>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "pending" ? "active" : ""}
          onClick={() => setActiveTab("pending")}
        >
          Pending Requests
        </button>

        <button
          className={activeTab === "issued" ? "active" : ""}
          onClick={() => setActiveTab("issued")}
        >
          Issued Policies
        </button>
      </div>

      {/* Pending Requests Table */}
      {activeTab === "pending" && (
        <table className="insurance-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Policy Type</th>
              <th>Request Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.name}</td>
                <td>{req.department}</td>
                <td>{req.policyType}</td>
                <td>{req.requestDate}</td>
                <td>
                  <button className="approve-btn">Issue Policy</button>
                  <button className="reject-btn">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Issued Policies Table */}
      {activeTab === "issued" && (
        <table className="insurance-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Policy Number</th>
              <th>Policy Type</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>

          <tbody>
            {issuedPolicies.map((policy) => (
              <tr key={policy.id}>
                <td>{policy.name}</td>
                <td>{policy.department}</td>
                <td>{policy.policyNumber}</td>
                <td>{policy.policyType}</td>
                <td>{policy.startDate}</td>
                <td>{policy.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Insurancepolicies2;
