import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaShieldAlt,
  FaRunning,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaChartLine,
  FaSitemap,
  FaRegCalendarCheck
} from "react-icons/fa";

import "../../styles/Sidebar.css";

const HRSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const menuItems = [
    { name: "Calendar", icon: <FaCalendarAlt />, path: "/calendar" },
    { name: "Payroll", icon: <FaMoneyCheckAlt />, path: "/payroll" },
    { name: "Employees", icon: <FaShieldAlt />, path: "/employees" },

    {
      name: "Co-curricular Activities",
      icon: <FaRunning />,
      submenu: [
        { name: "Gallery", path: "/activities/gallery" },
        { name: "Activity Planner", path: "/activities/planner" },
        { name: "Calendar of Events", path: "/activities/calendar" },
      ],
    },

    { name: "Team Member", icon: <FaUsers />, path: "/team" },
    { name: "Performance Tracker", icon: <FaChartLine />, path: "/performance" },
    { name: "Organization Chart", icon: <FaSitemap />, path: "/organization" },
    { name: "Holiday Management", icon: <FaRegCalendarCheck />, path: "/manage-holidays" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <aside className

={`hr-sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* HEADER */}
      <div className

="sidebar-header">
        <button className

="hamburger" onClick={() => setCollapsed(!collapsed)}>
          <FaBars size={18} />
        </button>
        {!collapsed && <h2 className

="sidebar-title">ItsMyHr</h2>}
      </div>

      {/* MENU */}
      <ul className

="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.submenu ? (
              <>
                <div
                  className

="submenu-title"
                  onClick={() => toggleSubmenu(index)}
                >
                  <span className

="icon">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                  {!collapsed &&
                    (openSubmenu === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    ))}
                </div>

                {openSubmenu === index && !collapsed && (
                  <ul className

="submenu">
                    {item.submenu.map((sub, subIndex) => (
                      <li
                        key={subIndex}
                        className

={
                          location.pathname === sub.path ? "active" : ""
                        }
                      >
                        <Link to={sub.path}>{sub.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className

={
                  location.pathname === item.path ? "active" : ""
                }
              >
                <span className

="icon">{item.icon}</span>
                {!collapsed && <span className

="label">{item.name}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default HRSidebar;