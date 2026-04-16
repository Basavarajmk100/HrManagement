import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import '../../styles/DownloadBankSheet.css';

const DownloadBankSheet = () => {
  const navigate = useNavigate();
  const [bankSheetData, setBankSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const companyInfo = {
    name: "KINSOFT Technology",
    payrollCycle: "Monthly",
  };

  useEffect(() => {
    const dummyData = [
      { employeeId: "EMP001", employeeName: "Basavaraj", bankName: "SBI", accountNumber: "123456789012", ifscCode: "SBIN0001234", netSalary: 42000, month: "2025-11" },
      { employeeId: "EMP002", employeeName: "Deepak", bankName: "HDFC", accountNumber: "987654321098", ifscCode: "HDFC0000456", netSalary: 56000, month: "2025-12" },
      { employeeId: "EMP003", employeeName: "Varun", bankName: "ICICI", accountNumber: "456789123654", ifscCode: "ICIC0000789", netSalary: 67000, month: "2025-11" },
    ];
    setBankSheetData(dummyData);
    setLoading(false);
  }, []);

  // Filter by month and search term
  const filteredData = bankSheetData.filter(emp => {
    const matchMonth = selectedMonth ? emp.month === selectedMonth : true;
    const matchSearch = searchTerm
      ? emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchMonth && matchSearch;
  });

  const downloadExcel = () => {
    if (!selectedMonth) {
      alert("Please select a month to download the bank sheet.");
      return;
    }
    if (filteredData.length === 0) {
      alert("No records available for the selected month or search.");
      return;
    }

    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, [[`Company: ${companyInfo.name}`]], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(ws, [[`Payroll Month: ${selectedMonth}`]], { origin: "A2" });
    XLSX.utils.sheet_add_aoa(ws, [[]], { origin: "A3" });

    const exportData = filteredData.map(emp => ({
      "Employee ID": emp.employeeId,
      "Employee Name": emp.employeeName,
      "Bank Name": emp.bankName,
      "Account Number": emp.accountNumber,
      "IFSC Code": emp.ifscCode,
      "Net Salary": emp.netSalary,
    }));

    XLSX.utils.sheet_add_json(ws, exportData, { origin: "A4", skipHeader: false });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BankSheet");
    XLSX.writeFile(wb, `BankSheet_${selectedMonth}.xlsx`);
  };

  return (
    <div className

="p-6 max-w-7xl mx-auto">
      <div className

="flex justify-between items-center mb-6">
        <div>
          <h1 className

="text-2xl font-bold text-gray-800">Download Bank Sheet</h1>
          <p className

="text-gray-600 mt-1">{companyInfo.name} | Payroll Cycle: {companyInfo.payrollCycle}</p>
        </div>

        <div className

="flex gap-3">
          <input
            type="text"
            placeholder="Search by Employee Name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className

="border px-3 py-2 rounded-lg"
          />

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className

="border px-3 py-2 rounded-lg"
          >
            <option value="">Select Month</option>
            <option value="2025-01">January 2025</option>
            <option value="2025-02">February 2025</option>
            <option value="2025-03">March 2025</option>
            <option value="2025-04">April 2025</option>
            <option value="2025-05">May 2025</option>
            <option value="2025-06">June 2025</option>
            <option value="2025-07">July 2025</option>
            <option value="2025-08">August 2025</option>
            <option value="2025-09">September 2025</option>
            <option value="2025-10">October 2025</option>
            <option value="2025-11">November 2025</option>
            <option value="2025-12">December 2025</option>
          </select>

          <button onClick={downloadExcel} className

="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Download</button>
          <button onClick={() => navigate("/payroll")} className

="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Back</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length === 0 ? (
        <p className

="text-gray-500">No records found for selected month or search.</p>
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

="p-3 border">Bank Name</th>
                <th className

="p-3 border">Account No</th>
                <th className

="p-3 border">IFSC</th>
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

="p-3 border">{emp.bankName}</td>
                  <td className

="p-3 border">{emp.accountNumber}</td>
                  <td className

="p-3 border">{emp.ifscCode}</td>
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

export default DownloadBankSheet;
