import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Profile.css";
import { useParams } from "react-router-dom";

  const Profile = () => {
  const { employeeId: routeEmployeeId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  
  const theme = localStorage.getItem("theme") || "simple";
      const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  // ✅ Use route param OR saved employeeId
  const employeeId = routeEmployeeId || localStorage.getItem("employeeId") || 1;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5133/api/v1/Profile/${employeeId}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("⚠️ Unable to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [employeeId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
  <div className

={`profile-container theme-${theme}`}>
      <div className

="profile-card">
        {/* 🧑‍💼 Header Section */}
        <div className

="profile-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Employee Avatar"
            className

="profile-avatar"
          />
          <div>
            <h2 className

="profile-name1">
              {profile.name}
            </h2>        
          </div>
        </div>

        

        <div className

="profile-divider"></div>


      {/* 📋 Full Employee Details */}
<div className

="profile-details">
  <p><strong>Employee ID:</strong>{profile.id}</p>
  <p><strong>Employee Name:</strong> {profile.name}</p>
  <p><strong>Father's Name:</strong> {profile.father || "—"}</p>
  <p><strong>Date of Joining:</strong> {profile.doj || "—"}</p>
  <p><strong>Department:</strong> {profile.department || "—"}</p>
  <p><strong>Branch:</strong> {profile.branch || "—"}</p>
  <p><strong>Grade:</strong> {profile.grade || "—"}</p>
  <p><strong>Designation:</strong> {profile.designation || "—"}</p>
  <p><strong>Occupation:</strong> {profile.occupation || "—"}</p>
  <p><strong>PAN No:</strong> {profile.pan || "—"}</p>
  <p><strong>Aadhaar No:</strong> {profile.aadhaar || "—"}</p>
  <p><strong>Bank Name:</strong> {profile.bankName || "—"}</p>
  <p><strong>Account No:</strong> {profile.accountNo || "—"}</p>
  <p><strong>IFSC:</strong> {profile.ifsc || "—"}</p>
  <p><strong>PF No:</strong> {profile.pfNo || "—"}</p>
  <p><strong>ESI No:</strong> {profile.esiNo || "—"}</p>
  <p><strong>UAN:</strong> {profile.uan || "—"}</p>
</div>
   </div>
    </div>
  );
};

export default Profile;
