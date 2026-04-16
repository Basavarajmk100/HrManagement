import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import '../../styles/DownloadPayslip.css';

const DownloadPayslip = () => {
  const navigate = useNavigate();
  const [payslipData, setPayslipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy company info
  const companyInfo = {
    name: "KINSOFT Technology",
    payrollCycle: "Monthly",
  };

  // Dummy payslip data
  useEffect(() => {
    const dummyData = [
      {
        employeeId: "EMP001",
        employeeName: "Basavaraj",
        designation: "Software Engineer",
        department: "IT",
        basicSalary: 30000,
        hra: 8000,
        allowances: 4000,
        deductions: 5000,
        netSalary: 37000,
        month: "2025-11",
      },
      {
        employeeId: "EMP002",
        employeeName: "Deepak",
        designation: "QA Engineer",
        department: "IT",
        basicSalary: 35000,
        hra: 9000,
        allowances: 5000,
        deductions: 6000,
        netSalary: 39000,
        month: "2025-12",
      },
      {
        employeeId: "EMP003",
        employeeName: "Varun",
        designation: "HR Executive",
        department: "HR",
        basicSalary: 28000,
        hra: 7000,
        allowances: 3000,
        deductions: 4000,
        netSalary: 32000,
        month: "2025-11",
      },
    ];

    setPayslipData(dummyData);
    setLoading(false);
  }, []);

  // Filter data based on month and search query
  const filteredData = payslipData.filter(emp => {
    const matchesMonth = selectedMonth ? emp.month === selectedMonth : true;
    const matchesSearch =
      emp.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMonth && matchesSearch;
  });

  // Download payslip for filtered employees
  const downloadPayslips = () => {
    if (!selectedMonth) {
      alert("Please select a month to download payslips.");
      return;
    }
    if (filteredData.length === 0) {
      alert("No payslips available for the selected month/search.");
      return;
    }

    const wb = XLSX.utils.book_new();

    filteredData.forEach((emp) => {
      const ws = XLSX.utils.json_to_sheet([]);

      XLSX.utils.sheet_add_aoa(ws, [[`Company: ${companyInfo.name}`]], { origin: "A1" });
      XLSX.utils.sheet_add_aoa(ws, [[`Payroll Month: ${selectedMonth}`]], { origin: "A2" });
      XLSX.utils.sheet_add_aoa(ws, [[`Employee: ${emp.employeeName} (${emp.employeeId})`]], { origin: "A3" });
      XLSX.utils.sheet_add_aoa(ws, [[`Department: ${emp.department} | Designation: ${emp.designation}`]], { origin: "A4" });
      XLSX.utils.sheet_add_aoa(ws, [[]], { origin: "A5" });

      const salaryData = [
        { "Earnings / Deductions": "Basic Salary", Amount: emp.basicSalary },
        { "Earnings / Deductions": "HRA", Amount: emp.hra },
        { "Earnings / Deductions": "Allowances", Amount: emp.allowances },
        { "Earnings / Deductions": "Deductions", Amount: emp.deductions },
        { "Earnings / Deductions": "Net Salary", Amount: emp.netSalary },
      ];

      XLSX.utils.sheet_add_json(ws, salaryData, { origin: "A6", skipHeader: false });

      XLSX.utils.book_append_sheet(wb, ws, `${emp.employeeId}`);
    });

    XLSX.writeFile(wb, `Payslips_${selectedMonth}.xlsx`);
  };

  return (
    <div className

="p-6 max-w-7xl mx-auto">
      <div className

="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h1 className

="text-2xl font-bold text-gray-800">Download Payslips</h1>
          <p className

="text-gray-600 mt-1">
            {companyInfo.name} | Payroll Cycle: {companyInfo.payrollCycle}
          </p>
        </div>

        <div className

="flex-header">
  <select
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
    className

="border px-3 py-2 rounded-lg"
  >
    <option value="">Select Month</option>
    {/* Month options */}
  </select>

  <input
    type="text"
    placeholder="Search by name, ID, dept, designation..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className

="border px-3 py-2 rounded-lg"
  />

  <button
    onClick={downloadPayslips}
    className

="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
  >
    Download Payslips
  </button>

  <button
    onClick={() => navigate("/payroll")}
    className

="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
  >
    Back
  </button>
</div>


      </div>

      {/* Table preview */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length === 0 ? (
        <p className

="text-gray-500">No payslips found for selected month/search.</p>
      ) : (
        <div className

="overflow-x-auto bg-white rounded-xl shadow">
          <table className

="min-w-full border">
            <thead className

="bg-gray-100">
              <tr>
                <th className

="p-3 border">Emp ID</th>
                <th className

="p-3 border">Name</th>
                <th className

="p-3 border">Department</th>
                <th className

="p-3 border">Designation</th>
                <th className

="p-3 border">Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(emp => (
                <tr key={emp.employeeId} className

="hover:bg-gray-50">
                  <td className

="p-3 border">{emp.employeeId}</td>
                  <td className

="p-3 border">{emp.employeeName}</td>
                  <td className

="p-3 border">{emp.department}</td>
                  <td className

="p-3 border">{emp.designation}</td>
                  <td className

="p-3 border font-semibold">₹{emp.netSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DownloadPayslip;
