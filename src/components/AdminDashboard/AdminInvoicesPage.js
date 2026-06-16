import React, { useState } from "react";
import "../../styles/AdminInvoicesPage.css";

const AdminInvoicesPage = () => {
  const [search, setSearch] = useState("");

  const [viewInvoice, setViewInvoice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
  const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  const filteredInvoices = invoices.filter((inv) =>
    inv.company.toLowerCase().includes(search.toLowerCase()),
  );

  const itemsPerPage = 3;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredInvoices.slice(indexOfFirst, indexOfLast);

  const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);

  const handleView = (invoice) => {
    setViewInvoice(invoice);
  };

  const handleApprove = (id) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === id ? { ...inv, approvalStatus: "Approved" } : inv,
      ),
    );
  };

  const handleReject = (id) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === id ? { ...inv, approvalStatus: "Rejected" } : inv,
      ),
    );
  };

  return (
    <div className={`invoice-panel theme-${theme}`}>
      {/* BACKGROUND EFFECTS */}
      <div className="bg-canvas">
        {(isDark || isColorful) && (
          <>
            <div className="ambient-orb orb-1"></div>
            <div className="ambient-orb orb-2"></div>
            <div className="ambient-orb orb-3"></div>
            <div className="ambient-orb orb-4"></div>
            <div className="bg-glass-layer"></div>
          </>
        )}
      </div>

      {/* MAIN PANEL */}
      <div className="table-panel">
        {/* HEADER */}
        <div className="table-header-row">
          <div>
            <div className="table-title">Invoices</div>
            <div className="table-subtitle">Manage all company invoices</div>
          </div>

          <h3 style={{ marginLeft: "auto" }}>₹{totalAmount}</h3>

          <input
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="searchInput"
          />

          <button className="add-btn" onClick={() => window.print()}>
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
                  <td colSpan="7" className="noData">
                    No invoices found
                  </td>
                </tr>
              ) : (
                currentData.map((inv) => (
                  <tr key={inv.id} className="table-row">
                    <td>{inv.id}</td>

                    <td>{inv.invoiceNo}</td>

                    {/* Company with avatar */}
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
    </div>
  );
};

export default AdminInvoicesPage;
