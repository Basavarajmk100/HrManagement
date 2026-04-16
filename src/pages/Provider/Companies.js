import React, { useState, useEffect } from "react";
import "../../styles/Companies.css";
import { useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";

const themes = [
  {
    badgeBg: 'rgba(94, 168, 230, 0.2)',
    badgeText: '#2872AC',
    dueText: '#FA85B9',
    avatarGrad: 'linear-gradient(to bottom right, #FA85B9, #FF8894)',
    progFill: '#5EA8E6',
    actionHoverColor: '#5EA8E6',
    actionHoverBg: 'rgba(94,168,230,0.1)'
  },
  {
    badgeBg: 'rgba(92, 194, 198, 0.2)',
    badgeText: '#2B8B8F',
    dueText: '#5CC2C6',
    avatarGrad: 'linear-gradient(to bottom right, #5EA8E6, #A4E9FF)',
    progFill: '#5EA8E6',
    actionHoverColor: '#5EA8E6',
    actionHoverBg: 'rgba(94,168,230,0.1)'
  },
  {
    badgeBg: 'rgba(250, 133, 185, 0.2)',
    badgeText: '#C13674',
    dueText: '#FA85B9',
    avatarGrad: 'linear-gradient(to bottom right, #C387C2, #F7DFF6)',
    progFill: '#5EA8E6',
    actionHoverColor: '#5EA8E6',
    actionHoverBg: 'rgba(94,168,230,0.1)'
  },
  {
    badgeBg: 'rgba(92, 194, 198, 0.2)',
    badgeText: '#2B8B8F',
    dueText: '#5CC2C6',
    avatarGrad: 'linear-gradient(to bottom right, #5CC2C6, #A1E0DD)',
    progFill: '#5EA8E6',
    actionHoverColor: '#5EA8E6',
    actionHoverBg: 'rgba(94,168,230,0.1)'
  }
];



const initialCompanies = [
  {
    id: 1,
    theme: themes[0],
    name: "Sunrise Pvt Ltd",
    loginId: "sunrise@gmail.com",
    password: "••••••••",
    website: "www.sunrise.com",
    address: "123 Main St, Bangalore",
    employees: 25,
    plan: "Monthly",
    status: "Active",
    contactPersonName: "Basavaraj",
    contactPersonDesignation: "Manager",
    contactPersonPhone: "9876543210",
    contactPersonEmail: "basujuly31@gmail.com"
  },
  {
    id: 2,
    theme: themes[1],
    name: "Bright Tech",
    loginId: "bright@gmail.com",
    password: "••••••••",
    website: "www.brighttech.com",
    address: "456 MG Road, Bangalore",
    employees: 40,
    plan: "Quarterly",
    status: "Active",
    contactPersonName: "Ravi",
    contactPersonDesignation: "Director",
    contactPersonPhone: "9876501234",
    contactPersonEmail: "ravi@bright.com"
  },
  {
    id: 3,
    theme: themes[2],
    name: "Skyline Solutions",
    loginId: "skyline@gmail.com",
    password: "••••••••",
    website: "www.skylinesolutions.com",
    address: "789 Brigade Road, Bangalore",
    employees: 120,
    plan: "Yearly",
    status: "Active",
    contactPersonName: "Anita Sharma",
    contactPersonDesignation: "HR Manager",
    contactPersonPhone: "9123456780",
    contactPersonEmail: "anita@skyline.com"
  },
  {
    id: 4,
    theme: themes[3],
    name: "GreenLeaf Enterprises",
    loginId: "greenleaf@gmail.com",
    password: "••••••••",
    website: "www.greenleafent.com",
    address: "321 Outer Ring Road, Bangalore",
    employees: 25,
    plan: "Monthly",
    status: "Inactive",
    contactPersonName: "Karthik R",
    contactPersonDesignation: "Founder",
    contactPersonPhone: "9988776655",
    contactPersonEmail: "karthik@greenleaf.com"
  }
];

const plans = ["Monthly", "Quarterly", "Yearly"];
const statuses = ["Active", "Inactive"];

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCompany, setEditingCompany] = useState(null);
  const navigate = useNavigate();


  const theme = localStorage.getItem("theme") || "simple";
      const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) return;

    setCompanies(prev =>
      prev.filter(company => company.id !== id)
    );
  };

  const handleSave = (updatedCompany) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
    setEditingCompany(null);
  };

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.loginId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (
  <div className

={`companies-panel theme-${theme}`}>
    
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

          <div
            className

="bg-glass-layer"
            style={{
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(100px)"
            }}
          ></div>
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


 
<div className

="table-panel theme-light">

  <div className

="table-header-row">
    <div>
      <div className

="table-title">Companies</div>
      <div className

="table-subtitle">
        Manage registered companies and their details
      </div>
    </div>

         <input
        type="text"
        placeholder="Search by name, email, or plan..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className

="searchInput"
      />


       <button 
                      className

="add-btn"
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

  <div className

="table-wrapper">
    <table className

="styled-table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Company</th>
          <th>Login</th>
          <th>Password</th>
          <th>Website</th>
          <th>Address</th>
          <th>Employees</th>
          <th>Plan</th>
          <th>Status</th>
          <th>Contact</th>
          <th>Designation</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {filteredCompanies.length === 0 ? (
          <tr>
            <td colSpan="14" className

="noData">
              No companies found
            </td>
          </tr>
        ) : (
          filteredCompanies.map((c) => (
            <tr className

="table-row" key={c.id}>

              {/* ID */}
              <td>{c.id}</td>

              {/* Company (Avatar + Name + ID style) */}
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div className

="cell-avatar">
                    {c.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <span className

="cell-name">{c.name}</span>
                    <div className

="cell-id">{c.loginId}</div>
                  </div>
                </div>
              </td>

              {/* Login */}
              <td>{c.loginId}</td>

              {/* Password */}
              <td>{c.password}</td>

              {/* Website */}
              <td>{c.website}</td>

              {/* Address */}
              <td>{c.address}</td>

              {/* Employees */}
              <td>
                <div className

="prog-container">
                  <span className

="prog-text">
                    {c.employees} Employees
                  </span>
                  <div className

="prog-track">
                    <div
                      className

="prog-fill"
                      style={{
                        width: `${Math.min(c.employees, 100)}%`,
                        background: "#3b82f6",
                        height: "100%"
                      }}
                    />
                  </div>
                </div>
              </td>

              {/* Plan */}
              <td>
                <span className

="cell-type">{c.plan}</span>
              </td>

              {/* Status */}
              <td>
                <span className

="status-pill">
                  {c.status}
                </span>
              </td>

              {/* Contact Name */}
              <td>{c.contactPersonName}</td>

              {/* Designation */}
              <td>{c.contactPersonDesignation}</td>

              {/* Phone */}
              <td>{c.contactPersonPhone}</td>

              {/* Email */}
              <td>{c.contactPersonEmail}</td>

              {/* Actions */}
              <td>
                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                  <button
                    className

="more-action-btn"
                    onClick={() => setEditingCompany(c)}
                  >
                    Edit
                  </button>

                  <button
                    className

="more-action-btn"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>

                  <button
                    className

="more-action-btn"
                    onClick={() => navigate(`/company-settings/${c.id}`)}
                  >
                    Settings
                  </button>
                </div>
              </td>

            </tr>
          ))
        )}
      </tbody>

    </table>
  </div>

</div>

      {editingCompany && (
        <EditModal
          company={editingCompany}
          onClose={() => setEditingCompany(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

/* ------------------ Edit Modal ------------------ */

function EditModal({ company, onClose, onSave }) {
  const [updated, setUpdated] = useState(company);

  useEffect(() => {
    setUpdated(company);
  }, [company]);

  const handleChange = (field, value) => {
    setUpdated(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className

="modalOverlay">
      <div className

="modal">
        <h3>Edit Company</h3>

        {Object.keys(updated).map(key => (
          key !== "id" && (
            <input
              key={key}
              type="text"
              value={updated[key]}
              onChange={e => handleChange(key, e.target.value)}
              className

="input"
              placeholder={key}
            />
          )
        ))}

        <div className

="modalButtons">
          <button onClick={() => onSave(updated)} className

="saveButton">Save</button>
          <button onClick={onClose} className

="cancelButton">Cancel</button>
        </div>
      </div>
    </div>
  );
}