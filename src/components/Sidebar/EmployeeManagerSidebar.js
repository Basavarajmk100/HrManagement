import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaInfoCircle,
  FaClock,
  FaMoneyBill,
  FaCalendarAlt,
  FaUmbrellaBeach,
  FaBars,
  FaChevronDown,
  FaDollarSign,
  FaChartLine,
  FaFileAlt,
  FaUsers,
  FaLaptopCode,
  FaMoneyCheckAlt,
  FaBullhorn,
  FaUserPlus,
  FaWallet,
  FaCalculator,
  FaCalendarDay,
  FaCog,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import "../../styles/EmployeeManagerSidebar.css";

const EmployeeManagerSidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState([]);

  const toggleSubmenu = (index) => {
    if (openMenus.includes(index)) {
      setOpenMenus(openMenus.filter((i) => i !== index));
    } else {
      setOpenMenus([...openMenus, index]);
    }
  };

  const menuItems = [
    { name: "General Info", icon: FaInfoCircle, path: "/employee-manager/general" },
    { name: "Attendance", icon: FaClock, path: "/employee-manager/attendance" },
    { name: "Payroll", icon: FaMoneyBill, path: "/employee-manager/payroll" },
    { name: "Scheduling", icon: FaCalendarAlt, path: "/employee-manager/scheduling" },
    { name: "Leave Details", icon: FaUmbrellaBeach, path: "/employee-manager/leaves" },
    { name: "HR Payroll Form", icon: FiFileText, path: "/employee-manager/HRPayrollForm" },
    { name: "Add CTC", icon: FaDollarSign, path: "/employee-manager/addctc" },

    {
      name: "KPI",
      icon: FaChartLine,
      submenu: [
        { name: "Sales KPI", path: "/employee-manager/SalesKPIForm", icon: FaMoneyCheckAlt },
        { name: "IT KPI", path: "/employee-manager/ITKPIForm", icon: FaLaptopCode },
        { name: "HR KPI", path: "/employee-manager/HRKPIForm", icon: FaUsers },
        { name: "Finance KPI", path: "/employee-manager/FinanceKPIForm", icon: FaCalculator },
        { name: "Marketing KPI", path: "/employee-manager/MarketingKPIForm", icon: FaBullhorn },
        { name: "Add Employee Stat", path: "/employee-manager/addHrStat", icon: FaUserPlus }
      ]
    },

    {
      name: "Reports",
      icon: FaFileAlt,
      submenu: [
        { name: "Payroll", path: "/employee-manager/payrollreports", icon: FaWallet },
        { name: "CTC", path: "/employee-manager/CTCreport", icon: FaDollarSign },
        { name: "Attendance", path: "/employee-manager/AttendanceReport", icon: FaClock },
        { name: "Employee Master", path: "/employee-manager/EmployeeReport", icon: FaUsers },
        { name: "Payslip", path: "/employee-manager/PayslipReport", icon: FaMoneyCheckAlt },
        { name: "Leave", path: "/employee-manager/LeaveReport", icon: FaCalendarDay }
      ]
    },

    { name: "Profile", icon: FaUser, path: "/employee-manager/HrProfile" },
    { name: "Settings", icon: FaCog, path: "/employee-manager/Settings" },
    { name: "Logout", icon: FaSignOutAlt, path: "/logout" }
  ];

  return (
    <>
      <aside className

="sidebar">
        {/* Header */}
        <div className

="sidebar-header">
          <div className

="logo-box">HR</div>
          <span className

="logo-text">HRMS</span>
        </div>

        <nav className

="sidebar-menu">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div key={index}>
                {item.submenu ? (
                  <>
                    <button
                      className

={`menu-item ${openMenus.includes(index) ? "open" : ""}`}
                      onClick={() => toggleSubmenu(index)}
                    >
                      <Icon />
                      <span className

="label">{item.name}</span>
                      <FaChevronDown
                        className

={`arrow ${openMenus.includes(index) ? "rotate" : ""}`}
                      />
                    </button>

                    <div className

={`submenu ${openMenus.includes(index) ? "submenu-open" : ""}`}>
                      {item.submenu.map((sub, i) => {
                        const SubIcon = sub.icon;
                        return (
                          <Link
                            key={i}
                            to={sub.path}
                            className

={`submenu-link ${
                              location.pathname === sub.path ? "active" : ""
                            }`}
                          >
                            <SubIcon />
                            <span>{sub.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className

={`menu-item ${isActive ? "active" : ""}`}
                  >
                    <Icon />
                    <span className

="label">{item.name}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <div className

="sidebar-spacer"></div>
    </>
  );
};

export default EmployeeManagerSidebar;