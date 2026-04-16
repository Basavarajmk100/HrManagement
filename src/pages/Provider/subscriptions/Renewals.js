import React, { useState } from "react";
import "../../../styles/Renewals.css";
import { MoreVertical } from "lucide-react";

const Renewals = ({ isDark, isSimple }) => {

  const RENEWAL_DATA = [
    { id: "C001", company: "Kinsoft Technologies", plan: "Premium", renewalDate: "2026-01-10", autoRenew: "Yes" },
    { id: "C003", company: "ABC Solutions", plan: "Standard", renewalDate: "2025-09-20", autoRenew: "No" },
    { id: "C004", company: "TechNova Systems", plan: "Premium", renewalDate: "2026-07-01", autoRenew: "Yes" },
    { id: "C005", company: "Bright IT Services", plan: "Basic", renewalDate: "2025-11-20", autoRenew: "No" },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Days Left
  const getDaysLeft = (date) => {
    const today = new Date();
    const renew = new Date(date);
    return Math.ceil((renew - today) / (1000 * 60 * 60 * 24));
  };

  const filteredData = RENEWAL_DATA.filter((r) => {
    const matchSearch = r.company.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.autoRenew === filter;
    return matchSearch && matchFilter;
  });

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
            Upcoming Renewals
          </h2>
          <p className

="table-subtitle">
            Track subscription renewal timelines and auto-renew status
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className

="renewal-filter">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      {/* Table */}
      <div className

="table-wrapper custom-scrollbar">
        <table className

="styled-table">
          <thead>
            <tr>
              <th>Company ID</th>
              <th>Company Name</th>
              <th>Plan</th>
              <th>Renewal Date</th>
              <th style={{ textAlign: "center" }}>Days Left</th>
              <th style={{ textAlign: "center" }}>Auto Renew</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((r) => {
                const daysLeft = getDaysLeft(r.renewalDate);

                return (
                  <tr key={r.id} className

="table-row tr-card">
                    <td className

="cell-id">{r.id}</td>
                    <td className

="cell-name">{r.company}</td>
                    <td>{r.plan}</td>
                    <td>{r.renewalDate}</td>

                    {/* Days Left */}
                    <td style={{ textAlign: "center" }}>
                      <span
                        className

="status-pill"
                        style={{
                          background:
                            daysLeft <= 30
                              ? "rgba(255,82,82,0.1)"
                              : "rgba(255,193,7,0.1)",
                          color:
                            daysLeft <= 30
                              ? "#FF5252"
                              : "#FFC107"
                        }}
                      >
                        {daysLeft} days
                      </span>
                    </td>

                    {/* Auto Renew */}
                    <td style={{ textAlign: "center" }}>
                      <span
                        className

="status-pill"
                        style={{
                          background:
                            r.autoRenew === "Yes"
                              ? "rgba(0,200,83,0.1)"
                              : "rgba(255,82,82,0.1)",
                          color:
                            r.autoRenew === "Yes"
                              ? "#00C853"
                              : "#FF5252",
                          border: isDark
                            ? `1px solid ${
                                r.autoRenew === "Yes"
                                  ? "rgba(0,200,83,0.3)"
                                  : "rgba(255,82,82,0.3)"
                              }`
                            : "none"
                        }}
                      >
                        {r.autoRenew}
                      </span>
                    </td>

                    {/* Action */}
                    <td style={{ textAlign: "right" }}>
                      <button className

="more-action-btn">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No renewals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Simple Footer */}
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
            Showing {filteredData.length} results
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            <button className

="btn-outline">Prev</button>
            <button className

="btn-outline">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Renewals;