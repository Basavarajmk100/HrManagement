import React, { useEffect, useState } from "react";
import "../../styles/HRPayrollForm.css";

const API = "http://localhost:5133/api";

export default function HrPayrollForm() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    month: "",
    basicSalary: 0,
    hra: 0,
    allowances: 0,
    overtime: 0,      // new
    bonus: 0,         // new
    otherAllowance: 0,// new
    deductions: 0
  });

  useEffect(() => {
    fetch(`${API}/EmployeeManager/all`)
      .then(r => r.json())
      .then(setEmployees);
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    const totalAllowances =
      parseFloat(form.allowances || 0) +
      parseFloat(form.overtime || 0) +
      parseFloat(form.bonus || 0) +
      parseFloat(form.otherAllowance || 0);

    const net =
      parseFloat(form.basicSalary || 0) +
      parseFloat(form.hra || 0) +
      totalAllowances -
      parseFloat(form.deductions || 0);

    const payload = {
      employeeManagerId: parseInt(form.employeeId),
      month: form.month,
      basicSalary: parseFloat(form.basicSalary),
      hra: parseFloat(form.hra),
      allowances: parseFloat(form.allowances),
      overtime: parseFloat(form.overtime),
      bonus: parseFloat(form.bonus),
      otherAllowance: parseFloat(form.otherAllowance),
      deductions: parseFloat(form.deductions),
      netSalary: net
    };

    const res = await fetch(`${API}/payroll/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Payroll added for approval");
      setForm({
        employeeId: "",
        month: "",
        basicSalary: 0,
        hra: 0,
        allowances: 0,
        overtime: 0,
        bonus: 0,
        otherAllowance: 0,
        deductions: 0
      });
    } else {
      alert("Error adding payroll");
    }
  };

  return (
    <div className

="payroll-entry-page">
      <h2 className

="payroll-title">HR Payroll Processing</h2>

      <form className

="hr-payroll-form-container" onSubmit={submit}>
        <div className

="hr-form-group">
          <label>Employee</label>
          <select
            name="employeeId"
            value={form.employeeId}
            onChange={onChange}
            required
          >
            <option value="">Select</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.empId || e.EmpId} - {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className

="hr-form-group">
          <label>Month</label>
          <input
            type="month"
            name="month"
            value={form.month}
            onChange={onChange}
            required
          />
        </div>

        <div className

="hr-form-group">
          <label>Basic Salary</label>
          <input
            name="basicSalary"
            type="number"
            value={form.basicSalary}
            onChange={onChange}
            required
          />
        </div>

        <div className

="hr-form-group">
          <label>HRA</label>
          <input
            name="hra"
            type="number"
            value={form.hra}
            onChange={onChange}
          />
        </div>

        <div className

="hr-form-group">
          <label>Allowances</label>
          <input
            name="allowances"
            type="number"
            value={form.allowances}
            onChange={onChange}
          />
        </div>

        {/* New Extra Allowances */}
        <div className

="hr-form-group">
          <label>Overtime</label>
          <input
            name="overtime"
            type="number"
            value={form.overtime}
            onChange={onChange}
          />
        </div>

        <div className

="hr-form-group">
          <label>Bonus</label>
          <input
            name="bonus"
            type="number"
            value={form.bonus}
            onChange={onChange}
          />
        </div>

        <div className

="hr-form-group">
          <label>Other Allowance</label>
          <input
            name="otherAllowance"
            type="number"
            value={form.otherAllowance}
            onChange={onChange}
          />
        </div>

        <div className

="hr-form-group">
          <label>Deductions</label>
          <input
            name="deductions"
            type="number"
            value={form.deductions}
            onChange={onChange}
          />
        </div>

        <button className

="hr-submit-btn" type="submit">
          Add Payroll (for approval)
        </button>
      </form>
    </div>
  );
}
