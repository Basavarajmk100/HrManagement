  import React, { useState ,useEffect} from 'react';
  import { useNavigate } from 'react-router-dom';
  import {
    LayoutDashboard, Building2, Users, Wallet,
    Settings, LogOut, Plus, Bell,
    Search, MoreVertical, ArrowUpRight, ArrowDownRight, 
    Crown, Sparkles, Palette, SquareDashed, Moon , IndianRupee,
     FileText,
  } from 'lucide-react';
  import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
  } from "recharts";

  import "../../styles/ProviderDashboard.css";

  // ==========================================
  // 2. THEME CONFIG & DATA
  // ==========================================

  const STATS_DATA = [
    { 
      id: 1, label: 'Total Companies', value: '3', change: '+12%', isUp: true, icon: Building2,
      themeColors: {
        simple: { color: '#FA85B9', bg: 'rgba(250,133,185,0.15)', flare: 'rgba(250,133,185,0.4)', hoverBorder: 'rgba(250,133,185,0.6)', hoverShadow: '0 12px 30px rgba(250,133,185,0.15)' },
        colorful: { gradStart: '#FA85B9', gradEnd: '#FF8894', shadow: 'rgba(250,133,185,0.25)', hoverBorder: '#FA85B9', hoverShadow: 'inset 0 0 20px rgba(250,133,185,0.2)' },
        dark: { text: '#FEF08A', bg: 'rgba(234,179,8,0.15)', glow: 'rgba(254,240,138,0.12)', shadow: 'rgba(234,179,8,0.2)', iconBg: 'rgba(234,179,8,0.1)', iconBorder: 'rgba(234,179,8,0.3)', hoverBorder: 'rgba(254,240,138,0.6)', hoverBoxShadow: 'inset 0 0 20px rgba(254,240,138,0.15)' }
      }
    },
    { 
      id: 2, label: 'Total Users', value: '175', change: '+5%', isUp: true, icon: Users,
      themeColors: {
        simple: { color: '#5EA8E6', bg: 'rgba(94,168,230,0.15)', flare: 'rgba(94,168,230,0.4)', hoverBorder: 'rgba(94,168,230,0.6)', hoverShadow: '0 12px 30px rgba(94,168,230,0.15)' },
        colorful: { gradStart: '#5EA8E6', gradEnd: '#A4E9FF', shadow: 'rgba(94,168,230,0.25)', hoverBorder: '#5EA8E6', hoverShadow: 'inset 0 0 20px rgba(94,168,230,0.2)' },
        dark: { text: '#F8FAFC', bg: 'rgba(148,163,184,0.15)', glow: 'rgba(248,250,252,0.1)', shadow: 'rgba(148,163,184,0.15)', iconBg: 'rgba(148,163,184,0.1)', iconBorder: 'rgba(148,163,184,0.3)', hoverBorder: 'rgba(248,250,252,0.6)', hoverBoxShadow: 'inset 0 0 20px rgba(248,250,252,0.15)' }
      }
    },
    {
      id: 3, label: 'Payment Due', value: '₹40,000', change: '-2%', isUp: false, icon: Wallet,
      themeColors: {
        simple: { color: '#C387C2', bg: 'rgba(195,135,194,0.15)', flare: 'rgba(195,135,194,0.4)', hoverBorder: 'rgba(195,135,194,0.6)', hoverShadow: '0 12px 30px rgba(195,135,194,0.15)' },
        colorful: { gradStart: '#C387C2', gradEnd: '#F7DFF6', shadow: 'rgba(195,135,194,0.25)', hoverBorder: '#C387C2', hoverShadow: 'inset 0 0 20px rgba(195,135,194,0.2)' },
        dark: { text: '#FECDD3', bg: 'rgba(225,29,72,0.15)', glow: 'rgba(254,205,211,0.12)', shadow: 'rgba(225,29,72,0.2)', iconBg: 'rgba(225,29,72,0.1)', iconBorder: 'rgba(225,29,72,0.3)', hoverBorder: 'rgba(254,205,211,0.6)', hoverBoxShadow: 'inset 0 0 20px rgba(254,205,211,0.15)' }
      }
    },
    { 
      id: 4, label: 'Total Collected', value: '₹150,000', change: '+24%', isUp: true, icon: Sparkles,
      themeColors: {
        simple: { color: '#5CC2C6', bg: 'rgba(92,194,198,0.15)', flare: 'rgba(92,194,198,0.4)', hoverBorder: 'rgba(92,194,198,0.6)', hoverShadow: '0 12px 30px rgba(92,194,198,0.15)' },
        colorful: { gradStart: '#5CC2C6', gradEnd: '#A1E0DD', shadow: 'rgba(92,194,198,0.25)', hoverBorder: '#5CC2C6', hoverShadow: 'inset 0 0 20px rgba(92,194,198,0.2)' },
        dark: { text: '#BFDBFE', bg: 'rgba(37,99,235,0.15)', glow: 'rgba(191,219,254,0.12)', shadow: 'rgba(37,99,235,0.2)', iconBg: 'rgba(37,99,235,0.1)', iconBorder: 'rgba(37,99,235,0.3)', hoverBorder: 'rgba(191,219,254,0.6)', hoverBoxShadow: 'inset 0 0 20px rgba(191,219,254,0.15)' }
      }
    }
  ];

  const COMPANIES_DATA = [
    { 
      id: 'C001', name: 'Kinsoft Technologies', type: 'Enterprise', users: 85, total: '₹50,000', due: '₹20,000', status: 'Partial', 
      colors: {
        simple: { badgeBg: 'rgba(94, 168, 230, 0.15)', badgeText: '#2872AC', dueText: '#FA85B9', avatarHoverBg: 'rgba(250,133,185,0.15)', avatarHoverText: '#FA85B9', progFill: '#FA85B9', actionHoverColor: '#FA85B9', actionHoverBg: 'rgba(250,133,185,0.1)' },
        colorful: { badgeBg: 'rgba(94, 168, 230, 0.2)', badgeText: '#2872AC', dueText: '#FA85B9', avatarGrad: 'linear-gradient(to bottom right, #FA85B9, #FF8894)', progFill: '#5EA8E6', actionHoverColor: '#5EA8E6', actionHoverBg: 'rgba(94,168,230,0.1)' },
        dark: { badgeBg: 'rgba(37, 99, 235, 0.15)', badgeText: '#BFDBFE', badgeBorder: 'rgba(37, 99, 235, 0.3)', dueText: '#FECDD3', avatarBg: 'rgba(37, 99, 235, 0.1)', avatarText: '#BFDBFE', avatarBorder: 'rgba(37, 99, 235, 0.3)', progFill: '#ffffff', actionHoverColor: '#ffffff', actionHoverBg: 'rgba(255,255,255,0.1)' }
      }
    },
    { 
      id: 'C002', name: 'Nexus Solutions', type: 'Core Partner', users: 150, total: '₹120,000', due: '₹0', status: 'Paid', 
      colors: {
        simple: { badgeBg: 'rgba(92, 194, 198, 0.15)', badgeText: '#2B8B8F', dueText: '#FA85B9', avatarHoverBg: 'rgba(250,133,185,0.15)', avatarHoverText: '#FA85B9', progFill: '#FA85B9', actionHoverColor: '#FA85B9', actionHoverBg: 'rgba(250,133,185,0.1)' },
        colorful: { badgeBg: 'rgba(92, 194, 198, 0.2)', badgeText: '#2B8B8F', dueText: '#5CC2C6', avatarGrad: 'linear-gradient(to bottom right, #5EA8E6, #A4E9FF)', progFill: '#5EA8E6', actionHoverColor: '#5EA8E6', actionHoverBg: 'rgba(94,168,230,0.1)' },
        dark: { badgeBg: 'rgba(234, 179, 8, 0.15)', badgeText: '#FEF08A', badgeBorder: 'rgba(234, 179, 8, 0.3)', dueText: '#FEF08A', avatarBg: 'rgba(234, 179, 8, 0.1)', avatarText: '#FEF08A', avatarBorder: 'rgba(234, 179, 8, 0.3)', progFill: '#ffffff', actionHoverColor: '#ffffff', actionHoverBg: 'rgba(255,255,255,0.1)' }
      }
    },
    { 
      id: 'C003', name: 'Apex Systems', type: 'Affiliate', users: 45, total: '₹20,000', due: '₹10,000', status: 'Pending', 
      colors: {
        simple: { badgeBg: 'rgba(250, 133, 185, 0.15)', badgeText: '#C13674', dueText: '#FA85B9', avatarHoverBg: 'rgba(250,133,185,0.15)', avatarHoverText: '#FA85B9', progFill: '#FA85B9', actionHoverColor: '#FA85B9', actionHoverBg: 'rgba(250,133,185,0.1)' },
        colorful: { badgeBg: 'rgba(250, 133, 185, 0.2)', badgeText: '#C13674', dueText: '#FA85B9', avatarGrad: 'linear-gradient(to bottom right, #C387C2, #F7DFF6)', progFill: '#5EA8E6', actionHoverColor: '#5EA8E6', actionHoverBg: 'rgba(94,168,230,0.1)' },
        dark: { badgeBg: 'rgba(225, 29, 72, 0.15)', badgeText: '#FECDD3', badgeBorder: 'rgba(225, 29, 72, 0.3)', dueText: '#FECDD3', avatarBg: 'rgba(225, 29, 72, 0.1)', avatarText: '#FECDD3', avatarBorder: 'rgba(225, 29, 72, 0.3)', progFill: '#ffffff', actionHoverColor: '#ffffff', actionHoverBg: 'rgba(255,255,255,0.1)' }
      }
    },
    { 
      id: 'C004', name: 'Zentry Cloud Infra', type: 'Enterprise', users: 78, total: '₹85,500', due: '₹0', status: 'Paid', 
      colors: {
        simple: { badgeBg: 'rgba(92, 194, 198, 0.15)', badgeText: '#2B8B8F', dueText: '#FA85B9', avatarHoverBg: 'rgba(250,133,185,0.15)', avatarHoverText: '#FA85B9', progFill: '#FA85B9', actionHoverColor: '#FA85B9', actionHoverBg: 'rgba(250,133,185,0.1)' },
        colorful: { badgeBg: 'rgba(92, 194, 198, 0.2)', badgeText: '#2B8B8F', dueText: '#5CC2C6', avatarGrad: 'linear-gradient(to bottom right, #5CC2C6, #A1E0DD)', progFill: '#5EA8E6', actionHoverColor: '#5EA8E6', actionHoverBg: 'rgba(94,168,230,0.1)' },
        dark: { badgeBg: 'rgba(148, 163, 184, 0.15)', badgeText: '#F8FAFC', badgeBorder: 'rgba(148, 163, 184, 0.3)', dueText: '#F8FAFC', avatarBg: 'rgba(148, 163, 184, 0.1)', avatarText: '#F8FAFC', avatarBorder: 'rgba(148, 163, 184, 0.3)', progFill: '#ffffff', actionHoverColor: '#ffffff', actionHoverBg: 'rgba(255,255,255,0.1)' }
      }
    }
  ];



  const chartData = [
  { month: "Jan", users: 50, revenue: 20000 },
  { month: "Feb", users: 80, revenue: 35000 },
  { month: "Mar", users: 120, revenue: 60000 },
  { month: "Apr", users: 175, revenue: 150000 }
];


const MENU_ITEMS = [
  { 
    name: "Dashboard", 
    icon: LayoutDashboard, 
    path: "/provider/dashboard" 
  },

  { 
    name: "Companies", 
    icon: Building2, 
    path: "/provider/companies" 
  },

  { 
    name: "Users", 
    icon: Users, 
    path: "/provider/users" 
  },

  {
    name: "Payments",
    icon: IndianRupee,
    submenu: [
     /* { name: "Payment Overview", path: "/provider/payments/overview" },*/
      { name: "All Payments", path: "/provider/all-paid-companies" },
      { name: "Pending Dues", path: "/provider/pending-dues" },
      { name: "Invoices", path: "/provider/invoices" },
      { name: "Failed Payments", path: "/provider/payments/failed" },
     
    ]
  },

  {
    name: "Reports",
    icon: FileText,
    submenu: [
      { name: "Company Report", path: "/provider/companyreports" },
      { name: "Revenue Report", path: "/provider/revenuereports" }
    ]
  },

  {
    name: "Employees",
    icon: Users,
    submenu: [
      { name: "Total Employees", path: "/provider/employees/total" },
      { name: "Employee List", path: "/provider/employees/list" }
    ]
  },

  {
    name: "Subscriptions",
    icon: Crown,
    submenu: [
      { name: "Active Plans", path: "/provider/subscriptions/active" },
      { name: "Expired Plans", path: "/provider/subscriptions/expired" },
      { name: "Upgrade Requests", path: "/provider/subscriptions/upgrade" },
      { name: "Billing History", path: "/provider/subscriptions/billing-history" },
      { name: "Subscribed Companies", path: "/provider/subscriptions/companies" },
      { name: "Renewals", path: "/provider/subscriptions/renewals" },
      { name: "Plan Management", path: "/provider/subscriptions/plans" },
      { name: "Transactions", path: "/provider/subscriptions/transactions" },
         
    ]
  },

  { 
    name: "Settings", 
    icon: Settings, 
    path: "/provider-dashboard/settings" 
  },

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
          '--dark-glow': colors.glow,

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

="glaze-top" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.1), transparent)' }} />
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


    console.log("Open Menu:", openMenu);

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

="header-title" style={{color: isDark ? '#ffffff' : 'inherit'}}>Super Admin</h1>
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
            ? '#0f172a'
            : '#0f172a'
          : 'var(--text-muted)',
        boxShadow: isSimple ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',


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

="profile-btn" style={{
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


            {/* ===== Charts Section ===== */}
<div className

="chart-section">

  <div className

="chart-box">
    <h3>Users Growth</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#60A5FA" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  <div className

="chart-box">
    <h3>Revenue</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#C387C2" />
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>


                  
          {/* DATA TABLE */}
       {/* DATA TABLE */}
          <div className="table-panel fade-in">
            <div className="table-header-row">
              <div>
                <h2 className="table-title" style={{color: isDark ? '#ffffff' : 'inherit'}}>Ecosystem Ledger</h2>
                <p className="table-subtitle">Live overview of connected companies and settlements</p>
              </div>
              <button 
                className="add-btn"
                style={{
                  background: isSimple ? 'rgba(250,133,185,0.1)' : isDark ? 'rgba(255,255,255,0.1)' : 'linear-gradient(to right, #FA85B9, #C387C2)',
                  color: isSimple ? '#FA85B9' : '#fff',
                  border: isDark ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  boxShadow: isColorful ? '0 8px 20px rgba(250,133,185,0.3)' : 'none'
                }}
                onClick={() => navigate('/provider/add-company')} // <--- Navigate
              >
                <Plus size={isSimple ? 16 : 20} />
                <span>Add</span>
              </button>
            </div>

            <div className="table-wrapper custom-scrollbar">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Type</th>
                    <th>Licenses</th>
                    <th>Total value</th>
                    <th>Outstanding</th>
                    <th style={{textAlign: 'center'}}>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {COMPANIES_DATA.map((company) => {
                    const colors = company.colors[theme];
                    
                    return (
                      <tr 
                        key={company.id} 
                        className="table-row tr-card"
                        onMouseEnter={(e) => {
                          if(isSimple) {
                            const avatar = e.currentTarget.querySelector('.cell-avatar');
                            const action = e.currentTarget.querySelector('.more-action-btn');
                            if(avatar) { avatar.style.background = colors.avatarHoverBg; avatar.style.color = colors.avatarHoverText; avatar.style.borderColor = colors.avatarHoverBg; }
                            if(action) { action.style.background = colors.actionHoverBg; action.style.color = colors.actionHoverColor; }
                          }
                        }}
                        onMouseLeave={(e) => {
                          if(isSimple) {
                            const avatar = e.currentTarget.querySelector('.cell-avatar');
                            const action = e.currentTarget.querySelector('.more-action-btn');
                            if(avatar) { avatar.style.background = ''; avatar.style.color = ''; avatar.style.borderColor = ''; }
                            if(action) { action.style.background = ''; action.style.color = ''; }
                          }
                        }}
                      >
                        <td>
                          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                            <div 
                              className="cell-avatar"
                              style={{
                                background: isColorful ? colors.avatarGrad : isDark ? colors.avatarBg : '',
                                color: isColorful ? '#ffffff' : isDark ? colors.avatarText : '',
                                border: isDark ? `1px solid ${colors.avatarBorder}` : '',
                                boxShadow: isColorful || isDark ? 'inset 0 2px 10px rgba(255,255,255,0.1)' : ''
                              }}
                            >
                              {company.name.charAt(0)}
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                              <span className="cell-name">{company.name}</span>
                              <span className="cell-id">{company.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="cell-type">{company.type}</span>
                        </td>
                        <td>
                          <div className="prog-container">
                            <span className="prog-text">{company.users} Active</span>
                            <div className="prog-track">
                              <div className="prog-fill" style={{ width: `${Math.min(100, company.users)}%`, background: colors.progFill }}></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="cell-total" style={{color: isDark ? '#ffffff' : 'inherit'}}>{company.total}</span>
                        </td>
                        <td>
                          <span className="cell-due" style={{color: colors.dueText}}>{company.due}</span>
                        </td>
                        <td style={{textAlign: 'center'}}>
                          <span className="status-pill" style={{
                            background: colors.badgeBg,
                            color: colors.badgeText,
                            border: isDark ? `1px solid ${colors.badgeBorder}` : 'none'
                          }}>
                            {company.status}
                          </span>
                        </td>
                        <td style={{textAlign: 'right'}}>
                          <button className="more-action-btn">
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
              <div className="simple-footer">
                <span style={{fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)'}}>Showing 4 results</span>
                <div style={{display: 'flex', gap: 8}}>
                  <button className="btn-outline">Prev</button>
                  <button className="btn-outline">Next</button>
                </div>
              </div>
            )}
          </div>

        </main>
      </div>
    );
  }