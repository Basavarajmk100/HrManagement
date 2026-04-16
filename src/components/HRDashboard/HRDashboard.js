  import React, { useState,useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import {
     Building2, Users, Wallet,
    LogOut, Bell, 
    Search, MoreVertical, ArrowUpRight, ArrowDownRight, 
    Crown,  Palette, SquareDashed, Moon ,  Calendar,
  CreditCard,
  Shield,
  Activity,
  Image,
  ClipboardList,
  CalendarDays,
  TrendingUp,
  GitBranch,
  CalendarCheck,
  BookOpen,
  Receipt ,
  BarChart3,
  FileText ,
  Scale,
   UserPlus ,
   CheckSquare,
   UserCheck,
 } from 'lucide-react';


 import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

  import "../../styles/ProviderDashboard.css";

  

  // ==========================================
  // 2. THEME CONFIG & DATA
  // ==========================================

  const STATS_DATA = [
    { 
      id: 1, label: 'Total Employees', value: '3', change: '+12%', isUp: true, icon: Building2,
      themeColors: {
        simple: { color: '#FA85B9', bg: 'rgba(250,133,185,0.15)', flare: 'rgba(250,133,185,0.4)', hoverBorder: 'rgba(250,133,185,0.6)', hoverShadow: '0 12px 30px rgba(250,133,185,0.15)' },
        colorful: { gradStart: '#FA85B9', gradEnd: '#FF8894', shadow: 'rgba(250,133,185,0.4)', hoverBorder: '#FA85B9', hoverShadow: 'inset 0 0 20px rgba(250,133,185,0.2)' },
        dark: { text: '#FEF08A', bg: 'rgba(234,179,8,0.15)', glow: 'rgba(254,240,138,0.12)', shadow: 'rgba(234,179,8,0.2)', iconBg: 'rgba(234,179,8,0.1)', iconBorder: 'rgba(234,179,8,0.3)', hoverBorder: 'rgba(254,240,138,0.6)', hoverBoxShadow: 'inset 0 0 20px rgba(254,240,138,0.15)' }
      }
    },
    { 
      id: 2, label: 'Employees on Leave', value: '175', change: '+5%', isUp: true, icon: Users,
      themeColors: {
        simple: { color: '#5EA8E6', bg: 'rgba(94,168,230,0.15)', flare: 'rgba(94,168,230,0.4)', hoverBorder: 'rgba(94,168,230,0.6)', hoverShadow: '0 12px 30px rgba(94,168,230,0.15)' },
        colorful: { gradStart: '#5EA8E6', gradEnd: '#A4E9FF', shadow: 'rgba(94,168,230,0.4)', hoverBorder: '#5EA8E6', hoverShadow: 'inset 0 0 20px rgba(94,168,230,0.2)' },
        dark: { text: '#F8FAFC', bg: 'rgba(148,163,184,0.15)', glow: 'rgba(248,250,252,0.1)', shadow: 'rgba(148,163,184,0.15)', iconBg: 'rgba(148,163,184,0.1)', iconBorder: 'rgba(148,163,184,0.3)', hoverBorder: 'rgba(248,250,252,0.6)', hoverBoxShadow: 'inset 0 0 20px rgba(248,250,252,0.15)' }
      }
    },
    { 
      id: 3, label: 'New Joinees', value: '₹40,000', change: '-2%', isUp: false, icon: Wallet,
      themeColors: {
        simple: { color: '#C387C2', bg: 'rgba(195,135,194,0.15)', flare: 'rgba(195,135,194,0.4)', hoverBorder: 'rgba(195,135,194,0.6)', hoverShadow: '0 12px 30px rgba(195,135,194,0.15)' },
        colorful: { gradStart: '#C387C2', gradEnd: '#F7DFF6', shadow: 'rgba(195,135,194,0.4)', hoverBorder: '#C387C2', hoverShadow: 'inset 0 0 20px rgba(195,135,194,0.2)' },
        dark: { text: '#FECDD3', bg: 'rgba(225,29,72,0.15)', glow: 'rgba(254,205,211,0.12)', shadow: 'rgba(225,29,72,0.2)', iconBg: 'rgba(225,29,72,0.1)', iconBorder: 'rgba(225,29,72,0.3)', hoverBorder: 'rgba(254,205,211,0.6)', hoverBoxShadow: 'inset 0 0 20px rgba(254,205,211,0.15)' }
      }
    },

 { 
    id: 4, label: "Pending Leave Requests", value: 5, change: "+5%", isUp: true, icon: Users,
    themeColors: {
      simple: { color: '#5CC2C6', bg: 'rgba(92,194,198,0.15)', flare: 'rgba(92,194,198,0.4)', hoverBorder: 'rgba(92,194,198,0.6)', hoverShadow: '0 12px 30px rgba(92,194,198,0.15)' },
      colorful: { gradStart: '#5CC2C6', gradEnd: '#A1E0DD', shadow: 'rgba(92,194,198,0.4)', hoverBorder: '#5CC2C6', hoverShadow: 'inset 0 0 20px rgba(92,194,198,0.2)' },
      dark: { text: '#BFDBFE', bg: 'rgba(37,99,235,0.15)', glow: 'rgba(191,219,254,0.12)', shadow: 'rgba(37,99,235,0.2)', iconBg: 'rgba(37,99,235,0.1)', iconBorder: 'rgba(37,99,235,0.3)', hoverBorder: 'rgba(191,219,254,0.6)', hoverBoxShadow: 'inset 0 0 20px rgba(191,219,254,0.15)' }
    }
  }
   
  ];
// ==========================================
// HR DASHBOARD - LEAVE APPROVALS DATA
// ==========================================
const LEAVES_DATA = [
  {
    id: 'L001',
    name: 'Basavaraj Patil',
    department: 'Engineering',
    leaveType: 'Casual Leave',
    from: '2026-03-01',
    to: '2026-03-03',
    status: 'Pending', // Could be Pending / Approved / Rejected
    colors: {
      simple: {
        badgeBg: 'rgba(250, 133, 185, 0.15)',
        badgeText: '#C13674',
        actionHoverBg: 'rgba(250,133,185,0.1)',
        actionHoverColor: '#FA85B9'
      },
      colorful: {
        badgeBg: 'rgba(250, 133, 185, 0.2)',
        badgeText: '#C13674',
        actionHoverBg: 'rgba(250,133,185,0.1)',
        actionHoverColor: '#FA85B9'
      },
      dark: {
        badgeBg: 'rgba(225, 29, 72, 0.15)',
        badgeText: '#FECDD3',
        actionHoverBg: 'rgba(255,255,255,0.1)',
        actionHoverColor: '#ffffff'
      }
    }
  },
  {
    id: 'L002',
    name: 'Nayana Kulkarni',
    department: 'HR',
    leaveType: 'Sick Leave',
    from: '2026-03-05',
    to: '2026-03-06',
    status: 'Approved',
    colors: {
      simple: {
        badgeBg: 'rgba(92, 194, 198, 0.15)',
        badgeText: '#2B8B8F',
        actionHoverBg: 'rgba(250,133,185,0.1)',
        actionHoverColor: '#FA85B9'
      },
      colorful: {
        badgeBg: 'rgba(92, 194, 198, 0.2)',
        badgeText: '#2B8B8F',
        actionHoverBg: 'rgba(94,168,230,0.1)',
        actionHoverColor: '#5EA8E6'
      },
      dark: {
        badgeBg: 'rgba(148, 163, 184, 0.15)',
        badgeText: '#F8FAFC',
        actionHoverBg: 'rgba(255,255,255,0.1)',
        actionHoverColor: '#ffffff'
      }
    }
  },
  {
    id: 'L003',
    name: 'Rahul Deshmukh',
    department: 'Finance',
    leaveType: 'Casual Leave',
    from: '2026-03-08',
    to: '2026-03-09',
    status: 'Rejected',
    colors: {
      simple: {
        badgeBg: 'rgba(94, 168, 230, 0.15)',
        badgeText: '#2872AC',
        actionHoverBg: 'rgba(250,133,185,0.1)',
        actionHoverColor: '#FA85B9'
      },
      colorful: {
        badgeBg: 'rgba(94, 168, 230, 0.2)',
        badgeText: '#2872AC',
        actionHoverBg: 'rgba(94,168,230,0.1)',
        actionHoverColor: '#5EA8E6'
      },
      dark: {
        badgeBg: 'rgba(37, 99, 235, 0.15)',
        badgeText: '#BFDBFE',
        actionHoverBg: 'rgba(255,255,255,0.1)',
        actionHoverColor: '#ffffff'
      }
    }
  },
  {
    id: 'L004',
    name: 'Sneha Patil',
    department: 'Marketing',
    leaveType: 'Sick Leave',
    from: '2026-03-10',
    to: '2026-03-12',
    status: 'Pending',
    colors: {
      simple: {
        badgeBg: 'rgba(250, 133, 185, 0.15)',
        badgeText: '#C13674',
        actionHoverBg: 'rgba(250,133,185,0.1)',
        actionHoverColor: '#FA85B9'
      },
      colorful: {
        badgeBg: 'rgba(250, 133, 185, 0.2)',
        badgeText: '#C13674',
        actionHoverBg: 'rgba(250,133,185,0.1)',
        actionHoverColor: '#FA85B9'
      },
      dark: {
        badgeBg: 'rgba(225, 29, 72, 0.15)',
        badgeText: '#FECDD3',
        actionHoverBg: 'rgba(255,255,255,0.1)',
        actionHoverColor: '#ffffff'
      }
    }
  }
];






const employeeGrowthData = [
  { month: "Jan", employees: 120 },
  { month: "Feb", employees: 135 },
  { month: "Mar", employees: 150 },
  { month: "Apr", employees: 170 },
  { month: "May", employees: 190 },
  { month: "Jun", employees: 210 }
];

const salaryExpenseData = [
  { month: "Jan", salary: 120000 },
  { month: "Feb", salary: 135000 },
  { month: "Mar", salary: 150000 },
  { month: "Apr", salary: 160000 },
  { month: "May", salary: 180000 },
  { month: "Jun", salary: 200000 }
];

const departmentData = [
  { name: "IT", value: 40 },
  { name: "HR", value: 10 },
  { name: "Finance", value: 15 },
  { name: "Sales", value: 25 },
  { name: "Support", value: 10 }
];

const leaveStatsData = [
  { month: "Jan", leave: 8 },
  { month: "Feb", leave: 12 },
  { month: "Mar", leave: 6 },
  { month: "Apr", leave: 10 },
  { month: "May", leave: 14 },
  { month: "Jun", leave: 9 }
];




const MENU_ITEMS = [
  { name: "Calendar", icon: Calendar, path: "/calendar" },
  /*{ name: "Payroll", icon: CreditCard, path: "/payroll" },*/
  { name: "Insurance", icon: Shield, path:"/insurancepolicies" },

    // New Finance submenu
   {
  name: "Finance",
  icon: Wallet,
  submenu: [
    { name: "InvoicesPage", path: "/finance/invoicesPage", icon: Receipt },
    { name: "Purchase Voucher", path: "/finance/purchase-voucher", icon: ClipboardList },
    { name: "Sale Voucher", path: "/finance/sales-voucher", icon: ClipboardList },
    { name: "Ledgers", path: "/finance/ledgers", icon: BookOpen },

      // ✅ Add this
  { name: "Trial Balance", path: "/finance/trial-balance", icon: Scale },
    { name: "Balance Sheet", path: "/finance/balance-sheet", icon: BarChart3 },
    { name: "P and L Account", path: "/finance/pnl", icon: BarChart3 },
    { name: "Expenses", path: "/finance/expenses", icon: FileText }
  ]
},


{
  name: "My Planner",
  icon: CalendarDays,
  submenu: [
    { name: "Meeting Scheduler", path: "/planner/meeting-scheduler", icon: ClipboardList },
    { name: "To Do List", path: "/planner/todo-list", icon: CheckSquare },
    { name: "My Calendar", path: "/planner/my-calendar", icon: Calendar }
  ]
},

{ name: "User Approvals", icon: UserCheck, path: "/admin/user-approvals" },

  {
    name: "Co-curricular Activities",
    icon: Activity,
    submenu: [
      { name: "Gallery", path: "/activities/gallery", icon: Image },
      { name: "Activity Planner", path: "/activities/planner", icon: ClipboardList },
      { name: "Calendar of Events", path: "/activities/calendar", icon: CalendarDays },
      { name: "Event Registration", path: "/activities/event-registration", icon: UserPlus },
      { name: "Participants List", path: "/activities/participants", icon: Users }
    ]
  },

  { name: "Team Member", icon: Users, path: "/team" },
  { name: "Performance Analysis", icon: TrendingUp, path: "/performance" },
  { name: "Organization Chart", icon: GitBranch, path: "/organization" },
  { name: "Holiday Management", icon: CalendarCheck, path: "/manage-holidays" },
    { name: "Profile", icon: Shield, path:"/profile" },

];


  // ==========================================
  // 3. COMPONENTS
  // ==========================================

  const StatCard = ({ stat, theme }) => {
    const Icon = stat.icon;
    const isSimple = theme === 'simple';
    const isDark = theme === 'dark';
    const isColorful = theme === 'colorful';
    
    const iconSize = isSimple ? 24 : 28;
    const colors = stat.themeColors[theme];

    return (
      <div 
        className

="stat-tile group" 
        style={{
          '--color-bg': colors.bg,
          '--color-text': colors.color || colors.text,
          '--hover-border': colors.hoverBorder,
          '--hover-shadow': colors.hoverBoxShadow || colors.hoverShadow,
          '--flare-bg': colors.flare,
          '--tile-bg': colors.gradStart ? `linear-gradient(to bottom right, ${colors.gradStart}, ${colors.gradEnd})` : 'transparent',
          '--tile-shadow': colors.shadow,
          '--dark-hover-glow': `0 25px 50px rgba(0,0,0,1), 0 10px 40px ${colors.shadow}`,
          '--dark-highlight': colors.text,
          '--dark-glow': colors.glow
        }}
      >
        {/* Simple Mode Hover Background Flare */}
        {isSimple && <div className

="simple-flare" />}

      

        {/* Colorful Mode Effects */}
        {isColorful && (
          <>
            <div className

="tile-shimmer" />
            <div className

="tile-glaze">
              <div className

="glaze-top" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.05), transparent)' }} />
              <div className

="glaze-diag" style={{ background: 'linear-gradient(to bottom right, transparent, rgba(255,255,255,0.4), transparent)' }} />
              <div className

="glaze-shadow" style={{ boxShadow: 'inset 0 -8px 20px rgba(0,0,0,0.1)' }} />
            </div>
          </>
        )}

        {/* Elite Dark Mode Effects */}
        {isDark && (
          <div className

="dark-edge-lit">
            <div className

="dark-edge-line" style={{ background: `linear-gradient(to right, transparent, ${colors.text}, transparent)` }} />
            <div className

="dark-radial-bloom" style={{ background: `radial-gradient(ellipse at top, ${colors.glow} 0%, transparent 70%)` }} />
          </div>
        )}

        {/* Hover Border Fill (Dark & Colorful) */}
        {(isColorful || isDark) && <div className

="tile-border-fill" />}

        {/* Card Content */}
        <div className

="tile-content">
          <div className

="tile-header">
            <div 
              className

="tile-icon-box"
              style={{
                background: isDark ? colors.iconBg : isColorful ? 'rgba(255,255,255,0.2)' : colors.bg,
                color: isDark ? colors.text : isColorful ? '#ffffff' : colors.color,
                border: isDark ? `1px solid ${colors.iconBorder}` : isColorful ? '1px solid rgba(255,255,255,0.5)' : '1px solid #ffffff',
                boxShadow: isColorful ? 'inset 0 2px 10px rgba(255,255,255,0.3)' : isSimple ? '0 2px 10px rgba(0,0,0,0.02)' : 'none'
              }}
            >
              <Icon size={iconSize} />
              {(isColorful || isDark) && <div className

="tile-ping" />}
            </div>
            
            <div 
              className

="tile-badge"
              style={{
                background: isSimple ? (stat.isUp ? '#ecfdf5' : '#fff1f2') : isDark ? colors.bg : 'rgba(255,255,255,0.2)',
                color: isSimple ? (stat.isUp ? '#059669' : '#e11d48') : isDark ? colors.text : '#ffffff',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : isColorful ? '1px solid rgba(255,255,255,0.3)' : 'none',
                backdropFilter: isColorful || isDark ? 'blur(8px)' : 'none'
              }}
            >
              {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{stat.change}</span>
            </div>
          </div>
          <div>
            <h3 className

="tile-value" style={{color: isDark ? '#ffffff' : isColorful ? '#ffffff' : 'inherit'}}>{stat.value}</h3>
            <p className

="tile-label" style={{color: isDark ? '#94a3b8' : isColorful ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)'}}>{stat.label}</p>
          </div>
        </div>

        <div className

="ambient-bottom-glow" style={{background: isDark ? 'rgba(255,255,255,0.05)' : isColorful ? 'rgba(255,255,255,0.3)' : 'transparent'}} />
      </div>
    );
  };


  // ==========================================
  // 4. MAIN APP COMPONENT
  // ==========================================
  export default function App() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [theme, setTheme] = useState(
     localStorage.getItem("theme") || "dark"
   );
      const navigate = useNavigate(); // ✅ Add navigation


            const [openMenu, setOpenMenu] = useState(null);
            const [isExpanded, setIsExpanded] = useState(false);

    const isColorful = theme === 'colorful';
    const isSimple = theme === 'simple';
    const isDark = theme === 'dark';


    
      useEffect(() => {
      document.body.className

 = `theme-${theme}`;
      localStorage.setItem("theme", theme);
    }, [theme]);

    return (
      <div className

={`app-layout theme-${theme} fade-in`}>
      

        {/* BACKGROUND EFFECTS */}
        <div className

="bg-canvas">
          {isDark && (
            <>
              <div className

="ambient-orb orb-1"></div>
              <div className

="ambient-orb orb-2"></div>
              <div className

="ambient-orb orb-3"></div>
              <div className

="ambient-orb orb-4"></div>
              <div className

="bg-glass-layer" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(100px)' }}></div>
            </>
          )}
          {isColorful && (
            <>
              <div className

="ambient-orb orb-1"></div>
              <div className

="ambient-orb orb-2"></div>
              <div className

="ambient-orb orb-3"></div>
              <div className

="ambient-orb orb-4"></div>
              <div className

="bg-glass-layer"></div>
            </>
          )}
        </div>

        {/* SIDEBAR */}

      
     
            <aside
       className

={`sidebar ${isExpanded ? "expanded" : ""} ${isColorful || isDark ? "glass" : ""}`}
       onMouseEnter={() => setIsExpanded(true)}
       onMouseLeave={() => setIsExpanded(false)}
     >
               <div className

="sidebar-logo-area">
                 <div 
                   className

="logo-icon-box"
                   style={{
                     background: isDark ? '#FEF08A' : isColorful ? 'linear-gradient(to bottom right, #FA85B9, #C387C2)' : 'linear-gradient(to bottom right, #FA85B9, #C387C2)',
                     color: isDark ? '#854D0E' : '#ffffff',
                     boxShadow: isDark ? '0 0 20px rgba(254,240,138,0.2)' : '0 4px 10px rgba(250,133,185,0.3)'
                   }}
                 >
                   <Crown size={24} />
                 </div>
                 <span className

="logo-text" style={{color: isDark ? '#ffffff' : 'inherit'}}>ItsMyHr</span>
               </div>
               
             <nav className

="nav-links custom-scrollbar">
      {MENU_ITEMS.map((item) => {
       const Icon = item.icon;
     
       return (
         <div key={item.name}>
           
           <button
             onClick={() => {
               if (item.submenu) {
                 setOpenMenu(prev =>
                   prev === item.name ? null : item.name
                 );
               } else {
                 setActiveTab(item.name);
                 navigate(item.path);
               }
             }}
             className

="nav-btn"
           >
             <div className

="nav-icon">
               {Icon && <Icon size={24} />}
             </div>
             <span className

="nav-text">{item.name}</span>
           </button>
     {item.submenu && (
       <div className

={`submenu ${openMenu === item.name ? 'submenu-open' : ''}`}>
         {item.submenu.map((sub) => (
           <button
             key={sub.name}
             className

="submenu-btn"
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
               
               <div className

="sidebar-footer">
                 <button className

="nav-btn logout-btn group">
                   <div className

="nav-icon group-hover:-translate-x-1">
                     <LogOut size={24} />
                   </div>
                   <span className

="nav-text">Logout Session</span>
                 </button>
               </div>
             </aside>
    <div className

="sidebar-spacer"></div>

  

        {/* MAIN VIEWPORT */}
        <main className

="main-content custom-scrollbar">
          
          {/* HEADER */}
          <header className

="top-header">
            <div>
              <h1 className

="header-title" style={{color: isDark ? '#ffffff' : 'inherit'}}>Admin</h1>
              <p className

="header-subtitle">Hello,Here is your ecosystem overview.</p>
            </div>
            
            <div className

="header-actions">
              
              {/* THEME TOGGLE */}
                
  <div
    className

="theme-toggle-wrapper"
    style={{
      background: isDark
        ? '#151A23'
        : isColorful
        ? 'rgba(255,255,255,0.7)'
        : '#f1f5f9',
      border: isDark
        ? '1px solid rgba(255,255,255,0.05)'
        : '1px solid #e2e8f0'
    }}
  >
    <button
      onClick={() => setTheme('simple')}
      className

="theme-btn"
      style={{
        background: isSimple
          ? isDark
            ? '#FEF08A'
            : '#ffffff'
          : 'transparent',
        color: isSimple
          ? isDark
            ? '#000'
            : '#0f172a'
          : 'var(--text-muted)',
        boxShadow: isSimple ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
      }}
    >
      <SquareDashed size={14} />
      Simple
    </button>

    <button
      onClick={() => setTheme('colorful')}
      className

="theme-btn"
      style={{
        background: isColorful ? '#ffffff' : 'transparent',
        color: isColorful ? '#FA85B9' : 'var(--text-muted)',
        boxShadow: isColorful ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
      }}
    >
      <Palette size={14} />
      Colorful
    </button>

    <button
      onClick={() => setTheme('dark')}
      className

="theme-btn"
      style={{
        background: isDark ? '#FEF08A' : 'transparent',
        color: isDark ? '#000' : 'var(--text-muted)',
        boxShadow: isDark ? '0 2px 6px rgba(0,0,0,0.2)' : 'none'
      }}
    >
      <Moon size={14} />
      Dark
    </button>
  </div>

              {/* SEARCH */}
              <div className

="search-bar" style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : isColorful ? 'rgba(255,255,255,0.8)' : '#f8fafc',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : isColorful ? '#ffffff' : '#e2e8f0'}`
              }}>
              
                <input type="text" placeholder="Search..." className

="search-input" />
                  <Search size={16} color={isDark ? '#64748b' : '#94a3b8'} />
              </div>
              
              <button className

="icon-btn" style={{
                background: isDark ? '#151A23' : isColorful ? '#ffffff' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : isColorful ? '#ffffff' : '#e2e8f0'
              }}>
                <Bell size={18} />
                <div className

="icon-btn-badge" style={{
                  background: isDark ? '#FECDD3' : '#FA85B9',
                  borderColor: isDark ? '#0B0E14' : '#ffffff'
                }}></div>
              </button>
              
              <button className

="profile-btn" 
                onClick={() => navigate("/adminprofile")}
               
              style={{
                background: isDark ? '#151A23' : isColorful ? 'rgba(255,255,255,0.8)' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : isColorful ? '#ffffff' : '#e2e8f0'
              }}>
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className

="profile-img" />
                <span className

="profile-name">Alex</span>
              </button>

            </div>
          </header>

          {/* STATS GRID */}
          <div className

="stats-grid fade-in">
            {STATS_DATA.map(stat => (
              <StatCard key={stat.id} stat={stat} theme={theme} />
            ))}
          </div>









          {/* ===== Admin Dashboard Charts ===== */}
<div className

="chart-section">

  {/* Employee Growth */}
  <div className

="chart-box">
    <h3>Employee Growth</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={employeeGrowthData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="employees" stroke="#3B82F6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Salary Expenses */}
  <div className

="chart-box">
    <h3>Salary Expenses</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={salaryExpenseData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="salary" fill="#C387C2" radius={[6,6,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>


<div className="chart-section">

    {/* Leave Statistics */}
  <div className="chart-box">
    <h3>Leave Statistics</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={leaveStatsData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="leave" fill="#5CC2C6" radius={[6,6,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Department Distribution */}
  <div className="chart-box">
    <h3>Department Distribution</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={departmentData}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          fill="#FA85B9"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>



</div>

          {/* DATA TABLE */}
          {/* DATA TABLE */}
<div className

="table-panel fade-in">
  <div className

="table-header-row">
    <div>
      <h2 className

="table-title" style={{ color: isDark ? '#ffffff' : 'inherit' }}>Leave Approvals</h2>
      <p className

="table-subtitle">Manage employee leave requests</p>
    </div>
  </div>

  <div className

="table-wrapper custom-scrollbar">
    <table className

="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Leave Type</th>
          <th>From</th>
          <th>To</th>
          <th style={{ textAlign: 'center' }}>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {LEAVES_DATA.map((leave) => {
          const colors = leave.colors[theme];

          return (
            <tr
              key={leave.id}
              className

="table-row tr-card"
              onMouseEnter={(e) => {
                if (isSimple) {
                  const avatar = e.currentTarget.querySelector('.cell-avatar');
                  const action = e.currentTarget.querySelector('.more-action-btn');
                  if (avatar) {
                    avatar.style.background = colors.avatarHoverBg;
                    avatar.style.color = colors.avatarHoverText;
                    avatar.style.borderColor = colors.avatarHoverBg;
                  }
                  if (action) {
                    action.style.background = colors.actionHoverBg;
                    action.style.color = colors.actionHoverColor;
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (isSimple) {
                  const avatar = e.currentTarget.querySelector('.cell-avatar');
                  const action = e.currentTarget.querySelector('.more-action-btn');
                  if (avatar) {
                    avatar.style.background = '';
                    avatar.style.color = '';
                    avatar.style.borderColor = '';
                  }
                  if (action) {
                    action.style.background = '';
                    action.style.color = '';
                  }
                }
              }}
            >
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    className

="cell-avatar"
                    style={{
                      background: isColorful ? colors.avatarGrad : isDark ? colors.avatarBg : '',
                      color: isColorful ? '#ffffff' : isDark ? colors.avatarText : '',
                      border: isDark ? `1px solid ${colors.avatarBorder}` : '',
                      boxShadow: isColorful || isDark ? 'inset 0 2px 10px rgba(255,255,255,0.1)' : ''
                    }}
                  >
                    {leave.name.charAt(0)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className

="cell-name">{leave.name}</span>
                    <span className

="cell-id">{leave.id}</span>
                  </div>
                </div>
              </td>
              <td>{leave.department}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.from}</td>
              <td>{leave.to}</td>
              <td style={{ textAlign: 'center' }}>
                <span
                  className

="status-pill"
                  style={{
                    background: colors.badgeBg,
                    color: colors.badgeText,
                    border: isDark ? `1px solid ${colors.badgeBorder}` : 'none'
                  }}
                >
                  {leave.status}
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button className

="more-action-btn">
                  <MoreVertical size={20} />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {isSimple && (
    <div className

="simple-footer">
      <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
        Showing {LEAVES_DATA.length} results
      </span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className

="btn-outline">Prev</button>
        <button className

="btn-outline">Next</button>
      </div>
    </div>
  )}
</div>

        </main>
      </div>
    );
  }