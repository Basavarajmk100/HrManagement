import React, { useState } from "react";
import "../../styles/Settings.css";

const ProviderSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className

="settings-container">
      <h2>⚙️ Provider Settings</h2>

      <div className

="settings-layout">
        {/* Sidebar Tabs */}
        <div className

="settings-menu">
          <button onClick={() => setActiveTab("profile")}>
            Provider Profile
          </button>

          <button onClick={() => setActiveTab("companyLimits")}>
            Company Limits
          </button>

          <button onClick={() => setActiveTab("billing")}>
            Billing & Plans
          </button>

          <button onClick={() => setActiveTab("permissions")}>
            Provider Permissions
          </button>

          <button onClick={() => setActiveTab("security")}>
            Security Settings
          </button>
        </div>

        {/* Content Area */}
        <div className

="settings-content">

          {/* Provider Profile */}
          {activeTab === "profile" && (
            <div>
              <h3>Provider Profile</h3>
              <input placeholder="Provider Name" />
              <input placeholder="Support Email" />
              <input placeholder="Support Phone" />
              <button>Save</button>
            </div>
          )}

          {/* Company Limits */}
          {activeTab === "companyLimits" && (
            <div>
              <h3>Company Limits</h3>
              <input placeholder="Max Companies Allowed" />
              <input placeholder="Max Users Per Company" />
              <input placeholder="Storage Limit (GB)" />
              <button>Save</button>
            </div>
          )}

          {/* Billing & Plans */}
          {activeTab === "billing" && (
            <div>
              <h3>Billing & Plans</h3>
              <input placeholder="Basic Plan Price" />
              <input placeholder="Premium Plan Price" />
              <input placeholder="Enterprise Plan Price" />
              <button>Save</button>
            </div>
          )}

          {/* Provider Permissions */}
          {activeTab === "permissions" && (
            <div>
              <h3>Provider Permissions</h3>

              <div className

="role-item">
                <h4>Provider Admin</h4>
                <label><input type="checkbox" /> Can Add Companies</label>
                <label><input type="checkbox" /> Can Delete Companies</label>
                <label><input type="checkbox" /> Can Manage Payments</label>
              </div>

              <div className

="role-item">
                <h4>Support Staff</h4>
                <label><input type="checkbox" /> Can View Companies</label>
                <label><input type="checkbox" /> Can View Reports</label>
              </div>

              <button onClick={() => alert("Provider permissions saved!")}>
                Save
              </button>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div>
              <h3>Security Settings</h3>
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm Password" />
              <button>Change Password</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProviderSettings;
