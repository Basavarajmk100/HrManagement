import React, { useState } from "react";
import "../../../styles/SubscribedCompanies.css";
import { MoreVertical } from "lucide-react";

const SubscribedCompanies = ({ isDark, isSimple, isColorful, theme }) => {

  const COMPANIES_DATA = [
    { id: "C001", name: "Kinsoft Technologies", plan: "Premium", startDate: "2025-01-10", endDate: "2026-01-10", status: "Active" },
    { id: "C002", name: "Key Computers Pvt Ltd", plan: "Basic", startDate: "2024-12-01", endDate: "2025-12-01", status: "Expired" },
    { id: "C003", name: "ABC Solutions Pvt Ltd", plan: "Standard", startDate: "2025-03-15", endDate: "2026-03-15", status: "Active" },
    { id: "C004", name: "TechNova Systems", plan: "Premium", startDate: "2025-07-01", endDate: "2026-07-01", status: "Active" },
    { id: "C005", name: "Bright IT Services", plan: "Basic", startDate: "2024-11-20", endDate: "2025-11-20", status: "Expired" },
    { id: "C006", name: "CloudWave Pvt Ltd", plan: "Standard", startDate: "2025-05-10", endDate: "2026-05-10", status: "Active" },
    { id: "C007", name: "NextGen Software", plan: "Premium", startDate: "2025-08-01", endDate: "2026-08-01", status: "Active" },
    { id: "C008", name: "SmartTech Solutions", plan: "Basic", startDate: "2024-09-15", endDate: "2025-09-15", status: "Expired" },
  ];

  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCompanies = COMPANIES_DATA.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "All" || c.plan === planFilter;
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  });

  return (



      <div className

={`companies-panel theme-${theme}`}>

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
            Subscribed Companies
          </h2>
          <p className

="table-subtitle">
            Overview of active and expired subscriptions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className

="subscription-filter">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
          <option>All</option>
          <option>Basic</option>
          <option>Standard</option>
          <option>Premium</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Active</option>
          <option>Expired</option>
        </select>
      </div>

      {/* Table */}
      <div className

="table-wrapper custom-scrollbar">
        <table className

="styled-table">
          <thead>
            <tr>
              <th>SL No</th>
              <th>Company ID</th>
              <th>Company Name</th>
              <th>Plan</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((c, index) => (
                <tr key={c.id} className

="table-row tr-card">
                  <td>{index + 1}</td>
                  <td className

="cell-id">{c.id}</td>
                  <td className

="cell-name">{c.name}</td>
                  <td>{c.plan}</td>
                  <td>{c.startDate}</td>
                  <td>{c.endDate}</td>

                  {/* Status Pill */}
                  <td style={{ textAlign: "center" }}>
                    <span
                      className

="status-pill"
                      style={{
                        background:
                          c.status === "Active"
                            ? "rgba(0,200,83,0.1)"
                            : "rgba(255,82,82,0.1)",
                        color:
                          c.status === "Active"
                            ? "#00C853"
                            : "#FF5252",
                        border: isDark
                          ? `1px solid ${
                              c.status === "Active"
                                ? "rgba(0,200,83,0.3)"
                                : "rgba(255,82,82,0.3)"
                            }`
                          : "none"
                      }}
                    >
                      {c.status}
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
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No companies found
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
            Showing {filteredCompanies.length} results
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
    </div>
    </div>
  );
};

export default SubscribedCompanies;