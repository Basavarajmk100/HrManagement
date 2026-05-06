import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/MyCalendar.css";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  const theme = localStorage.getItem("theme") || "simple";

  useEffect(() => {
    loadEvents();

    const interval = setInterval(() => {
      loadEvents();
    }, 60000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const loadEvents = () => {
    Promise.all([
      fetch("http://localhost:5133/api/meetingscheduler/all").then((res) =>
        res.json(),
      ),
      fetch("http://localhost:5133/api/calendar/events").then((res) =>
        res.json(),
      ),
    ])
      .then(([meetings, calendarEvents]) => {
        const dbEvents = meetings.map((meeting) => ({
          title: meeting.title,
          start: new Date(`${meeting.date}T${meeting.time}`),
          end: new Date(`${meeting.date}T${meeting.time}`),
        }));

        const externalEvents = calendarEvents.map((event) => ({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        setEvents([...dbEvents, ...externalEvents]);
      })
      .catch((error) => console.error("Error loading events:", error));
  };

  const syncGoogleCalendar = () => {
    window.location.href = "http://localhost:5133/api/calendar/google-login";
  };

  const syncOutlookCalendar = () => {
    window.location.href = "http://localhost:5133/api/calendar/outlook-login";
  };

  const syncTeamsCalendar = () => {
    window.location.href = "http://localhost:5133/api/calendar/teams-login";
  };

  return (
    <div className={`calendar-container theme-${theme}`}>
      <h2 className="calendar-title">My Calendar</h2>

      {/* Sync Buttons */}
      <div className="sync-buttons">
        <button className="google-sync-btn" onClick={syncGoogleCalendar}>
          Sync Google Calendar
        </button>

        <button className="outlook-sync-btn" onClick={syncOutlookCalendar}>
          Sync Outlook Calendar
        </button>

        <button className="teams-sync-btn" onClick={syncTeamsCalendar}>
          Sync Teams Meetings
        </button>
      </div>

      <div className="calendar-box">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default MyCalendar;
