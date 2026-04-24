import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/LeaveCalendar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar";
import "../../styles/Sidebar.css";

const LeaveCalendar = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigate = useNavigate();

  const theme = localStorage.getItem("theme") || "simple";
  const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  // 🔹 Fetch leaves from API
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:5133/api/Leave");
        setLeaves(response.data);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };
    fetchLeaves();
  }, []);

  // 🔹 Find leaves for a given date
  const getEmployeesOnDate = (date) => {
    return leaves.filter((l) => {
      const start = new Date(l.startDate);
      const end = new Date(l.endDate);
      return date >= start && date <= end;
    });
  };

  // 🔹 Show badge with count on calendar tiles
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const employees = getEmployeesOnDate(date);
      return employees.length > 0 ? (
        <div className="calendar-leave-badges">
          <span className="calendar-badge">{employees.length}</span>
        </div>
      ) : null;
    }
  };

  return (
    <div className={`leave-calendar-container theme-${theme}`}>
      <Sidebar />
      <div className="page-content">
        {/* BACKGROUND EFFECTS */}
        <div className="bg-canvas">
          {(isDark || isColorful) && (
            <>
              <div className="ambient-orb orb-1"></div>
              <div className="ambient-orb orb-2"></div>
              <div className="ambient-orb orb-3"></div>
              <div className="ambient-orb orb-4"></div>
              <div className="bg-glass-layer"></div>
            </>
          )}
        </div>

        {/* MAIN PANEL */}
        <div className="table-panel">
          {/* HEADER */}
          {/* HEADER */}
          <div className="table-header-row">
            {/* BACK BUTTON */}
            <button className="back-btn" onClick={() => navigate(-1)}>
              ⬅ Back
            </button>

            <div className="header-text">
              <div className="table-title">📅 Leave Calendar</div>
              <div className="table-subtitle">
                Track employee availability with ease
              </div>
            </div>
          </div>

          {/* GRID LAYOUT */}
          <div className="calendar-grid">
            {/* CALENDAR */}
            <div className="calendar-card glass-card">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    const employees = getEmployeesOnDate(date);
                    return employees.length > 0 ? "leave-day" : "";
                  }
                  return "";
                }}
              />
            </div>

            {/* LEAVE DETAILS */}
            <div className="leave-details-card glass-card">
              <h3>Leaves on {selectedDate.toDateString()}</h3>

              <ul>
                {getEmployeesOnDate(selectedDate).length > 0 ? (
                  getEmployeesOnDate(selectedDate).map((leave) => (
                    <li key={leave.id} className="leave-item">
                      <div className="leave-info">
                        <div className="cell-avatar">
                          {leave.employee.charAt(0)}
                        </div>

                        <div>
                          <span className="employee-name">
                            {leave.employee}
                          </span>
                          <span
                            className={`status-pill ${leave.type.replace(" ", "-")}`}
                          >
                            {leave.type}
                          </span>
                        </div>
                      </div>

                      <div className="leave-period">
                        {new Date(leave.startDate).toLocaleDateString()} →{" "}
                        {new Date(leave.endDate).toLocaleDateString()}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="noData">✅ No leaves on this day</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
