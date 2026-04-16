import React, { useEffect, useState } from "react";
import "../../styles/AttendanceReport.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AttendanceReport = () => {
  const [attendance, setAttendance] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [empId, setEmpId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");




    // ----------- Date & Time Formatters -----------
  const formatDate = (value) => {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  const formatTime = (value) => {
    if (!value) return "—";
    return new Date(value).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  // ---------------- Fetch Attendance ----------------
  useEffect(() => {
    fetch("http://localhost:5133/api/v1/TimeClock")
      .then((res) => res.json())
      .then((data) => {
        setAttendance(data);
        setFiltered(data);
      });
  }, []);

  // ---------------- Generate Report ----------------
  const generateReport = () => {
    let data = [...attendance];

    if (empId) {
      data = data.filter((r) =>
        r.employeeId.toString().includes(empId)
      );
    }

    if (fromDate && toDate) {
      data = data.filter((r) => {
        const d = new Date(r.date);
        return d >= new Date(fromDate) && d <= new Date(toDate);
      });
    }

    setFiltered(data);
  };

  // ---------------- Export Excel ----------------

  // ---------------- Export Excel ----------------
  const exportExcel = () => {
    if (filtered.length === 0) {
      alert("No data to export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filtered.map((r, i) => ({
        "Sl No": i + 1,
        "Employee ID": r.employeeId,
        Date: formatDate(r.date),
        "Clock In": formatTime(r.clockIn),
        "Break1 Out": formatTime(r.break1Out),
        "Break1 In": formatTime(r.break1In),
        "Break2 Out": formatTime(r.break2Out),
        "Break2 In": formatTime(r.break2In),
        "Clock Out": formatTime(r.clockOut),
        "Total Hours": r.totalHours,
        "Total Break Hours": r.totalBreakHours,
        "Actual Work Hours": r.actualWorkedHours,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Attendance Report");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer]), "Attendance_Report.xlsx");
  };


 return (
    <div className

="attendance-report">
      {/* Header */}
      <div className

="report-header">
        <h2>Attendance Report</h2>
        <button className

="btn-export" onClick={exportExcel}>
          Download
        </button>
      </div>

      {/* Filters */}
      <div className

="report-filters">
        <input
          type="text"
          placeholder="Emp ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <input type="date" onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" onChange={(e) => setToDate(e.target.value)} />
        <button className

="btn-generate" onClick={generateReport}>
          Generate
        </button>
      </div>

      {/* Table */}
      <table className

="report-table">
        <thead>
          <tr>
            <th>SL NO</th>
            <th>EMPLOYEE ID</th>
            <th>DATE</th>
            <th>CLOCK IN</th>
            <th>BREAK1 OUT</th>
            <th>BREAK1 IN</th>
            <th>BREAK2 OUT</th>
            <th>BREAK2 IN</th>
            <th>CLOCK OUT</th>
            <th>TOTAL HOURS</th>
            <th>TOTAL BREAK HOURS</th>
            <th>ACTUAL WORK HOURS</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.employeeId}</td>
                <td>{formatDate(r.date)}</td>
                <td>{formatTime(r.clockIn)}</td>
                <td>{formatTime(r.break1Out)}</td>
                <td>{formatTime(r.break1In)}</td>
                <td>{formatTime(r.break2Out)}</td>
                <td>{formatTime(r.break2In)}</td>
                <td>{formatTime(r.clockOut)}</td>
                <td>{r.totalHours}</td>
                <td>{r.totalBreakHours}</td>
                <td>{r.actualWorkedHours}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className

="no-data">
                No attendance records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceReport;
