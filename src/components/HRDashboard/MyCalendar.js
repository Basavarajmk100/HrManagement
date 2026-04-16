import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function MyCalendar() {

  const [events, setEvents] = useState([
    {
      title: "HR Meeting",
      start: new Date(2026, 3, 5, 10, 0),
      end: new Date(2026, 3, 5, 11, 0)
    },
    {
      title: "Project Review",
      start: new Date(2026, 3, 7, 14, 0),
      end: new Date(2026, 3, 7, 15, 0)
    }
  ]);

    const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  return (

    <div className

={`calendar-container theme-${theme}`}>

    <h2 className

="calendar-title">My Calendar</h2>

    <div className

="calendar-box">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>

  </div>
);
}

export default MyCalendar;