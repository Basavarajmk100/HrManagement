import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/CompanySettings.css";

// ⭐ Professional Default Permissions
const defaultPermissions = {
  // User Management
  canViewUsers: true,
  canAddUsers: true,
  canEditUsers: true,
  canDeleteUsers: false,


  // Reports
  canViewReports: true,
  canExportReports: false,


  // Billing & Subscription
  canManagePayments: false,
  canViewBilling: true,
  canChangePlan: false,
  canCancelSubscription: false,

}

export default function CompanySettings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState(defaultPermissions);

  // Fetch permissions from backend (future)
  useEffect(() => {
    console.log("Loading permissions for company ID:", id);
    // fetch(`/api/company/${id}/permissions`)
  }, [id]);

  const togglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log("Saving permissions:", permissions);
    alert("Permissions saved successfully!");
    // POST API call here
  };

  return (
    <div className

="companySettingsContainer">
      <h2>Company Permissions (Company ID: {id})</h2>

      <div className

="permissionsList">
        {Object.keys(permissions).map((key) => (
          <div key={key} className

="permissionItem">
            <span className

="permissionLabel">{formatLabel(key)}</span>

            <button
  className

={`toggleButton ${permissions[key] ? "yes" : "no"}`}
  onClick={() => togglePermission(key)}
></button>

          </div>
        ))}
      </div>

      <div className

="settingsActions">
        <button className

="saveButton" onClick={handleSave}>Save</button>
        <button className

="cancelButton" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
}

// Convert camelCase to readable label
function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}
