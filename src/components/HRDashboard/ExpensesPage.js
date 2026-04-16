import React, { useState } from "react";
import "../../styles/ExpensesPage.css";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Office Rent", amount: 10000, date: "2026-03-01", status: "Paid" },
    { id: 2, title: "Electricity Bill", amount: 3000, date: "2026-03-05", status: "Pending" },
    { id: 3, title: "Internet Charges", amount: 1200, date: "2026-03-06", status: "Paid" },
    { id: 4, title: "Employee Salary", amount: 25000, date: "2026-03-07", status: "Paid" },
    { id: 5, title: "Office Supplies", amount: 1800, date: "2026-03-08", status: "Pending" },
    { id: 6, title: "Travel Expense", amount: 2200, date: "2026-03-09", status: "Paid" },
    { id: 7, title: "Maintenance Cost", amount: 3500, date: "2026-03-10", status: "Pending" },
    { id: 8, title: "Software Subscription", amount: 4500, date: "2026-03-11", status: "Paid" },
    { id: 9, title: "Marketing Expense", amount: 6000, date: "2026-03-12", status: "Pending" },
    { id: 10, title: "Stationery", amount: 900, date: "2026-03-13", status: "Paid" },
    { id: 11, title: "Courier Charges", amount: 700, date: "2026-03-14", status: "Pending" },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    status: "Pending",
  });

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");


    const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSave = () => {
    if (editId !== null) {
      setExpenses(
        expenses.map((exp) =>
          exp.id === editId ? { ...formData, id: editId } : exp
        )
      );
    } else {
      const newExpense = {
        id: Date.now(),
        ...formData,
      };
      setExpenses([...expenses, newExpense]);
    }

    setFormData({ title: "", amount: "", date: "", status: "Pending" });
    setEditId(null);
    setShowModal(false);
  };

  // Edit
  const handleEdit = (exp) => {
    setFormData(exp);
    setEditId(exp.id);
    setShowModal(true);
  };

  // Delete
  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  // Search + Filter
  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch = exp.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || exp.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

return (
  <div className

={`expenses-container theme-${theme}`}>

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

="table-title">Expenses Management</div>
          <div className

="table-subtitle">
            Track and manage all expenses
          </div>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          className

="searchInput"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTER */}
        <select
          className

="filter-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        {/* ADD BUTTON */}
        <button className

="add-btn" onClick={() => setShowModal(true)}>
          + Add Expense
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
              <th>Title</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="6" className

="noData">
                  No expenses found
                </td>
              </tr>
            ) : (
              filteredExpenses.map((exp) => (
                <tr key={exp.id} className

="table-row">

                  <td>{exp.id}</td>

                  {/* Title with avatar */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className

="cell-avatar">
                        {exp.title.charAt(0)}
                      </div>
                      <span className

="cell-name">{exp.title}</span>
                    </div>
                  </td>

                  <td>₹{exp.amount}</td>

                  <td>{exp.date}</td>

                  <td>
                    <span className

={`status-pill ${exp.status === "Paid" ? "paid" : "pending"}`}>
                      {exp.status}
                    </span>
                  </td>

                  <td>
                    <div className

="action-group">
                      <button className

="more-action-btn" onClick={() => handleEdit(exp)}>Edit</button>
                      <button className

="more-action-btn delete" onClick={() => handleDelete(exp.id)}>Delete</button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>

    {/* MODAL */}
    {showModal && (
      <div className

="invoice-modal">
        <div className

="invoice-modal-content">

          <h3>{editId ? "Edit Expense" : "Add Expense"}</h3>

          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>

          <div className

="invoice-actions">
            <button onClick={handleSave}>
              {editId ? "Update" : "Save"}
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>

        </div>
      </div>
    )}

  </div>
);
};

export default ExpensesPage;