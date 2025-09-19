import React from "react";
import "../../styles/EmployeeDashboard.css";
import { FaGift, FaCalendarCheck, FaCheckCircle, FaClipboardList } from "react-icons/fa";

const EmployeeDashboard = () => {
  // Mock stats
  const totalAllowance = 30;
  const totalTaken = 12;
  const totalLeft = 18;
  const leavesApplied = 5;

  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card total-requests">
          <FaGift size={40} />
          <h2>Total Leave Allowance</h2>
          <p>{totalAllowance}</p>
        </div>

        <div className="stat-card approved">
          <FaCalendarCheck size={40} />
          <h2>Total Leave Taken</h2>
          <p>{totalTaken}</p>
        </div>

        <div className="stat-card rejected">
          <FaCheckCircle size={40} />
          <h2>Total Leaves Left</h2>
          <p>{totalLeft}</p>
        </div>

        <div className="stat-card pending">
          <FaClipboardList size={40} />
          <h2>Leaves Applied</h2>
          <p>{leavesApplied}</p>
        </div>
      </div>

      {/* Request Table */}
      <div className="request-table-container">
        <h2>Leave Requests</h2>
        <table className="request-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Sick Leave</td>
              <td>2025-09-10</td>
              <td>2025-09-12</td>
              <td className="status approved">Approved</td>
            </tr>
            <tr>
              <td>102</td>
              <td>Casual Leave</td>
              <td>2025-09-15</td>
              <td>2025-09-16</td>
              <td className="status pending">Pending</td>
            </tr>
            <tr>
              <td>103</td>
              <td>Annual Leave</td>
              <td>2025-09-20</td>
              <td>2025-09-25</td>
              <td className="status rejected">Rejected</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
