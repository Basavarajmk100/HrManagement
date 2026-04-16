import React, { useEffect, useState } from "react";
import "../../styles/ApprovePayroll.css";

// ✅ MOVE THIS FUNCTION TO TOP
const generateMonths = (
  startYear = 2020,
  endYear = new Date().getFullYear() + 1
) => {
  const months = [];
  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      const value = `${year}-${month.toString().padStart(2, "0")}`;
      const label = new Date(year, month - 1).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      months.push({ value, label });
    }
  }
  return months;
};


const ApprovePayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");

  const monthsList = generateMonths(2023);

  // Mock data (replace with API)
  useEffect(() => {
    setPayrolls([
      {
        id: 1,
        empId: "EMP001",
        name: "Basavaraj",
        department: "IT",
        month: "2025-11",
        basic: 30000,
        allowances: 5000,
        deductions: 2000,
        netSalary: 33000,
        status: "Submitted",
      },
      {
        id: 2,
        empId: "EMP002",
        name: "Deepak",
        department: "HR",
        month: "2025-11",
        basic: 28000,
        allowances: 4000,
        deductions: 1500,
        netSalary: 30500,
        status: "Submitted",
      },
      {
        id: 3,
        empId: "EMP003",
        name: "Arun",
        department: "Finance",
        month: "2025-10",
        basic: 35000,
        allowances: 6000,
        deductions: 3000,
        netSalary: 38000,
        status: "Submitted",
      },


      {
        id:4,
        empId:"EMP004",
        name:"Varun",
        department:"Finance",
        month:"2025-10",
        basic:35000,
        allowances:6000,
        deductions:3000,
        netSalary:38000,
        status:"Submitted",
      },
    ]);
  }, []);

  const handleApprove = (id) => {
    setPayrolls((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Approved" } : p
      )
    );
  };

  const handleReject = (id) => {
    setPayrolls((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Rejected" } : p
      )
    );
  };

  // FILTER LOGIC
  const filteredPayrolls = payrolls.filter((p) =>
    (search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.empId.toLowerCase().includes(search.toLowerCase())) &&
    (month === "" || p.month === month) &&
    p.status === "Submitted"
  );

  return (
    <div className

="approve-container">
      <h2>Approve Payroll</h2>

      {/* FILTER BAR */}
      <div className

="filter-bar">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      <select value={month} onChange={(e) => setMonth(e.target.value)}>
  <option value="">Select Month</option>
  {monthsList.map((m) => (
    <option key={m.value} value={m.value}>
      {m.label}
    </option>
  ))}
</select>


      </div>

      {/* TABLE */}
      <table className

="payroll-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Month</th>
            <th>Basic</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredPayrolls.length === 0 ? (
            <tr>
              <td colSpan="10" className

="no-data">
                No payrolls found
              </td>
            </tr>
          ) : (
            filteredPayrolls.map((p) => (
              <tr key={p.id}>
                <td>{p.empId}</td>
                <td>{p.name}</td>
                <td>{p.department}</td>
                <td>{p.month}</td>
                <td>₹{p.basic}</td>
                <td>₹{p.allowances}</td>
                <td>₹{p.deductions}</td>
                <td>₹{p.netSalary}</td>
                <td>
                  <span className

="status submitted">Submitted</span>
                </td>
                <td>
                  <button
                    className

="btn approve"
                    onClick={() => handleApprove(p.id)}
                  >
                    Approve
                  </button>
                  <button
                    className

="btn reject"
                    onClick={() => handleReject(p.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovePayroll;
