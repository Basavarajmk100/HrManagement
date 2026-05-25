import React, { useState } from "react";

function TemplateSelect() {
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const templates = [
    "GST Goods Invoice",
    "GST Service Invoice",
    "Retail Invoice",
    "Proforma Invoice",
    "Tax Invoice",
    "Debit/Credit Note Invoice",
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>GST Invoice Templates</h2>
      <p>Select invoice template format</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        {templates.map((template, index) => (
          <div
            key={index}
            onClick={() => setSelectedTemplate(template)}
            style={{
              padding: "20px",
              borderRadius: "14px",
              cursor: "pointer",
              border:
                selectedTemplate === template
                  ? "2px solid #2563eb"
                  : "1px solid #ddd",
              background: selectedTemplate === template ? "#eff6ff" : "#fff",
              transition: "0.3s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{template}</h3>

            <p style={{ color: "#666", marginTop: "10px" }}>
              Click to select this invoice template
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelect;
