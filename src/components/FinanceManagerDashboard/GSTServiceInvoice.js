import React, { useState } from "react";
import "../../styles/GSTGoodsInvoice.css";

function GSTServiceInvoice() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    date: "",
    billTo: "",
    serviceDescription: "",
    serviceHours: "",
    serviceRate: "",
    currency: "₹",

    title: "SERVICE INVOICE",
    companyName: "ABC Technologies Pvt Ltd",
    companyAddress: "#24, VijayaNagar, Bangalore, Karnataka - 560001",
    companyContact:
      "Phone: +91 9876543210\nEmail: info@abctechnologies.com\nGSTIN: 29ABCDE1234F1Z5",
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
    <div className="page">
      {/* TOOLBAR */}
      <div className="toolbar">
        <h3>Choose Invoice Theme</h3>

        <div className="colorOptions">
          <button
            className={themeColor === "#3b82f6" ? "activeColor" : ""}
            style={{ background: "#3b82f6" }}
            onClick={() => setThemeColor("#3b82f6")}
          />

          <button
            className={themeColor === "#16a34a" ? "activeColor" : ""}
            style={{ background: "#16a34a" }}
            onClick={() => setThemeColor("#16a34a")}
          />

          <button
            className={themeColor === "#ef4444" ? "activeColor" : ""}
            style={{ background: "#ef4444" }}
            onClick={() => setThemeColor("#ef4444")}
          />

          <button
            className={themeColor === "#9333ea" ? "activeColor" : ""}
            style={{ background: "#9333ea" }}
            onClick={() => setThemeColor("#9333ea")}
          />

          <button
            className={themeColor === "#f97316" ? "activeColor" : ""}
            style={{ background: "#f97316" }}
            onClick={() => setThemeColor("#f97316")}
          />
        </div>
      </div>

      <div className="invoiceBox">
        {/* HEADER */}
        <div className="header" style={{ background: themeColor }}>
          <div>
            <input
              type="text"
              value={invoice.title}
              name="title"
              onChange={handleChange}
              className="invoiceTitleInput"
            />
          </div>

          <div className="companyInfo">
            <label
              className="logo"
              style={{
                color: themeColor,
              }}
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="logoImage"
                />
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

            <div className="companyDetails">
              <input
                type="text"
                name="companyName"
                value={invoice.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="editableCompanyName"
              />

              <textarea
                name="companyAddress"
                value={invoice.companyAddress}
                onChange={handleChange}
                placeholder="Company Address"
                className="editableText"
              />

              <textarea
                name="companyContact"
                value={invoice.companyContact}
                onChange={handleChange}
                placeholder="Phone, Email, GSTIN"
                className="editableText"
              />
            </div>
          </div>
        </div>

        {/* TOP DETAILS */}
        <div className="topSection">
          <div>
            <p>
              <strong>Invoice No:</strong>
            </p>

            <input
              type="text"
              name="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <p>
              <strong>Date:</strong>
            </p>

            <input
              type="date"
              name="date"
              value={invoice.date}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <p>
              <strong>Currency:</strong>
            </p>

            <select
              name="currency"
              value={invoice.currency}
              onChange={handleChange}
              className="input"
            >
              <option value="₹">Indian Rupee (₹)</option>
              <option value="$">US Dollar ($)</option>
              <option value="€">Euro (€)</option>
              <option value="£">British Pound (£)</option>
              <option value="¥">Japanese Yen (¥)</option>
            </select>
          </div>
        </div>

        {/* BILL TO */}
        <div className="addressSection">
          <div>
            <h4>BILL TO</h4>

            <textarea
              name="billTo"
              value={invoice.billTo}
              onChange={handleChange}
              placeholder="Customer Details"
              className="textarea"
            />
          </div>
        </div>

        {/* SERVICE TABLE */}
        <table className="table">
          <thead>
            <tr>
              <th className="th" style={{ background: themeColor }}>
                SERVICE DESCRIPTION
              </th>

              <th className="th" style={{ background: themeColor }}>
                HOURS
              </th>

              <th className="th" style={{ background: themeColor }}>
                RATE PER HOUR
              </th>

              <th className="th" style={{ background: themeColor }}>
                TOTAL
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="td">
                <input
                  type="text"
                  name="serviceDescription"
                  value={invoice.serviceDescription}
                  onChange={handleChange}
                  placeholder="Service Details"
                  className="tableInput"
                />
              </td>

              <td className="td">
                <input
                  type="number"
                  name="serviceHours"
                  value={invoice.serviceHours}
                  onChange={handleChange}
                  className="tableInput"
                />
              </td>

              <td className="td">
                <input
                  type="number"
                  name="serviceRate"
                  value={invoice.serviceRate}
                  onChange={handleChange}
                  className="tableInput"
                />
              </td>

              <td className="td">
                {invoice.currency}
                {total}
              </td>
            </tr>
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="totalSection">
          <h2>
            Total: {invoice.currency} {total}
          </h2>
        </div>

        {/* AMOUNT IN WORDS */}
        <div className="amountWordsCheck">
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
          <div className="amountWords">
            <strong>Amount in Words:</strong> {numberToWords(total)} Only
          </div>
        )}

        {/* BUTTONS */}
        <div className="buttonSection">
          <button className="button">Save Invoice</button>

          <button className="printButton">Print Invoice</button>
        </div>
      </div>
    </div>
  );
}

export default GSTServiceInvoice;
