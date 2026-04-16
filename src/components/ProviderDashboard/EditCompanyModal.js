import React, { useState, useEffect } from "react";

export default function EditCompanyModal({ company, onClose, onSave }) {
  const [updated, setUpdated] = useState(company);

  useEffect(() => {
    setUpdated(company);
  }, [company]);

  const handleChange = (field, value) => {
    setUpdated(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className

="modalOverlay">
      <div className

="modal">
        <h3>Edit Company</h3>

        <input
          value={updated.name}
          onChange={e => handleChange("name", e.target.value)}
        />

        <select
          value={updated.plan}
          onChange={e => handleChange("plan", e.target.value)}
        >
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>

        <select
          value={updated.status}
          onChange={e => handleChange("status", e.target.value)}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className

="modalButtons">
          <button onClick={() => onSave(updated)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
