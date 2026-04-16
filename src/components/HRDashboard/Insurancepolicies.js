import React, { useState } from "react";
import "../../styles/Insurancepolicies.css";
import { Plus, Upload, FileSpreadsheet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

// Example initial employee data
const initialEmployees = [
  {
    id: 1,
    employeeNo: "KAD(I)-1003",
    name: "Linto Leo Tom",
    email: "lintoleo@gmail.com",
    mobile: "8050327160",
    gender: "Male",
    dob: "1989-05-15",
    healthcareType: "Corporate Health",
    healthcareName: "Emerald++",
    fathersDob: "1965-04-12",
    mothersDob: "1967-09-23",
    spouseName: "Roshmi",
    spouseGender: "Female",
    spouseDob: "1992-08-20",
    child1Name: "Johaan Linto",
    child1Gender: "Male",
    child1Dob: "2021-03-10",
    child2Name: "Abc",
    child2Gender: "Female",
    child2Dob: "2025-07-05",
    planA: 1330,
    planAGST: 1396.5,
    planB: 930
  },
  {
    id: 2,
    employeeNo: "KAD(I)-1004",
    name: "Ananya Ramesh",
    email: "ananya.r@gmail.com",
    mobile: "8050327161",
    gender: "Female",
    dob: "1991-08-22",
    healthcareType: "Family Health",
    healthcareName: "Sapphire+",
    fathersDob: "1963-02-15",
    mothersDob: "1965-06-18",
    spouseName: "Rohan",
    spouseGender: "Male",
    spouseDob: "1989-12-10",
    child1Name: "Mia Ramesh",
    child1Gender: "Female",
    child1Dob: "2019-09-05",
    child2Name: "Leo Ramesh",
    child2Gender: "Male",
    child2Dob: "2021-11-12",
    planA: 1520,
    planAGST: 1596,
    planB: 1120
  },
  {
    id: 3,
    employeeNo: "KAD(I)-1005",
    name: "Ravi Kumar",
    email: "ravi.kumar@gmail.com",
    mobile: "8050327162",
    gender: "Male",
    dob: "1985-11-30",
    healthcareType: "Corporate Health",
    healthcareName: "Emerald++",
    fathersDob: "1960-07-12",
    mothersDob: "1962-09-20",
    spouseName: "Sanya",
    spouseGender: "Female",
    spouseDob: "1988-05-25",
    child1Name: "Arjun Kumar",
    child1Gender: "Male",
    child1Dob: "2015-06-18",
    child2Name: "Aanya Kumar",
    child2Gender: "Female",
    child2Dob: "2018-08-22",
    planA: 1780,
    planAGST: 1870,
    planB: 1230
  },
  {
    id: 4,
    employeeNo: "KAD(I)-1006",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    mobile: "8050327163",
    gender: "Female",
    dob: "1993-02-10",
    healthcareType: "Premium Health",
    healthcareName: "Diamond++",
    fathersDob: "1968-11-03",
    mothersDob: "1970-01-12",
    spouseName: "Aditya",
    spouseGender: "Male",
    spouseDob: "1990-09-17",
    child1Name: "Sara Sharma",
    child1Gender: "Female",
    child1Dob: "2020-01-22",
    child2Name: "",
    child2Gender: "",
    child2Dob: "",
    planA: 2100,
    planAGST: 2205,
    planB: 1650
  },
 
];
  // Add more employees here

export default function EmployeeInsuranceTable() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [excelFile, setExcelFile] = useState(null);


 const [showFilters, setShowFilters] = useState(false);

const [empNoFilter, setEmpNoFilter] = useState("");
const [empNameFilter, setEmpNameFilter] = useState("");
const [genderFilter, setGenderFilter] = useState("");
const [healthcareFilter, setHealthcareFilter] = useState("");
const [healthcareNameFilter, setHealthcareNameFilter] = useState("");


 const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";



  const downloadExcelFormat = () => {
  // Define the columns headers exactly as in your table
  const headers = [
    "Employee No",
    "Name",
    "Email",
    "Mobile",
    "Gender",
    "DOB",
    "Healthcare Membership Type",
    "Healthcare Membership Name",
    "Father's DOB",
    "Mother's DOB",
    "Spouse Name",
    "Spouse Gender",
    "Spouse DOB",
    "Child 1 Name",
    "Child 1 Gender",
    "Child 1 DOB",
    "Child 2 Name",
    "Child 2 Gender",
    "Child 2 DOB",
    "Plan A",
    "Plan A with GST",
    "Plan B"
  ];

  // Create an empty row with headers
  const worksheet = XLSX.utils.json_to_sheet([headers.reduce((acc, h) => ({ ...acc, [h]: "" }), {})]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employee_Format");

  XLSX.writeFile(workbook, "Employee_Excel_Format.xlsx");
};




  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Delete this employee record?")) {
      setEmployees(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleExcelUpload = (e) => {
    setExcelFile(e.target.files[0]);
  };



const filteredEmployees = employees.filter(e =>
  (search === "" ||
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase()) ||
    e.employeeNo.toLowerCase().includes(search.toLowerCase())
  ) &&

  (empNoFilter === "" || e.employeeNo === empNoFilter) &&
  (empNameFilter === "" || e.name === empNameFilter) &&
  (genderFilter === "" || e.gender === genderFilter) &&
  (healthcareFilter === "" || e.healthcareType === healthcareFilter)&&
    (healthcareNameFilter === "" || e.healthcareName === healthcareNameFilter)
);   



  const downloadReport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Insurance Report");
    XLSX.writeFile(workbook, "Employee_Insurance_Report.xlsx");
  };

return (
  <div className

={`insurance-panel theme-${theme}`}>

    {/* BACKGROUND EFFECTS */}
    <div className

="bg-canvas">
      {(isDark || isColorful) && (
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

    {/* MAIN PANEL */}
    <div className

="table-panel">

      {/* HEADER */}
      <div className

="table-header-row">
        <div>
          <div className

="table-title">Employee Insurance Records</div>
          <div className

="table-subtitle">
            Manage employee healthcare memberships
          </div>
        </div>

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className

="searchInput"
        />

        <button className

="add-btn" onClick={() => navigate("/insuranceform")}>
          + Add Form
        </button>
      </div>

      {/* SECOND ROW (Filters + Actions) */}
      <div className

="table-header-row" style={{ marginTop: "10px" }}>

        <div className

="header-left">

          {/* FILTER BUTTON */}
          <div className

="filter-container">
            <button
              className

="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters ▼
            </button>

            {showFilters && (
              <div className

="filter-panel">

                <div className

="filter-title">Filter Employees</div>

                <label>Employee Number</label>
                <select value={empNoFilter} onChange={(e) => setEmpNoFilter(e.target.value)}>
                  <option value="">All</option>
                  {[...new Set(employees.map(e => e.employeeNo))].map(no => (
                    <option key={no}>{no}</option>
                  ))}
                </select>

                <label>Name</label>
                <select value={empNameFilter} onChange={(e) => setEmpNameFilter(e.target.value)}>
                  <option value="">All</option>
                  {[...new Set(employees.map(e => e.name))].map(name => (
                    <option key={name}>{name}</option>
                  ))}
                </select>

                <label>Gender</label>
                <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                  <option value="">All</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <label>Healthcare Type</label>
                <select value={healthcareFilter} onChange={(e) => setHealthcareFilter(e.target.value)}>
                  <option value="">All</option>
                  <option>Corporate Health</option>
                  <option>Family Health</option>
                  <option>Premium Health</option>
                </select>

                <div className

="filter-buttons">
                  <button className

="reset-btn" onClick={() => {
                    setEmpNoFilter("");
                    setEmpNameFilter("");
                    setGenderFilter("");
                    setHealthcareFilter("");
                  }}>
                    Reset
                  </button>

                  <button className

="apply-btn" onClick={() => setShowFilters(false)}>
                    Apply
                  </button>
                </div>

              </div>
            )}
          </div>

          <button className

="add-btn" onClick={downloadReport}>
            Report
          </button>

        </div>

        <div className

="header-right">
          <button className

="add-btn" onClick={() => document.getElementById("excelUpload").click()}>
            Add Excel
          </button>

          <button className

="add-btn" onClick={downloadExcelFormat}>
            Excel Format
          </button>
        </div>

      </div>

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        accept=".xlsx,.xls"
        id="excelUpload"
        style={{ display: "none" }}
        onChange={handleExcelUpload}
      />

      {/* TABLE */}
      <div className

="table-wrapper">
        <table className

="styled-table">

          <thead>
            <tr>
              <th>Emp No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Healthcare</th>
              <th>Plan A</th>
              <th>Plan B</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="9" className

="noData">No records found</td>
              </tr>
            ) : (
              filteredEmployees.map(e => (
                <tr key={e.id} className

="table-row">

                  <td>{e.employeeNo}</td>

                  {/* NAME WITH AVATAR */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div className

="cell-avatar">
                        {e.name.charAt(0)}
                      </div>
                      <span className

="cell-name">{e.name}</span>
                    </div>
                  </td>

                  <td>{e.email}</td>
                  <td>{e.mobile}</td>
                  <td>{e.gender}</td>
                  <td>{e.healthcareType}</td>
                  <td>{e.planA}</td>
                  <td>{e.planB}</td>

                  <td>
                    <div className

="action-group">
                      <button className

="more-action-btn">Edit</button>
                      <button className

="more-action-btn delete" onClick={() => handleDelete(e.id)}>Delete</button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  </div>
);
}