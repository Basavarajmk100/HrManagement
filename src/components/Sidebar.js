import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  LogOut,
  Crown,
  Calendar,
  Shield,
  Activity,
  Image,
  ClipboardList,
  CalendarDays,
  TrendingUp,
  GitBranch,
  CalendarCheck,
  BookOpen,
  Receipt,
  BarChart3,
  FileText,
  Scale,
  UserPlus,
  CheckSquare,
  UserCheck,
  Users,
} from "lucide-react";

import "../styles/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openMenu, setOpenMenu] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = localStorage.getItem("theme") || "dark";
  const isColorful = theme === "colorful";
  const isDark = theme === "dark";

  const MENU_ITEMS = [
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Insurance", icon: Shield, path: "/insurancepolicies" },

    {
      name: "Finance",
      icon: Wallet,
      submenu: [
        { name: "InvoicesPage", path: "/finance/invoicesPage", icon: Receipt },
        {
          name: "Purchase Voucher",
          path: "/finance/purchase-voucher",
          icon: ClipboardList,
        },
        {
          name: "Sale Voucher",
          path: "/finance/sales-voucher",
          icon: ClipboardList,
        },
        { name: "Ledgers", path: "/finance/ledgers", icon: BookOpen },
        { name: "Trial Balance", path: "/finance/trial-balance", icon: Scale },
        {
          name: "Balance Sheet",
          path: "/finance/balance-sheet",
          icon: BarChart3,
        },
        { name: "P and L Account", path: "/finance/pnl", icon: BarChart3 },
        { name: "Expenses", path: "/finance/expenses", icon: FileText },
      ],
    },

    {
      name: "My Planner",
      icon: CalendarDays,
      submenu: [
        {
          name: "Meeting Scheduler",
          path: "/planner/meeting-scheduler",
          icon: ClipboardList,
        },
        { name: "To Do List", path: "/planner/todo-list", icon: CheckSquare },
        { name: "My Calendar", path: "/planner/my-calendar", icon: Calendar },
      ],
    },

    { name: "User Approvals", icon: UserCheck, path: "/admin/user-approvals" },

    {
      name: "Co-curricular Activities",
      icon: Activity,
      submenu: [
        { name: "Gallery", path: "/activities/gallery", icon: Image },
        {
          name: "Activity Planner",
          path: "/activities/planner",
          icon: ClipboardList,
        },
        {
          name: "Calendar of Events",
          path: "/activities/calendar",
          icon: CalendarDays,
        },
        {
          name: "Event Registration",
          path: "/activities/event-registration",
          icon: UserPlus,
        },
        {
          name: "Participants List",
          path: "/activities/participants",
          icon: Users,
        },
      ],
    },

    { name: "Team Member", icon: Users, path: "/team" },
    { name: "Performance Analysis", icon: TrendingUp, path: "/performance" },
    { name: "Organization Chart", icon: GitBranch, path: "/organization" },
    {
      name: "Holiday Management",
      icon: CalendarCheck,
      path: "/manage-holidays",
    },
    { name: "Profile", icon: Shield, path: "/profile" },
  ];

  return (
    <>
      <aside
        className={`sidebar ${isExpanded ? "expanded" : ""} ${isColorful || isDark ? "glass" : ""}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="sidebar-logo-area">
          <div className="logo-icon-box">
            <Crown size={24} />
          </div>
          <span className="logo-text">ItsMyHr</span>
        </div>

        <nav className="nav-links custom-scrollbar">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.name}>
                <button
                  className="nav-btn"
                  onClick={() => {
                    if (item.submenu) {
                      setOpenMenu((prev) =>
                        prev === item.name ? null : item.name,
                      );
                    } else {
                      setActiveTab(item.name);
                      navigate(item.path);
                    }
                  }}
                >
                  <div className="nav-icon">{Icon && <Icon size={24} />}</div>
                  <span className="nav-text">{item.name}</span>
                </button>

                {item.submenu && (
                  <div
                    className={`submenu ${openMenu === item.name ? "submenu-open" : ""}`}
                  >
                    {item.submenu.map((sub) => (
                      <button
                        key={sub.name}
                        className="submenu-btn"
                        onClick={() => {
                          setActiveTab(sub.name);
                          navigate(sub.path);
                        }}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-btn logout-btn">
            <div className="nav-icon">
              <LogOut size={24} />
            </div>
            <span className="nav-text">Logout Session</span>
          </button>
        </div>
      </aside>

      <div className="sidebar-spacer"></div>
    </>
  );
}
