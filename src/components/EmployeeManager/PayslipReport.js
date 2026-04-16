import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../styles/PayslipReport.css";

const PayslipReport = () => {
  const navigate = useNavigate();

  // Mock data
  const mockPayslips = [
    {
      empId: "EMP001",
      name: "Basavaraj",
      month: "January",
      year: 2026,
      basic: 30000,
      hra: 10000,
      allowance: 5000,
      pf: 3600,
      esi: 1200,
      tds: 2000,
      totalDeduction: 6800,
      grossSalary: 45000,
      netSalary: 38200,
    },
    {
      empId: "EMP002",
      name: "Deepak",
      month: "January",
      year: 2026,
      basic: 28000,
      hra: 9000,
      allowance: 4000,
      pf: 3360,
      esi: 1100,
      tds: 1800,
      totalDeduction: 6260,
      grossSalary: 41000,
      netSalary: 34740,
    },
    {
      empId: "EMP003",
      name: "Sagar",
      month: "January",
      year: 2026,
      basic: 32000,
      hra: 12000,
      allowance: 6000,
      pf: 3840,
      esi: 1300,
      tds: 2200,
      totalDeduction: 7340,
      grossSalary: 50000,
      netSalary: 42660,
    },
  ];

  const [payslips] = useState(mockPayslips);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Filter payslips by month and year
  const filteredPayslips = payslips.filter(
    (p) =>
      (month ? p.month === month : true) &&
      (year ? p.year === Number(year) : true)
  );

  // Download individual PDF
  const downloadPayslip = (emp) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("PAYSLIP", 90, 15);

    doc.setFontSize(10);
    doc.text(`Employee Name: ${emp.name}`, 14, 30);
    doc.text(`Employee ID: ${emp.empId}`, 14, 36);
    doc.text(`Month / Year: ${emp.month} ${emp.year}`, 14, 42);

    autoTable(doc, {
      startY: 50,
      head: [["Earnings", "Amount", "Deductions", "Amount"]],
      body: [
        ["Basic", emp.basic, "PF", emp.pf],
        ["HRA", emp.hra, "ESI", emp.esi],
        ["Allowance", emp.allowance, "TDS", emp.tds],
        ["", "", "Total Deduction", emp.totalDeduction],
      ],
    });

    doc.text(`Net Salary: ₹ ${emp.netSalary}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`${emp.name}_Payslip.pdf`);
  };

  // Download all PDFs
const downloadAllPayslips = () => {


    console.log("Filtered Payslips:", filteredPayslips);
  if (!filteredPayslips.length) return;

  const doc = new jsPDF();

  filteredPayslips.forEach((emp, index) => {
    if (index !== 0) doc.addPage();

    doc.setFontSize(14);
    doc.text("PAYSLIP", 90, 15);

    doc.setFontSize(10);
    doc.text(`Employee Name: ${emp.name}`, 14, 30);
    doc.text(`Employee ID: ${emp.empId}`, 14, 36);
    doc.text(`Month / Year: ${emp.month} ${emp.year}`, 14, 42);

    autoTable(doc, {
      startY: 50,
      head: [["Earnings", "Amount", "Deductions", "Amount"]],
      body: [
        ["Basic", emp.basic, "PF", emp.pf],
        ["HRA", emp.hra, "ESI", emp.esi],
        ["Allowance", emp.allowance, "TDS", emp.tds],
        ["", "", "Total Deduction", emp.totalDeduction],
      ],
    });

    doc.text(
      `Net Salary: ₹ ${emp.netSalary}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    
  });

  doc.save(`All_Payslips_${month || "All"}_${year || ""}.pdf`);
};


  // Navigate to details page
  const ViewPayslip = (emp) => {
    navigate(`/employee-manager/ViewPayslip/${emp.empId}`, { state: { emp } });
  };

  return (
    <div className

="payslip-container">


      {/* Company Header */}
  <div className

="payslip-company-header" style={{ textAlign: "center", marginBottom: "15px" }}>
    <h2>KINSOFT TECHNOLOGIES</h2>
    <p style={{ margin: 0, fontSize: "14px" }}>
      Rajahamsa, 831 A, 4th Main 5th Cross, Vijayanagar<br />
      Bengaluru, Karnataka, 560040, India
    </p>
  </div>
      <h2 className

="title">Payslip Report</h2>

      {/* Filters + Download All */}
      <div className

="filters" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <div>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">All Months</option>
            {[
              "January","February","March","April","May","June",
              "July","August","September","October","November","December"
            ].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select value={year} onChange={(e) => setYear(e.target.value)} style={{ marginLeft: "10px" }}>
            <option value="">All Years</option>
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <button className

="download-all-btn" onClick={downloadAllPayslips}>
          Download All
        </button>
      </div>

      {/* Table */}
      <div className

="payslip-table-wrapper">
      <table className

="payslip-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Month</th>
            <th>Gross</th>
            <th>Deductions</th>
            <th>Net Pay</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayslips.length ? (
            filteredPayslips.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.month} {emp.year}</td>
                <td>{emp.grossSalary}</td>
                <td>{emp.totalDeduction}</td>
                <td>{emp.netSalary}</td>
                <td style={{ display: "flex", gap: "5px" }}>
                  <button className

="view-btn" onClick={() => ViewPayslip(emp)}>
                    View
                  </button>
                  <button className

="download-btn" onClick={() => downloadPayslip(emp)}>
                    Download
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default PayslipReport;
