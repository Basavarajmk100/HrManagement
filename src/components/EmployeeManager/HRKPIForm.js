import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/HRKPIForm.css";

const HRKPIForm = () => {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    employeeId: "",
    month: "",
    onboardingCompleted: "",
    grievancesResolved: "",
    trainingSessions: "",
    recruitmentSpeed: "",
    attendanceCompliance: "",
    kpiScore: 0,
  });

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5133/api/v1/HRKPI/employees");
        setEmployees(res.data);
      } catch (err) {
        setError("Failed to fetch employees.");
      } finally {
        setLoadingEmployees(false);
      }
    };
    fetchEmployees();
  }, []);

  // Auto KPI Score
  useEffect(() => {
    const o = parseInt(form.onboardingCompleted) || 0;
    const g = parseInt(form.grievancesResolved) || 0;
    const t = parseInt(form.trainingSessions) || 0;
    const r = parseInt(form.recruitmentSpeed) || 0;   // days → lower is better
    const a = parseFloat(form.attendanceCompliance) || 0;

    const score =
      o * 1.5 +
      g * 2 +
      t * 1.2 +
      a * 0.8 -
      r * 1.1;

    setForm((prev) => ({
      ...prev,
      kpiScore: score > 0 ? score.toFixed(2) : 0,
    }));
  }, [
    form.onboardingCompleted,
    form.grievancesResolved,
    form.trainingSessions,
    form.recruitmentSpeed,
    form.attendanceCompliance,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "onboardingCompleted",
      "grievancesResolved",
      "trainingSessions",
      "recruitmentSpeed",
      "attendanceCompliance",
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
        onboardingCompleted: Number(form.onboardingCompleted),
        grievancesResolved: Number(form.grievancesResolved),
        trainingSessions: Number(form.trainingSessions),
        recruitmentSpeed: Number(form.recruitmentSpeed),
        attendanceCompliance: Number(form.attendanceCompliance),
        kpiScore: Number(form.kpiScore),
      };

      console.log("HR KPI Payload:", payload);

      await axios.post("http://localhost:5133/api/v1/HRKPI/add", payload);
      alert("HR KPI saved successfully!");

      setForm({
        employeeId: "",
        month: "",
        onboardingCompleted: "",
        grievancesResolved: "",
        trainingSessions: "",
        recruitmentSpeed: "",
        attendanceCompliance: "",
        kpiScore: 0,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save HR KPI.");
    }
  };

  if (loadingEmployees) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className

="kpi-form-container">
      <h2>HR KPI Entry</h2>

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
        <input type="month" name="month" value={form.month} onChange={handleChange} required />

        <label>Onboarding Completed</label>
        <input type="number" name="onboardingCompleted" value={form.onboardingCompleted} onChange={handleChange} required />

        <label>Grievances Resolved</label>
        <input type="number" name="grievancesResolved" value={form.grievancesResolved} onChange={handleChange} required />

        <label>Training Sessions</label>
        <input type="number" name="trainingSessions" value={form.trainingSessions} onChange={handleChange} required />

        <label>Recruitment Speed (Days)</label>
        <input type="number" name="recruitmentSpeed" value={form.recruitmentSpeed} onChange={handleChange} required />

        <label>Attendance Compliance (%)</label>
        <input type="number" name="attendanceCompliance" value={form.attendanceCompliance} onChange={handleChange} required />

        <label>KPI Score</label>
        <input type="text" value={form.kpiScore} disabled />

        <button type="submit">Save HR KPI</button>
      </form>
    </div>
  );
};

export default HRKPIForm;
