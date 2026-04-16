import React, { useState } from "react";
import "../../styles/TrialBalance.css";

const TrialBalancePage = () => {
  const [search, setSearch] = useState("");

  const data = [
    { id: 1, account: "Cash", debit: 5000, credit: 0 },
    { id: 2, account: "Bank", debit: 10000, credit: 0 },
    { id: 3, account: "Sales", debit: 0, credit: 15000 },
    { id: 4, account: "Purchase", debit: 7000, credit: 0 },
    { id: 5, account: "Salary Expense", debit: 3000, credit: 0 },
  ];


    const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  const filteredData = data.filter((item) =>
    item.account.toLowerCase().includes(search.toLowerCase())
  );

  const totalDebit = filteredData.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = filteredData.reduce((sum, item) => sum + item.credit, 0);



  return (
  <div className

={`trial-page theme-${theme}`}>

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

="table-title">Trial Balance</div>
          <div className

="table-subtitle">
            View debit and credit balances
          </div>
        </div>

        <input
          type="text"
          placeholder="Search account..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className

="searchInput"
        />

        <input type="date" className

="dateInput" />
        <input type="date" className

="dateInput" />

        <button className

="add-btn">Export</button>
      </div>

      {/* TABLE */}
      <div className

="table-wrapper">
        <table className

="styled-table">

          <thead>
            <tr>
              <th>Account</th>
              <th>Debit (₹)</th>
              <th>Credit (₹)</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="3" className

="noData">
                  No records found
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id} className

="table-row">

                  {/* Account with avatar */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className

="cell-avatar">
                        {item.account.charAt(0)}
                      </div>
                      <span className

="cell-name">{item.account}</span>
                    </div>
                  </td>

                  <td className

="debit">
                    {item.debit !== 0 ? `₹${item.debit}` : "-"}
                  </td>

                  <td className

="credit">
                    {item.credit !== 0 ? `₹${item.credit}` : "-"}
                  </td>

                </tr>
              ))
            )}
          </tbody>

          {/* FOOTER TOTAL */}
          <tfoot>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>₹{totalDebit}</strong></td>
              <td><strong>₹{totalCredit}</strong></td>
            </tr>
          </tfoot>

        </table>
      </div>

      {/* ERROR MESSAGE */}
      {totalDebit !== totalCredit && (
        <div className

="error-box">
          ⚠ Debit and Credit are not matching!
        </div>
      )}

    </div>

  </div>
);
};

export default TrialBalancePage;