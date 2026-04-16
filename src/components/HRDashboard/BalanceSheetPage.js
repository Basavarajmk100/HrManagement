import React, { useState } from "react";
import "../../styles/BalanceSheet.css";

const BalanceSheetPage = () => {

  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

    const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  // 👉 Dummy Data
  const [assets] = useState([
    { name: "Cash", amount: 15000 },
    { name: "Bank (HDFC)", amount: 30000 },
    { name: "Accounts Receivable", amount: 12000 },
  ]);

  const [liabilities] = useState([
    { name: "Accounts Payable", amount: 10000 },
    { name: "Loan", amount: 20000 },
  ]);

  const [equity] = useState([
    { name: "Owner Capital", amount: 27000 },
  ]);

  // 👉 Format Currency
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  // 👉 Filter Data
  const filteredAssets = assets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLiabilities = liabilities.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  // 👉 Calculations
  const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.amount, 0);
  const totalEquity = equity.reduce((sum, e) => sum + e.amount, 0);

  const isBalanced = totalAssets === (totalLiabilities + totalEquity);

return (
  <div className

={`finance-page theme-${theme}`}>

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

="table-title">Balance Sheet</div>
          <div className

="table-subtitle">
            Overview of assets and liabilities
          </div>
        </div>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className

="dateInput"
        />

        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className

="searchInput"
        />
      </div>

      {/* WARNING */}
      {!isBalanced && (
        <div className

="error-box">
          ⚠ Balance Sheet Not Matching!
        </div>
      )}

      {/* TWO COLUMN CARDS */}
      <div className

="balance-grid">

        {/* ASSETS */}
        <div className

="balance-card glass-card">
          <h3>Assets</h3>

          <table className

="styled-table">
            <tbody>
              {filteredAssets.map((item, index) => (
                <tr key={index} className

="table-row">
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.amount)}</td>
                </tr>
              ))}

              <tr className

="total-row">
                <td><strong>Total Assets</strong></td>
                <td><strong>{formatCurrency(totalAssets)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* LIABILITIES */}
        <div className

="balance-card glass-card">
          <h3>Liabilities & Equity</h3>

          <table className

="styled-table">
            <tbody>

              {filteredLiabilities.map((item, index) => (
                <tr key={index} className

="table-row">
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.amount)}</td>
                </tr>
              ))}

              <tr className

="sub-total">
                <td><strong>Total Liabilities</strong></td>
                <td><strong>{formatCurrency(totalLiabilities)}</strong></td>
              </tr>

              {equity.map((item, index) => (
                <tr key={index} className

="table-row">
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.amount)}</td>
                </tr>
              ))}

              <tr className

="total-row">
                <td><strong>Total L + E</strong></td>
                <td>
                  <strong>{formatCurrency(totalLiabilities + totalEquity)}</strong>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>

    </div>

  </div>
);
};

export default BalanceSheetPage;