import React, { useState } from "react";
import "../../styles/SalaryIncentiveAllowanceReport.css";

const SalaryIncentiveAllowanceReport = () => {
  const [reportType, setReportType] = useState("Incentive");
  const [search, setSearch] = useState("");

  const months = [
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

  // Sample Data
  const salaryData = [
    {
      empId: "EMP001",
      name: "Basavaraj",
      designation: "Software Developer",

      incentive: {
        January: 5000,
        February: 5000,
        March: 10000,
        April: 5000,
        May: 8000,
        June: 5000,
        July: 10000,
        August: 5000,
        September: 5000,
        October: 10000,
        November: 5000,
        December: 10000,
      },

      allowance: {
        January: 3000,
        February: 3000,
        March: 4000,
        April: 3000,
        May: 3000,
        June: 4000,
        July: 3000,
        August: 3000,
        September: 4000,
        October: 3000,
        November: 3000,
        December: 4000,
      },
    },

    {
      empId: "EMP002",
      name: "Deepak",
      designation: "Project Manager",

      incentive: {
        January: 10000,
        February: 10000,
        March: 15000,
        April: 10000,
        May: 12000,
        June: 10000,
        July: 15000,
        August: 10000,
        September: 12000,
        October: 15000,
        November: 10000,
        December: 15000,
      },

      allowance: {
        January: 5000,
        February: 5000,
        March: 6000,
        April: 5000,
        May: 5000,
        June: 6000,
        July: 5000,
        August: 5000,
        September: 6000,
        October: 5000,
        November: 5000,
        December: 6000,
      },
    },

    {
      empId: "EMP003",
      name: "Ramesh",
      designation: "UI/UX Designer",

      incentive: {
        January: 3000,
        February: 5000,
        March: 3000,
        April: 5000,
        May: 3000,
        June: 5000,
        July: 3000,
        August: 5000,
        September: 3000,
        October: 5000,
        November: 3000,
        December: 5000,
      },

      allowance: {
        January: 2500,
        February: 2500,
        March: 3000,
        April: 2500,
        May: 2500,
        June: 3000,
        July: 2500,
        August: 2500,
        September: 3000,
        October: 2500,
        November: 2500,
        December: 3000,
      },
    },
  ];

  // Search Filter
  const filteredData = salaryData.filter((employee) => {
    return (
      employee.empId.toLowerCase().includes(search.toLowerCase()) ||
      employee.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Get Incentive or Allowance
  const getAmount = (employee, month) => {
    if (reportType === "Incentive") {
      return employee.incentive[month] || 0;
    }

    return employee.allowance[month] || 0;
  };

  // Format Currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Download CSV
  const downloadCSV = () => {
    const headers = ["Employee ID", "Employee Name", "Designation", ...months];

    const rows = filteredData.map((employee) => [
      employee.empId,
      employee.name,
      employee.designation,
      ...months.map((month) => getAmount(employee, month)),
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

    link.download = `${reportType}_Report.csv`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  return (
    <div className="salary-report-container">
      {/* Header */}
      <div className="salary-report-header">
        <div>
          <h2>Salary Incentive / Allowance Report</h2>
          <p>View employee monthly incentive and allowance details</p>
        </div>

        <button className="download-btn" onClick={downloadCSV}>
          Download CSV
        </button>
      </div>

      {/* Filters */}
      <div className="salary-report-filters">
        {/* Incentive / Allowance Dropdown */}
        <div className="filter-group">
          <label>Select Report Type</label>

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="Incentive">Incentive</option>

            <option value="Allowance">Allowance</option>
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

      {/* Report Title */}
      <h3 className="report-title">{reportType} Report</h3>

      {/* Table */}
      <div className="table-wrapper">
        <table className="salary-report-table">
          <thead>
            <tr>
              <th>Emp ID</th>

              <th>Employee Name</th>

              <th>Designation</th>

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

                  <td>{employee.name}</td>

                  <td>{employee.designation}</td>

                  {months.map((month) => (
                    <td key={month}>
                      {formatAmount(getAmount(employee, month))}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="no-data">
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

export default SalaryIncentiveAllowanceReport;
