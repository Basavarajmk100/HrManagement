import React, { useState } from "react";
import "../../styles/PendingDues.css";

const PendingDues = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const pendingCompanies = [
    { id: 1, name: "Sunrise Pvt Ltd", amount: "₹12,000", dueDate: "2025-02-01", status: "Pending" },
    { id: 2, name: "Bright Tech", amount: "₹18,000", dueDate: "2025-02-05", status: "Pending" },
    { id: 3, name: "Blue Solutions", amount: "₹9,000", dueDate: "2025-02-10", status: "Pending" }
  ];



   const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  // ---- DATE FILTER LOGIC ----
  const getFilteredByDate = (data) => {
    const today = new Date();

    if (dateFilter === "today") {
      return data.filter(c => c.dueDate === today.toISOString().split("T")[0]);
    }
    if (dateFilter === "last7") {
      const last7 = new Date(); last7.setDate(today.getDate() - 7);
      return data.filter(c => new Date(c.dueDate) >= last7);
    }
    if (dateFilter === "last30") {
      const last30 = new Date(); last30.setDate(today.getDate() - 30);
      return data.filter(c => new Date(c.dueDate) >= last30);
    }
    return data;
  };

  const filteredData = getFilteredByDate(
    pendingCompanies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  );

  // ---- PAGINATION ----
  const itemsPerPage = 3;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  return (
  
  <div className

={`content theme-${theme}`}>

    {/* BACKGROUND EFFECTS */}
    <div className

="bg-canvas">
      {isDark && (
        <>
          <div className

="ambient-orb orb-1"></div>
          <div className

="ambient-orb orb-2"></div>
          <div className

="ambient-orb orb-3"></div>
          <div className

="ambient-orb orb-4"></div>

          <div
            className

="bg-glass-layer"
            style={{
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(100px)"
            }}
          ></div>
        </>
      )}

      {isColorful && (
        <>
          <div className

="ambient-orb orb-1"></div>
          <div className

="ambient-orb orb-2"></div>
          <div className

="ambient-orb orb-3"></div>
          <div className

="ambient-orb orb-4"></div>

          <div className

="bg-glass-layer"></div>
        </>
      )}
    </div>


      <div className

="table-panel fade-in">
        <div className

="table-header-row">
          <div>
            <h2 className

="table-title">Pending Dues</h2>
            <p className

="table-subtitle">Overview of all pending company payments</p>
          </div>
          {/* No Excel export here, can add if needed */}
        </div>

        <div className

="top-bar" style={{ marginBottom: "16px" }}>
          <input
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
          </select>
        </div>

        <div className

="table-wrapper custom-scrollbar">
          <table className

="styled-table">
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>
                <th>Due Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((c) => (
                <tr key={c.id} className

="table-row tr-card">
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.amount}</td>
                  <td>{c.dueDate}</td>
                  <td>
                    <span className

="status-pill pending">{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className

="simple-footer">
          <span>Showing {currentData.length} of {filteredData.length} results</span>
          <div className

="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
            <span>Page {currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLast >= filteredData.length}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingDues;