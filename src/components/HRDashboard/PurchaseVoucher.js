import React, { useState } from "react";
import "../../styles/PurchaseVoucher.css";

import { useNavigate } from "react-router-dom";

const PurchaseVoucher = () => {

    const navigate = useNavigate();

  const [vouchers, setVouchers] = useState([
  { id: 1, voucherNo: "PV-1001", vendor: "ABC Traders", amount: 5000, date: "2026-03-01", status: "Paid" },
  { id: 2, voucherNo: "PV-1002", vendor: "XYZ Supplies", amount: 3200, date: "2026-03-05", status: "Pending" },
  { id: 3, voucherNo: "PV-1003", vendor: "Global Electronics", amount: 7800, date: "2026-03-08", status: "Paid" },
  { id: 4, voucherNo: "PV-1004", vendor: "Tech World", amount: 4500, date: "2026-03-10", status: "Pending" },
  { id: 5, voucherNo: "PV-1005", vendor: "Sunrise Stationery", amount: 2100, date: "2026-03-12", status: "Paid" },
  { id: 6, voucherNo: "PV-1006", vendor: "Metro Suppliers", amount: 6400, date: "2026-03-14", status: "Pending" },
  { id: 7, voucherNo: "PV-1007", vendor: "Bright Office Solutions", amount: 3900, date: "2026-03-16", status: "Paid" },
  { id: 8, voucherNo: "PV-1008", vendor: "City Hardware", amount: 5600, date: "2026-03-18", status: "Pending" },
  { id: 9, voucherNo: "PV-1009", vendor: "Prime Industrial", amount: 9200, date: "2026-03-20", status: "Paid" },
  { id: 10, voucherNo: "PV-1010", vendor: "Skyline Distributors", amount: 4700, date: "2026-03-22", status: "Pending" }
]);
   


 const [search, setSearch] = useState("");


 
  const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

const filtered = vouchers.filter(v =>
    v.vendor.toLowerCase().includes(search.toLowerCase())
  );

return (
  <div className

={`purchase-container theme-${theme}`}>

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

    {/* MAIN PANEL (same as companies) */}
    <div className

="table-panel">

      {/* HEADER */}
      <div className

="table-header-row">
        <div>
          <div className

="table-title">Purchase Voucher</div>
          <div className

="table-subtitle">
            Manage purchase vouchers
          </div>
        </div>

        <input
          type="text"
          placeholder="Search vendor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className

="searchInput"
        />

        <button
          className

="add-btn"
          onClick={() => navigate("/finance/add-purchase-voucher")}
        >
          + Add Voucher
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
              <th>Vendor</th>
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
                  No vouchers found
                </td>
              </tr>
            ) : (
              filtered.map((v) => (
                <tr key={v.id} className

="table-row">

                  <td>{v.id}</td>

                  <td>{v.voucherNo}</td>

                  {/* Vendor with avatar (like companies) */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className

="cell-avatar">
                        {v.vendor.charAt(0)}
                      </div>
                      <span className

="cell-name">{v.vendor}</span>
                    </div>
                  </td>

                  <td>₹{v.amount}</td>

                  <td>{v.date}</td>

                  <td>
                    <span className

={`status-pill ${v.status === "Paid" ? "paid" : "pending"}`}>
                      {v.status}
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

export default PurchaseVoucher;