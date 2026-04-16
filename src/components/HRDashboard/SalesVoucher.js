import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SalesVoucher.css";

const SalesVoucher = () => {

  const navigate = useNavigate();

  const [sales, setSales] = useState([
    { id: 1, voucherNo: "SV-2001", customer: "Tech Solutions", amount: 8500, date: "2026-03-01", status: "Paid" },
    { id: 2, voucherNo: "SV-2002", customer: "Bright Traders", amount: 4200, date: "2026-03-05", status: "Pending" },
    { id: 3, voucherNo: "SV-2003", customer: "Metro Retail", amount: 6100, date: "2026-03-07", status: "Paid" },
    { id: 4, voucherNo: "SV-2004", customer: "Sunrise Stores", amount: 3000, date: "2026-03-10", status: "Pending" }
  ]);

  const [search, setSearch] = useState("");


   
  const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  const filtered = sales.filter(s =>
    s.customer.toLowerCase().includes(search.toLowerCase())
  );

return (
  <div className

={`sales-container theme-${theme}`}>

    {/* BACKGROUND EFFECTS */}
    <div className

="bg-canvas">
      {(isDark || isColorful) && (
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

    {/* MAIN PANEL */}
    <div className

="table-panel">

      {/* HEADER */}
      <div className

="table-header-row">
        <div>
          <div className

="table-title">Sales Voucher</div>
          <div className

="table-subtitle">
            Manage sales vouchers
          </div>
        </div>

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className

="searchInput"
        />

        <button
          className

="add-btn"
          onClick={() => navigate("/finance/add-sales-voucher")}
        >
          + Add Sales Voucher
        </button>
      </div>

      {/* TABLE */}
      <div className

="table-wrapper">
        <table className

="styled-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Voucher No</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className

="noData">
                  No sales vouchers found
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className

="table-row">

                  <td>{s.id}</td>

                  <td>{s.voucherNo}</td>

                  {/* Customer with avatar */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className

="cell-avatar">
                        {s.customer.charAt(0)}
                      </div>
                      <span className

="cell-name">{s.customer}</span>
                    </div>
                  </td>

                  <td>₹{s.amount}</td>

                  <td>{s.date}</td>

                  <td>
                    <span className

={`status-pill ${s.status === "Paid" ? "paid" : "pending"}`}>
                      {s.status}
                    </span>
                  </td>

                  <td>
                    <div className

="action-group">
                      <button className

="more-action-btn">View</button>
                      <button className

="more-action-btn">Edit</button>
                      <button className

="more-action-btn delete">Delete</button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  </div>
);
};

export default SalesVoucher;