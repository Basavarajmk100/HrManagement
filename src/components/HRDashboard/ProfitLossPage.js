import React, { useState } from "react";
import "../../styles/ProfitLoss.css";

const ProfitLossPage = () => {

  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");


   const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  // 👉 Dummy Data
  const [income] = useState([
    { name: "Sales Revenue", amount: 50000 },
    { name: "Service Income", amount: 20000 },
  ]);

  const [expenses] = useState([
    { name: "Salary Expense", amount: 25000 },
    { name: "Office Rent", amount: 10000 },
    { name: "Electricity", amount: 5000 },
  ]);

  // 👉 Currency Format
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  // 👉 Filter
  const filteredIncome = income.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredExpenses = expenses.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  // 👉 Calculations
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const profit = totalIncome - totalExpenses;
  const isProfit = profit >= 0;

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

="table-title">Profit & Loss Account</div>
          <div className

="table-subtitle">
            Overview of income and expenses
          </div>
        </div>

        <input
          type="date"
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

      {/* PROFIT / LOSS SUMMARY */}
      <div className

="pl-summary">
        <div className

="pl-card income">
          <h4>Total Income</h4>
          <p>₹{totalIncome}</p>
        </div>

        <div className

="pl-card expense">
          <h4>Total Expenses</h4>
          <p>₹{totalExpenses}</p>
        </div>

        <div className

={`pl-card result ${totalIncome >= totalExpenses ? "profit" : "loss"}`}>
          <h4>{totalIncome >= totalExpenses ? "Net Profit" : "Net Loss"}</h4>
          <p>₹{Math.abs(totalIncome - totalExpenses)}</p>
        </div>
      </div>

      {/* TWO COLUMN TABLES */}
      <div className

="balance-grid">

        {/* INCOME */}
        <div className

="balance-card glass-card">
          <h3>Income</h3>

          <table className

="styled-table">
            <tbody>
              {filteredIncome.map((item, index) => (
                <tr key={index} className

="table-row">
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.amount)}</td>
                </tr>
              ))}

              <tr className

="total-row">
                <td><strong>Total Income</strong></td>
                <td><strong>{formatCurrency(totalIncome)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* EXPENSES */}
        <div className

="balance-card glass-card">
          <h3>Expenses</h3>

          <table className

="styled-table">
            <tbody>
              {filteredExpenses.map((item, index) => (
                <tr key={index} className

="table-row">
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.amount)}</td>
                </tr>
              ))}

              <tr className

="total-row">
                <td><strong>Total Expenses</strong></td>
                <td><strong>{formatCurrency(totalExpenses)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>

  </div>
);
};

export default ProfitLossPage;