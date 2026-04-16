import React, { useState } from "react";
import "../../styles/BillingHistory.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

const BillingHistory = ({ isDark, isSimple, isColorful, theme }) => {

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const BILLING_DATA = [
    { id: 1, company: "ABC Pvt Ltd", plan: "Pro", amount: 5000, date: "2026-02-10", status: "Paid", invoice: "INV-1001" },
    { id: 2, company: "XYZ Solutions", plan: "Basic", amount: 2000, date: "2026-01-25", status: "Paid", invoice: "INV-1002" },
    { id: 3, company: "Tech Corp", plan: "Enterprise", amount: 10000, date: "2026-01-05", status: "Failed", invoice: "INV-1003" },
    { id: 4, company: "NextGen", plan: "Pro", amount: 5000, date: "2026-02-01", status: "Paid", invoice: "INV-1004" },
    { id: 5, company: "CloudSys", plan: "Basic", amount: 2000, date: "2026-01-15", status: "Paid", invoice: "INV-1005" }
  ];



  // Filter
  const filteredData = BILLING_DATA.filter((item) => {
    const matchSearch = item.company.toLowerCase().includes(search.toLowerCase());
    const matchMonth = month ? item.date.startsWith(month) : true;
    return matchSearch && matchMonth;
  });

  // Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BillingHistory");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "BillingHistory.xlsx");
  };

  const downloadInvoice = (invoice) => {
    alert("Downloading invoice: " + invoice);
  };

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

      {/* Header */}
      <div className

="table-header-row">
        <div>
          <h2 
            className

="table-title"
            style={{ color: isDark ? "#ffffff" : "inherit" }}
          >
            Billing History
          </h2>
          <p className

="table-subtitle">
            Complete overview of invoices and payments
          </p>
        </div>

        <button
          className

="add-btn"
          style={{
            background: isSimple
              ? "rgba(250,133,185,0.1)"
              : isDark
              ? "rgba(255,255,255,0.1)"
              : "linear-gradient(to right, #FA85B9, #C387C2)",
            color: isSimple ? "#FA85B9" : "#fff",
            border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
            boxShadow: isColorful
              ? "0 8px 20px rgba(250,133,185,0.3)"
              : "none"
          }}
          onClick={exportExcel}
        >
          Export
        </button>
      </div>

      {/* Filters */}
      <div className

="billing-filters">
        <input
          type="text"
          placeholder="Search company..."
          className

="billing-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className

="table-wrapper custom-scrollbar">
        <table className

="styled-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Company</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className

="table-row tr-card">
                  <td>{item.invoice}</td>
                  <td className

="cell-name">{item.company}</td>
                  <td>{item.plan}</td>
                  <td style={{ color: isDark ? "#ffffff" : "inherit" }}>
                    ₹{item.amount}
                  </td>
                  <td>{item.date}</td>

                  {/* Status Pill */}
                  <td style={{ textAlign: "center" }}>
                    <span
                      className

="status-pill"
                      style={{
                        background:
                          item.status === "Paid"
                            ? "rgba(0,200,83,0.1)"
                            : "rgba(255,82,82,0.1)",
                        color:
                          item.status === "Paid"
                            ? "#00C853"
                            : "#FF5252"
                      }}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td style={{ textAlign: "right" }}>
                    <button
                      className

="more-action-btn"
                      onClick={() => downloadInvoice(item.invoice)}
                    >
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No billing records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination (Simple Theme) */}
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
            Page {page} of {totalPages}
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              className

="btn-outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            <button
              className

="btn-outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>

    </div>
  );
};

export default BillingHistory;