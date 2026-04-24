import React, { useEffect, useState } from "react";
import "../../styles/CompanyReport.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const CompanyReport = () => {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);

  const theme = localStorage.getItem("theme") || "simple";
  const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        companyId: "C001",
        companyName: "Sunrise Pvt Ltd",
        users: 15,
        totalAmount: 12000,
        paid: 8000,
        due: 4000,
      },
      {
        id: 2,
        companyId: "C002",
        companyName: "Bright Tech",
        users: 20,
        totalAmount: 18000,
        paid: 10000,
        due: 8000,
      },
      {
        id: 3,
        companyId: "C003",
        companyName: "Blue Solutions",
        users: 10,
        totalAmount: 9000,
        paid: 5000,
        due: 4000,
      },
      {
        id: 4,
        companyId: "C004",
        companyName: "Green Energy Co",
        users: 25,
        totalAmount: 25000,
        paid: 20000,
        due: 5000,
      },
      {
        id: 5,
        companyId: "C005",
        companyName: "Tech Innovators",
        users: 30,
        totalAmount: 40000,
        paid: 35000,
        due: 5000,
      },
    ];

    setCompanies(dummyData);
  }, []);

  /* FILTER */
  const filteredCompanies = companies.filter(
    (c) =>
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.companyId.toLowerCase().includes(search.toLowerCase()),
  );

  /* TOTALS */
  const totalAmount = companies.reduce((sum, c) => sum + c.totalAmount, 0);
  const totalPaid = companies.reduce((sum, c) => sum + c.paid, 0);
  const totalDue = companies.reduce((sum, c) => sum + c.due, 0);

  /* DOWNLOAD EXCEL */
  const downloadExcel = () => {
    const excelData = filteredCompanies.map((c) => ({
      "Company ID": c.companyId,
      "Company Name": c.companyName,
      "Total Users": c.users,
      "Total Amount": c.totalAmount,
      "Paid Amount": c.paid,
      "Due Amount": c.due,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Company Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "Company_Report.xlsx");
  };

  return (
    <div className={`users-container theme-${theme}`}>
      {/* BACKGROUND EFFECTS */}
      <div className="bg-canvas">
        {isDark && (
          <>
            <div className="ambient-orb orb-1"></div>
            <div className="ambient-orb orb-2"></div>
            <div className="ambient-orb orb-3"></div>
            <div className="ambient-orb orb-4"></div>

            <div
              className="bg-glass-layer"
              style={{
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(100px)",
              }}
            ></div>
          </>
        )}

        {isColorful && (
          <>
            <div className="ambient-orb orb-1"></div>
            <div className="ambient-orb orb-2"></div>
            <div className="ambient-orb orb-3"></div>
            <div className="ambient-orb orb-4"></div>

            <div className="bg-glass-layer"></div>
          </>
        )}
      </div>

      {/* USERS PAGE CONTENT BELOW */}

      <div className="table-panel">
        {/* HEADER */}
        <div className="table-header-row">
          <div>
            <div className="table-title">Company Report</div>
            <div className="table-subtitle">
              Company revenue and payment overview
            </div>
          </div>

          <button className="add-btn" onClick={downloadExcel}>
            Download Excel
          </button>
        </div>

        {/* SEARCH */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="users-search"
          />
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Total Users</th>
                <th>Total Amount</th>
                <th>Paid</th>
                <th>Due</th>
              </tr>
            </thead>

            <tbody>
              {filteredCompanies.map((c) => (
                <tr className="table-row" key={c.id}>
                  {/* Company Avatar */}
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <div className="cell-avatar">
                        {c.companyName.charAt(0)}
                      </div>

                      <div>
                        <span className="cell-name">{c.companyName}</span>

                        <div className="cell-id">{c.companyId}</div>
                      </div>
                    </div>
                  </td>

                  <td>{c.users}</td>

                  <td className="cell-total">
                    ₹ {c.totalAmount.toLocaleString()}
                  </td>

                  <td>
                    <span className="status-pill status-paid">
                      ₹ {c.paid.toLocaleString()}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-pill ${
                        c.due > 0 ? "status-pending" : "status-paid"
                      }`}
                    >
                      ₹ {c.due.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}

              {/* TOTAL ROW */}

              <tr className="total-row">
                <td>
                  <strong>TOTAL</strong>
                </td>
                <td></td>
                <td>₹ {totalAmount.toLocaleString()}</td>
                <td>₹ {totalPaid.toLocaleString()}</td>
                <td>₹ {totalDue.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyReport;
