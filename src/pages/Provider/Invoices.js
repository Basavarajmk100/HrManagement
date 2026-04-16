import React, { useState } from "react";
import "../../styles/Invoices.css";

const Invoices = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewInvoice, setViewInvoice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [invoices, setInvoices] = useState([
    { id: 1, invoiceNo: "INV-1001", company: "Sunrise Pvt Ltd", amount: 12000, date: "2026-02-01", status: "Paid" },
    { id: 2, invoiceNo: "INV-1002", company: "Bright Tech", amount: 8500, date: "2026-02-02", status: "Pending" },
    { id: 3, invoiceNo: "INV-1003", company: "Skyline Solutions", amount: 15000, date: "2026-02-03", status: "Paid" },
    { id: 4, invoiceNo: "INV-1004", company: "GreenLeaf", amount: 6000, date: "2026-02-04", status: "Overdue" },
  ]);

  const [newInvoice, setNewInvoice] = useState({
    invoiceNo: "",
    company: "",
    amount: "",
    date: "",
    status: "Pending",
  });

  const filteredInvoices = invoices.filter((inv) =>
    inv.company.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 3;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredInvoices.slice(indexOfFirst, indexOfLast);

  const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);

  const handleChange = (e) => setNewInvoice({ ...newInvoice, [e.target.name]: e.target.value });

  const handleSaveInvoice = () => {
    if (isEditMode) {
      setInvoices(invoices.map((inv) => (inv.id === selectedInvoice.id ? newInvoice : inv)));
    } else {
      setInvoices([...invoices, { id: invoices.length + 1, ...newInvoice }]);
    }
    setShowModal(false);
    setIsEditMode(false);
    setSelectedInvoice(null);
    setNewInvoice({ invoiceNo: "", company: "", amount: "", date: "", status: "Pending" });
  };

  const handleView = (invoice) => setViewInvoice(invoice);
  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setNewInvoice(invoice);
    setIsEditMode(true);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices(invoices.filter((inv) => inv.id !== id));
    }
  };

  return (
    <div className

="invoice-panel">
      <div className

="table-header-row">
        <div>
          <h2 className

="table-title">Invoices</h2>
          <p className

="table-subtitle">Manage all company invoices</p>
        </div>
        <h3>Total Revenue: ₹{totalAmount}</h3>
      </div>

      <div className

="top-bar">
        <input
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className

="add-btn" onClick={() => setShowModal(true)}>+ Create Invoice</button>
      </div>

      <div className

="table-wrapper">
        <table className

="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Invoice No</th>
              <th>Company</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((inv) => (
              <tr key={inv.id} className

="table-row tr-card">
                <td>{inv.id}</td>
                <td>{inv.invoiceNo}</td>
                <td>{inv.company}</td>
                <td>₹{inv.amount}</td>
                <td>{inv.date}</td>
                <td><span className

={`status-pill ${inv.status.toLowerCase()}`}>{inv.status}</span></td>
                <td className

="actions-cell">
                  <button className

="view-btn" onClick={() => handleView(inv)}>View</button>
                  <button className

="edit-btn" onClick={() => handleEdit(inv)}>Edit</button>
                  <button className

="delete-btn" onClick={() => handleDelete(inv.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className

="simple-footer">
        <span>Showing {currentData.length} of {filteredInvoices.length} results</span>
        <div className

="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          <span>Page {currentPage}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLast >= filteredInvoices.length}>Next</button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className

="invoice-modal">
          <div className

="invoice-modal-content">
            <h3>{isEditMode ? "Edit Invoice" : "Create Invoice"}</h3>
            <input name="invoiceNo" placeholder="Invoice No" value={newInvoice.invoiceNo} onChange={handleChange} />
            <input name="company" placeholder="Company Name" value={newInvoice.company} onChange={handleChange} />
            <input name="amount" type="number" placeholder="Amount" value={newInvoice.amount} onChange={handleChange} />
            <input name="date" type="date" value={newInvoice.date} onChange={handleChange} />
            <select name="status" value={newInvoice.status} onChange={handleChange}>
              <option>Pending</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
            <div className

="invoice-actions">
              <button onClick={handleSaveInvoice}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {viewInvoice && (
        <div className

="invoice-modal">
          <div className

="invoice-modal-content">
            <h3>Invoice Receipt</h3>
            <p><b>Invoice No:</b> {viewInvoice.invoiceNo}</p>
            <p><b>Company:</b> {viewInvoice.company}</p>
            <p><b>Amount:</b> ₹{viewInvoice.amount}</p>
            <p><b>Date:</b> {viewInvoice.date}</p>
            <p><b>Status:</b> {viewInvoice.status}</p>
            <div className

="invoice-actions">
              <button onClick={() => window.print()}>Print / Download PDF</button>
              <button onClick={() => setViewInvoice(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;