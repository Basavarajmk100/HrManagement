import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AddHrStatsForm.css";

const AddHrStatsPage = () => {
  const [stats, setStats] = useState({
    totalEmployees: "",
    employeesOnLeave: "",
    newJoinees: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5133/api/HrStats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save stats: ${errorText}`);
      }

      alert("HR Stats saved successfully!");
      navigate("/hr-dashboard");
    } catch (error) {
      console.error("Error saving stats:", error);
      alert("Error saving stats. Check backend connection.");
    }
  };

  const handleCancel = () => {
    navigate("/hr-dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className

="add-hrstats-form">
      <h2>Employee Statistics Update form </h2>

      <input
        type="number"
        name="totalEmployees"
        placeholder="Total Employees"
        value={stats.totalEmployees}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="employeesOnLeave"
        placeholder="Employees on Leave"
        value={stats.employeesOnLeave}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="newJoinees"
        placeholder="New Joinees"
        value={stats.newJoinees}
        onChange={handleChange}
        required
      />

      <button type="submit">Save Stats</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default AddHrStatsPage;
