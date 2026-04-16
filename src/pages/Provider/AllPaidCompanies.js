import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../../styles/AllPaidCompanies.css";

const AllPaidCompanies = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("all");



  
 const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  const paidCompanies = [
    { id: 1, name: "ABC Pvt Ltd", amount: "₹10,000", date: "2025-01-10", status: "Paid" },
    { id: 2, name: "XYZ Technologies", amount: "₹15,000", date: "2025-01-12", status: "Paid" },
    { id: 3, name: "Tech Solutions", amount: "₹8,000", date: "2025-01-15", status: "Paid" },
    { id: 4, name: "Delta Systems", amount: "₹12,000", date: "2025-01-16", status: "Paid" }
  ];

  const getFilteredByDate = (data) => {
    const today = new Date();
    if (dateFilter === "today") return data.filter(c => c.date === today.toISOString().split("T")[0]);
    if (dateFilter === "last7") {
      const last7 = new Date(); last7.setDate(today.getDate() - 7);
      return data.filter(c => new Date(c.date) >= last7);
    }
    if (dateFilter === "last30") {
      const last30 = new Date(); last30.setDate(today.getDate() - 30);
      return data.filter(c => new Date(c.date) >= last30);
    }
    return data;
  };

  const filteredData = getFilteredByDate(
    paidCompanies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  );

  const itemsPerPage = 3;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map(c => ({
        "Company ID": c.id,
        "Company Name": c.name,
        "Paid Amount": c.amount,
        "Paid Date": c.date,
        "Status": c.status
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Paid Companies");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "Paid_Companies_Report.xlsx");
  };

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

="table-title">All Paid Companies</h2>
            <p className

="table-subtitle">Live overview of all payments</p>
          </div>
          <button className

="add-btn" onClick={exportToExcel}>
            Export Excel
          </button>
        </div>

        <div className

="table-wrapper custom-scrollbar">
          <table className

="styled-table">
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>
                <th>Paid Amount</th>
                <th>Paid Date</th>
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
                  <td>{c.date}</td>
                  <td>
                    <span className

="status-pill paid">{c.status}</span>
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

export default AllPaidCompanies;