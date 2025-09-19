import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaMoneyCheckAlt, 
  FaShieldAlt, 
  FaRunning, 
  FaSignOutAlt, 
  FaBars 
} from "react-icons/fa";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Calendar", icon: <FaCalendarAlt />, path: "/" },
    { name: "Payroll", icon: <FaMoneyCheckAlt />, path: "/employees" },
    { name: "Insurance", icon: <FaShieldAlt />, path: "/employees" },
    { name: "Co-curricular Activities", icon: <FaRunning />, path: "/leave" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="hamburger" onClick={() => setCollapsed(!collapsed)}>
          <FaBars size={20} />
        </button>
        {!collapsed && <span className="sidebar-title">HRMS</span>}
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              {!collapsed && <span className="label">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
