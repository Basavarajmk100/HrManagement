import React, { useState } from "react";
import "../../styles/FailedPayments.css";

const FailedPayments = () => {
  const [search, setSearch] = useState("");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const failedPayments = [
    { id: 1, company: "Kinsoft Technologies", amount: 30000, date: "2026-02-10", reason: "Insufficient Balance" },
    { id: 2, company: "Key Computers", amount: 20000, date: "2026-02-12", reason: "Card Expired" },
    { id: 3, company: "ABC Solutions", amount: 50000, date: "2026-02-14", reason: "UPI Timeout" },
    { id: 4, company: "Tech World", amount: 15000, date: "2026-02-15", reason: "Insufficient Balance" },
    { id: 5, company: "Future IT", amount: 25000, date: "2026-02-16", reason: "Card Expired" },
    { id: 6, company: "SoftLabs", amount: 40000, date: "2026-02-17", reason: "UPI Timeout" },
  ];

  // Filtering
  const filteredData = failedPayments.filter(
    (item) =>
      item.company.toLowerCase().includes(search.toLowerCase()) &&
      (reasonFilter === "All" || item.reason === reasonFilter)
  );

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Export CSV
  const exportToCSV = () => {
    const headers = ["Company", "Amount", "Date", "Reason"];
    const rows = filteredData.map((item) => [
      item.company,
      item.amount,
      item.date,
      item.reason,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "failed-payments.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className

="failed-payments">

      {/* HEADER */}
      <div className

="table-panel fade-in">
        <div className

="table-header-row">
          <div>
            <h2 className

="table-title">Failed Payments</h2>
            <p className

="table-subtitle">
              Live overview of all failed transactions
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className

="top-bar">
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
          >
            <option value="All">All Reasons</option>
            <option value="Insufficient Balance">Insufficient Balance</option>
            <option value="Card Expired">Card Expired</option>
            <option value="UPI Timeout">UPI Timeout</option>
          </select>

          <button className

="export-btn1" onClick={exportToCSV}>
            Export
          </button>
        </div>

        {/* TABLE */}
        <div className

="table-wrapper custom-scrollbar">
          <table className

="styled-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Amount</th>
                <th>Date</th>
                <th style={{ textAlign: "center" }}>Reason</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className

="table-row tr-card">
                  
                  {/* Company */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div className

="cell-avatar">
                        {item.company.charAt(0)}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span className

="cell-name">{item.company}</span>
                        <span className

="cell-id">ID: {item.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td>
                    <span className

="cell-total">
                      ₹ {item.amount.toLocaleString()}
                    </span>
                  </td>

                  {/* Date */}
                  <td>
                    <span className

="cell-type">{item.date}</span>
                  </td>

                  {/* Reason */}
                  <td style={{ textAlign: "center" }}>
                    <span className

="status-pill reason-badge">
                      {item.reason}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className

="simple-footer">
          <span
            style={{
              fontSize: 11,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Showing {currentItems.length} of {filteredData.length} results
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className

={`btn-outline ${
                  currentPage === i + 1 ? "active-page" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FailedPayments;