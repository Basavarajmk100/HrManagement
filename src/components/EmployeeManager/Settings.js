import React, { useState } from "react";
import "../../styles/Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className

="settings-container">
      <h2>⚙️ HR Settings</h2>

      <div className

="settings-layout">
        {/* Sidebar Tabs */}
        <div className

="settings-menu">
          <button onClick={() => setActiveTab("company")}>
            Company Settings
          </button>
       
          <button onClick={() => setActiveTab("payroll")}>
            Payroll Settings
          </button>
          <button onClick={() => setActiveTab("leave")}>
            Leave Settings
          </button>
          <button onClick={() => setActiveTab("roles")}>
            Roles & Permissions
          </button>
        </div>

        {/* Content Area */}
        <div className

="settings-content">
          {activeTab === "company" && (
            <div>
              <h3>Company Settings</h3>
              <input placeholder="Company Name" />
              <input placeholder="Address" />
              <input placeholder="Email" />
              <input placeholder="Phone" />
              <button>Save</button>
            </div>
          )}

          {activeTab === "employee" && (
            <div>
              <h3>Employee Settings</h3>
              <input placeholder="Add Department" />
              <input placeholder="Add Designation" />
              <button>Save</button>
            </div>
          )}

          {activeTab === "payroll" && (
            <div>
              <h3>Payroll Settings</h3>
              <input placeholder="Basic %"/>
              <input placeholder="HRA %"/>
              <input placeholder="PF %"/>
              <button>Save</button>
            </div>
          )}

          {activeTab === "leave" && (
            <div>
              <h3>Leave Settings</h3>
              <input placeholder="Total Leaves per Year"/>
              <button>Save</button>
            </div>
          )}
{activeTab === "roles" && (
  <div>
    <h3>Roles & Permissions</h3>

    <div className

="role-item">
      <h4>Admin</h4>
      <label>
        <input type="checkbox" /> Can manage company settings
      </label>
      <label>
        <input type="checkbox" /> Can manage payroll
      </label>
      <label>
        <input type="checkbox" /> Can manage leave
      </label>
    </div>

    <div className

="role-item">
      <h4>HR</h4>
      <label>
        <input type="checkbox" /> Can manage employee data
      </label>
      <label>
        <input type="checkbox" /> Can approve leave
      </label>
      <label>
        <input type="checkbox" /> Can view payroll
      </label>
    </div>

    <div className

="role-item">
      <h4>Manager</h4>
      <label>
        <input type="checkbox" /> Can approve leave
      </label>
      <label>
        <input type="checkbox" /> Can view team attendance
      </label>
    </div>

    <div className

="role-item">
      <h4>Employee</h4>
      <label>
        <input type="checkbox" /> Can view own payslip
      </label>
      <label>
        <input type="checkbox" /> Can apply for leave
      </label>
    </div>

    <button onClick={() => alert("Roles & permissions saved!")}>Save</button>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default Settings;
