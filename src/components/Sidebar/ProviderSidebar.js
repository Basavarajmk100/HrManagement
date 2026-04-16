import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaBuilding,
  FaUsers,
  FaRupeeSign,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaCrown, 
  FaTachometerAlt
} from "react-icons/fa";

import "../../styles/ProviderDashboard.css";

const ProviderSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState([]);

  const menuItems = [

     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/provider/dashboard" },

    { name: "Companies", icon: <FaBuilding />, path: "/provider/companies" },

    { name: "Users", icon: <FaUsers />, path: "/provider/users" },

    {
      name: "Payments",
      icon: <FaRupeeSign />,
      submenu: [
         { name: "Payment Overview", path: "/provider/payments/overview" },
        { name: "All Payments", path: "/provider/all-paid-companies" },
        { name: "Pending Dues", path: "/provider/pending-dues" },
        { name: "Invoices", path: "/provider/invoices" },
        {name: "Failed Payments", path: "/provider/payments/failed"},
        { name: "Payment Reports", path: "/provider/payments/reports" }


   
      ]
    },

    {
      name: "Reports",
      icon: <FaFileAlt />,
      submenu: [
        { name: "Company Report", path: "/provider/companyreports" },
        { name: "Revenue Report", path: "/provider/revenuereports" }
      ]
    },


    {
  name: "Employees",
  icon: <FaUsers />,
  submenu: [
    { name: "Total Employees", path: "/provider/employees/total" },
    { name: "Employee List", path: "/provider/employees/list" }
  ]
},


// Add inside sidebar menu array
{
  name: "Subscriptions",
  icon: <FaCrown />,
  submenu: [
    { name: "Active Plans", path: "/provider/subscriptions/active" },
    { name: "Expired Plans", path: "/provider/subscriptions/expired" },
    { name: "Upgrade Requests", path: "/provider/subscriptions/upgrade" },
    { name: "Billing History", path: "/provider/subscriptions/billing-history" },

    // ✅ New Added Items
    { name: "Subscribed Companies", path: "/provider/subscriptions/companies" },
    { name: "Renewals", path: "/provider/subscriptions/renewals" },
    { name: "Plan Management", path: "/provider/subscriptions/plans" },
    { name: "Transactions", path: "/provider/subscriptions/transactions" }
  ]
},



    { name: "Settings", icon: <FaCog />, path: "/provider-dashboard/settings" },

    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" }
  ];

  const toggleSubmenu = (index) => {
    if (openMenus.includes(index)) {
      setOpenMenus(openMenus.filter(i => i !== index));
    } else {
      setOpenMenus([...openMenus, index]);
    }
  };

  return (
    <div className

={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className

="sidebar-header">
        <button className

="hamburger" onClick={() => setCollapsed(!collapsed)}>
          <FaBars size={20} />
        </button>
        {!collapsed && <span className

="sidebar-title">Provider</span>}
      </div>

      <ul className

="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index}>

            {item.submenu ? (
              <>
                <button
                  type="button"
                  className

={`menu-item ${openMenus.includes(index) ? "open" : ""}`}
                  onClick={() => toggleSubmenu(index)}
                >
                  <span className

="icon">{item.icon}</span>

                  {!collapsed && (
                    <>
                      <span className

="label">{item.name}</span>
                      <FaChevronDown
                        className

={`arrow ${openMenus.includes(index) ? "rotate" : ""}`}
                      />
                    </>
                  )}
                </button>

                {!collapsed && openMenus.includes(index) && (
                  <ul className

="submenu submenu-open">
                    {item.submenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={sub.path}
                          className

={location.pathname === sub.path ? "active" : ""}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className

={location.pathname === item.path ? "active" : ""}
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
    </div>
  );
};

export default ProviderSidebar;
