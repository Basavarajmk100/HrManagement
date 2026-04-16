import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../../styles/HrProfile.css";

const HRProfile = () => {
  // Personal Info
  const [name, setName] = useState("Basavaraj");
  const [email, setEmail] = useState("basavaraj@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [address, setAddress] = useState("123 Main St, City");
  
  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  const saveProfile = () => {
    const profileData = {
      name,
      email,
      phone,
      address,
      emergencyName,
      emergencyPhone,
    };
    console.log("HR Profile Updated:", profileData);
    alert("Profile updated successfully!");
  };

  return (
    <div className

="profile-container">
      <div className

="profile-card">
        {/* Header with Icon */}
        <div className

="profile-header1">
          <FaUserCircle className

="profile-icon"/>
          <h2>HR Profile</h2>
        </div>

        {/* Personal Info */}
        <h3>Personal Info</h3>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input value={email} disabled />

        <label>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Address</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        {/* Emergency Contact */}
        <h3>Emergency Contact</h3>
        <label>Contact Name</label>
        <input
          value={emergencyName}
          onChange={(e) => setEmergencyName(e.target.value)}
        />
        <label>Contact Phone</label>
        <input
          value={emergencyPhone}
          onChange={(e) => setEmergencyPhone(e.target.value)}
        />

        {/* HR Details */}
        <h3>HR Details</h3>
        <p><strong>Employee ID:</strong> HR001</p>
        <p><strong>Role:</strong> HR</p>
        <p><strong>Department:</strong> Human Resources</p>
        <p><strong>Date of Joining:</strong> 01-Jan-2025</p>

        <button onClick={saveProfile}>Save Profile</button>
      </div>
    </div>
  );
};

export default HRProfile;
