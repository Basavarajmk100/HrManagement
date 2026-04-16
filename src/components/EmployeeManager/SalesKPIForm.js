import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/SalesKPIForm.css";

const SalesKPIForm = () => {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    employeeId: "",
    month: "",
    daysWorked: "",
    clientHours: "",
    leadsGenerated: "",
    totalSales: "",
    salesTarget: "",
    targetAchieved: 0,
  });

  // Fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5133/api/v1/SalesKPI/employees");
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

  // Auto-calculate target achievement %
  useEffect(() => {
    const totalSalesNum = parseFloat(form.totalSales);
    const salesTargetNum = parseFloat(form.salesTarget);

    if (!isNaN(totalSalesNum) && !isNaN(salesTargetNum) && salesTargetNum !== 0) {
      const percent = (totalSalesNum / salesTargetNum) * 100;
      setForm((prev) => ({ ...prev, targetAchieved: percent.toFixed(2) }));
    } else {
      setForm((prev) => ({ ...prev, targetAchieved: 0 }));
    }
  }, [form.totalSales, form.salesTarget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["daysWorked", "clientHours", "leadsGenerated", "totalSales", "salesTarget"];
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare payload for backend
      const payload = {
        employeeId: Number(form.employeeId),
        month: form.month + "-01", // ensure full date YYYY-MM-DD
        daysWorked: Number(form.daysWorked),
        clientHours: Number(form.clientHours),
        leadsGenerated: Number(form.leadsGenerated),
        totalSales: Number(form.totalSales),
        salesTarget: Number(form.salesTarget),
        targetAchieved: Number(form.targetAchieved),
      };

      console.log("KPI Payload:", payload); // debug

      await axios.post("http://localhost:5133/api/v1/SalesKPI/add", payload);
      alert("KPI saved successfully!");

      // Reset form
      setForm({
        employeeId: "",
        month: "",
        daysWorked: "",
        clientHours: "",
        leadsGenerated: "",
        totalSales: "",
        salesTarget: "",
        targetAchieved: 0,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save KPI. Check console for details.");
    }
  };

  if (loadingEmployees) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className

="kpi-form-container">
      <h2>Sales KPI Entry</h2>
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

        <label>Total Days Worked</label>
        <input
          type="number"
          name="daysWorked"
          value={form.daysWorked}
          onChange={handleChange}
          required
        />

        <label>Total Client Hours</label>
        <input
          type="number"
          name="clientHours"
          value={form.clientHours}
          onChange={handleChange}
          required
        />

        <label>Leads Generated</label>
        <input
          type="number"
          name="leadsGenerated"
          value={form.leadsGenerated}
          onChange={handleChange}
          required
        />

        <label>Total Sales</label>
        <input
          type="number"
          name="totalSales"
          value={form.totalSales}
          onChange={handleChange}
          required
        />

        <label>Sales Target</label>
        <input
          type="number"
          name="salesTarget"
          value={form.salesTarget}
          onChange={handleChange}
          required
        />

        <label>Target Achievement %</label>
        <input type="text" value={form.targetAchieved + "%"} disabled />

        <button type="submit">Save KPI</button>
      </form>
    </div>
  );
};

export default SalesKPIForm;
