import React, { useState } from "react";
import "../../../styles/CompanyReport.css";

const ExpiredPlans = () => {

  const data = [
    { company: "ABC Pvt Ltd", plan: "Basic", users: 25, expiry: "2025-12-01" },
    { company: "TechWave Solutions", plan: "Premium", users: 120, expiry: "2025-11-20" },
    { company: "Skyline Solutions", plan: "Enterprise", users: 300, expiry: "2025-10-15" },
    { company: "GreenSoft India", plan: "Basic", users: 40, expiry: "2025-09-30" },
  ];

  const [search, setSearch] = useState("");

  const filteredData = data.filter(item =>
    item.company.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);

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

="table-title">Expired Subscriptions</h2>
            <p className

="table-subtitle">
              Companies with expired subscription plans
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <input
              type="text"
              className

="search-box"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
                <th>Company</th>
                <th>Plan</th>
                <th>User Limit</th>
                <th>Expired On</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className

="table-row tr-card">

                    {/* Company with Avatar */}
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div className

="cell-avatar">
                          {item.company.charAt(0)}
                        </div>
                        <span className

="cell-name">{item.company}</span>
                      </div>
                    </td>

                    <td>{item.plan}</td>

                    <td>
                      <span className

="cell-total">
                        {item.users}
                      </span>
                    </td>

                    <td>
                      <span className

="status-pill status-expired">
                        {item.expiry}
                      </span>
                    </td>

                    <td>
                      <button className

="export-btn">
                        Renew Plan
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className

="no-data">
                    No expired plans found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ExpiredPlans;