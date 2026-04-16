import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ITKPIForm.css"; // reuse same styling

const ITKPIForm = () => {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    employeeId: "",
    month: "",
    ticketsResolved: "",
    bugsFixed: "",
    deployments: "",
    uptimePercent: "",
    avgResponseTime: "",
    kpiScore: 0,
  });

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5133/api/v1/ITKPI/employees");
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
    const t = parseInt(form.ticketsResolved) || 0;
    const b = parseInt(form.bugsFixed) || 0;
    const d = parseInt(form.deployments) || 0;
    const u = parseFloat(form.uptimePercent) || 0;
    const r = parseFloat(form.avgResponseTime) || 0;

    // Simple weighted KPI formula
    const score =
      t * 1.5 +
      b * 2 +
      d * 2.5 +
      u * 0.8 -
      r * 1.2;

    setForm((prev) => ({
      ...prev,
      kpiScore: score > 0 ? score.toFixed(2) : 0,
    }));
  }, [
    form.ticketsResolved,
    form.bugsFixed,
    form.deployments,
    form.uptimePercent,
    form.avgResponseTime,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = [
      "ticketsResolved",
      "bugsFixed",
      "deployments",
      "uptimePercent",
      "avgResponseTime",
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
        ticketsResolved: Number(form.ticketsResolved),
        bugsFixed: Number(form.bugsFixed),
        deployments: Number(form.deployments),
        uptimePercent: Number(form.uptimePercent),
        avgResponseTime: Number(form.avgResponseTime),
        kpiScore: Number(form.kpiScore),
      };

      console.log("IT KPI Payload:", payload);

      await axios.post("http://localhost:5133/api/v1/ITKPI/add", payload);
      alert("IT KPI saved successfully!");

      setForm({
        employeeId: "",
        month: "",
        ticketsResolved: "",
        bugsFixed: "",
        deployments: "",
        uptimePercent: "",
        avgResponseTime: "",
        kpiScore: 0,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save IT KPI.");
    }
  };

  if (loadingEmployees) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className

="kpi-form-container">
      <h2>IT KPI Entry</h2>

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

        <label>Tickets Resolved</label>
        <input
          type="number"
          name="ticketsResolved"
          value={form.ticketsResolved}
          onChange={handleChange}
          required
        />

        <label>Bugs Fixed</label>
        <input
          type="number"
          name="bugsFixed"
          value={form.bugsFixed}
          onChange={handleChange}
          required
        />

        <label>Deployments</label>
        <input
          type="number"
          name="deployments"
          value={form.deployments}
          onChange={handleChange}
          required
        />

        <label>Uptime (%)</label>
        <input
          type="number"
          name="uptimePercent"
          value={form.uptimePercent}
          onChange={handleChange}
          required
        />

        <label>Avg Response Time (hrs)</label>
        <input
          type="number"
          name="avgResponseTime"
          value={form.avgResponseTime}
          onChange={handleChange}
          required
        />

        <label>KPI Score</label>
        <input type="text" value={form.kpiScore} disabled />

        <button type="submit">Save IT KPI</button>
      </form>
    </div>
  );
};

export default ITKPIForm;
