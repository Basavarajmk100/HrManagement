import React, { useState } from "react";
import "../../styles/AdminProfile.css";

function AdminProfile() {

  const [isEditing, setIsEditing] = useState(false);

  const [admin, setAdmin] = useState({
    name: "Basavaraj",
    email: "admin@hrms.com",
    phone: "+91 9876543210",
    role: "HR Administrator",
    department: "Human Resources",
    location: "Bangalore"
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully");
  };

  return (
    <div className

="profile-container">

      <div className

="profile-card">

        <div className

="profile-header">
          <img
            src="https://i.pravatar.cc/150"
            alt="Admin"
            className

="profile-img1"
          />
          <h2>Admin Profile</h2>
        </div>

        <div className

="profile-form">

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={admin.name}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={admin.phone}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label>Role</label>
          <input type="text" value={admin.role} disabled />

          <label>Department</label>
          <input
            type="text"
            name="department"
            value={admin.department}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={admin.location}
            disabled={!isEditing}
            onChange={handleChange}
          />

        </div>

        <div className

="profile-buttons">
          {!isEditing ? (
            <button className

="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <button className

="save-btn" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

      </div>

    </div>
  );
}

export default AdminProfile;