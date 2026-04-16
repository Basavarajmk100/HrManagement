import React, { useState } from "react";
import "../../styles/Invoice.css";

const CreateInvoice = ({ onClose, onSave }) => {
  const [invoice, setInvoice] = useState({
    invoiceNo: "",
    company: "",
    amount: "",
    date: "",
    status: "Pending"
  });

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(invoice);
    onClose();
  };

  return (
    <div className

="invoice-modal">
      <div className

="invoice-modal-content">
        <h3>Create Invoice</h3>

        <form onSubmit={handleSubmit}>
          <input name="invoiceNo" placeholder="Invoice No" onChange={handleChange} required />
          <input name="company" placeholder="Company Name" onChange={handleChange} required />
          <input name="amount" placeholder="Amount ₹" type="number" onChange={handleChange} required />
          <input name="date" type="date" onChange={handleChange} required />

          <select name="status" onChange={handleChange}>
            <option>Pending</option>
            <option>Paid</option>
            <option>Overdue</option>
          </select>

          <div className

="invoice-actions">
            <button type="submit">Save Invoice</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
