import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../styles/SalarySummaryReport.css";

const SalarySummaryReport = () => {
  // =========================
  // States
  // =========================
  const [calendarYear, setCalendarYear] = useState("2026");
  const [financialYear, setFinancialYear] = useState("All");
  const [payType, setPayType] = useState("Gross Pay");
  const [search, setSearch] = useState("");

  // =========================
  // Months
  // =========================
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // =========================
  // Mock Salary Summary Data
  // =========================
  const salaryData = [
    {
      empId: "EMP001",
      employeeName: "Basavaraj",
      designation: "Software Developer",
      actualCTC: 500000,
      offeredCTC: 600000,

      jan: { gross: 40000, net: 35000 },
      feb: { gross: 40000, net: 35000 },
      mar: { gross: 42000, net: 37000 },
      apr: { gross: 42000, net: 37000 },
      may: { gross: 42000, net: 37000 },
      jun: { gross: 42000, net: 37000 },
      jul: { gross: 45000, net: 40000 },
      aug: { gross: 45000, net: 40000 },
      sep: { gross: 45000, net: 40000 },
      oct: { gross: 45000, net: 40000 },
      nov: { gross: 45000, net: 40000 },
      dec: { gross: 45000, net: 40000 },
    },

    {
      empId: "EMP002",
      employeeName: "Deepak",
      designation: "Frontend Developer",
      actualCTC: 450000,
      offeredCTC: 550000,

      jan: { gross: 38000, net: 33000 },
      feb: { gross: 38000, net: 33000 },
      mar: { gross: 40000, net: 35000 },
      apr: { gross: 40000, net: 35000 },
      may: { gross: 40000, net: 35000 },
      jun: { gross: 40000, net: 35000 },
      jul: { gross: 42000, net: 37000 },
      aug: { gross: 42000, net: 37000 },
      sep: { gross: 42000, net: 37000 },
      oct: { gross: 42000, net: 37000 },
      nov: { gross: 42000, net: 37000 },
      dec: { gross: 42000, net: 37000 },
    },

    {
      empId: "EMP003",
      employeeName: "Ramesh",
      designation: "Backend Developer",
      actualCTC: 550000,
      offeredCTC: 650000,

      jan: { gross: 45000, net: 40000 },
      feb: { gross: 45000, net: 40000 },
      mar: { gross: 47000, net: 42000 },
      apr: { gross: 47000, net: 42000 },
      may: { gross: 47000, net: 42000 },
      jun: { gross: 47000, net: 42000 },
      jul: { gross: 50000, net: 45000 },
      aug: { gross: 50000, net: 45000 },
      sep: { gross: 50000, net: 45000 },
      oct: { gross: 50000, net: 45000 },
      nov: { gross: 50000, net: 45000 },
      dec: { gross: 50000, net: 45000 },
    },
  ];

  // =========================
  // Format Currency
  // =========================
  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // =========================
  // Filter Data
  // =========================
  const filteredData = useMemo(() => {
    return salaryData.filter((employee) => {
      const matchesSearch =
        employee.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        employee.empId.toLowerCase().includes(search.toLowerCase()) ||
        employee.designation.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search]);

  // =========================
  // Get Month Salary
  // =========================
  const getMonthSalary = (employee, month) => {
    const salary = employee[month.toLowerCase()];

    if (!salary) return 0;

    return payType === "Gross Pay" ? salary.gross : salary.net;
  };

  // =========================
  // Download Excel
  // =========================
  const downloadExcel = () => {
    const excelData = filteredData.map((employee) => {
      const row = {
        "Employee ID": employee.empId,
        "Employee Name": employee.employeeName,
        Designation: employee.designation,
        "Actual CTC": employee.actualCTC,
        "Offered CTC": employee.offeredCTC,
      };

      months.forEach((month) => {
        row[month] = getMonthSalary(employee, month);
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Summary");

    XLSX.writeFile(workbook, `Salary_Summary_${calendarYear}.xlsx`);
  };

  // =========================
  // Download PDF
  // =========================
  const downloadPDF = () => {
    const doc = new jsPDF("landscape");

    doc.setFontSize(16);

    doc.text(`Salary Summary Report - ${calendarYear}`, 14, 15);

    doc.setFontSize(10);

    doc.text(`Pay Type: ${payType}`, 14, 22);

    const tableHeaders = [
      [
        "Emp ID",
        "Employee Name",
        "Designation",
        "Actual CTC",
        "Offered CTC",
        ...months,
      ],
    ];

    const tableRows = filteredData.map((employee) => [
      employee.empId,
      employee.employeeName,
      employee.designation,
      formatCurrency(employee.actualCTC),
      formatCurrency(employee.offeredCTC),

      ...months.map((month) => formatCurrency(getMonthSalary(employee, month))),
    ]);

    autoTable(doc, {
      startY: 28,
      head: tableHeaders,
      body: tableRows,
      styles: {
        fontSize: 7,
      },
      headStyles: {
        fontSize: 7,
      },
    });

    doc.save(`Salary_Summary_${calendarYear}.pdf`);
  };

  // =========================
  // JSX
  // =========================
  return (
    <div className="salary-summary-container">
      {/* Header */}
      <div className="salary-summary-header">
        <div>
          <h2>Salary Summary Report</h2>
          <p>View employee salary summary from January to December</p>
        </div>
      </div>

      {/* Filters */}
      <div className="salary-summary-filters">
        {/* Search */}
        <div className="filter-group">
          <label>Search Employee</label>

          <input
            type="text"
            placeholder="Search by ID, name or designation"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Calendar Year */}
        <div className="filter-group">
          <label>Calendar Year</label>

          <select
            value={calendarYear}
            onChange={(e) => setCalendarYear(e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

        {/* Financial Year */}
        <div className="filter-group">
          <label>Financial Year</label>

          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
          >
            <option value="All">All</option>
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
            <option value="2025-26">2025-26</option>
            <option value="2026-27">2026-27</option>
          </select>
        </div>

        {/* Gross / Net */}
        <div className="filter-group">
          <label>Salary Type</label>

          <select value={payType} onChange={(e) => setPayType(e.target.value)}>
            <option value="Gross Pay">Gross Pay</option>

            <option value="Net Pay">Net Pay</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="salary-summary-actions">
        <button className="excel-btn" onClick={downloadExcel}>
          Download Excel
        </button>

        <button className="pdf-btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>

      {/* Table */}
      <div className="salary-summary-table-wrapper">
        <table className="salary-summary-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Actual CTC</th>
              <th>Offered CTC</th>

              {months.map((month) => (
                <th key={month}>{month}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((employee) => (
                <tr key={employee.empId}>
                  <td>{employee.empId}</td>

                  <td>{employee.employeeName}</td>

                  <td>{employee.designation}</td>

                  <td>{formatCurrency(employee.actualCTC)}</td>

                  <td>{formatCurrency(employee.offeredCTC)}</td>

                  {months.map((month) => (
                    <td key={month}>
                      {formatCurrency(getMonthSalary(employee, month))}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={17} className="no-data">
                  No salary records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalarySummaryReport;
