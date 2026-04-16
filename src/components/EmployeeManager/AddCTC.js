import React, { useState, useEffect } from "react";
import "../../styles/AddCTC.css";
import * as XLSX from "xlsx";
const AddCTC = () => {
  const [editMode, setEditMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const[searchResult,setSearchResult]=useState(null);

  const [enableIncentive, setEnableIncentive] = useState(false);

  const [form, setForm] = useState({
    empId: "",
    empName: "",
    totalCTC: 0,      // Annual 
    grossMonthly: 0,  // Auto
    basic: 0,
    hra: 0,
    medical: 1250,
    transport: 1600,
    bonus: 0,         // 20% of Basic
    employerPF: 1800, // Fixed
    variableAnnual: 0,
    special: 0,
  });


  const handleChange = (key, value) => {
    setForm({ ...form, [key]: Number(value) || 0 });
  };

  /* ==============================
     AUTO CALCULATION FROM CTC
     ============================== */
  useEffect(() => {
    if (editMode || !form.totalCTC) return;

    const grossMonthly = form.totalCTC / 12;

    // Basic = 50% of CTC
    const basic = (form.totalCTC * 0.5) / 12;

    // HRA Rule
    const hra = basic < 50000 ? basic * 0.2 : basic * 0.3;

    // Statutory Bonus = (Basic / 100) * 20
    const bonus = (basic / 100) * 20;


    // Performance Incentive = 20% of Basic (Monthly)
const incentiveMonthly = enableIncentive ? basic * 0.2 : 0;
const incentiveAnnual = incentiveMonthly * 12;


    // Employer PF fixed
    const employerPF = 1800;

    const usedAmount =
      basic +
      hra +
      bonus +
      employerPF +
      form.medical +
      form.transport +
      incentiveMonthly;


    const special = Math.max(grossMonthly - usedAmount, 0);

    setForm((prev) => ({
      ...prev,
      grossMonthly,
      basic,
      hra,
      bonus,
      employerPF,
      variableAnnual: incentiveAnnual, // AUTO SET
      special,
    }));
}, [
  form.totalCTC,
  editMode,
  form.medical,
  form.transport,
  enableIncentive,
]);


const handleSubmit = async () => {
  const calculatedAnnual = Number((form.grossMonthly * 12).toFixed(2));
  const enteredCTC = Number(form.totalCTC.toFixed(2));

  if (calculatedAnnual !== enteredCTC) {
    const difference = Number((enteredCTC - calculatedAnnual).toFixed(2));

    alert(
      `CTC Mismatch (Total Cost to Company)\n\n` +
      `Entered CTC: ₹${enteredCTC}\n` +
      `Calculated CTC: ₹${calculatedAnnual}\n\n` +
      `Difference in Total Cost to Company: ₹${difference}`
    );
    return; // ❌ STOP saving
  }

  try {
    const response = await fetch("http://localhost:5133/api/ctc/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.error("Error saving CTC:", error);
  }
};




const handleSearch = async () => {
  if (!searchTerm.trim()) {
    alert("Enter Employee ID or Name");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5133/api/ctc/search?query=${encodeURIComponent(searchTerm)}`
    );

    if (!res.ok) {
      if (res.status === 404) {
        alert("No employees found");
      } else {
        alert(`Server error: ${res.status}`);
      }
      setSearchResult([]); // clear previous results
      return;
    }

    // Parse JSON safely
    const data = await res.json().catch(() => null);

    if (!data || !data.length) {
      alert("No employees found");
      setSearchResult([]);
      return;
    }

    // Set multiple results
    setSearchResult(data);

  } catch (err) {
    console.error("Search error", err);
    alert("Error fetching employee CTC. Check backend or network.");
    setSearchResult([]);
  }
};

const handleExcelDownload = () => {
  if (!searchResult || searchResult.length === 0) {
    alert("Search employee first");
    return;
  }

  // Convert JSON → Excel sheet
  const worksheet = XLSX.utils.json_to_sheet(searchResult);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "CTC Details");

  // Download file
  XLSX.writeFile(workbook, "CTC_Search_Results.xlsx");
};



  return (
    <div className

="ctc-card">
            {/* 🔍 Search CTC */}
<div className

="ctc-top-row">

  {/* ===== LEFT : Add CTC ===== */}
  <div className

="add-ctc-section">
    <h3>Add CTC</h3>
    {/* Add CTC form continues here */}
  </div>

  {/* ===== RIGHT : Search CTC ===== */}
 <div className

="ctc-search">
  <div className

="search-row">
    <input
      type="text"
      placeholder="Search by Employee ID"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button onClick={handleSearch}>Search</button>
  </div>

  {searchResult && searchResult.length > 0 && (
    <>
      <h3>Search Results</h3>
      <ul>
        {searchResult.map(emp => (
          <li key={emp.id}>
            {emp.empId} - {emp.empName}
          </li>
        ))}
      </ul>

      <button
        className

="download-btn"
        onClick={handleExcelDownload}
      >
        Download CTC (Excel)
      </button>
    </>
  )}
</div>


</div>

      {/* Employee Info */}
      <div className

="employee-details">
        <input
          placeholder="Employee ID"
          value={form.empId}
          onChange={(e) => setForm({ ...form, empId: e.target.value })}
        />
        <input
          placeholder="Employee Name"
          value={form.empName}
          onChange={(e) => setForm({ ...form, empName: e.target.value })}
        />
      </div>

      {/* CTC Summary */}
     <div className

="ctc-summary">
  <div className

="ctc-fields">
    <label>
      CTC (Annual)
      <input
        type="number"
        value={form.totalCTC}
        onChange={(e) => handleChange("totalCTC", e.target.value)}
      />
    </label>

    <label>
      Gross Monthly
      <input value={form.grossMonthly.toFixed(2)} disabled />
    </label>
  </div>

  <div className

="edit-actions">
    <label className

="incentive-toggle">
      <input
        type="checkbox"
        checked={enableIncentive}
        onChange={(e) => setEnableIncentive(e.target.checked)}
      />
        <span>Performance Incentive (20%)</span>
    </label>

    <button
      className

={`edit-btn ${editMode ? "cancel" : ""}`}
      onClick={() => setEditMode(!editMode)}
    >
      {editMode ? "Cancel Edit" : "Edit"}
    </button>
  </div>

      </div>

      {/* Breakdown */}
      <table className

="ctc-table">
        <thead>
          <tr>
            <th>Breakdown</th>
            <th>Month</th>
            <th>Annum</th>
          </tr>
        </thead>
        <tbody>
<Row
  label="Basic Salary"
  value={form.basic}
  editable
  editMode={editMode}
  onChange={(v) => handleChange("basic", v)}
/>
<Row
  label="HRA"
  value={form.hra}
  editable
  editMode={editMode}
  onChange={(v)=> handleChange("hra",v)}

/>

<Row
  label="Medical Allowance"
  value={form.medical}
  editable
  editMode={editMode}
  onChange={(v) => handleChange("medical", v)}
/>

<Row
  label="Transport Allowance"
  value={form.transport}
  editable
  editMode={editMode}
  onChange={(v) => handleChange("transport", v)}
/>


<Row
  label="Special Allowance"
  value={form.special}
  editable
  editMode={editMode}
  onChange={(v) => handleChange("special", v)}
/>
<Row
  label="Statutory Bonus (20%)"
  value={form.bonus}
  editable
  editMode={editMode}
  onChange={(v) => handleChange("bonus", v)}
/>

<Row
  label="Employer PF"
  value={form.employerPF}
  editable
  editMode={editMode}
  onChange={(v) => handleChange("employerPF", v)}
/>


<Row
  label="Performance Incentive (20% of Basic)"
  value={form.variableAnnual / 12}
  editable={false}
  editMode={false}
/>



          <tr className

="total-row">
            <td>Total Cost to Company</td>
            <td>{form.grossMonthly.toFixed(2)}</td>
            <td>{form.totalCTC.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <button className

="save-btn" onClick={handleSubmit}>
        Save CTC
      </button>
    </div>
  );
};

// helpers FIRST
const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// Row component NEXT
const Row = ({ label, value, editable = false, editMode, onChange }) => (
  <tr>
    <td className

="label-cell">{label}</td>

    <td className

="amount-cell">
      {editable && editMode ? (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      ) : (
        <span className

="static-text">{formatAmount(value)}</span>
      )}
    </td>

    <td className

="amount-cell">
      {formatAmount(value * 12)}
    </td>
  </tr>
);




export default AddCTC;
