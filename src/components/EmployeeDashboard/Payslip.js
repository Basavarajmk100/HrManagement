import React, { useState } from "react";
import "../../styles/Payslip.css";
import { FaFileAlt } from "react-icons/fa";
import { Download } from "lucide-react";

const Payslip = () => {
  // Dummy payslip data
  const [payslips] = useState([
    { month: "January 2025", file: "payslip-jan-2025.pdf" },
    { month: "February 2025", file: "payslip-feb-2025.pdf" },
    { month: "March 2025", file: "payslip-mar-2025.pdf" },
    { month: "April 2025", file: "payslip-apr-2025.pdf" },
    { month: "May 2025", file: "payslip-may-2025.pdf" },
  ]);

  
  const theme = localStorage.getItem("theme") || "simple";
      const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  return (

      <div className

={`payslip-container theme-${theme}`}>
      {/* Header */}
      <div className

="payslip-header">
        <h2>
          <span className

="icon"><FaFileAlt /></span>
          Payslips
        </h2>
        <div className

="payslip-header-accent"></div>
        <p className

="payslip-subtitle">
          Download your monthly salary slips securely
        </p>
      </div>

      {/* Payslip Cards */}
      <div className

="payslip-list">
        {payslips.map((p, index) => (
          <div className

="payslip-card" key={index}>
            <div className

="payslip-info">
              <h4>{p.month}</h4>
              <p>Payslip available for download</p>
            </div>
           <a href={`/${p.file}`} download className

="btn-download">
            <Download size={16} color="white" style={{marginRight:"6px"}} />
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payslip;
