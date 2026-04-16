import React, { useState } from "react";
import "../../styles/PaymentOverview.css";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaExclamationCircle,
  FaChartLine,
  FaArrowUp,
} from "react-icons/fa";

const PaymentOverview = () => {
  const [search, setSearch] = useState("");

  const data = {
    totalRevenue: 1250000,
    thisMonthRevenue: 185000,
    pendingAmount: 95000,
    lastMonthRevenue: 150000,
  };

  const collectionRate = (
    ((data.totalRevenue - data.pendingAmount) / data.totalRevenue) *
    100
  ).toFixed(1);

  const growth = (
    ((data.thisMonthRevenue - data.lastMonthRevenue) /
      data.lastMonthRevenue) *
    100
  ).toFixed(1);

  const transactions = [
    { id: 1, company: "Kinsoft Technologies", amount: 30000, status: "Paid" },
    { id: 2, company: "Key Computers", amount: 20000, status: "Pending" },
    { id: 3, company: "ABC Solutions", amount: 50000, status: "Paid" },
  ];

  const filteredTransactions = transactions.filter((txn) =>
    txn.company.toLowerCase().includes(search.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ["Company", "Amount", "Status"];
    const rows = filteredTransactions.map((txn) => [
      txn.company,
      txn.amount,
      txn.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
  };

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

="table-title">Payment Overview</h2>
            <p className

="table-subtitle">
              Revenue summary and recent transactions
            </p>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className

="summaryGrid">
          <div className

="summaryCard">
            <FaMoneyBillWave className

="card-icon blue" />
            <h4>Total Revenue</h4>
            <p>₹ {data.totalRevenue.toLocaleString()}</p>
          </div>

          <div className

="summaryCard">
            <FaCalendarAlt className

="card-icon purple" />
            <h4>This Month</h4>
            <p>₹ {data.thisMonthRevenue.toLocaleString()}</p>
            <span className

="growth">
              <FaArrowUp /> {growth}% vs last month
            </span>
          </div>

          <div className

="summaryCard">
            <FaExclamationCircle className

="card-icon orange" />
            <h4>Pending</h4>
            <p>₹ {data.pendingAmount.toLocaleString()}</p>
          </div>

          <div className

="summaryCard">
            <FaChartLine className

="card-icon green" />
            <h4>Collection Rate</h4>
            <p>{collectionRate}%</p>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS TABLE PANEL */}
      <div className

="table-panel fade-in">
        <div className

="table-header-row">
          <h3 className

="table-title">Recent Transactions</h3>

          <div style={{ display: "flex", gap: 12 }}>
            <input
              type="text"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className

="search-box"
            />
           
          </div>
        </div>

        <div className

="table-wrapper custom-scrollbar">
          <table className

="styled-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Amount</th>
                <th style={{ textAlign: "center" }}>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className

="table-row tr-card">
                  
                  {/* Company with Avatar */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div className

="cell-avatar">
                        {txn.company.charAt(0)}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span className

="cell-name">{txn.company}</span>
                        <span className

="cell-id">ID: {txn.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td>
                    <span className

="cell-total">
                      ₹ {txn.amount.toLocaleString()}
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ textAlign: "center" }}>
                    <span
                      className

={`status-pill ${
                        txn.status === "Paid"
                          ? "status-paid"
                          : "status-pending"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className

="simple-footer">
            <span>No transactions found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOverview;