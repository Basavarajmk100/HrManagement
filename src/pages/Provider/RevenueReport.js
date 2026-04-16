import React, { useEffect, useState } from "react";
import "../../styles/RevenueReport.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const RevenueReport = () => {
  const [revenue, setRevenue] = useState([]);
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("All");

  useEffect(() => {
    const dummyRevenue = [
      { month: "January 2026", totalRevenue: 50000, paid: 35000, pending: 15000 },
      { month: "February 2026", totalRevenue: 60000, paid: 45000, pending: 15000 },
      { month: "March 2026", totalRevenue: 55000, paid: 50000, pending: 5000 },
      { month: "April 2026", totalRevenue: 70000, paid: 50000, pending: 20000 },
      { month: "May 2026", totalRevenue: 80000, paid: 75000, pending: 5000 },
    ];
    setRevenue(dummyRevenue);
  }, []);

  const filteredRevenue = revenue.filter(
    (r) =>
      (monthFilter === "All" || r.month === monthFilter) &&
      r.month.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = filteredRevenue.reduce(
    (sum, r) => sum + r.totalRevenue,
    0
  );
  const totalPaid = filteredRevenue.reduce((sum, r) => sum + r.paid, 0);
  const totalPending = filteredRevenue.reduce(
    (sum, r) => sum + r.pending,
    0
  );

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRevenue);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "Revenue_Report.xlsx");
  };

  return (
    <div className

="failed-payments">

      {/* HEADER PANEL */}
      <div className

="table-panel fade-in">
      
       

 <div className

="table-header-row">

  <div>
    <h2 className

="table-title">Revenue Report</h2>
    <p className

="table-subtitle">
      Monthly revenue breakdown and performance
    </p>
  </div>

  <button
    className

="add-btn"
    onClick={downloadExcel}
  >
    Download Excel
  </button>

</div>

{/* SEARCH + FILTER ROW */}

<div className

="filter-row">

  <input
    type="text"
    placeholder="Search month..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className

="users-search"
  />

  <select
    value={monthFilter}
    onChange={(e) => setMonthFilter(e.target.value)}
    className

="month-dropdown"
  >
    <option value="All">All Months</option>
    {revenue.map((r, i) => (
      <option key={i} value={r.month}>
        {r.month}
      </option>
    ))}
  </select>

</div>
      

        {/* SUMMARY CARDS */}
        <div className

="summaryGrid">
          <div className

="summaryCard">
            <h4>Total Revenue</h4>
            <p>₹ {totalRevenue.toLocaleString()}</p>
          </div>

          <div className

="summaryCard">
            <h4>Total Paid</h4>
            <p>₹ {totalPaid.toLocaleString()}</p>
          </div>

          <div className

="summaryCard">
            <h4>Pending</h4>
            <p>₹ {totalPending.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* CHART PANEL */}
      <div className

="table-panel fade-in">
        <div className

="table-header-row">
          <h3 className

="table-title">Revenue Trend</h3>
        </div>

        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="totalRevenue" stroke="#2563eb" />
              <Line type="monotone" dataKey="paid" stroke="#16a34a" />
              <Line type="monotone" dataKey="pending" stroke="#dc2626" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE PANEL */}
      <div className

="table-panel fade-in">
        <div className

="table-wrapper custom-scrollbar">
          <table className

="styled-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Revenue</th>
                <th>Paid</th>
                <th>Pending</th>
              </tr>
            </thead>

            <tbody>
              {filteredRevenue.map((r, i) => (
                <tr key={i} className

="table-row tr-card">
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div className

="cell-avatar">
                        {r.month.charAt(0)}
                      </div>
                      <span className

="cell-name">{r.month}</span>
                    </div>
                  </td>

                  <td>
                    <span className

="cell-total">
                      ₹ {r.totalRevenue.toLocaleString()}
                    </span>
                  </td>

                  <td>
                    <span className

="status-pill status-paid">
                      ₹ {r.paid.toLocaleString()}
                    </span>
                  </td>

                  <td>
                    <span
                      className

={`status-pill ${
                        r.pending > 0
                          ? "status-pending"
                          : "status-paid"
                      }`}
                    >
                      ₹ {r.pending.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}

              <tr className

Name="total-row">
                <td><strong>TOTAL</strong></td>
                <td>₹ {totalRevenue.toLocaleString()}</td>
                <td>₹ {totalPaid.toLocaleString()}</td>
                <td>₹ {totalPending.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default RevenueReport;