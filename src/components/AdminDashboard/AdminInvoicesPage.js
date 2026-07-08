import React, { useState } from "react";
import "../../styles/AdminInvoicesPage.css";

const AdminInvoicesPage = () => {
  const [search, setSearch] = useState(""); // existing search bar

  const [viewInvoice, setViewInvoice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const [showConfirmReject, setShowConfirmReject] = useState(false);

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNo: "INV-1001",
      company: "Sunrise Pvt Ltd",
      amount: 12000,
      date: "2026-02-01",
      status: "Paid",
      approvalStatus: "Pending",
    },
    {
      id: 2,
      invoiceNo: "INV-1002",
      company: "Bright Tech",
      amount: 8500,
      date: "2026-02-02",
      status: "Pending",
      approvalStatus: "Pending",
    },
    {
      id: 3,
      invoiceNo: "INV-1003",
      company: "Skyline Solutions",
      amount: 15000,
      date: "2026-02-03",
      status: "Paid",
      approvalStatus: "Pending",
    },
    {
      id: 4,
      invoiceNo: "INV-1004",
      company: "GreenLeaf",
      amount: 6000,
      date: "2026-02-04",
      status: "Overdue",
      approvalStatus: "Pending",
    },
  ]);

  const theme = localStorage.getItem("theme") || "simple";

  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  // ---------------- FILTER STATES ----------------
  const [filters, setFilters] = useState({
    company: "",
    date: "",
    month: "",
    year: "",
    invoiceNo: "",
    status: "",
  });

  // This state stores data only after clicking Search
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchFilters = () => {
    let filtered = [...invoices];

    // Existing top search bar (company search)
    if (search.trim() !== "") {
      filtered = filtered.filter((inv) =>
        inv.company.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Toolbar filters
    if (filters.company) {
      filtered = filtered.filter((inv) =>
        inv.company.toLowerCase().includes(filters.company.toLowerCase()),
      );
    }

    if (filters.invoiceNo) {
      filtered = filtered.filter((inv) =>
        inv.invoiceNo.toLowerCase().includes(filters.invoiceNo.toLowerCase()),
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (inv) => inv.status.toLowerCase() === filters.status.toLowerCase(),
      );
    }

    if (filters.date) {
      filtered = filtered.filter((inv) => inv.date === filters.date);
    }

    if (filters.month) {
      filtered = filtered.filter((inv) => {
        const invoiceMonth = new Date(inv.date).getMonth() + 1;
        return invoiceMonth === Number(filters.month);
      });
    }

    if (filters.year) {
      filtered = filtered.filter((inv) => {
        const invoiceYear = new Date(inv.date).getFullYear();
        return invoiceYear === Number(filters.year);
      });
    }

    setFilteredInvoices(filtered);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      company: "",
      date: "",
      month: "",
      year: "",
      invoiceNo: "",
      status: "",
    });
    setSearch("");
    setFilteredInvoices(invoices);
    setCurrentPage(1);
  };

  // ---------------- PAGINATION ----------------
  const itemsPerPage = 3;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredInvoices.slice(indexOfFirst, indexOfLast);

  const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);

  const handleView = (invoice) => {
    setViewInvoice(invoice);
  };

  const handleApprove = (id) => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, approvalStatus: "Approved" } : inv,
    );
    setInvoices(updated);
    setFilteredInvoices(updated);
  };

  const handleReject = (id) => {
    setSelectedInvoiceId(id);
    setRejectReason("");
    setShowRejectPopup(true);
  };

  const submitReject = () => {
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason");
      return;
    }

    setShowRejectPopup(false);
    setShowConfirmReject(true);
  };

  const confirmRejectInvoice = () => {
    const updated = invoices.map((inv) =>
      inv.id === selectedInvoiceId
        ? {
            ...inv,
            approvalStatus: "Rejected",
            rejectionReason: rejectReason,
          }
        : inv,
    );

    setInvoices(updated);
    setFilteredInvoices(updated);
    setShowConfirmReject(false);
    setRejectReason("");
    setSelectedInvoiceId(null);
  };

  /*Download at Top*/
  const handleDownloadCSV = () => {
    const headers = [
      "ID",
      "Invoice No",
      "Company",
      "Amount",
      "Date",
      "Status",
      "Approval Status",
    ];

    const rows = filteredInvoices.map((inv) => [
      inv.id,
      inv.invoiceNo,
      inv.company,
      inv.amount,
      inv.date,
      inv.status,
      inv.approvalStatus,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "invoices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /*Download functioanlity in table*/
  const handleDownload = (invoice) => {
    const data = `
Invoice ID: ${invoice.id}
Company: ${invoice.company}
Amount: ${invoice.amount}
Status: ${invoice.status}
Date: ${invoice.date}
  `;

    const blob = new Blob([data], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${invoice.id}.txt`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`invoice-panel theme-${theme}`}>
      {(isDark || isColorful) && <></>}

      <div className="table-panel">
        {/* HEADER */}
        <div className="table-header-row">
          <div>
            <div className="table-title">Invoices</div>
            <div className="table-subtitle">Manage all company invoices</div>
          </div>

          <h3 style={{ marginLeft: "auto" }}>₹{totalAmount}</h3>
        </div>

        {/* NEW FILTER TOOLBAR BELOW SEARCH BAR */}
        <div className="invoice-filter-toolbar">
          <input
            type="text"
            name="company"
            placeholder="Filter by Company"
            value={filters.company}
            onChange={handleFilterChange}
          />

          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />

          <select
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
          >
            <option value="">Month</option>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>

          <input
            type="number"
            name="year"
            placeholder="Year"
            value={filters.year}
            onChange={handleFilterChange}
          />

          <input
            type="text"
            name="invoiceNo"
            placeholder="Invoice No"
            value={filters.invoiceNo}
            onChange={handleFilterChange}
          />

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>

          <button className="filter-search-btn" onClick={handleSearchFilters}>
            Search
          </button>

          <button className="filter-reset-btn" onClick={handleResetFilters}>
            Reset
          </button>

          <button className="add-btn" onClick={handleDownloadCSV}>
            Download
          </button>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Invoice No</th>
                <th>Company</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Approval Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="noData">
                    No invoices found
                  </td>
                </tr>
              ) : (
                currentData.map((inv) => (
                  <tr key={inv.id} className="table-row">
                    <td>{inv.id}</td>
                    <td>{inv.invoiceNo}</td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div className="cell-avatar">
                          {inv.company.charAt(0)}
                        </div>
                        <span className="cell-name">{inv.company}</span>
                      </div>
                    </td>

                    <td>₹{inv.amount}</td>
                    <td>{inv.date}</td>

                    <td>
                      <span
                        className={`status-pill ${inv.status.toLowerCase()}`}
                      >
                        {inv.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-pill ${
                          inv.approvalStatus === "Approved"
                            ? "paid"
                            : inv.approvalStatus === "Rejected"
                              ? "overdue"
                              : "pending"
                        }`}
                      >
                        {inv.approvalStatus}
                      </span>
                    </td>

                    <td>
                      <div className="action-group">
                        <button
                          className="more-action-btn"
                          onClick={() => handleView(inv)}
                        >
                          View
                        </button>

                        <button
                          className="more-action-btn"
                          onClick={() => handleApprove(inv.id)}
                        >
                          Approve
                        </button>

                        <button
                          className="more-action-btn delete"
                          onClick={() => handleReject(inv.id)}
                        >
                          Reject
                        </button>

                        <button
                          className="more-action-btn download"
                          onClick={() => handleDownload(inv)}
                        >
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="simple-footer">
          <span>
            Showing {currentData.length} of {filteredInvoices.length} results
          </span>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <span>Page {currentPage}</span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLast >= filteredInvoices.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewInvoice && (
        <div className="invoice-modal">
          <div className="invoice-modal-content">
            <h3>Invoice Receipt</h3>

            <p>
              <b>Invoice No:</b> {viewInvoice.invoiceNo}
            </p>
            <p>
              <b>Company:</b> {viewInvoice.company}
            </p>
            <p>
              <b>Amount:</b> ₹{viewInvoice.amount}
            </p>
            <p>
              <b>Date:</b> {viewInvoice.date}
            </p>
            <p>
              <b>Status:</b> {viewInvoice.status}
            </p>
            <p>
              <b>Approval Status:</b> {viewInvoice.approvalStatus}
            </p>

            <div className="invoice-actions">
              <button onClick={() => window.print()}>
                Print / Download PDF
              </button>
              <button onClick={() => setViewInvoice(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showRejectPopup && (
        <div className="invoice-modal">
          <div className="invoice-modal-content">
            <h3>Reject Invoice</h3>

            <textarea
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows="4"
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />

            <div className="invoice-actions">
              <button onClick={submitReject}>Submit</button>
              <button
                onClick={() => {
                  setShowRejectPopup(false);
                  setRejectReason("");
                  setSelectedInvoiceId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmReject && (
        <div className="invoice-modal">
          <div className="invoice-modal-content">
            <h3>Confirm Rejection</h3>
            <p style={{ marginTop: "10px" }}>
              Are you sure you want to reject this invoice?
            </p>

            <div className="invoice-actions">
              <button onClick={confirmRejectInvoice}>Yes</button>
              <button
                onClick={() => {
                  setShowConfirmReject(false);
                  setShowRejectPopup(true);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInvoicesPage;
