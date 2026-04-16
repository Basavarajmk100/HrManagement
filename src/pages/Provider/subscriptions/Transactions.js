import React, { useState, useMemo } from "react";
import "../../../styles/Transactions.css";
import { Download } from "lucide-react";

const Transactions = ({ isDark, isSimple, isColorful }) => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const TRANSACTIONS_DATA = [
    { id: "TXN001", company: "ABC Pvt Ltd", amount: 1999, method: "Razorpay", date: "2026-02-10", status: "Success" },
    { id: "TXN002", company: "XYZ Solutions", amount: 999, method: "UPI", date: "2026-02-09", status: "Pending" },
    { id: "TXN003", company: "Tech Corp", amount: 3999, method: "Card", date: "2026-02-08", status: "Failed" },
    { id: "TXN004", company: "Global HR", amount: 1999, method: "UPI", date: "2026-02-07", status: "Success" },
    { id: "TXN005", company: "NextGen Pvt Ltd", amount: 999, method: "Card", date: "2026-02-06", status: "Success" },
    { id: "TXN006", company: "Future Tech", amount: 3999, method: "Razorpay", date: "2026-02-05", status: "Success" },
  ];

  // Filter
  const filtered = TRANSACTIONS_DATA.filter((txn) => {
    const matchesSearch = txn.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Revenue (Success only)
  const totalRevenue = useMemo(() => {
    return filtered
      .filter((txn) => txn.status === "Success")
      .reduce((sum, txn) => sum + txn.amount, 0);
  }, [filtered]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className

="table-panel fade-in">

      {/* Header */}
      <div className

="table-header-row">
        <div>
          <h2
            className

="table-title"
            style={{ color: isDark ? "#ffffff" : "inherit" }}
          >
            Transactions
          </h2>
          <p className

="table-subtitle">
            Monitor payments, status and revenue performance
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className

="top-controls">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Revenue Box */}
      <div
        className

="revenue-box"
        style={{
          background: isColorful
            ? "linear-gradient(to right, #FA85B9, #C387C2)"
            : isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(250,133,185,0.08)",
          color: isDark ? "#ffffff" : "inherit"
        }}
      >
        Total Revenue (Success Only): ₹{totalRevenue}
      </div>

      {/* Table */}
      <div className

="table-wrapper custom-scrollbar">
        <table className

="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((txn) => (
                <tr key={txn.id} className

="table-row tr-card">
                  <td className

="cell-id">{txn.id}</td>
                  <td className

="cell-name">{txn.company}</td>

                  <td style={{ color: isDark ? "#ffffff" : "inherit" }}>
                    ₹{txn.amount}
                  </td>

                  <td>{txn.method}</td>
                  <td>{txn.date}</td>

                  {/* Status Pill */}
                  <td style={{ textAlign: "center" }}>
                    <span
                      className

="status-pill"
                      style={{
                        background:
                          txn.status === "Success"
                            ? "rgba(0,200,83,0.1)"
                            : txn.status === "Pending"
                            ? "rgba(255,193,7,0.1)"
                            : "rgba(255,82,82,0.1)",
                        color:
                          txn.status === "Success"
                            ? "#00C853"
                            : txn.status === "Pending"
                            ? "#FFC107"
                            : "#FF5252",
                        border: isDark
                          ? `1px solid ${
                              txn.status === "Success"
                                ? "rgba(0,200,83,0.3)"
                                : txn.status === "Pending"
                                ? "rgba(255,193,7,0.3)"
                                : "rgba(255,82,82,0.3)"
                            }`
                          : "none"
                      }}
                    >
                      {txn.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td style={{ textAlign: "right" }}>
                    <button className

="more-action-btn">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Simple Footer Pagination */}
      {isSimple && (
        <div className

="simple-footer">
          <span
            style={{
              fontSize: 11,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-muted)"
            }}
          >
            Page {currentPage} of {totalPages}
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              className

="btn-outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            <button
              className

="btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;