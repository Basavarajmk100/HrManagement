import React, { useState, useEffect } from "react";
import "../../styles/EmployeeManager.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AttendanceManager = () => {
  const [timeClocks, setTimeClocks] = useState([]);
  const [loadingTimeClock, setLoadingTimeClock] = useState(true);

  // ------------------ Fetch Attendance Data ------------------
  const fetchTimeClocks = async () => {
    try {
      setLoadingTimeClock(true);
      const response = await fetch("http://localhost:5133/api/v1/TimeClock");
      if (!response.ok) throw new Error("Failed to fetch time clock data");
      const data = await response.json();
      setTimeClocks(data);
    } catch (error) {
      console.error("Error fetching time clocks:", error);
      alert("Error fetching time clock data from backend");
    } finally {
      setLoadingTimeClock(false);
    }
  };

  useEffect(() => {
    fetchTimeClocks();
  }, []);

  // ------------------ Helper Functions ------------------
  const toISTString = (utcString) => {
    if (!utcString) return "—";
    const utcDate = new Date(utcString);
    const istDate = new Date(utcDate.getTime() - 5.5 * 60 * 60 * 1000); // UTC → IST
    return istDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatHoursToHHMM = (hours) => {
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  // ------------------ Export Attendance to Excel ------------------
  const exportAttendanceToExcel = () => {
    if (timeClocks.length === 0) {
      alert("No attendance data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      timeClocks.map((rec, i) => ({
        "SL.No": i + 1,
        "Employee ID": rec.employeeId,
        "Date": new Date(rec.date).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }),
        "Clock In": rec.clockIn ? toISTString(rec.clockIn) : "—",
        "Break1 Out": rec.break1Out ? toISTString(rec.break1Out) : "—",
        "Break1 In": rec.break1In ? toISTString(rec.break1In) : "—",
        "Break2 Out": rec.break2Out ? toISTString(rec.break2Out) : "—",
        "Break2 In": rec.break2In ? toISTString(rec.break2In) : "—",
        "Clock Out": rec.clockOut ? toISTString(rec.clockOut) : "—",
        "Total Hours": rec.totalHours ? rec.totalHours.toFixed(2) : "—",
        "Total Break Hours": rec.totalBreakHours ? formatHoursToHHMM(rec.totalBreakHours) : "—",
        "Actual Worked Hours": rec.actualWorkedHours ? formatHoursToHHMM(rec.actualWorkedHours) : "—",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Records");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Employee_Attendance.xlsx");
  };

  // ------------------ JSX ------------------
  return (
  <div className

="table-panel fade-in">

    {/* Header */}
    <div className

="table-header-row">
      <div>
        <h2 className

="table-title">Employee Attendance</h2>
        <p className

="table-subtitle">
          Live overview of employee time clock records
        </p>
      </div>

      <button className

="add-btn" onClick={exportAttendanceToExcel}>
        Download Excel
      </button>
    </div>


    {/* Attendance Form */}
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const employeeId = e.target.employeeId.value;
        const date = e.target.date.value;
        const clockIn = e.target.clockIn.value;
        const break1Out = e.target.break1Out.value;
        const break1In = e.target.break1In.value;
        const break2Out = e.target.break2Out.value;
        const break2In = e.target.break2In.value;
        const clockOut = e.target.clockOut.value;

        const inTime = new Date(`${date}T${clockIn}`);
        const outTime = new Date(`${date}T${clockOut}`);

        const b1Out = new Date(`${date}T${break1Out}`);
        const b1In = new Date(`${date}T${break1In}`);
        const b2Out = new Date(`${date}T${break2Out}`);
        const b2In = new Date(`${date}T${break2In}`);

        const break1Hours = (b1In - b1Out) / (1000 * 60 * 60) || 0;
        const break2Hours = (b2In - b2Out) / (1000 * 60 * 60) || 0;

        const totalBreakHours = break1Hours + break2Hours;
        const totalHours = (outTime - inTime) / (1000 * 60 * 60);
        const actualWorkedHours = totalHours - totalBreakHours;

        const newRecord = {
          employeeId: parseInt(employeeId),
          date,
          clockIn: `${date}T${clockIn}`,
          break1Out: `${date}T${break1Out}`,
          break1In: `${date}T${break1In}`,
          break2Out: `${date}T${break2Out}`,
          break2In: `${date}T${break2In}`,
          clockOut: `${date}T${clockOut}`,
          totalHours,
          totalBreakHours,
          actualWorkedHours,
        };

        try {
          const response = await fetch(
            "http://localhost:5133/api/v1/TimeClock",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newRecord),
            }
          );

          if (!response.ok) throw new Error("Failed to add attendance");
          alert("Attendance added!");
          fetchTimeClocks();
          e.target.reset();
        } catch (error) {
          console.error(error);
          alert("Error adding attendance");
        }
      }}
    className

="attendance-form">

  <div className

="form-grid">

    <input name="employeeId" type="number" placeholder="Emp ID" required />

    <input name="date" type="date" required />

    <input name="clockIn" type="time" required />

    <input name="break1Out" type="time" placeholder="Break1 Out" />

    <input name="break1In" type="time" placeholder="Break1 In" />

    <input name="break2Out" type="time" placeholder="Break2 Out" />

    <input name="break2In" type="time" placeholder="Break2 In" />

    <input name="clockOut" type="time" required />

    <button type="submit" className

="add-btn">
      Add
    </button>

  </div>

</form>


    {/* Attendance Table */}
    <div className

="table-wrapper custom-scrollbar">

      <table className

="styled-table">

        <thead>
          <tr>
            <th>SL.No</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Clock In</th>
            <th>Break1 Out</th>
            <th>Break1 In</th>
            <th>Break2 Out</th>
            <th>Break2 In</th>
            <th>Clock Out</th>
            <th>Total</th>
            <th>Break</th>
            <th>Worked</th>
          </tr>
        </thead>

        <tbody>
          {loadingTimeClock ? (
            <tr>
              <td colSpan="12">Loading attendance...</td>
            </tr>
          ) : timeClocks.length > 0 ? (
            timeClocks.map((rec, i) => (
              <tr key={rec.id || i} className

="table-row tr-card">

                <td>{i + 1}</td>

                <td>
                  <span className

="cell-id">
                    EMP-{rec.employeeId}
                  </span>
                </td>

                <td>
                  {new Date(rec.date).toLocaleDateString("en-IN")}
                </td>

                <td>{rec.clockIn ? toISTString(rec.clockIn) : "—"}</td>
                <td>{rec.break1Out ? toISTString(rec.break1Out) : "—"}</td>
                <td>{rec.break1In ? toISTString(rec.break1In) : "—"}</td>
                <td>{rec.break2Out ? toISTString(rec.break2Out) : "—"}</td>
                <td>{rec.break2In ? toISTString(rec.break2In) : "—"}</td>
                <td>{rec.clockOut ? toISTString(rec.clockOut) : "—"}</td>

                <td>{rec.totalHours ? rec.totalHours.toFixed(2) : "—"}</td>

                <td>
                  {rec.totalBreakHours
                    ? formatHoursToHHMM(rec.totalBreakHours)
                    : "—"}
                </td>

                <td>
                  <span className

="status-pill paid">
                    {rec.actualWorkedHours
                      ? formatHoursToHHMM(rec.actualWorkedHours)
                      : "—"}
                  </span>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" style={{ textAlign: "center" }}>
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>

  </div>
);
};

export default AttendanceManager;
