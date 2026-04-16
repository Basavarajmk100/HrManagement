import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/FinanceKPIForm.css"; // Reuse same styling

const FinanceKPIForm = () => {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    employeeId: "",
    month: "",
    invoicesProcessed: "",
    paymentsCleared: "",
    budgetVariance: "",
    expenseAccuracy: "",
    costSavings: "",
    auditIssues: "",
    kpiScore: 0,
  });

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5133/api/v1/FinanceKPI/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employees.");
      } finally {
        setLoadingEmployees(false);
      }
    };
    fetchEmployees();
  }, []);

  // Auto-calc KPI Score (simple formula)
  useEffect(() => {
    const i = parseInt(form.invoicesProcessed) || 0;
    const p = parseInt(form.paymentsCleared) || 0;
    const b = parseFloat(form.budgetVariance) || 0;
    const e = parseFloat(form.expenseAccuracy) || 0;
    const c = parseInt(form.costSavings) || 0;
    const a = parseInt(form.auditIssues) || 0;

    // ⭐ KPI Formula (Weighted)
    const score =
      i * 1.2 +
      p * 1.5 -
      b * 1.0 +       // lower variance = better
      e * 0.8 +
      c * 0.002 -     // cost savings conversion to points
      a * 2;          // each audit issue reduces score

    setForm((prev) => ({
      ...prev,
      kpiScore: score > 0 ? score.toFixed(2) : 0,
    }));
  }, [
    form.invoicesProcessed,
    form.paymentsCleared,
    form.budgetVariance,
    form.expenseAccuracy,
    form.costSavings,
    form.auditIssues,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = [
      "invoicesProcessed",
      "paymentsCleared",
      "budgetVariance",
      "expenseAccuracy",
      "costSavings",
      "auditIssues",
    ];

    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? value.replace(/\D/g, "")
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        employeeId: Number(form.employeeId),
        month: form.month + "-01",
        invoicesProcessed: Number(form.invoicesProcessed),
        paymentsCleared: Number(form.paymentsCleared),
        budgetVariance: Number(form.budgetVariance),
        expenseAccuracy: Number(form.expenseAccuracy),
        costSavings: Number(form.costSavings),
        auditIssues: Number(form.auditIssues),
        kpiScore: Number(form.kpiScore),
      };

      console.log("Finance KPI Payload:", payload);

      await axios.post("http://localhost:5133/api/v1/FinanceKPI/add", payload);
      alert("Finance KPI saved successfully!");

      setForm({
        employeeId: "",
        month: "",
        invoicesProcessed: "",
        paymentsCleared: "",
        budgetVariance: "",
        expenseAccuracy: "",
        costSavings: "",
        auditIssues: "",
        kpiScore: 0,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save Finance KPI.");
    }
  };

  if (loadingEmployees) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className

="kpi-form-container">
      <h2>Finance KPI Entry</h2>

      <form onSubmit={handleSubmit} className

="kpi-form">
        <label>Employee</label>
        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>

        <label>Month</label>
        <input
          type="month"
          name="month"
          value={form.month}
          onChange={handleChange}
          required
        />

        <label>Invoices Processed</label>
        <input
          type="number"
          name="invoicesProcessed"
          value={form.invoicesProcessed}
          onChange={handleChange}
          required
        />

        <label>Payments Cleared</label>
        <input
          type="number"
          name="paymentsCleared"
          value={form.paymentsCleared}
          onChange={handleChange}
          required
        />

        <label>Budget Variance (%)</label>
        <input
          type="number"
          name="budgetVariance"
          value={form.budgetVariance}
          onChange={handleChange}
          required
        />

        <label>Expense Accuracy (%)</label>
        <input
          type="number"
          name="expenseAccuracy"
          value={form.expenseAccuracy}
          onChange={handleChange}
          required
        />

        <label>Cost Savings (₹)</label>
        <input
          type="number"
          name="costSavings"
          value={form.costSavings}
          onChange={handleChange}
          required
        />

        <label>Audit Issues Found</label>
        <input
          type="number"
          name="auditIssues"
          value={form.auditIssues}
          onChange={handleChange}
          required
        />

        <label>KPI Score</label>
        <input type="text" value={form.kpiScore} disabled />

        <button type="submit">Save Finance KPI</button>
      </form>
    </div>
  );
};

export default FinanceKPIForm;
