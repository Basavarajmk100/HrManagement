import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  User,
  FileText,
  CalendarCheck,
  Users,
  Clock,
  LogOut,
  Menu
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Income details & Declaration", icon: DollarSign, path: "/income" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Payslip", icon: FileText, path: "/payslip" },
  { name: "Holiday Calendar", icon: CalendarCheck, path: "/holiday-calendar" },
  { name: "My Team", icon: Users, path: "/my-team" },
  { name: "Attendance", icon: Clock, path: "/attendance" }
];

export default function EmployeeSidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  return (
    <aside className

={`employee-sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Logo + Collapse Button */}
      <div className

="sidebar-header">
        <div className

="logo">EmployeeOS</div>
        <button
          className

="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Menu */}
      <nav className

="sidebar-menu">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className

="sidebar-item"
              onClick={() => navigate(item.path)}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className

="sidebar-footer">
        <button className

="sidebar-item logout">
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}