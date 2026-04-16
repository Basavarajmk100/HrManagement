import React, { useState } from "react";
import "../../styles/LeaveReport.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const mockLeaves = [
  { empId: "EMP001", name: "Basavaraj", leaveType: "Sick Leave", fromDate: "2026-01-05", toDate: "2026-01-07", totalDays: 3, status: "Approved" },
  { empId: "EMP002", name: "Ananya", leaveType: "Casual Leave", fromDate: "2026-01-10", toDate: "2026-01-11", totalDays: 2, status: "Pending" },
  { empId: "EMP003", name: "Ravi", leaveType: "Annual Leave", fromDate: "2026-01-12", toDate: "2026-01-15", totalDays: 4, status: "Approved" },
];

const LeaveReport = () => {
  const [filterEmp, setFilterEmp] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filter data based on search inputs
  const filteredLeaves = mockLeaves.filter(
    (leave) =>
      leave.name.toLowerCase().includes(filterEmp.toLowerCase()) &&
      (filterStatus === "" || leave.status === filterStatus)
  );

  // Export Excel for filtered results only
  const exportExcel = () => {
    if (filteredLeaves.length === 0) {
      alert("No data to export!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(filteredLeaves);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leave Report");
    XLSX.writeFile(wb, "LeaveReport.xlsx");
  };

  // Export PDF for filtered results only
  const exportPDF = () => {
    if (filteredLeaves.length === 0) {
      alert("No data to export!");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Leave Report", 14, 22);

    const tableColumn = ["Emp ID", "Name", "Leave Type", "From", "To", "Total Days", "Status"];
    const tableRows = [];

    filteredLeaves.forEach((leave) => {
      tableRows.push([
        leave.empId,
        leave.name,
        leave.leaveType,
        leave.fromDate,
        leave.toDate,
        leave.totalDays,
        leave.status,
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [30, 64, 175] }, // Blue header
    });

    doc.save("LeaveReport.pdf");
  };

  return (
    <div className

="leave-report-container">
      <h2 className

="report-header">Leave Report</h2>

      {/* Filters + Export Buttons */}
      <div className

="filters">
        <input
          type="text"
          placeholder="Search by Employee Name"
          value={filterEmp}
          onChange={(e) => setFilterEmp(e.target.value)}
          className

="filter-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className

="filter-select"
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Export Buttons */}
        <button className

="export-btn" onClick={exportExcel}>Export Excel</button>
        <button className

="export-btn" onClick={exportPDF}>Export PDF</button>
      </div>

      {/* Table */}
      <div className

="table-container">
        <table className

="leave-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Total Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.length === 0 ? (
              <tr>
                <td colSpan="7" className

="no-data">No records found</td>
              </tr>
            ) : (
              filteredLeaves.map((leave, index) => (
                <tr key={index} className

="table-row">
                  <td>{leave.empId}</td>
                  <td>{leave.name}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.fromDate}</td>
                  <td>{leave.toDate}</td>
                  <td>{leave.totalDays}</td>
                  <td className

={`status ${leave.status.toLowerCase()}`}>{leave.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveReport;
