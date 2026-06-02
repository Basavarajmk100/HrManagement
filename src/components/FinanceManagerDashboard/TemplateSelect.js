import React from "react";
import { useNavigate } from "react-router-dom";

function TemplateSelect() {
  const navigate = useNavigate();

  const templates = [
    {
      name: "GST Goods Invoice",
      path: "/gst-goods-invoice",
    },
    {
      name: "GST Service Invoice",
      path: "/gst-service-invoice",
    },

    {
      name: "Sidebar Service Invoice",
      path: "/sidebar-service-invoice",
    },

    {
      name: "Minimal Service Invoice",
      path: "/minimal-service-invoice",
    },

    {
      name: "Simple Service Invoice",
      path: "/simple-service-invoice",
    },
    {
      name: "Debit/Credit Note Invoice",
      path: "/debit-credit-invoice",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoice Templates</h2>
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
            onClick={() => navigate(template.path)}
            style={{
              padding: "20px",
              borderRadius: "14px",
              cursor: "pointer",
              border: "1px solid #ddd",
              background: "#fff",
              transition: "0.3s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{template.name}</h3>

            <p style={{ color: "#666", marginTop: "10px" }}>
              Click to open this invoice template
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelect;
