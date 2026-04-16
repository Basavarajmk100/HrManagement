import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { FaSignInAlt,FaUserAlt} from "react-icons/fa";

const themes = ["simple", "dark", "colorful"]; // matching your CompaniesPage theme logic

export default function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = localStorage.getItem("theme") || "simple";
  const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  return (
    <div className={`home-container theme-${theme}`}>
      
      {/* BACKGROUND EFFECTS */}
      <div className="bg-canvas">
        {(isDark || isColorful) && (
          <>
            <div className="ambient-orb orb-1"></div>
            <div className="ambient-orb orb-2"></div>
            <div className="ambient-orb orb-3"></div>
            <div className="ambient-orb orb-4"></div>

            <div
              className="bg-glass-layer"
              style={{
                background: isDark ? "rgba(0,0,0,0.8)" : "transparent",
                backdropFilter: "blur(100px)"
              }}
            ></div>
          </>
        )}
      </div>

   {/* NAVBAR */}
<nav className="navbar sticky-navbar">
  <h2 className="logo">
    <FaUserAlt className="logo-icon" /> {/* Icon beside text */}
    ItsMyHr - HRaaS
  </h2>

  <div className="nav-actions">
    <button
      onClick={() => navigate("/login")}
      className={`login-btn ${theme}`}
    >
      <FaSignInAlt className="btn-icon" />
      <span>Login</span>
    </button>
  </div>
</nav>


      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text glass-card">
          <h1>Manage Your Workforce Efficiently 🚀</h1>
          <p>
            A complete HRMS solution for employee management, payroll,
            attendance, and performance tracking.
          </p>

          <div className="hero-buttons">
            <button
              onClick={() => navigate("/dashboard")}
              className="primary-btn"
            >
              Get Started
            </button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="HRMS"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Core Features</h2>
        <div className="feature-grid">
          <div className="feature-card glass-card">
            <h3>👥 Employee Management</h3>
            <p>Manage employee records, profiles, and roles easily.</p>
          </div>
          <div className="feature-card glass-card">
            <h3>📅 Leave & Attendance</h3>
            <p>Track attendance and manage leave requests efficiently.</p>
          </div>
          <div className="feature-card glass-card">
            <h3>💰 Payroll System</h3>
            <p>Automate salary, payslips, and financial records.</p>
          </div>
          <div className="feature-card glass-card">
            <h3>📊 Reports & Analytics</h3>
            <p>Get insights with detailed reports and dashboards.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta glass-card">
        <h2>Ready to simplify HR operations?</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="primary-btn"
        >
          Start Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer glass-card">
        <p>© 2026 HRMS System. All rights reserved.</p>
      </footer>
    </div>
  );
}