import React, { useState } from "react";
import "../../styles/AccessManagement.css";

const AccessManagement = () => {
  const companies = ["ABC Pvt Ltd", "XYZ Technologies"];

  const theme = localStorage.getItem("theme") || "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  const employees = ["Basavaraj", "Deepak", "Suresh"];

  const roles = {
    Admin: ["HR Admin", "IT Admin", "Finance Admin"],
    Employee: ["All Employees", ...employees],
  };

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

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

  const handleItAdminPermission = (permission, type) => {
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
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select Role</option>

              {Object.keys(roles).map((role) => (
                <optgroup key={role} label={role}>
                  {roles[role].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* RIGHT SIDE PERMISSIONS */}
        <div className="permissions-panel">
          {/* HR ADMIN */}
          {/* HR ADMIN */}
          {selectedRole === "HR Admin" && (
            <div className="permission-box">
              <h4>HR Admin Permissions</h4>

              {/* Employee Management */}
              <div className="permission-row">
                <span>Employee Management</span>

                <button
                  className={
                    hrAdminPermissions.employeeManagement.enable
                      ? "enable-btn active"
                      : "enable-btn"
                  }
                  onClick={() =>
                    handleHrAdminPermission("employeeManagement", "enable")
                  }
                >
                  {hrAdminPermissions.employeeManagement.enable
                    ? "Enabled"
                    : "Enable"}
                </button>

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

              {/* Attendance Tracking */}
              <div className="permission-row">
                <span>Attendance Tracking</span>

                <button
                  className={
                    hrAdminPermissions.attendanceTracking.enable
                      ? "enable-btn active"
                      : "enable-btn"
                  }
                  onClick={() =>
                    handleHrAdminPermission("attendanceTracking", "enable")
                  }
                >
                  {hrAdminPermissions.attendanceTracking.enable
                    ? "Enabled"
                    : "Enable"}
                </button>

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

                <button
                  className={
                    hrAdminPermissions.leaveApproval.enable
                      ? "enable-btn active"
                      : "enable-btn"
                  }
                  onClick={() =>
                    handleHrAdminPermission("leaveApproval", "enable")
                  }
                >
                  {hrAdminPermissions.leaveApproval.enable
                    ? "Enabled"
                    : "Enable"}
                </button>

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

                <button
                  className={
                    hrAdminPermissions.onboarding.enable
                      ? "enable-btn active"
                      : "enable-btn"
                  }
                  onClick={() =>
                    handleHrAdminPermission("onboarding", "enable")
                  }
                >
                  {hrAdminPermissions.onboarding.enable ? "Enabled" : "Enable"}
                </button>

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

          {selectedRole === "Finance Admin" && (
            <div className="permission-box">
              <h4>Finance Admin Permissions</h4>

              {/* Payroll Management */}
              <div className="permission-row">
                <span>Payroll Management</span>

                <button
                  className={
                    financeAdminPermissions.payrollManagement.enable
                      ? "enable-btn active"
                      : "enable-btn"
                  }
                  onClick={() =>
                    handleFinanceAdminPermission("payrollManagement", "enable")
                  }
                >
                  {financeAdminPermissions.payrollManagement.enable
                    ? "Enabled"
                    : "Enable"}
                </button>

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

                <button
                  className={
                    employeePermissions.viewProfile.enable
                      ? "enable-btn active"
                      : "enable-btn"
                  }
                  onClick={() =>
                    handleEmployeePermission("viewProfile", "enable")
                  }
                >
                  {employeePermissions.viewProfile.enable
                    ? "Enabled"
                    : "Enable"}
                </button>

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

                <button
                  className={
                    employeePermissions.applyLeave.enable
                      ? "enable-btn active"
                      : "enable-btn"
                  }
                  onClick={() =>
                    handleEmployeePermission("applyLeave", "enable")
                  }
                >
                  {employeePermissions.applyLeave.enable ? "Enabled" : "Enable"}
                </button>

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

                <button
                  className={
                    employeePermissions.viewAttendance.enable
                      ? "enable-btn active"
                      : "enable-btn"
                  }
                  onClick={() =>
                    handleEmployeePermission("viewAttendance", "enable")
                  }
                >
                  {employeePermissions.viewAttendance.enable
                    ? "Enabled"
                    : "Enable"}
                </button>

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

                <button
                  className={
                    employeePermissions.downloadPayslip.enable
                      ? "enable-btn active"
                      : "enable-btn"
                  }
                  onClick={() =>
                    handleEmployeePermission("downloadPayslip", "enable")
                  }
                >
                  {employeePermissions.downloadPayslip.enable
                    ? "Enabled"
                    : "Enable"}
                </button>

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
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;
