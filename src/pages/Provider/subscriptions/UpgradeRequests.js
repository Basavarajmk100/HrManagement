import React, { useState } from "react";
import "../../../styles/UpgradeRequests.css";
import { MoreVertical } from "lucide-react";

const UpgradeRequests = () => {

  const data = [
    { id: "CMP001", company: "Sunrise Pvt Ltd", currentPlan: "Basic", requestedPlan: "Premium", users: 60, status: "Pending" },
    { id: "CMP002", company: "TechWave Solutions", currentPlan: "Premium", requestedPlan: "Enterprise", users: 180, status: "Pending" },
    { id: "CMP003", company: "Key Computers", currentPlan: "Basic", requestedPlan: "Premium", users: 45, status: "Pending" },
    { id: "CMP004", company: "GreenLeaf Software", currentPlan: "Basic", requestedPlan: "Enterprise", users: 120, status: "Pending" },
  ];

  const [search, setSearch] = useState("");


   const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";


  const filteredData = data.filter(item =>
    item.company.toLowerCase().includes(search.toLowerCase())
  );

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
    </div>

    



    <div className

="table-panel fade-in">

      {/* HEADER */}
      <div className

="table-header-row">
        <div>
          <h2 className

="table-title">Upgrade Requests</h2>
          <p className

="table-subtitle">
            Companies requesting plan upgrades
          </p>
        </div>

        <input
          type="text"
          placeholder="Search company..."
          className

="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className

="table-wrapper custom-scrollbar">
        <table className

="styled-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Current Plan</th>
              <th>Requested Plan</th>
              <th>Licenses</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className

="table-row tr-card">

                  {/* Company Column */}
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

="cell-id">{item.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Current Plan */}
                  <td>
                    <span className

="cell-type">{item.currentPlan}</span>
                  </td>

                  {/* Requested Plan */}
                  <td>
                    <span className

="cell-type">
                      {item.requestedPlan}
                    </span>
                  </td>

                  {/* Users Progress Bar */}
                  <td>
                    <div className

="prog-container">
                      <span className

="prog-text">{item.users} Users</span>
                      <div className

="prog-track">
                        <div
                          className

="prog-fill"
                          style={{
                            width: `${Math.min(100, item.users)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ textAlign: "center" }}>
                    <span className

="status-pill status-pending">
                      {item.status}
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
                <td colSpan="6" className

="no-data">
                  No upgrade requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className

="simple-footer">
        <span style={{
          fontSize: 11,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--text-muted)"
        }}>
          Showing {filteredData.length} results
        </span>

        <div style={{ display: "flex", gap: 8 }}>
          <button className

="btn-outline">Prev</button>
          <button className

="btn-outline">Next</button>
        </div>
      </div>

    </div>
    </div>
  );
};

export default UpgradeRequests;