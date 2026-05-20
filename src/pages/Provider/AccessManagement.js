import React, { useState } from "react";
import "../../styles/AccessManagement.css";
import Select from "react-select";

const AccessManagement = () => {
  const companies = ["ABC Pvt Ltd", "XYZ Technologies"];

  const theme = localStorage.getItem("theme") || "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  const employees = ["Basavaraj MK", "Deepak SN", "Suresh DL"];

  const roles = {
    Admin: ["HR Admin", "IT Admin", "Finance Admin"],
    Employee: ["All Employees", ...employees],
    HR: ["HR Manager", "HR Executive"],
  };

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  /*const [selectedEmployee, setSelectedEmployee] = useState("");

  const [openMenu, setOpenMenu] = useState(null);
  */

  const [popup, setPopup] = useState("");

  /* HR ADMIN PERMISSIONS */

  const [hrAdminPermissions, setHrAdminPermissions] = useState({
    employeeManagement: { enabled: false, view: false, edit: false },
    attendanceTracking: { enabled: false, view: false, edit: false },
    leaveApproval: { enabled: false, view: false, edit: false },
    onboarding: { enabled: false, view: false, edit: false },
  });

  const handleHrAdminPermission = (permission, type) => {
    setHrAdminPermissions({
      ...hrAdminPermissions,
      [permission]: {
        ...hrAdminPermissions[permission],
        [type]: !hrAdminPermissions[permission][type],
      },
    });
  };

  /* IT ADMIN PERMISSIONS */

  const [itAdminPermissions, setItAdminPermissions] = useState({
    systemAccessControl: { enabled: false, view: false, edit: false },
    userAccountManagement: { enabled: false, view: false, edit: false },
    loginCredentials: { enabled: false, view: false, edit: false },
  });

  const handleITAdminPermission = (permission, type) => {
    setItAdminPermissions({
      ...itAdminPermissions,
      [permission]: {
        ...itAdminPermissions[permission],
        [type]: !itAdminPermissions[permission][type],
      },
    });
  };

  /* FINANCE ADMIN PERMISSIONS */

  const [financeAdminPermissions, setFinanceAdminPermissions] = useState({
    payrollManagement: { enabled: false, view: false, edit: false },
    salaryProcessing: { enabled: false, view: false, edit: false },
    payslipGeneration: { enabled: false, view: false, edit: false },
  });

  const handleFinanceAdminPermission = (permission, type) => {
    setFinanceAdminPermissions({
      ...financeAdminPermissions,
      [permission]: {
        ...financeAdminPermissions[permission],
        [type]: !financeAdminPermissions[permission][type],
      },
    });
  };

  /* EMPLOYEE PERMISSIONS */

  const [employeePermissions, setEmployeePermissions] = useState({
    viewProfile: { enabled: false, view: false, edit: false },
    applyLeave: { enabled: false, view: false, edit: false },
    viewAttendance: { enabled: false, view: false, edit: false },
    downloadPayslip: { enabled: false, view: false, edit: false },
    requests: { enabled: false, view: false, edit: false },
  });

  const handleEmployeePermission = (permission, type) => {
    setEmployeePermissions({
      ...employeePermissions,
      [permission]: {
        ...employeePermissions[permission],
        [type]: !employeePermissions[permission][type],
      },
    });
  };

  const [hrPermissions, setHrPermissions] = useState({
    employeeRecords: { enabled: false, view: false, edit: false },
    leaveManagement: { enabled: false, view: false, edit: false },
    recruitment: { enabled: false, view: false, edit: false },
    performanceReviews: { enabled: false, view: false, edit: false },
  });

  const handleHrPermission = (permission, type) => {
    setHrPermissions({
      ...hrPermissions,
      [permission]: {
        ...hrPermissions[permission],
        [type]: !hrPermissions[permission][type],
      },
    });
  };

  const roleOptions = Object.keys(roles).map((role) => ({
    label: role,
    options: roles[role].map((item) => ({
      label: item,
      value: item,
    })),
  }));

  return (
    <div className={`access-page theme-${theme}`}>
      {/* BACKGROUND EFFECTS */}
      <div className="bg-canvas">
        {isDark && (
          <>
            <div className="ambient-orb orb-1"></div>
            <div className="ambient-orb orb-2"></div>
            <div className="ambient-orb orb-3"></div>
            <div className="ambient-orb orb-4"></div>

            <div
              className="bg-glass-layer"
              style={{
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(100px)",
              }}
            ></div>
          </>
        )}

        {isColorful && (
          <>
            <div className="ambient-orb orb-1"></div>
            <div className="ambient-orb orb-2"></div>
            <div className="ambient-orb orb-3"></div>
            <div className="ambient-orb orb-4"></div>

            <div className="bg-glass-layer"></div>
          </>
        )}
      </div>

      <div className="access-layout">
        {/* LEFT SIDE FORM */}
        <div className="access-container">
          <h3>Access Management</h3>

          {/* COMPANY */}
          <div className="form-group">
            <label>Company</label>
            <select
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                setSelectedRole("");
              }}
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company}>{company}</option>
              ))}
            </select>
          </div>

          {/* ROLE */}
          <div className="form-group">
            <label>User Role</label>
            <Select
              options={roleOptions}
              placeholder="Select Role"
              value={roleOptions
                .flatMap((group) => group.options)
                .find((option) => option.value === selectedRole)}
              onChange={(selected) => setSelectedRole(selected.value)}
            />
          </div>
        </div>

        {/* RIGHT SIDE PERMISSIONS */}
        <div className="permissions-panel">
          {/* HR ADMIN */}
          {selectedRole === "HR Admin" && (
            <div className="permission-box">
              <h4>HR Admin Permissions</h4>

              {/* Employee Management */}
              <div className="permission-row">
                <span>Employee Management</span>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.employeeManagement.enabled}
                    onChange={() => {
                      handleHrAdminPermission("employeeManagement", "enabled");

                      if (!hrAdminPermissions.employeeManagement.enabled) {
                        setPopup("Employee Management Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.employeeManagement.view}
                    onChange={() =>
                      handleHrAdminPermission("employeeManagement", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.employeeManagement.edit}
                    onChange={() =>
                      handleHrAdminPermission("employeeManagement", "edit")
                    }
                  />
                </label>
              </div>

              {popup && (
                <div className="popup-overlay">
                  <div className="permission-popup">
                    <p>{popup}</p>

                    <div className="popup-buttons">
                      <button onClick={() => setPopup(null)}>OK</button>

                      <button
                        className="cancel-btn"
                        onClick={() => setPopup(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Attendance Tracking */}
              <div className="permission-row">
                <span>Attendance Tracking</span>

                {popup && (
                  <div className="popup-overlay">
                    <div className="permission-popup">
                      <p>{popup}</p>
                      <button onClick={() => setPopup(null)}>OK</button>
                    </div>
                  </div>
                )}

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.attendanceTracking.enabled}
                    onChange={() => {
                      handleHrAdminPermission("attendanceTracking", "enabled");

                      if (!hrAdminPermissions.attendanceTracking.enabled) {
                        setPopup("Attendance Tracking Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.attendanceTracking.view}
                    onChange={() =>
                      handleHrAdminPermission("attendanceTracking", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.attendanceTracking.edit}
                    onChange={() =>
                      handleHrAdminPermission("attendanceTracking", "edit")
                    }
                  />
                </label>
              </div>

              {/* Leave Approval */}
              <div className="permission-row">
                <span>Leave Approval</span>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.leaveApproval.enabled}
                    onChange={() => {
                      handleHrAdminPermission("leaveApproval", "enabled");

                      if (!hrAdminPermissions.leaveApproval.enabled) {
                        alert("Leave Approval Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.leaveApproval.view}
                    onChange={() =>
                      handleHrAdminPermission("leaveApproval", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.leaveApproval.edit}
                    onChange={() =>
                      handleHrAdminPermission("leaveApproval", "edit")
                    }
                  />
                </label>
              </div>

              {/* Onboarding */}
              <div className="permission-row">
                <span>Onboarding</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.onboarding.enabled}
                    onChange={() => {
                      handleHrAdminPermission("onboarding", "enabled");

                      if (!hrAdminPermissions.onboarding.enabled) {
                        alert("Onboarding Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.onboarding.view}
                    onChange={() =>
                      handleHrAdminPermission("onboarding", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={hrAdminPermissions.onboarding.edit}
                    onChange={() =>
                      handleHrAdminPermission("onboarding", "edit")
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {selectedRole === "IT Admin" && (
            <div className="permission-box">
              <h4>IT Admin Permissions</h4>

              {/* System Access Control */}
              <div className="permission-row">
                <span>System Access Control</span>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={itAdminPermissions.systemAccessControl.enabled}
                    onChange={() =>
                      handleITAdminPermission("systemAccessControl", "enabled")
                    }
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={itAdminPermissions.systemAccessControl.view}
                    onChange={() =>
                      handleITAdminPermission("systemAccessControl", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={itAdminPermissions.systemAccessControl.edit}
                    onChange={() =>
                      handleITAdminPermission("systemAccessControl", "edit")
                    }
                  />
                </label>
              </div>
            </div>
          )}
          {selectedRole === "Finance Admin" && (
            <div className="permission-box">
              <h4>Finance Admin Permissions</h4>

              {/* Payroll Management */}
              <div className="permission-row">
                <span>Payroll Management</span>

                {popup && <div className="permission-popup">{popup}</div>}
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={financeAdminPermissions.payrollManagement.enabled}
                    onChange={() => {
                      handleFinanceAdminPermission(
                        "payrollManagement",
                        "enabled",
                      );

                      if (!financeAdminPermissions.payrollManagement.enabled) {
                        alert("Payroll Management Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={financeAdminPermissions.payrollManagement.view}
                    onChange={() =>
                      handleFinanceAdminPermission("payrollManagement", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={financeAdminPermissions.payrollManagement.edit}
                    onChange={() =>
                      handleFinanceAdminPermission("payrollManagement", "edit")
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {/* EMPLOYEE */}
          {roles.Employee.includes(selectedRole) && (
            <div className="permission-box">
              <h4>{selectedRole} Permissions</h4>

              {/* View Profile */}
              <div className="permission-row">
                <span>View Profile</span>

                {popup && <div className="permission-popup">{popup}</div>}

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={employeePermissions.viewProfile.enabled}
                    onChange={() => {
                      handleEmployeePermission("viewProfile", "enabled");

                      if (!employeePermissions.viewProfile.enabled) {
                        alert("View Profile Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={employeePermissions.viewProfile.view}
                    onChange={() =>
                      handleEmployeePermission("viewProfile", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={employeePermissions.viewProfile.edit}
                    onChange={() =>
                      handleEmployeePermission("viewProfile", "edit")
                    }
                  />
                </label>
              </div>

              {/* Apply Leave */}
              <div className="permission-row">
                <span>Apply Leave</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={employeePermissions.applyLeave.enabled}
                    onChange={() => {
                      handleEmployeePermission("applyLeave", "enabled");

                      if (!employeePermissions.applyLeave.enabled) {
                        alert("Apply Leave Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={employeePermissions.applyLeave.view}
                    onChange={() =>
                      handleEmployeePermission("applyLeave", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={employeePermissions.applyLeave.edit}
                    onChange={() =>
                      handleEmployeePermission("applyLeave", "edit")
                    }
                  />
                </label>
              </div>

              {/* View Attendance */}
              <div className="permission-row">
                <span>View Attendance</span>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={employeePermissions.viewAttendance.enabled}
                    onChange={() => {
                      handleEmployeePermission("viewAttendance", "enabled");

                      if (!employeePermissions.viewAttendance.enabled) {
                        alert("View Attendance Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>
                <label>
                  View
                  <input
                    type="checkbox"
                    checked={employeePermissions.viewAttendance.view}
                    onChange={() =>
                      handleEmployeePermission("viewAttendance", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={employeePermissions.viewAttendance.edit}
                    onChange={() =>
                      handleEmployeePermission("viewAttendance", "edit")
                    }
                  />
                </label>
              </div>

              {/* Download Payslip */}
              <div className="permission-row">
                <span>Download Payslip</span>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={employeePermissions.downloadPayslip.enabled}
                    onChange={() => {
                      handleEmployeePermission("downloadPayslip", "enabled");

                      if (!employeePermissions.downloadPayslip.enabled) {
                        alert("Download Payslip Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={employeePermissions.downloadPayslip.view}
                    onChange={() =>
                      handleEmployeePermission("downloadPayslip", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={employeePermissions.downloadPayslip.edit}
                    onChange={() =>
                      handleEmployeePermission("downloadPayslip", "edit")
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {/* HR */}
          {["HR Manager", "HR Executive"].includes(selectedRole) && (
            <div className="permission-box">
              <h4>{selectedRole} Permissions</h4>

              {/* Employee Records */}
              <div className="permission-row">
                <span>Employee Records</span>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={hrPermissions.employeeRecords.enabled}
                    onChange={() => {
                      handleHrPermission("employeeRecords", "enabled");

                      if (!hrPermissions.employeeRecords.enabled) {
                        alert("Employee Records Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={hrPermissions.employeeRecords.view}
                    onChange={() =>
                      handleHrPermission("employeeRecords", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={hrPermissions.employeeRecords.edit}
                    onChange={() =>
                      handleHrPermission("employeeRecords", "edit")
                    }
                  />
                </label>
              </div>

              {/* Leave Management */}
              <div className="permission-row">
                <span>Leave Management</span>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={hrPermissions.leaveManagement.enabled}
                    onChange={() => {
                      handleHrPermission("leaveManagement", "enabled");

                      if (!hrPermissions.leaveManagement.enabled) {
                        alert("Leave Management Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={hrPermissions.leaveManagement.view}
                    onChange={() =>
                      handleHrPermission("leaveManagement", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={hrPermissions.leaveManagement.edit}
                    onChange={() =>
                      handleHrPermission("leaveManagement", "edit")
                    }
                  />
                </label>
              </div>

              {/* Recruitment */}
              <div className="permission-row">
                <span>Recruitment</span>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={hrPermissions.recruitment.enabled}
                    onChange={() => {
                      handleHrPermission("recruitment", "enabled");

                      if (!hrPermissions.recruitment.enabled) {
                        alert("Recruitment Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={hrPermissions.recruitment.view}
                    onChange={() => handleHrPermission("recruitment", "view")}
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={hrPermissions.recruitment.edit}
                    onChange={() => handleHrPermission("recruitment", "edit")}
                  />
                </label>
              </div>

              {/* Performance Reviews */}
              <div className="permission-row">
                <span>Performance Reviews</span>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={hrPermissions.performanceReviews.enabled}
                    onChange={() => {
                      handleHrPermission("performanceReviews", "enabled");

                      if (!hrPermissions.performanceReviews.enabled) {
                        alert("Performance Reviews Enabled");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>

                <label>
                  View
                  <input
                    type="checkbox"
                    checked={hrPermissions.performanceReviews.view}
                    onChange={() =>
                      handleHrPermission("performanceReviews", "view")
                    }
                  />
                </label>

                <label>
                  Edit
                  <input
                    type="checkbox"
                    checked={hrPermissions.performanceReviews.edit}
                    onChange={() =>
                      handleHrPermission("performanceReviews", "edit")
                    }
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;
