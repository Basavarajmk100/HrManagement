import React, { useState } from "react";
import "../../styles/LeaveManagement.css";


const LeaveManagement = () => {
  // Mock leave balances
  const [balances] = useState({
    casual: 5,
    sick: 8,
    earned: 12,
  });

  // Leave requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "Casual",
      from: "2025-09-05",
      to: "2025-09-07",
      reason: "Family Function",
      status: "Pending",
    },
    {
      id: 2,
      type: "Sick",
      from: "2025-09-01",
      to: "2025-09-02",
      reason: "Fever",
      status: "Approved",
    },
  ]);

  // Form state
  const [form, setForm] = useState({
    type: "Casual",
    from: "",
    to: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: requests.length + 1,
      ...form,
      status: "Pending",
    };
    setRequests([...requests, newRequest]);
    setForm({ type: "Casual", from: "", to: "", reason: "" });
  };

  return (
    <div className="leave-container">
      {/* Leave Balances */}
      <div className="card">
        <h2>Leave Balances</h2>
        <div className="balance-item">
          <span>Casual Leave</span>
          <span>{balances.casual}</span>
        </div>
        <div className="balance-item">
          <span>Sick Leave</span>
          <span>{balances.sick}</span>
        </div>
        <div className="balance-item">
          <span>Earned Leave</span>
          <span>{balances.earned}</span>
        </div>
      </div>

      {/* Apply for Leave */}
      <div className="card">
        <h2>Apply for Leave</h2>
        <form onSubmit={handleSubmit} className="leave-form">
          <label>Leave Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Casual">Casual</option>
            <option value="Sick">Sick</option>
            <option value="Earned">Earned</option>
          </select>

          <label>From Date</label>
          <input
            type="date"
            name="from"
            value={form.from}
            onChange={handleChange}
            required
          />

          <label>To Date</label>
          <input
            type="date"
            name="to"
            value={form.to}
            onChange={handleChange}
            required
          />

          <label>Reason</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Request</button>
        </form>
      </div>

      {/* Leave Requests */}
      <div className="card">
        <h2>My Leave Requests</h2>
        {requests.map((req) => (
          <div key={req.id} className="request-item">
            <p>
              <strong>{req.type} Leave</strong>
            </p>
            <p>
              {req.from} → {req.to}
            </p>
            <p>{req.reason}</p>
            <span className={`status ${req.status.toLowerCase()}`}>
              {req.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveManagement;
