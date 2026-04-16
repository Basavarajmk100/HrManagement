import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import styles from "../../styles/Payroll.module.css"; // Assuming your styles exist

const PayrollReports = () => {
  const [payrollList, setPayrollList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDept, setFilterDept] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch payroll data from backend API
  useEffect(() => {
    fetch("http://localhost:5133/api/hrdashboard-payroll")
      .then((res) => res.json())
      .then((data) => {
        setPayrollList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payroll data:", err);
        setLoading(false);
      });
  }, []);

  // Filter by department
  const filteredData =
    filterDept === "All"
      ? payrollList
      : payrollList.filter((emp) => emp.department === filterDept);

  // Export function
  const exportToExcel = (data, fileName) => {
    if (!data || data.length === 0) return alert("No data to export");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payroll");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer]), `${fileName}.xlsx`);
  };

  // Unique departments for dropdown
  const departments = ["All", ...new Set(payrollList.map((e) => e.department))];

  // Example salary calculation function
  const calculateSalary = (emp) => {
    const totalEarnings =
      (emp.basic || 0) +
      (emp.hra || 0) +
      (emp.specialAllowance || 0) +
      (emp.weekendAllowance || 0) +
      (emp.statBonus || 0) +
      (emp.incentives || 0);

    const pf = emp.pf || 0;
    const pt = emp.pt || 0;
    const tds = emp.tds || 0;
    const totalDeduction = pf + pt + tds;
    const netAmount = totalEarnings - totalDeduction;

    return { totalEarnings, pf, pt, tds, totalDeduction, netAmount };
  };

  if (loading) return <div>Loading Payroll Reports...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payroll Reports</h2>

      {/* Department Filter */}
      <div style={{ marginBottom: "15px" }}>
        <label>Filter by Department: </label>
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Export Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => exportToExcel(filteredData, "Monthly_Payroll_Summary")}
          style={{ marginRight: "10px", padding: "8px 12px" }}
        >
          Export Monthly Payroll Summary
        </button>

        <button
          onClick={() => {
            const incentiveData = filteredData.map((emp) => ({
              empId: emp.empId,
              name: emp.name,
              department: emp.department,
              incentives: emp.incentives,
              payPeriod: emp.payPeriod,
            }));
            exportToExcel(incentiveData, "Incentive_Report");
          }}
          style={{ marginRight: "10px", padding: "8px 12px" }}
        >
          Export Incentive Report
        </button>

        <button
          onClick={() => {
            const deductionData = filteredData.map((emp) => ({
              empId: emp.empId,
              name: emp.name,
              department: emp.department,
              pf: emp.pf,
              pt: emp.pt,
              tds: emp.tds,
              payPeriod: emp.payPeriod,
            }));
            exportToExcel(deductionData, "Deduction_Report");
          }}
          style={{ padding: "8px 12px" }}
        >
          Export Deduction Report
        </button>
      </div>

      {/* Payroll Table */}
      <div className

={styles.payrollTableWrapper}>
        <div className

={styles.tableSection}>
          <h3>Employee Payroll List</h3>
          <table>
            <thead>
              <tr>
                <th>SI No</th>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Father's Name</th>
                <th>Date of Joining</th>
                <th>Date of Leaving</th>
                <th>PF No</th>
                <th>ESI No</th>
                <th>PAN No</th>
                <th>Bank Name</th>
                <th>Account No</th>
                <th>IFSC</th>
                <th>Designation</th>
                <th>Occupation</th>
                <th>Department</th>
                <th>Sal Calendar days</th>
                <th>Weekly off</th>
                <th>General Holidays</th>
                <th>UAN</th>
                <th>Aadhar Number</th>
                <th>Pay Days</th>
                <th>Present days</th>
                <th>Basic</th>
                <th>HRA</th>
                <th>Special Allowance</th>
                <th>Weekend Allowance</th>
                <th>Stat bonus</th>
                <th>Incentives</th>
                <th>Total Earnings</th>
                <th>PF</th>
                <th>PT</th>
                <th>TDS</th>
                <th>Total deduction</th>
                <th>Net amount</th>
                <th>Remarks If any signature</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .filter((emp) => emp.empId)
                .map((emp, idx) => {
                  const salary = calculateSalary(emp);
                  return (
                    <tr
                      key={`emp-${emp.empId}-${idx}`}
                      onClick={() => setSelectedEmployee(emp)}
                      style={{
                        cursor: "pointer",
                        background:
                          selectedEmployee?.empId === emp.empId
                            ? "#eef2ff"
                            : "transparent",
                      }}
                    >
                      <td>{idx + 1}</td>
                      <td>{emp.empId || "-"}</td>
                      <td>{emp.name || "-"}</td>
                      <td>{emp.fatherName || "-"}</td>
                      <td>{emp.dateOfJoining?.split("T")[0] || "-"}</td>
                      <td>{emp.dateOfLeaving?.split("T")[0] || "-"}</td>
                      <td>{emp.pfNo || "-"}</td>
                      <td>{emp.esiNo || "-"}</td>
                      <td>{emp.panNo || "-"}</td>
                      <td>{emp.bankName || "-"}</td>
                      <td>{emp.accountNo || "-"}</td>
                      <td>{emp.ifsc || "-"}</td>
                      <td>{emp.designation || "-"}</td>
                      <td>{emp.occupation || "-"}</td>
                      <td>{emp.department || "-"}</td>
                      <td>{emp.salaryCalendarDays || "-"}</td>
                      <td>{emp.weeklyOff || "-"}</td>
                      <td>{emp.generalHolidays || "-"}</td>
                      <td>{emp.uan || "-"}</td>
                      <td>{emp.aadharNumber || "-"}</td>
                      <td>{emp.payDays || "-"}</td>
                      <td>{emp.presentDays || "-"}</td>
                      <td>{emp.basic || "-"}</td>
                      <td>{emp.hra || "-"}</td>
                      <td>{emp.specialAllowance || "-"}</td>
                      <td>{emp.weekendAllowance || "-"}</td>
                      <td>{emp.statBonus || "-"}</td>
                      <td>{emp.incentives || "-"}</td>
                      <td><b>{salary.totalEarnings || "-"}</b></td>
                      <td>{salary.pf || "-"}</td>
                      <td>{salary.pt || "-"}</td>
                      <td>{salary.tds || "-"}</td>
                      <td>{salary.totalDeduction || "-"}</td>
                      <td><b>{salary.netAmount || "-"}</b></td>
                      <td>{emp.remarks || "-"}</td>
                    </tr>
                  );
                })}

              {/* Excel-only rows */}
              {filteredData.some((emp) => !emp.empId) && (
                <tr>
                  <td
                    colSpan={36}
                    style={{
                      background: "#fef3c7",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    Excel-only Payroll Data
                  </td>
                </tr>
              )}
              {filteredData
                .filter((emp) => !emp.empId)
                .map((emp, idx) => {
                  const salary = calculateSalary(emp);
                  return (
                    <tr key={`excel-${idx}`} style={{ background: "#fff8e1" }}>
                      <td>{idx + 1}</td>
                      <td>{emp.empId || "-"}</td>
                      <td>{emp.name || "-"}</td>
                      <td>{emp.fatherName || "-"}</td>
                      <td>{emp.dateOfJoining?.split("T")[0] || "-"}</td>
                      <td>{emp.dateOfLeaving?.split("T")[0] || "-"}</td>
                      <td>{emp.pfNo || "-"}</td>
                      <td>{emp.esiNo || "-"}</td>
                      <td>{emp.panNo || "-"}</td>
                      <td>{emp.bankName || "-"}</td>
                      <td>{emp.accountNo || "-"}</td>
                      <td>{emp.ifsc || "-"}</td>
                      <td>{emp.designation || "-"}</td>
                      <td>{emp.occupation || "-"}</td>
                      <td>{emp.department || "-"}</td>
                      <td>{emp.salaryCalendarDays || "-"}</td>
                      <td>{emp.weeklyOff || "-"}</td>
                      <td>{emp.generalHolidays || "-"}</td>
                      <td>{emp.uan || "-"}</td>
                      <td>{emp.aadharNumber || "-"}</td>
                      <td>{emp.payDays || "-"}</td>
                      <td>{emp.presentDays || "-"}</td>
                      <td>{emp.basic || "-"}</td>
                      <td>{emp.hra || "-"}</td>
                      <td>{emp.specialAllowance || "-"}</td>
                      <td>{emp.weekendAllowance || "-"}</td>
                      <td>{emp.statBonus || "-"}</td>
                      <td>{emp.incentives || "-"}</td>
                      <td><b>{salary.totalEarnings || "-"}</b></td>
                      <td>{salary.pf || "-"}</td>
                      <td>{salary.pt || "-"}</td>
                      <td>{salary.tds || "-"}</td>
                      <td>{salary.totalDeduction || "-"}</td>
                      <td><b>{salary.netAmount || "-"}</b></td>
                      <td>{emp.remarks || "-"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollReports;
