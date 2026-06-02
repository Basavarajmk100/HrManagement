import React, { useState } from "react";
import "../../styles/SidebarServiceInvoice.css";

function SidebarServiceInvoice() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    date: "",
    billTo: "",
    serviceDescription: "",
    serviceHours: "",
    serviceRate: "",
    currency: "₹",
    title: "SERVICE INVOICE",
    companyName: "Vertex Digital Solutions Pvt Ltd",
    companyAddress: "45, MG Road, Indiranagar, Bengaluru, Karnataka - 560038",
    companyContact:
      "Phone: +91 9988776655\nEmail: support@vertexdigital.com\nGSTIN: 29AABCV1234K1Z8",
  });

  const [showAmountWords, setShowAmountWords] = useState(false);

  const [logoPreview, setLogoPreview] = useState(null);

  const [themeColor, setThemeColor] = useState("#3b82f6");

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  /* logo change */
  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const total =
    Number(invoice.serviceHours || 0) * Number(invoice.serviceRate || 0);

  const numberToWords = (num) => {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (num === 0) return "Zero";

    if (num < 20) return ones[num];

    if (num < 100) {
      return (
        tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "")
      );
    }

    if (num < 1000) {
      return (
        ones[Math.floor(num / 100)] +
        " Hundred " +
        (num % 100 ? numberToWords(num % 100) : "")
      );
    }

    if (num < 100000) {
      return (
        numberToWords(Math.floor(num / 1000)) +
        " Thousand " +
        (num % 1000 ? numberToWords(num % 1000) : "")
      );
    }

    return num;
  };

  return (
    <div className="serviceInvoice2">
      {/* LEFT SIDEBAR */}
      <div className="invoiceSidebar" style={{ background: themeColor }}>
        <label className="sidebarLogo">
          {logoPreview ? (
            <img src={logoPreview} alt="Logo" className="sidebarLogoImg" />
          ) : (
            "LOGO"
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="logoInput"
          />
        </label>

        <input
          type="text"
          name="companyName"
          value={invoice.companyName}
          onChange={handleChange}
          className="sidebarCompanyName"
        />

        <textarea
          name="companyAddress"
          value={invoice.companyAddress}
          onChange={handleChange}
          className="sidebarText"
        />

        <textarea
          name="companyContact"
          value={invoice.companyContact}
          onChange={handleChange}
          className="sidebarText"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="invoiceContent">
        {/* TOP */}
        <div className="invoiceHeader2">
          <div>
            <input
              type="text"
              value={invoice.title}
              name="title"
              onChange={handleChange}
              className="invoiceHeading2"
            />
          </div>

          <div className="invoiceDetailsBox">
            <div>
              <label>Invoice No</label>

              <input
                type="text"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleChange}
                className="modernInput"
              />
            </div>

            <div>
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={invoice.date}
                onChange={handleChange}
                className="modernInput"
              />
            </div>

            <div>
              <label>Currency</label>

              <select
                name="currency"
                value={invoice.currency}
                onChange={handleChange}
                className="modernInput"
              >
                <option value="₹">Indian Rupee (₹)</option>
                <option value="$">US Dollar ($)</option>
                <option value="€">Euro (€)</option>
                <option value="£">British Pound (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* BILL TO */}
        <div className="billSection2">
          <h3 style={{ color: themeColor }}>BILL TO</h3>

          <textarea
            name="billTo"
            value={invoice.billTo}
            onChange={handleChange}
            placeholder="Customer Details"
            className="billTextarea2"
          />
        </div>

        {/* TABLE */}
        <table className="serviceTable2">
          <thead>
            <tr>
              <th style={{ background: themeColor }}>SERVICE</th>

              <th style={{ background: themeColor }}>HOURS</th>

              <th style={{ background: themeColor }}>RATE</th>

              <th style={{ background: themeColor }}>TOTAL</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="serviceDescription"
                  value={invoice.serviceDescription}
                  onChange={handleChange}
                  placeholder="Service Details"
                  className="tableInput2"
                />
              </td>

              <td>
                <input
                  type="number"
                  name="serviceHours"
                  value={invoice.serviceHours}
                  onChange={handleChange}
                  className="tableInput2"
                />
              </td>

              <td>
                <input
                  type="number"
                  name="serviceRate"
                  value={invoice.serviceRate}
                  onChange={handleChange}
                  className="tableInput2"
                />
              </td>

              <td className="totalCell">
                {invoice.currency}
                {total}
              </td>
            </tr>
          </tbody>
        </table>

        {/* TOTAL BOX */}
        <div className="grandTotalBox">
          <h2>Total Amount</h2>

          <h1 style={{ color: themeColor }}>
            {invoice.currency} {total}
          </h1>
        </div>

        {/* AMOUNT WORDS */}
        <div className="amountToggle">
          <label>
            <input
              type="checkbox"
              checked={showAmountWords}
              onChange={(e) => setShowAmountWords(e.target.checked)}
            />
            Show Amount In Words
          </label>
        </div>

        {showAmountWords && (
          <div className="amountWords2">
            <strong>Amount in Words:</strong>
            {numberToWords(total)} Only
          </div>
        )}

        {/* BUTTONS */}
        <div className="buttonSection2">
          <button className="saveBtn2" style={{ background: themeColor }}>
            Save Invoice
          </button>

          <button className="printBtn2">Print Invoice</button>
        </div>
      </div>
    </div>
  );
}

export default SidebarServiceInvoice;
