import React, { useState, useEffect, useMemo } from "react";
import "../../styles/EmployeeManager.css";
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import API_URL from "../../config/api";

const GeneralInfo = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const [filterDesignation, setFilterDesignation] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterBank, setFilterBank] = useState("");
  const [filterDOJFrom, setFilterDOJFrom] = useState("");
  const [filterDOJTo, setFilterDOJTo] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [editId, setEditId] = useState(null);
  const [editEmployee, setEditEmployee] = useState({});

  // ------------------ Backend Fetch ------------------
  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const response = await fetch(`${API_URL}/api/EmployeeManager`);
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Error fetching employees from backend");
    } finally {
      setLoadingEmployees(false);
    }
  };

  // ------------------ Effects ------------------
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Refetch employees on navigation back
  useEffect(() => {
    fetchEmployees();
  }, [location.key]);

  // ------------------ Employee Actions ------------------
  const handleAddEmployee = () => navigate("/employee-manager/add");

  const handlePhotoUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === id ? { ...emp, photo: reader.result } : emp,
          ),
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      const response = await fetch(`${API_URL}/api/EmployeeManager/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete employee");
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting employee");
    }
  };

  // ------------------ Filtered Employees ------------------
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        emp.name?.toLowerCase().includes(query) ||
        emp.id?.toString().includes(query) ||
        emp.department?.toLowerCase().includes(query) ||
        emp.designation?.toLowerCase().includes(query) ||
        emp.bankName?.toLowerCase().includes(query);

      const dojDate = new Date(emp.doj);
      const matchesDOJ =
        (!filterDOJFrom || dojDate >= new Date(filterDOJFrom)) &&
        (!filterDOJTo || dojDate <= new Date(filterDOJTo));

      const matchesDesignation =
        !filterDesignation || emp.designation === filterDesignation;
      const matchesDepartment =
        !filterDepartment || emp.department === filterDepartment;
      const matchesBank = !filterBank || emp.bankName === filterBank;

      return (
        matchesSearch &&
        matchesDOJ &&
        matchesDesignation &&
        matchesDepartment &&
        matchesBank
      );
    });
  }, [
    employees,
    search,
    filterDOJFrom,
    filterDOJTo,
    filterDesignation,
    filterDepartment,
    filterBank,
  ]);

  // ------------------ Export to Excel ------------------
  const exportToExcel = () => {
    if (!filteredEmployees.length) {
      alert("No employee data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filteredEmployees.map((emp, index) => ({
        "Sl.No": index + 1,
        "Employee ID": emp.employeeId,
        "Employee Name": emp.name,
        "Father's Name": emp.father,
        "Mobile No": emp.mobileNo,
        Email: emp.email,
        Gender: emp.gender,
        "Marital Status": emp.maritalStatus,
        "Date of Joining": emp.doj
          ? new Date(emp.doj).toLocaleDateString()
          : "",
        "PF No": emp.pfNo,
        UAN: emp.uan,
        "PAN No": emp.pan,
        "Aadhaar No": emp.aadhaar,
        Designation: emp.designation,
        Occupation: emp.occupation,
        Department: emp.department,
        "Bank Name": emp.bankName,
        "Account No": emp.accountNo,
        IFSC: emp.ifsc,
        "PAN Card": emp.panCardPhoto ? "Uploaded" : "Not Uploaded",
        "Aadhaar Card": emp.aadhaarCardPhoto ? "Uploaded" : "Not Uploaded",
      })),
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Employee_Details.xlsx");
  };

  // ------------------ JSX ------------------
  // ------------------ JSX ------------------
  return (
    <div className="dashboard-layout" style={{ display: "flex" }}>
      {/* Main Content */}
      <div
        className="main-content"
        style={{
          flex: 1,
          padding: "1rem",
          transition: "margin 0.3s",
          marginLeft: "0",
        }}
      >
        <div className="dashboard-header-row">
          <h2 className="dashboard-header">
            <span className="header-icon">🧑‍💼</span>
            General Information
          </h2>
        </div>

        {/* General Info Tab */}
        {activeTab === "general" && (
          <div className="table-container">
            {/* Filter Bar */}
            <div className="modern-filter-bar">
              {/* LEFT SIDE */}
              <div className="filter-left">
                {/* Filter Dropdown */}
                <div className="filter-dropdown">
                  <button className="filter-btn">
                    🔎 Filters <span className="arrow">▾</span>
                  </button>

                  <div className="filter-menu">
                    {/* DOJ Range */}
                    <div className="filter-group">
                      <label>📅 DOJ Range</label>

                      <input
                        type="date"
                        value={filterDOJFrom || ""}
                        onChange={(e) => setFilterDOJFrom(e.target.value)}
                      />

                      <input
                        type="date"
                        value={filterDOJTo || ""}
                        onChange={(e) => setFilterDOJTo(e.target.value)}
                      />

                      <div className="filter-actions">
                        <button
                          onClick={() =>
                            setSearch(
                              `From ${filterDOJFrom || "—"} to ${filterDOJTo || "—"}`,
                            )
                          }
                        >
                          Apply
                        </button>

                        <button
                          className="clear-btn"
                          onClick={() => {
                            setFilterDOJFrom("");
                            setFilterDOJTo("");
                            setSearch("");
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    {/* Designation */}
                    <div className="filter-group">
                      <label>🏷️ Designation</label>

                      {Array.from(
                        new Set(employees.map((emp) => emp.designation)),
                      ).map((desig) => (
                        <button
                          key={desig}
                          onClick={() => {
                            setFilterDesignation(desig);
                            setSearch(desig);
                          }}
                        >
                          {desig}
                        </button>
                      ))}
                    </div>

                    {/* Department */}
                    <div className="filter-group">
                      <label>🏢 Department</label>

                      {Array.from(
                        new Set(employees.map((emp) => emp.department)),
                      ).map((dept) => (
                        <button
                          key={dept}
                          onClick={() => {
                            setFilterDepartment(dept);
                            setSearch(dept);
                          }}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>

                    {/* Bank */}
                    <div className="filter-group">
                      <label>🏦 Bank</label>

                      {Array.from(
                        new Set(employees.map((emp) => emp.bankName)),
                      ).map((bank) => (
                        <button
                          key={bank}
                          onClick={() => {
                            setFilterBank(bank);
                            setSearch(bank);
                          }}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <span>🔍</span>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="filter-right">
                <button
                  className="add-employee-btn"
                  onClick={handleAddEmployee}
                >
                  + Add Employee
                </button>
              </div>
            </div>

            {/* Employee Table */}
            {loadingEmployees ? (
              <p>Loading employees...</p>
            ) : (
              <div className="table-panel fade-in">
                <div className="table-header-row">
                  <div>
                    <h2 className="table-title">Employee Ledger</h2>
                    <p className="table-subtitle">
                      Live overview of all employee records
                    </p>
                  </div>

                  <button className="add-btn" onClick={exportToExcel}>
                    Export Excel
                  </button>
                </div>

                <div className="table-wrapper custom-scrollbar">
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>Sl.No</th>
                        <th>Photo</th>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Father</th>
                        <th>Mobile No</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Marital Status</th>
                        <th>DOJ</th>
                        <th>PF</th>
                        <th>UAN</th>
                        <th>PAN</th>
                        <th>Aadhaar</th>
                        <th>Designation</th>
                        <th>Occupation</th>
                        <th>Department</th>
                        <th>Bank</th>
                        <th>Account No</th>
                        <th>IFSC</th>
                        <th>PAN Card</th>
                        <th>Aadhaar Card</th>
                        <th>Documents</th>

                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredEmployees.map((emp, index) => (
                        <tr key={emp.id} className="table-row tr-card">
                          <td>{index + 1}</td>

                          <td className="photo-cell">
                            <img
                              src={emp.photo || "/default-profile.png"}
                              alt="profile"
                              className="profile-pic"
                            />

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoUpload(e, emp.id)}
                            />
                          </td>

                          <td>{emp.employeeId}</td>
                          <td>{emp.name}</td>
                          <td>{emp.father}</td>
                          <td>{emp.mobileNo}</td>
                          <td>{emp.email}</td>
                          <td>{emp.gender}</td>
                          <td>{emp.maritalStatus}</td>
                          <td>
                            {emp.doj
                              ? new Date(emp.doj).toLocaleDateString()
                              : ""}
                          </td>
                          <td>{emp.pfNo}</td>
                          <td>{emp.uan}</td>
                          <td>{emp.pan}</td>
                          <td>{emp.aadhaar}</td>
                          <td>{emp.designation}</td>
                          <td>{emp.occupation}</td>
                          <td>{emp.department}</td>
                          <td>{emp.bankName}</td>
                          <td>{emp.accountNo}</td>
                          <td>{emp.ifsc}</td>

                          <td>
                            {emp.panCardPhoto ? (
                              <img
                                src={emp.panCardPhoto}
                                alt="PAN"
                                style={{
                                  width: "70px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            {emp.aadhaarCardPhoto ? (
                              <img
                                src={emp.aadhaarCardPhoto}
                                alt="Aadhaar"
                                style={{
                                  width: "70px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            ) : (
                              "-"
                            )}
                          </td>

                          <td>
                            {emp.documents && emp.documents.length > 0
                              ? emp.documents.map((doc, index) => (
                                  <div key={index}>
                                    <a
                                      href={doc.fileData}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {doc.fileName}
                                    </a>
                                  </div>
                                ))
                              : "-"}
                          </td>

                          <td>
                            <button
                              className="more-action-btn"
                              onClick={() =>
                                navigate(`/employee-manager/edit/${emp.id}`)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="more-action-btn"
                              onClick={() => handleDelete(emp.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralInfo;
