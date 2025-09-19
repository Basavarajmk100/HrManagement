import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HRDashboard.css";
import { FaUsers, FaUserPlus, FaBed } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";

const HRDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [employees, setEmployees] = useState([
    { id: 1, name: "Basavaraj", department: "IT", status: "On Leave", leaveType: "Sick Leave", from: "2025-09-15", to: "2025-09-17" },
    { id: 3, name: "Kumar", department: "Finance", status: "On Leave", leaveType: "Casual Leave", from: "2025-09-16", to: "2025-09-18" },
    { id: 5, name: "Deepak", department: "IT", status: "On Leave", leaveType: "Sick Leave", from: "2025-09-15", to: "2025-09-17" },
    { id: 7, name: "Samarth", department: "Finance", status: "On Leave", leaveType: "Casual Leave", from: "2025-09-16", to: "2025-09-18" },
  ]);

  const totalEmployees = employees.length;
  const employeesOnLeave = employees.filter(e => e.status === "On Leave").length;
  const newJoinees = 2;

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");

  const handleApprove = (id) => {
    console.log(`Approved leave for Employee ID: ${id}`);
  };

  const handleDisapproveClick = (emp) => {
      console.log("Opening modal for:", emp);
    setSelectedEmployee(emp);
    setReason("");
    setComments("");
    setShowModal(true);
  };

  const handleDisapproveSubmit = () => {
    if (!reason) {
      alert("Please select a reason before submitting.");
      return;
    }
    setEmployees(prev => prev.filter(emp => emp.id !== selectedEmployee.id));
    setShowModal(false);
  };

  console.log("Modal state:", showModal, "Selected Employee:", selectedEmployee);


  return (
  <div className="hrdashboard-container">
    {/* Sidebar */}
    <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

    {/* Main Dashboard */}
    <div className={`hrdashboard-main ${sidebarCollapsed ? "collapsed" : ""}`}>
      <h1>Approver Dashboard</h1>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card total-employees" onClick={() => navigate("/employees")}>
          <FaUsers size={40} />
          <h2>Total Employees</h2>
          <p>{totalEmployees}</p>
        </div>

        <div className="stat-card on-leave" onClick={() => navigate("/leave")}>
          <FaBed size={40} />
          <h2>Employees on Leave</h2>
          <p>{employeesOnLeave}</p>
        </div>

        <div className="stat-card new-joinees" onClick={() => navigate("/employees")}>
          <FaUserPlus size={40} />
          <h2>New Joinees</h2>
          <p>{newJoinees}</p>
        </div>
      </div>

      {/* Leave Table */}
      <div className="leave-table-container">
        <h2>Leave Details</h2>
        <table className="leave-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.leaveType}</td>
                <td>{emp.from}</td>
                <td>{emp.to}</td>
                <td>
                  <button className="approve-btn" onClick={() => handleApprove(emp.id)}>
                    Approve
                  </button>
                  <button className="disapprove-btn" onClick={() => handleDisapproveClick(emp)}>
                    Disapprove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* ✅ Modal Outside Main Content */}
    {showModal && (
      <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Disapprove Leave for {selectedEmployee?.name}</h2>

          <label>
            Reason:
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              <option value="">Select reason</option>
              <option value="Insufficient Leave Balance">Insufficient Leave Balance</option>
              <option value="Critical Project Work">Critical Project Work</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Comments:
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Optional comments"
            />
          </label>

          <div className="modal-actions">
            <button className="disapprove-btn" onClick={handleDisapproveSubmit}>
              Disapprove
            </button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);


};

export default HRDashboard;
