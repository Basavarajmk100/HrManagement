import React, { useState } from "react";
import "../../styles/MeetingScheduler.css";

export default function MeetingScheduler() {

  const [meetingTitle, setMeetingTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetings, setMeetings] = useState([]);

  const theme = localStorage.getItem("theme") || "simple";
  const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  const handleAddMeeting = () => {
    if (!meetingTitle || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const newMeeting = {
      id: Date.now(),
      title: meetingTitle,
      date,
      time
    };

    setMeetings([...meetings, newMeeting]);

    setMeetingTitle("");
    setDate("");
    setTime("");
  };

  return (

    <div className

={`meeting-panel theme-${theme}`}>

      {/* BACKGROUND EFFECTS */}
      <div className

="bg-canvas">
        {isDark && (
          <>
            <div className

="ambient-orb orb-1"></div>
            <div className

="ambient-orb orb-2"></div>
            <div className

="ambient-orb orb-3"></div>
            <div className

="ambient-orb orb-4"></div>

            <div
              className

="bg-glass-layer"
              style={{
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(100px)"
              }}
            ></div>
          </>
        )}

        {isColorful && (
          <>
            <div className

="ambient-orb orb-1"></div>
            <div className

="ambient-orb orb-2"></div>
            <div className

="ambient-orb orb-3"></div>
            <div className

="ambient-orb orb-4"></div>

            <div className

="bg-glass-layer"></div>
          </>
        )}
      </div>


      <div className

="table-panel theme-light">

        {/* HEADER */}
        <div className

="table-header-row">
          <div>
            <div className

="table-title">Meeting Scheduler</div>
            <div className

="table-subtitle">
              Schedule and manage meetings
            </div>
          </div>
        </div>


        {/* FORM */}
        <div className

="meeting-form">

          <input
            type="text"
            placeholder="Meeting Title"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button
            className

="add-btn"
            style={{
              background: isSimple
                ? "rgba(250,133,185,0.1)"
                : isDark
                ? "rgba(255,255,255,0.1)"
                : "linear-gradient(to right,#FA85B9,#C387C2)",
              color: isSimple ? "#FA85B9" : "#fff"
            }}
            onClick={handleAddMeeting}
          >
            Add Meeting
          </button>

        </div>


        {/* TABLE */}
        <div className

="table-wrapper">

          <table className

="styled-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>

              {meetings.length === 0 ? (
                <tr>
                  <td colSpan="4" className

="noData">
                    No meetings scheduled
                  </td>
                </tr>
              ) : (
                meetings.map((meeting) => (
                  <tr key={meeting.id} className

="table-row">
                    <td>{meeting.id}</td>
                    <td>{meeting.title}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}