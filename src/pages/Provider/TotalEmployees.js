import React, { useEffect, useState } from "react";
import "../../styles/TotalEmployees.css";

const TotalEmployees = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    // Dummy API call
    fetch("http://localhost:5133/api/employees/count")
      .then(res => res.json())
      .then(data => setTotalEmployees(data))
      .catch(() => setTotalEmployees(175)); // fallback
  }, []);

  return (
    <div className

="page-container">
      <h2>Total Employees</h2>

      <div className

="card total-card">
        <h1>{totalEmployees}</h1>
        <p>Employees Across All Companies</p>
      </div>
    </div>
  );
};

export default TotalEmployees;
