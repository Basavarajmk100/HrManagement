import React, { useState } from "react";

function InvoiceNumberType() {
  const [selectedFormat, setSelectedFormat] = useState("");

  const formats = ["Invoice No/Year", "Text/Invoice No/Year", "Invoice No"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoice Number Type</h2>
      <p>Configure invoice number format</p>

      <select
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          marginTop: "15px",
        }}
      >
        <option value="">Select Format</option>

        {formats.map((format, index) => (
          <option key={index} value={format}>
            {format}
          </option>
        ))}
      </select>

      {selectedFormat && (
        <div style={{ marginTop: "20px" }}>
          <strong>Selected Format:</strong> {selectedFormat}
        </div>
      )}
    </div>
  );
}

export default InvoiceNumberType;
