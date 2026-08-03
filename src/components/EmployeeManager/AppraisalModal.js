// AppraisalModal.js
import React, { useState, useEffect } from "react";
import "../../styles/AppraisalModal.css";

const AppraisalModal = ({ isOpen, onClose, employee }) => {
  const [form, setForm] = useState({
    empId: "",
    empName: "",
    currentCTC: "",
    appraisalPercent: "",
    revisedCTC: "",
    effectiveFrom: "",
  });

  useEffect(() => {
    if (employee) {
      setForm({
        empId: employee.empId,
        empName: employee.empName,
        currentCTC: employee.totalCTC,
        appraisalPercent: "",
        revisedCTC: employee.totalCTC,
        effectiveFrom: "",
      });
    }
  }, [employee]);
  const handlePercentageChange = (value) => {
    if (value === "") {
      setForm({
        ...form,
        appraisalPercent: "",
        revisedCTC: form.currentCTC,
      });
      return;
    }

    const percent = Number(value);
    const currentCTC = Number(form.currentCTC) || 0;

    const revisedCTC = currentCTC * (1 + percent / 100);

    setForm({
      ...form,
      appraisalPercent: value,
      revisedCTC: revisedCTC,
    });
  };

  const handleSave = async () => {
    try {
      if (!form.effectiveFrom) {
        alert("Please select Effective From Date");
        return;
      }

      const appraisalData = {
        empId: form.empId,
        currentCTC: form.currentCTC,
        appraisalPercentage: form.appraisalPercent,
        effectiveFromDate: `${form.effectiveFrom}T00:00:00`,
        revisedCTC: form.revisedCTC,
      };

      console.log("Sending:", appraisalData);

      const response = await fetch("http://localhost:5133/api/appraisal/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appraisalData),
      });

      const text = await response.text();
      console.log("Response:", text);

      if (!response.ok) {
        throw new Error(text);
      }

      const data = JSON.parse(text);

      alert(data.message);
      onClose();
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save appraisal");
    }
  };
  if (!isOpen) return null;

  return (
    <div className="appraisal-overlay">
      <div className="appraisal-popup">
        <div className="modal-header">
          <h3>Employee Appraisal</h3>
          <button className="close-icon" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="form-group">
          <label>Employee ID</label>
          <input
            value={form.empId}
            onChange={(e) => setForm({ ...form, empId: e.target.value })}
          />
        </div>

        {/*<div className="form-group">
          <label>Employee Name</label>
          <input
            value={form.empName}
            onChange={(e) => setForm({ ...form, empName: e.target.value })}
          />
        </div>
        */}

        <div className="form-group">
          <label>Current CTC</label>
          <input
            type="number"
            value={form.currentCTC === 0 ? "" : form.currentCTC}
            onChange={(e) =>
              setForm({
                ...form,
                currentCTC: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Appraisal %</label>
          <input
            type="number"
            placeholder="Enter Appraisal %"
            value={form.appraisalPercent}
            onChange={(e) => handlePercentageChange(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Effective From Date</label>
          <input
            type="date"
            value={form.effectiveFrom}
            onChange={(e) =>
              setForm({
                ...form,
                effectiveFrom: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Revised CTC</label>
          <input
            type="number"
            value={form.revisedCTC === 0 ? "" : form.revisedCTC}
            onChange={(e) =>
              setForm({
                ...form,
                revisedCTC: e.target.value,
              })
            }
          />
        </div>

        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppraisalModal;
