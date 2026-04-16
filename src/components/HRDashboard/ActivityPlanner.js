import React, { useState } from "react";
import "../../styles/ActivityPlanner.css";

const ActivityPlanner = () => {

  const [activities, setActivities] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddActivity = (e) => {
    e.preventDefault();

    const newActivity = {
      id: Date.now(),
      ...formData
    };

    setActivities([...activities, newActivity]);

    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: ""
    });
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <div className

="planner-container">

      <h2>Activity Planner</h2>

      {/* Activity Form */}

      <form className

="planner-form" onSubmit={handleAddActivity}>

        <input
          type="text"
          name="title"
          placeholder="Activity Title"
          value={formData.title}
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

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Activity Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Add Activity</button>

      </form>

      {/* Activity List */}

      <div className

="activity-list">

        {activities.length === 0 && (
          <p className

="no-activity">No activities planned yet</p>
        )}

        {activities.map((activity) => (
          <div key={activity.id} className

="activity-card">

            <h3>{activity.title}</h3>

            <p><strong>Date:</strong> {activity.date}</p>
            <p><strong>Time:</strong> {activity.time}</p>
            <p><strong>Location:</strong> {activity.location}</p>

            <p className

="description">{activity.description}</p>


          </div>
        ))}

      </div>

    </div>
  );
};

export default ActivityPlanner;