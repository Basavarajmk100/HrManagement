import React, { useState } from "react";
import "../../styles/SimpleServiceInvoice.css";
import { Currency } from "lucide-react";

function SimpleServiceInvoice() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "INV001",
    date: "",
    billTo: "",
    serviceDetails: "",
    amount: "",
  });

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Invoice Saved", invoice);

    alert("Invoice Saved Successfully");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="simpleInvoice">
      <div className="invoiceCard">
        <h1>SERVICE INVOICE</h1>

        <div className="invoiceInfo">
          <p>
            <strong>Invoice No :</strong>
            <input
              type="text"
              name="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={handleChange}
            />
          </p>

          <p>
            <strong>Date :</strong>
            <input
              type="date"
              name="date"
              value={invoice.date}
              onChange={handleChange}
            />
          </p>
        </div>

        <div className="section">
          <h3>Bill To</h3>

          <textarea
            name="billTo"
            value={invoice.billTo}
            onChange={handleChange}
            placeholder="Customer Details"
          />
        </div>

        <div className="section">
          <h3>Service Details</h3>

          <textarea
            name="serviceDetails"
            value={invoice.serviceDetails}
            onChange={handleChange}
            placeholder="Enter Service Details"
          />
        </div>

        <div className="totalBox">
          <h2>Total Amount : ₹ {invoice.amount || 0}</h2>

          <input
            type="number"
            name="amount"
            value={invoice.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
          />
        </div>

        <div className="thankYou">
          <h3>Thank You</h3>
        </div>

        <div className="buttonSection">
          <button className="saveBtn" onClick={handleSave}>
            Save Invoice
          </button>
          <button className="printBtn" onClick={handlePrint}>
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimpleServiceInvoice;
