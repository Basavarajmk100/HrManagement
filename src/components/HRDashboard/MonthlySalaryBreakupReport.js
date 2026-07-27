import React, { useState } from "react";
import "../../styles/MonthlySalaryBreakupReport.css";

const MonthlySalaryBreakupReport = () => {
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [search, setSearch] = useState("");

  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Sample Employee Salary Data
  const salaryData = [
    {
      empId: "EMP001",
      name: "Basavaraj",
      designation: "Software Developer",
      January: 45000,
      February: 45000,
      March: 45000,
      April: 46000,
      May: 46000,
      June: 46000,
      July: 47000,
      August: 47000,
      September: 47000,
      October: 48000,
      November: 48000,
      December: 48000,
    },
    {
      empId: "EMP002",
      name: "Deepak",
      designation: "Project Manager",
      January: 60000,
      February: 60000,
      March: 60000,
      April: 62000,
      May: 62000,
      June: 62000,
      July: 63000,
      August: 63000,
      September: 63000,
      October: 65000,
      November: 65000,
      December: 65000,
    },
    {
      empId: "EMP003",
      name: "Ramesh",
      designation: "UI/UX Designer",
      January: 40000,
      February: 40000,
      March: 40000,
      April: 42000,
      May: 42000,
      June: 42000,
      July: 43000,
      August: 43000,
      September: 43000,
      October: 44000,
      November: 44000,
      December: 44000,
    },
  ];

  const filteredData = salaryData.filter((employee) => {
    const matchesSearch =
      employee.empId.toLowerCase().includes(search.toLowerCase()) ||
      employee.name.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const formatSalary = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const downloadCSV = () => {
    const headers = [
      "Employee ID",
      "Employee Name",
      "Designation",
      ...months.slice(1),
    ];

    const rows = filteredData.map((employee) => [
      employee.empId,
      employee.name,
      employee.designation,
      ...months.slice(1).map((month) => employee[month]),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "Monthly_Salary_Breakup_Report.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="salary-breakup-container">
      {/* Page Header */}
      <div className="salary-breakup-header">
        <div>
          <h2>Monthly Salary Breakup Report</h2>
          <p>View employee monthly salary details</p>
        </div>

        <button className="download-btn" onClick={downloadCSV}>
          Download CSV
        </button>
      </div>

      {/* Filters */}
      <div className="salary-filters">
        {/* Month Dropdown */}
        <div className="filter-group">
          <label>Select Month</label>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="filter-group">
          <label>Search Employee</label>

          <input
            type="text"
            placeholder="Search Employee ID or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="salary-breakup-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>Designation</th>

              {selectedMonth === "All Months" ? (
                months.slice(1).map((month) => <th key={month}>{month}</th>)
              ) : (
                <th>{selectedMonth}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((employee) => (
                <tr key={employee.empId}>
                  <td>{employee.empId}</td>

                  <td>{employee.name}</td>

                  <td>{employee.designation}</td>

                  {selectedMonth === "All Months" ? (
                    months
                      .slice(1)
                      .map((month) => (
                        <td key={month}>{formatSalary(employee[month])}</td>
                      ))
                  ) : (
                    <td>{formatSalary(employee[selectedMonth])}</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={selectedMonth === "All Months" ? 15 : 4}
                  className="no-data"
                >
                  No employee data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlySalaryBreakupReport;
