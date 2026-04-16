import React, { useEffect, useState } from "react";
import "../../styles/HolidayCalendar.css";
  const HolidayManagement = () => {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({
    date: "",
    name: "",
    icon: "",
  });

  // Fetch all holidays from backend
  useEffect(() => {
    fetchHolidays();
  }, []);



  const fetchHolidays = () => {
    fetch("http://localhost:5133/api/HolidayCalendar")
      .then((res) => res.json())
      .then((data) => setHolidays(data))
      .catch((err) => console.error("Error fetching holidays:", err));
  };

  // Handle input change for Add form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday({ ...newHoliday, [name]: value });
  };

  // Add new holiday
  const handleAddHoliday = (e) => {
    e.preventDefault();

    fetch("http://localhost:5133/api/HolidayCalendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHoliday),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add holiday");
        return res.json();
      })
      .then(() => {
        alert("✅ Holiday added successfully!");
        setNewHoliday({ date: "", name: "", icon: "" });
        fetchHolidays();
      })
      .catch((err) => console.error("Error adding holiday:", err));
  };

  // Get weekday name from date
  const getWeekdayName = (dateString) => {
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj)) return "";
      return dateObj.toLocaleDateString("en-US", { weekday: "long" });
    } catch {
      return "";
    }
  };

  // Delete holiday by ID
  const handleDeleteHoliday = (id) => {
    if (!window.confirm("Are you sure you want to delete this holiday?")) return;

    fetch(`http://localhost:5133/api/HolidayCalendar/${Number(id)}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete holiday");
        alert("🗑️ Holiday deleted successfully!");
        fetchHolidays(); // Refresh the list
      })
      .catch((err) => console.error("Error deleting holiday:", err));
  };

  return (
    <div className

="holiday-calendar-container">
      <h2>Holiday Management (HR)</h2>

      {/* === Add Holiday Form === */}
      <div className

="add-holiday-form">
        <h3>Add New Holiday</h3>
        <form onSubmit={handleAddHoliday}>
          <input
            type="date"
            name="date"
            value={newHoliday.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Enter holiday name"
            value={newHoliday.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="icon"
            placeholder="Enter icon (e.g., 🎉)"
            value={newHoliday.icon}
            onChange={handleChange}
          />
          <button type="submit">+ Add Holiday</button>
        </form>
      </div>

      {/* === Holiday List === */}
      <div className

="holiday-grid">
        {holidays.length === 0 && <p>No holidays found.</p>}
        {holidays.map((holiday) => (
          <div key={holiday.id} className

="holiday-card">
            <span className

="holiday-icon">{holiday.icon}</span>
            <h4>{holiday.name}</h4>
            <p>
              {holiday.date} <strong>({getWeekdayName(holiday.date)})</strong>
            </p>
            <button
              className

="delete-btn"
              onClick={() => handleDeleteHoliday(holiday.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayManagement;
