import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "../../styles/AdminCalendar.css"

const AdminCalendar = () => {

  const [events, setEvents] = useState([
    {
      title: "Company Sports Day",
      date: "2026-03-30"
    },
    {
      title: "Tree Plantation Drive",
      date: "2026-04-05"
    }
  ]);

 const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";



  const handleDateClick = (info) => {
    const title = prompt("Enter Event Title");

    if (title) {
      setEvents([
        ...events,
        {
          title: title,
          date: info.dateStr
        }
      ]);
    }
  };

  return (
    <div className

={`calendar-container theme-${theme}`}>
    <h2 className

="calendar-title">Calendar of Events</h2>

    <div className

="calendar-card">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="auto"
      />
    </div>
  </div>
  );
};

export default AdminCalendar;


