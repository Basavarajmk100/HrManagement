import React, { useState } from "react";
import "../../styles/MinimalServiceInvoice.css";

function MinimalServiceInvoice() {
  const [invoice, setInvoice] = useState({
    title: "SERVICE INVOICE",
    companyName: "Vertex Digital Solutions Pvt Ltd",
    companyDetails:
      "45, MG Road, Indiranagar, Bengaluru, Karnataka - 560038\nPhone: +91 9988776655\nGSTIN: 29AABCV1234K1Z8",

    customerDetails: "",

    description: "",
    hours: "",
    rate: "",
    currency: "₹",

    invoiceNumber: "",
    date: "",
  });

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const total = Number(invoice.hours || 0) * Number(invoice.rate || 0);

  return (
    <div className="minimalInvoice">
      <h1 className="invoiceTitle">{invoice.title}</h1>

      <div className="invoiceInfo">
        <div>
          <label>Invoice No</label>
          <input
            type="text"
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={invoice.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="addressSection">
        <div className="fromBox">
          <h3>From:</h3>

          <input
            type="text"
            name="companyName"
            value={invoice.companyName}
            onChange={handleChange}
            className="inputField"
          />

          <textarea
            name="companyDetails"
            value={invoice.companyDetails}
            onChange={handleChange}
            className="textareaField"
          />
        </div>

        <div className="toBox">
          <h3>To:</h3>

          <textarea
            name="customerDetails"
            value={invoice.customerDetails}
            onChange={handleChange}
            placeholder="Customer Details"
            className="textareaField"
          />
        </div>
      </div>

      <table className="invoiceTable">
        <thead>
          <tr>
            <th>Description</th>
            <th>Hours</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="description"
                value={invoice.description}
                onChange={handleChange}
                placeholder="Service Description"
              />
            </td>

            <td>
              <input
                type="number"
                name="hours"
                value={invoice.hours}
                onChange={handleChange}
              />
            </td>

            <td>
              <input
                type="number"
                name="rate"
                value={invoice.rate}
                onChange={handleChange}
              />
            </td>

            <td>
              {invoice.currency}
              {total}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="totalSection">
        <h2>
          Total: {invoice.currency}
          {total}
        </h2>
      </div>

      <div className="buttonSection">
        <button className="saveBtn">Save Invoice</button>
        <button className="printBtn">Print Invoice</button>
      </div>
    </div>
  );
}

export default MinimalServiceInvoice;
