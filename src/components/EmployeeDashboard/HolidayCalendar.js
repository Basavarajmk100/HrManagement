import React, { useEffect, useState } from "react";
import "../../styles/HolidayCalendar.css";

const HolidayCalendar = () =>{
  const [holidays, setHolidays] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5133/api/HolidayCalendar") // backend API URL
      .then((res) => res.json())
      .then((data) => setHolidays(data))
      .catch((err) => console.error("Error fetching holidays:", err));
  }, []);

   
  const theme = localStorage.getItem("theme") || "simple";
      const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";


  return (
    

      <div className

={`holiday-calendar-container theme-${theme}`}>
      <h2>Holiday Calendar 2025</h2>
      <div className

="holiday-grid">
        {holidays.map((holiday) => (
          <div key={holiday.id} className

="holiday-card">
            <span className

="holiday-icon">{holiday.icon}</span>
            <h4>{holiday.date}</h4>
            <p>{holiday.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayCalendar;
