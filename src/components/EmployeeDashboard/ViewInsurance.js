import React from "react";
import "../../styles/ViewInsurance.css";

  const MyInsurance = () => {
  const spouse = { name: "Roshmi", gender: "Female", dob: "12-05-1993", age: "32" };

  const children = [
    { name: "Johaan Linto", gender: "Male", dob: "10-04-2021", age: "4" },
    { name: "Anna Linto", gender: "Female", dob: "15-08-2023", age: "2" },

  ];
  
    const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";


  return (
      <div className

={`insurance-panel theme-${theme}`}>

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

="employee-insurance-container">

      <h2>My Insurance</h2>

      <div className

="insurance-card">

        {/* Policy Details */}
        <h3>Policy Details</h3>

        <p><strong>Policy Name:</strong> Group Health Insurance</p>
        <p><strong>Provider:</strong> Star Health</p>
        <p><strong>Policy Number:</strong> POL12345</p>
        <p><strong>Coverage:</strong> ₹5,00,000</p>
        <p><strong>Start Date:</strong> 01-04-2026</p>
        <p><strong>End Date:</strong> 31-03-2027</p>

        <hr />

        {/* Primary Member */}
        <h3>Primary Member</h3>

        <div className

="form-row">
          <p><strong>Employee No:</strong> EMP001</p>
          <p><strong>Name:</strong> Linto Leo Tom</p>
          <p><strong>Gender:</strong> Male</p>
          <p><strong>DOB:</strong> 12-06-1990</p>
          <p><strong>Age:</strong> 35</p>
          <p><strong>Pre-existing Disease:</strong> None</p>
        </div>

        <hr />

        {/* Parents */}
        <h3>Parents</h3>

        <div className

="form-row">
          <p><strong>Father DOB:</strong> 10-03-1965</p>
          <p><strong>Mother DOB:</strong> 15-07-1968</p>
        </div>

        <hr />

        {/* Spouse */}
        <h3>Spouse</h3>

        <div className

="form-row">
          <p><strong>Name:</strong> {spouse.name}</p>
          <p><strong>Gender:</strong> {spouse.gender}</p>
          <p><strong>DOB:</strong> {spouse.dob}</p>
          <p><strong>Age:</strong> {spouse.age}</p>
        </div>

        <hr />

        {/* Children */}
        <h3>Children</h3>

        {children.map((child, index) => (
          <div key={index} className

="child-box">
            <p><strong>Name:</strong> {child.name}</p>
            <p><strong>Gender:</strong> {child.gender}</p>
            <p><strong>DOB:</strong> {child.dob}</p>
            <p><strong>Age:</strong> {child.age}</p>
          </div>
        ))}

        <hr />

        {/* Plan Details */}
        <h3>Plan Details</h3>

        <div className

="form-row">
          <p><strong>Plan Selected:</strong> Plan A</p>
          <p><strong>Plan Amount:</strong> ₹20,000</p>
          <p><strong>Amount with GST:</strong> ₹23,600</p>
        </div>

        <hr />

        {/* Documents */}
        <h3>Documents</h3>

        <button className

="download-btn1">
          Download Policy Copy
        </button>

      </div>
    </div>
    </div>
  );
};

export default MyInsurance;