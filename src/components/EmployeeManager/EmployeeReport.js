import React, { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import '../../styles/EmployeeReport.css';


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const EmployeeReport = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [filterDept, setFilterDept] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterGrade, setFilterGrade] = useState("");

  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5133/api/EmployeeManager");
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Filtered & sorted employees
  const filteredEmployees = useMemo(() => {
    let temp = [...employees];

    // Search
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      temp = temp.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(query) ||
          emp.id?.toString().includes(query)
      );
    }

    // Filters
    if (filterDept) temp = temp.filter(emp => emp.department === filterDept);
    if (filterBranch) temp = temp.filter(emp => emp.branch === filterBranch);
    if (filterGrade) temp = temp.filter(emp => emp.grade === filterGrade);

    // Sorting
    if (sortConfig.key) {
      temp.sort((a, b) => {
        const valA = a[sortConfig.key] || "";
        const valB = b[sortConfig.key] || "";
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return temp;
  }, [employees, searchTerm, filterDept, filterBranch, filterGrade, sortConfig]);

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  // Export to Excel
  const exportToExcel = () => {
    if (!filteredEmployees.length) {
      alert("No data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filteredEmployees.map((emp, index) => ({
        "Sl.No": index + 1,
        "Emp ID": emp.id,
        "Employee Name": emp.name,
        "Father's Name": emp.father,
        "Date of Joining": emp.doj ? new Date(emp.doj).toLocaleDateString() : "",
        "PF No": emp.pfNo || "",
        "ESI No": emp.esiNo || "",
        "PAN No": emp.pan || "",
        "Bank Name": emp.bankName || "",
        "Account No": emp.accountNo || "",
        IFSC: emp.ifsc || "",
        Designation: emp.designation || "",
        Occupation: emp.occupation || "",
        Department: emp.department || "",
        Branch: emp.branch || "",
        Grade: emp.grade || "",
        UAN: emp.uan || "",
        "Aadhaar No": emp.aadhaar || "",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "EmployeeReport.xlsx");
  };

  if (loading) return <p className

="message">Loading employees...</p>;
  if (error) return <p className

="message error">{error}</p>;

  // Unique values for filters
  const departments = [...new Set(employees.map(emp => emp.department).filter(Boolean))];
  const branches = [...new Set(employees.map(emp => emp.branch).filter(Boolean))];
  const grades = [...new Set(employees.map(emp => emp.grade).filter(Boolean))];




  const exportToPDF = () => {
  if (!filteredEmployees.length) {
    alert("No data to export!");
    return;
  }

  const doc = new jsPDF("l", "mm", "a4"); // landscape for wide tables

  doc.setFontSize(16);
  doc.text("Employee Report", 14, 15);

  const tableColumn = [
    "Sl.No",
    "Emp ID",
    "Name",
    "Father",
    "DOJ",
    "PF No",
    "ESI No",
    "PAN",
    "Bank",
    "Account No",
    "IFSC",
    "Designation",
    "Department",
    "Branch",
    "Grade",
    "UAN",
    "Aadhaar",
  ];

  const tableRows = filteredEmployees.map((emp, index) => [
    index + 1,
    emp.id || "",
    emp.name || "",
    emp.father || "",
    emp.doj ? new Date(emp.doj).toLocaleDateString() : "",
    emp.pfNo || "",
    emp.esiNo || "",
    emp.pan || "",
    emp.bankName || "",
    emp.accountNo || "",
    emp.ifsc || "",
    emp.designation || "",
    emp.department || "",
    emp.branch || "",
    emp.grade || "",
    emp.uan || "",
    emp.aadhaar || "",
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 25,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [30, 64, 175], // #1e40af
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  doc.save("EmployeeReport.pdf");
};


  return (
    <div className

="employee-report-container">
      <h1 className

="header">Employee Master Report</h1>

      {/* Controls */}
      <div className

="controls">
        <input
          type="text"
          placeholder="Search by name or Emp ID"
          className

="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
        </select>
        <select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
          <option value="">All Branches</option>
          {branches.map((b, i) => <option key={i} value={b}>{b}</option>)}
        </select>
        <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)}>
          <option value="">All Grades</option>
          {grades.map((g, i) => <option key={i} value={g}>{g}</option>)}
        </select>
      <button onClick={exportToExcel} className

="exportBtn">
        Export Excel
      </button>

         <button onClick={exportToPDF} className

="exportBtn">
           Export PDF
        </button>

      </div>

      {/* Table */}
      <div className

="tableWrapper">
        {currentItems.length > 0 ? (
          <table className

="table">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")}>Sl.No</th>
                <th>Photo</th>
                <th onClick={() => handleSort("id")}>Emp ID</th>
                <th onClick={() => handleSort("name")}>Employee Name</th>
                <th>Father's Name</th>
                <th>Date of Joining</th>
                <th>PF No</th>
                <th>ESI No</th>
                <th>PAN No</th>
                <th>Bank Name</th>
                <th>Account No</th>
                <th>IFSC</th>
                <th>Designation</th>
                <th>Occupation</th>
                <th>Department</th>
                <th>Branch</th>
                <th>Grade</th>
                <th>UAN</th>
                <th>Aadhaar No</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((emp, index) => (
                <tr key={emp.id || index} className

={index % 2 === 0 ? "trEven" : ""}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>
                    <img
                      src={emp.photo || "https://via.placeholder.com/40"}
                      alt={emp.name || "No Photo"}
                      className

="photoImg"
                    />
                  </td>
                  <td>{emp.id || "-"}</td>
                  <td>{emp.name || "-"}</td>
                  <td>{emp.father || "-"}</td>
                  <td>{emp.doj ? new Date(emp.doj).toLocaleDateString() : "-"}</td>
                  <td>{emp.pfNo || "-"}</td>
                  <td>{emp.esiNo || "-"}</td>
                  <td>{emp.pan || "-"}</td>
                  <td>{emp.bankName || "-"}</td>
                  <td>{emp.accountNo || "-"}</td>
                  <td>{emp.ifsc || "-"}</td>
                  <td>{emp.designation || "-"}</td>
                  <td>{emp.occupation || "-"}</td>
                  <td>{emp.department || "-"}</td>
                  <td>{emp.branch || "-"}</td>
                  <td>{emp.grade || "-"}</td>
                  <td>{emp.uan || "-"}</td>
                  <td>{emp.aadhaar || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className

="message">No employees found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className

="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className

={currentPage === i + 1 ? "activePage" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>Next</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeReport;
