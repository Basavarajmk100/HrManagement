import React, { useState, useEffect } from "react";
import "../../styles/EmployeeManager.css";

const SchedulingManager = () => {
  const [schedules, setSchedules] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  // ------------------ Fetch Schedule Data ------------------
  const fetchSchedules = async () => {
    try {
      setLoadingSchedule(true);
      const response = await fetch("http://localhost:5133/api/v1/Schedule");
      if (!response.ok) throw new Error("Failed to fetch schedules");
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      alert("Error fetching schedules from backend");
    } finally {
      setLoadingSchedule(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // ------------------ Add Schedule ------------------
  const handleAddSchedule = async (e) => {
    e.preventDefault();
    const employeeId = e.target.employeeId.value;
    const shiftDate = e.target.shiftDate.value;
    const shiftType = e.target.shiftType.value;
    const startTime = e.target.startTime.value;
    const endTime = e.target.endTime.value;
    const notes = e.target.notes.value;

    const newSchedule = {
      employeeId: parseInt(employeeId),
      shiftDate,
      shiftType,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      notes,
    };

    try {
      const response = await fetch("http://localhost:5133/api/v1/Schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchedule),
      });

      if (!response.ok) throw new Error("Failed to add schedule");
      alert("✅ Schedule added successfully!");
      fetchSchedules();
      e.target.reset();
    } catch (error) {
      console.error("Error adding schedule:", error);
      alert("❌ Error adding schedule");
    }
  };

  return (
    <div className

="table-container">
      <h3>📅 Employee Scheduling</h3>

      {/* Add Schedule Form */}
      <form onSubmit={handleAddSchedule}>
        <div className

="row g-2 mb-3">
          <div className

="col-md-2">
            <input
              name="employeeId"
              type="number"
              placeholder="Emp ID"
              className

="form-control"
              required
            />
          </div>
          <div className

="col-md-2">
            <input name="shiftDate" type="date" className

="form-control" required />
          </div>
          <div className

="col-md-2">
            <input
              name="shiftType"
              type="text"
              placeholder="Shift Type"
              className

="form-control"
              required
            />
          </div>
          <div className

="col-md-2">
            <input name="startTime" type="time" className

="form-control" required />
          </div>
          <div className

="col-md-2">
            <input name="endTime" type="time" className

="form-control" required />
          </div>
          <div className

="col-md-2">
            <input name="notes" type="text" placeholder="Notes" className

="form-control" />
          </div>
          <div className

="col-md-12 mt-2">
            <button type="submit" className

="btn btn-primary w-100">
              Add Schedule
            </button>
          </div>
        </div>
      </form>

      {/* Schedule Table */}
      {loadingSchedule ? (
        <p>Loading schedules...</p>
      ) : (
        <table className

="employee-table">
          <thead>
            <tr>
              <th>SL.No</th>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Shift Date</th>
              <th>Shift Type</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((s, i) => (
                <tr key={s.id || i}>
                  <td>{i + 1}</td>
                  <td>{s.employeeId}</td>
                  <td>{s.employeeName || "—"}</td>
                  <td>{new Date(s.shiftDate).toLocaleDateString()}</td>
                  <td>{s.shiftType}</td>
                  <td>{s.startTime}</td>
                  <td>{s.endTime}</td>
                  <td>{s.notes || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No schedules found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SchedulingManager;
