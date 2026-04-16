import React, { useState } from "react";
import "../../../styles/CompanyReport.css";

const ActivePlans = () => {

  const data = [
    { company: "Kinsoft Technologies", plan: "Premium", users: 100, expiry: "2026-12-30", status: "Active" },
    { company: "Key Computers", plan: "Basic", users: 50, expiry: "2026-11-15", status: "Active" },
    { company: "Sunrise Pvt Ltd", plan: "Enterprise", users: 300, expiry: "2027-01-20", status: "Active" },
    { company: "Bright Tech", plan: "Premium", users: 150, expiry: "2026-10-10", status: "Due" },
    { company: "GreenLeaf Software", plan: "Basic", users: 25, expiry: "2026-09-05", status: "Expired" },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredData = data.filter((item) => {
    const matchSearch = item.company.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || item.status === filter;
    return matchSearch && matchFilter;
  });

  const totalActive = data.filter(d => d.status === "Active").length;
  const totalDue = data.filter(d => d.status === "Due").length;
  const totalExpired = data.filter(d => d.status === "Expired").length;

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

="table-title">Active Company Subscriptions</h2>
            <p className

="table-subtitle">
              Subscription plans and expiry tracking
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

            <select
              className

="search-box"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Active</option>
              <option>Due</option>
              <option>Expired</option>
            </select>
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
                <th>Expiry Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item, index) => (
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

                  <td>{item.expiry}</td>

                  <td>
                    <span
                      className

={`status-pill ${
                        item.status === "Active"
                          ? "status-paid"
                          : item.status === "Due"
                          ? "status-pending"
                          : "status-expired"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className

="no-data">
                    No subscriptions found
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

export default ActivePlans;