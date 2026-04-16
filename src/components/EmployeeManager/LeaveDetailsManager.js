import React, { useState, useEffect } from "react";
import "../../styles/EmployeeManager.css";

const LeaveDetailsManager = () => {
  const [leaves, setLeaves] = useState([]);
  const [loadingLeave, setLoadingLeave] = useState(true);
  const [filterDepartment, setFilterDepartment] = useState("All Departments");
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth()); // 0-11
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());

  // ------------------ Fetch Leave Data ------------------
  const fetchLeaves = async () => {
    try {
      setLoadingLeave(true);
      const response = await fetch("http://localhost:5133/api/v1/Leave");
      if (!response.ok) throw new Error("Failed to fetch leaves");
      const data = await response.json();
      setLeaves(data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      alert("Error fetching leave data from backend");
    } finally {
      setLoadingLeave(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // ------------------ Filtered Leaves ------------------
  const filteredLeaves = leaves.filter((lv) => {
    const lvStart = new Date(lv.startDate);
    const lvEnd = new Date(lv.endDate);

    // Department filter
    const departmentMatch =
      filterDepartment === "All Departments" || lv.department === filterDepartment;

    // Month & Year filter
    const monthMatch =
      lvStart.getMonth() === parseInt(filterMonth) || lvEnd.getMonth() === parseInt(filterMonth);
    const yearMatch =
      lvStart.getFullYear() === parseInt(filterYear) || lvEnd.getFullYear() === parseInt(filterYear);

    return departmentMatch && monthMatch && yearMatch;
  });

  return (
    <div className

="leave-calendar-container">
      <div className

="calendar-header">
        <h3>📅 Leave Details</h3>

        <div className

="calendar-filters">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option>All Departments</option>
            <option>HR</option>
            <option>IT</option>
            <option>Finance</option>
          </select>

          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("en-US", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>

        <div className

="legend">
          <label><input type="checkbox" defaultChecked /> Sicknesses</label>
          <label><input type="checkbox" defaultChecked /> Holiday</label>
          <label><input type="checkbox" defaultChecked /> Leave Requests</label>
          <label><input type="checkbox" defaultChecked /> Other Leave</label>
          <label><input type="checkbox" defaultChecked /> One to Ones</label>
          <label><input type="checkbox" defaultChecked /> Training</label>
        </div>
      </div>

      <div className

="calendar-grid">
        {loadingLeave ? (
          <p>Loading leave records...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                {[...Array(30)].map((_, i) => (
                  <th key={i}>{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((lv, idx) => (
                  <tr key={idx}>
                    <td>{lv.employeeName}</td>
                    {[...Array(30)].map((_, i) => {
                      const start = new Date(lv.startDate).getDate();
                      const end = new Date(lv.endDate).getDate();
                      return (
                        <td
                          key={i}
                          className

={
                            i + 1 >= start && i + 1 <= end
                              ? `leave-block ${lv.leaveType?.toLowerCase()}`
                              : ""
                          }
                        ></td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="31" style={{ textAlign: "center" }}>
                    No leave records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaveDetailsManager;
