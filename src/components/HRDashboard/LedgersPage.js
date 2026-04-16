import React, { useState } from "react";
import "../../styles/Ledgers.css";


const LedgersPage = () => {

  const [ledgers, setLedgers] = useState([
    { id: 1, name: "ABC Traders", type: "Vendor", balance: 5000, status: "Active" },
    { id: 2, name: "Salary Expense", type: "Expense", balance: 0, status: "Active" },
    { id: 3, name: "HDFC Bank", type: "Bank", balance: 20000, status: "Active" },



  { id: 4, name: "Cash", type: "Asset", balance: 15000, status: "Active" },
  { id: 5, name: "Office Rent", type: "Expense", balance: 10000, status: "Active" },
  { id: 6, name: "Electricity Expense", type: "Expense", balance: 3000, status: "Active" },
  { id: 7, name: "Internet Expense", type: "Expense", balance: 2000, status: "Active" },

  { id: 8, name: "XYZ Supplies", type: "Vendor", balance: 8000, status: "Active" },
  { id: 9, name: "Customer A", type: "Customer", balance: 12000, status: "Active" },
  { id: 10, name: "Customer B", type: "Customer", balance: 7000, status: "Active" },

  { id: 11, name: "Sales Revenue", type: "Income", balance: 50000, status: "Active" },
  { id: 12, name: "Service Income", type: "Income", balance: 20000, status: "Active" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedLedger, setSelectedLedger] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "",
    balance: 0,
    status: "Active"
  });

  const [transactions, setTransactions] = useState([]);

    const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  // 👉 Open Create Popup
  const openCreate = () => {
    setForm({ name: "", type: "", balance: 0, status: "Active" });
    setEditId(null);
    setShowPopup(true);
  };

  // 👉 Save Ledger
  const saveLedger = () => {
    if (editId) {
      setLedgers(ledgers.map(l =>
        l.id === editId ? { ...l, ...form } : l
      ));
    } else {
      setLedgers([
        ...ledgers,
        { id: ledgers.length + 1, ...form }
      ]);
    }
    setShowPopup(false);
  };

  // 👉 Edit Ledger
  const editLedger = (ledger) => {
    setForm(ledger);
    setEditId(ledger.id);
    setShowPopup(true);
  };

  // 👉 Delete Ledger
  const deleteLedger = (id) => {
    setLedgers(ledgers.filter(l => l.id !== id));
  };

  // 👉 View Transactions
  const viewTransactions = (ledger) => {
    setSelectedLedger(ledger);

    // Dummy transactions
    setTransactions([
      { date: "2026-03-01", voucher: "PV-1001", debit: 0, credit: 5000, balance: 5000 },
      { date: "2026-03-05", voucher: "PAY-001", debit: 2000, credit: 0, balance: 3000 }
    ]);
  };
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

="table-title">Ledgers</div>
          <div className

="table-subtitle">
            Manage all ledger accounts
          </div>
        </div>

        <button className

="add-btn" onClick={openCreate}>
          + Create Ledger
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
              <th>Ledger Name</th>
              <th>Type</th>
              <th>Opening Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {ledgers.length === 0 ? (
              <tr>
                <td colSpan="6" className

="noData">
                  No ledgers found
                </td>
              </tr>
            ) : (
              ledgers.map((ledger) => (
                <tr key={ledger.id} className

="table-row">

                  <td>{ledger.id}</td>

                  {/* Ledger Name with avatar */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className

="cell-avatar">
                        {ledger.name.charAt(0)}
                      </div>
                      <span className

="cell-name">{ledger.name}</span>
                    </div>
                  </td>

                  <td>{ledger.type}</td>

                  <td>₹{ledger.balance}</td>

                  <td>
                    <span className

={`status-pill ${ledger.status === "Active" ? "paid" : "pending"}`}>
                      {ledger.status}
                    </span>
                  </td>

                  <td>
                    <div className

="action-group">
                      <button className

="more-action-btn" onClick={() => viewTransactions(ledger)}>View</button>
                      <button className

="more-action-btn" onClick={() => editLedger(ledger)}>Edit</button>
                      <button className

="more-action-btn delete" onClick={() => deleteLedger(ledger.id)}>Delete</button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>

    {/* CREATE / EDIT MODAL */}
    {showPopup && (
      <div className

="invoice-modal">
        <div className

="invoice-modal-content">

          <h3>{editId ? "Edit Ledger" : "Create Ledger"}</h3>

          <input
            placeholder="Ledger Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option>Asset</option>
            <option>Expense</option>
            <option>Income</option>
            <option>Vendor</option>
            <option>Customer</option>
            <option>Bank</option>
          </select>

          <input
            type="number"
            placeholder="Opening Balance"
            value={form.balance}
            onChange={(e) => setForm({ ...form, balance: e.target.value })}
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className

="invoice-actions">
            <button onClick={saveLedger}>Save</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>

        </div>
      </div>
    )}

    {/* TRANSACTIONS VIEW */}
    {selectedLedger && (
      <div className

="table-panel" style={{ marginTop: "20px" }}>

        <div className

="table-header-row">
          <div className

="table-title">
            {selectedLedger.name} - Transactions
          </div>

          <button className

="add-btn" onClick={() => setSelectedLedger(null)}>
            Close
          </button>
        </div>

        <div className

="table-wrapper">
          <table className

="styled-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Voucher</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className

="table-row">
                  <td>{t.date}</td>
                  <td>{t.voucher}</td>
                  <td>{t.debit}</td>
                  <td>{t.credit}</td>
                  <td>{t.balance}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    )}

  </div>
);
};

export default LedgersPage;