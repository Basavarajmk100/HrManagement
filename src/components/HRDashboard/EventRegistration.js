import React, { useState } from "react";
import "../../styles/EventRegistration.css";

const EventRegistration = () => {

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    department: "",
    activityName: "",
    date: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5133/api/EventRegistration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Successfully Registered for the Activity!");
      console.log("Data sent to backend:", formData);

      setFormData({
        employeeId: "",
        employeeName: "",
        department: "",
        activityName: "",
        date: ""
      });

    } else {
      alert("Failed to register");
    }

  } catch (error) {
    console.error("Error:", error);
  }
};
   const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";


  return (

 <div className

={`event-registration-container theme-${theme}`}>
      <h2>Event Registration</h2>

      <form onSubmit={handleSubmit} className

="event-form">

        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="employeeName"
          placeholder="Employee Name"
          value={formData.employeeName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="activityName"
          placeholder="Activity Name"
          value={formData.activityName}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

      </form>

    </div>
  );
};

export default EventRegistration;