import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2";
import "../../styles/CTCReport.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



const format = (v) =>
  Number(v || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CTCReport = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  useEffect(() => {
    fetch("http://localhost:5133/api/ctc/report")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Export Excel
const exportExcel = () => {
  if (filteredData.length === 0) {
    alert("No data to export");
    return;
  }

  const exportData = filteredData.map(e => ({
    EmpID: e.empId,
    Name: e.empName,
    Basic: e.basic,
    HRA: e.hra,
    Medical: e.medical,
    Transport: e.transport,
    Special: e.special,
    Bonus: e.bonus,
    EmployerPF: e.employerPF,
    Incentive: e.incentive,
    GrossMonthly: e.grossMonthly,
    TotalCTC: e.totalCTC
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "CTC Structure");

  XLSX.writeFile(
    wb,
    filteredData.length === 1
      ? `CTC_${filteredData[0].empName}.xlsx`
      : "CTC_Filtered_Report.xlsx"
  );
};


const exportPDF = () => {
  if (filteredData.length === 0) {
    alert("No data to export");
    return;
  }

  const doc = new jsPDF("l", "mm", "a4");

  doc.setFontSize(14);
  doc.text("CTC Structure Report", 14, 12);

  const columns = [
    "Emp ID", "Name", "Basic", "HRA", "Medical", "Transport",
    "Special", "Bonus", "Employer PF", "Incentive",
    "Gross Monthly", "Total CTC"
  ];

  const rows = filteredData.map(e => ([
    e.empId,
    e.empName,
    format(e.basic),
    format(e.hra),
    format(e.medical),
    format(e.transport),
    format(e.special),
    format(e.bonus),
    format(e.employerPF),
    format(e.incentive),
    format(e.grossMonthly),
    format(e.totalCTC),
  ]));

  // TOTAL row
  rows.push([
    "TOTAL", "",
    format(summary.basic),
    format(summary.hra),
    "", "", "", "", "", "",
    format(summary.grossMonthly),
    format(summary.totalCTC),
  ]);

  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 18,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [30, 64, 175] },
    theme: "grid",
  });

  doc.save(
    filteredData.length === 1
      ? `CTC_${filteredData[0].empName}.pdf`
      : "CTC_Filtered_Report.pdf"
  );
};


  // Sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    const sorted = [...data].sort((a, b) => {
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      return 0;
    });
    setData(sorted);
  };

  // Filtering
  const filteredData = data
    .filter(
      (e) =>
        e.empName.toLowerCase().includes(search.toLowerCase()) ||
        e.empId.toString().includes(search)
    )
    .filter((e) => (departmentFilter ? e.department === departmentFilter : true))
    .filter((e) => {
      if (!salaryRange) return true;
      const [min, max] = salaryRange.split("-").map(Number);
      return e.totalCTC >= min && e.totalCTC <= max;
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Summary
  const summary = filteredData.reduce(
    (acc, curr) => {
      acc.basic += curr.basic || 0;
      acc.hra += curr.hra || 0;
      acc.grossMonthly += curr.grossMonthly || 0;
      acc.totalCTC += curr.totalCTC || 0;
      return acc;
    },
    { basic: 0, hra: 0, grossMonthly: 0, totalCTC: 0 }
  );

  // Chart data (Optional)
  const chartData = {
    labels: filteredData.map((e) => e.empName),
    datasets: [
      {
        label: "Total CTC",
        data: filteredData.map((e) => e.totalCTC),
        backgroundColor: "#1e40af",
      },
    ],
  };

  return (
    <div className

="report-container">
      <div className

="report-header">
        <h2>CTC Structure Report</h2>
<div className

="filter-bar">
  <input
    type="text"
    className

="search-input"
    placeholder="Search by Emp ID or Name"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={departmentFilter}
    onChange={(e) => setDepartmentFilter(e.target.value)}
  >
    <option value="">All Departments</option>
    {[...new Set(data.map((d) => d.department))].map((dep) => (
      <option key={dep} value={dep}>{dep}</option>
    ))}
  </select>

  <select
    value={salaryRange}
    onChange={(e) => setSalaryRange(e.target.value)}
  >
    <option value="">All Salaries</option>
    <option value="0-500000">0 - 5L</option>
    <option value="500001-1000000">5L - 10L</option>
    <option value="1000001-2000000">10L - 20L</option>
  </select>

  {/* Buttons container */}
  <div className

="export-actions">
    <button className

="export-btn excel-btn" onClick={exportExcel}>
      Export Excel
    </button>

    <button className

="export-btn pdf-btn" onClick={exportPDF}>
      Export PDF
    </button>
  </div>
</div>


      </div>
      

      <table className

="report-table">
        <thead>
          <tr>
            {[
              "empId","empName","basic","hra","medical","transport","special",
              "bonus","employerPF","incentive","grossMonthly","totalCTC"
            ].map((col) => (
              <th key={col} onClick={() => handleSort(col)}>
                {col.toUpperCase()}
                {sortField === col ? (sortOrder === "asc" ? " ▲" : " ▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((e, i) => (
            <tr key={i}>
              <td>{e.empId}</td>
              <td>{e.empName}</td>
              <td>{format(e.basic)}</td>
              <td>{format(e.hra)}</td>
              <td>{format(e.medical)}</td>
              <td>{format(e.transport)}</td>
              <td>{format(e.special)}</td>
              <td>{format(e.bonus)}</td>
              <td>{format(e.employerPF)}</td>
              <td>{format(e.incentive)}</td>
              <td>{format(e.grossMonthly)}</td>
              <td>{format(e.totalCTC)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className

="summary-row">
            <td colSpan={2}>TOTAL</td>
            <td>{format(summary.basic)}</td>
            <td>{format(summary.hra)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{format(summary.grossMonthly)}</td>
            <td>{format(summary.totalCTC)}</td>
          </tr>
        </tfoot>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              padding: "6px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: page === i + 1 ? "#1e40af" : "white",
              color: page === i + 1 ? "white" : "#111",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Chart (Optional) */}
      <div className

="chart-container">
  <h4>Total CTC per Employee</h4>
  <Bar
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false, // important for compact height
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: { ticks: { font: { size: 10 } } },
        y: { ticks: { font: { size: 10 } } },
      },
    }}
  />
</div>

    </div>
  );
};

export default CTCReport;
