import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const markAttendance = async () => {
      try {
        const employeeId = localStorage.getItem("employeeId") || 1;

        // 🕒 Get system date & time
        const now = new Date();
        const systemDate = now.toISOString().split("T")[0]; // yyyy-mm-dd
        const systemTime = now.toTimeString().split(" ")[0]; // HH:mm:ss (24hr)

        setDate(systemDate);
        setTime(systemTime);

        // Check if employee has already clocked in today
        const resCheck = await axios.get(
          `http://http://66.116.232.233:5000/api/v1/TimeClock/employee/${employeeId}`
        );

        const todayRecord = resCheck.data.find((rec) => rec.date === systemDate);

     
        if (!todayRecord) {
          // ✅ First time: Clock In
          const data = {
            employeeId: parseInt(employeeId),
            date: systemDate,
            clockIn: `${systemDate}T${systemTime}`,
          };

        await axios.post("http://http://66.116.232.233:5000/api/v1/TimeClock", data);

setStatus("✅ Clock In recorded successfully");

        } else if (!todayRecord.clockOut) {
          // ✅ Second time: Clock Out
          const data = {
            ...todayRecord,
            clockOut: `${systemDate}T${systemTime}`,
          };

       const res= await axios.put(
            `http://http://66.116.232.233:5000/api/v1/TimeClock/${todayRecord.id}`,
            data
          );
          console.log("Response:", res.data);
          setStatus("✅ Clock Out recorded successfully");
        } else {
          setStatus("📅 You have already clocked out for today.");
        }
      } catch (error) {
        console.error("Error marking attendance:", error);
        setStatus("⚠️ Failed to mark attendance. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Auto mark attendance when page loads
    markAttendance();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center" }}>⏳ Marking your attendance...</p>;

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "10%",
        background: "#f9fafb",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        marginInline: "auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ color: "#4f46e5" }}>⏰ Attendance Recorded</h2>
      <p>{status}</p>
      <div style={{ marginTop: "1rem" }}>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
      </div>
    </div>
  );
};

export default Attendance;
