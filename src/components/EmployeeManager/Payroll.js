import React, { useState, useEffect } from "react";
import styles from "../../styles/Payroll.module.css";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { BsFileEarmarkExcel } from "react-icons/bs";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,  
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";


const PayrollDashboard = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [payrollList, setPayrollList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate();

  // FETCH EMPLOYEE DATA (GENERAL INFO)
  useEffect(() => {
    fetchPayroll();
  }, []);

const fetchPayroll = async () => {
  try {
    setLoading(true);
    setError("");

    // 1️⃣ Employee master data
    const empRes = await fetch("http://localhost:5133/api/EmployeeManager");
    if (!empRes.ok) throw new Error("Failed to fetch employee data");
    const employees = await empRes.json();

    // 2️⃣ Payroll Excel data
    const payRes = await fetch("http://localhost:5133/api/hrdashboard-payroll");
    if (!payRes.ok) throw new Error("Failed to fetch payroll data");
    const payrollsRaw = await payRes.json();

    // ✅ Normalize EmpId once
    const payrolls = payrollsRaw.map(p => ({
      ...p,
      empId: String(p.empId || p.EmpId)
    }));

    // ✅ Employees first
    const employeeRows = employees.map(emp => {
  const payroll = payrolls.find(
    p => String(p.empId) === String(emp.empId)
  );
  

  return {
     source: "EMPLOYEE",  
    empId: emp.empId,
    name: emp.name,
    fatherName: emp.fatherName,
    dateOfJoining: emp.dateOfJoining,
    dateOfLeaving: emp.dateOfLeaving,
    pfNo: emp.pfNo,
    esiNo: emp.esiNo,
    panNo: emp.panNo,
    bankName: emp.bankName,
    accountNo: emp.accountNo,
    ifsc: emp.ifsc,
    designation: emp.designation,
    occupation: emp.occupation,
    department: emp.department,

    salaryCalendarDays: payroll?.salaryCalendarDays ?? null,
    weeklyOff: payroll?.weeklyOff ?? null,
    generalHolidays: payroll?.generalHolidays ?? null,
    payDays: payroll?.payDays ?? null,
    presentDays: payroll?.presentDays ?? null,

    uan: payroll?.uan ?? "",
    aadharNumber: payroll?.aadharNumber ?? "",

    basic: payroll?.basic ?? null,
    hra: payroll?.hra ?? null,
    specialAllowance: payroll?.specialAllowance ?? null,
    weekendAllowance: payroll?.weekendAllowance ?? null,
    statBonus: payroll?.statBonus ?? null,
    incentives: payroll?.incentives ?? null,

    totalEarnings: payroll?.totalEarnings ?? null,
    pf: payroll?.pf ?? null,
    pt: payroll?.pt ?? null,
    tds: payroll?.tds ?? null,
    totalDeduction: payroll?.totalDeduction ?? null,
    netAmount: payroll?.netAmount ?? null,

    payrollMonth: payroll?.payrollMonth ?? "",
    remarks: payroll?.remarks ?? ""
  };
});




// ✅ Excel-only rows (PURE Excel data)
const excelOnlyRows = payrolls
  .filter(p =>
    !employees.some(
      e => String(e.empId) === String(p.empId)
    )
  )
  .map(p => ({
    source: "EXCEL",     // ✅ ADD THIS
    empId: p.empId ?? "",
    name: p.name ?? "",
    fatherName: p.fatherName ?? "-",
    dateOfJoining: p.dateOfJoining ?? "-",
    dateOfLeaving: p.dateOfLeaving ?? "-",

    pfNo: p.pfNo ?? "-",
    esiNo: p.esiNo ?? "-",
    panNo: p.panNo ?? "-",
    bankName: p.bankName ?? "-",
    accountNo: p.accountNo ?? "-",
    ifsc: p.ifsc ?? "-",

    designation: p.designation ?? "-",
    occupation: p.occupation ?? "-",
    department: p.department ?? "-",

    salaryCalendarDays: p.salaryCalendarDays ?? null,
    weeklyOff: p.weeklyOff ?? null,
    generalHolidays: p.generalHolidays ?? null,
    payDays: p.payDays ?? null,
    presentDays: p.presentDays ?? null,

    uan: p.uan ?? "",
    aadharNumber: p.aadharNumber ?? "",

    basic: p.basic ?? null,
    hra: p.hra ?? null,
    specialAllowance: p.specialAllowance ?? null,
    weekendAllowance: p.weekendAllowance ?? null,
    statBonus: p.statBonus ?? null,
    incentives: p.incentives ?? null,

    totalEarnings: p.totalEarnings ?? null,
    pf: p.pf ?? null,
    pt: p.pt ?? null,
    tds: p.tds ?? null,
    totalDeduction: p.totalDeduction ?? null,
    netAmount: p.netAmount ?? null,

    payrollMonth: p.payrollMonth ?? "",
    remarks: p.remarks ?? ""
  }));


    // ✅ Final ordered list
setPayrollList([...employeeRows, ...excelOnlyRows]);


  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  


  /* ===================== EXCEL UPLOAD ===================== */



  const handleExcelUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

const rawData = XLSX.utils.sheet_to_json(worksheet, {
  range: 2,     // headers are in row 3
  defval: ""
});

console.log(rawData[0]); // MUST be an OBJECT




      if (rawData.length === 0) {
        alert("Excel file is empty ❌");
        return;
      }
      console.log(rawData[0]);


      // Map Excel rows to API model
   const mappedData = rawData.map((row, index) => {
  const empId = String(row["EmpId"] || "").trim();
const payrollMonth = String(row["PayrollMonth"] || selectedMonth || "").trim();


  if (!empId || !payrollMonth) {
    console.warn(`Skipping row ${index + 1}`, row);
    return null;
  }

  const parseExcelDate = (val) => {
    if (!val) return null;
    if (typeof val === "number") {
      const d = XLSX.SSF.parse_date_code(val);
      return d ? new Date(d.y, d.m - 1, d.d).toISOString() : null;
    }
    return new Date(val).toISOString();
  };

  return {
    empId,
    payrollMonth,

    name: row["Name"] || "",
    fatherName: row["FatherName"] || "",

    dateOfJoining: parseExcelDate(row["DateofJoining"]),
    dateOfLeaving: parseExcelDate(row["DateofLeaving"]),

    pfNo: row["PfNo"] || "",
    esiNo: row["EsiNo"] || "",
    panNo: row["PanNo"] || "",

    bankName: row["BankName"] || "",
    accountNo: String(row["AccountNo"] || ""),
    ifsc: row["Ifsc"] || "",

    designation: row["Designation"] || "",
    occupation: row["Occupation"] || "",
    department: row["Department"] || "",

    salaryCalendarDays: Number(row["SalaryCalendarDays"] || 0),
    weeklyOff: Number(row["WeeklyOff"] || 0),
    generalHolidays: Number(row["GeneralHolidays"] || 0),

    uan: String(row["UAN"] || ""),
    aadharNumber: String(row["AadharNumber"] || ""),

    payDays: Number(row["PayDays"] || 0),
    presentDays: Number(row["PresentDays"] || 0),

    basic: Number(row["Basic"] || 0),
    hra: Number(row["Hra"] || 0),
    specialAllowance: Number(row["SpecialAllowance"] || 0),
    weekendAllowance: Number(row["WeekendAllowance"] || 0),
    statBonus: Number(row["StatBonus"] || 0),
    incentives: Number(row["Incentives"] || 0),

    totalEarnings: Number(row["TotalEarnings"] || 0),
    pf: Number(row["Pf"] || 0),
    pt: Number(row["Pt"] || 0),
    tds: Number(row["Tds"] || 0),
    totalDeduction: Number(row["TotalDeduction"] || 0),
    netAmount: Number(row["NetAmount"] || 0),

   remarks: row["Remarks"] || row["Remarks "] || ""

  };
}).filter(Boolean);


      if (mappedData.length === 0) {
        alert("No valid rows to upload ❌");
        return;
      }

      // Send to backend
      const response = await fetch("http://localhost:5133/api/hrdashboard-payroll/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mappedData),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      alert("Payroll Excel uploaded successfully ✅");
      fetchPayroll(); // refresh list
      e.target.value = "";
    };

    reader.readAsBinaryString(file);
  } catch (error) {
    console.error(error);
    alert("Error uploading Excel ❌");
  }
};


const calculateSalary = (emp) => {
  if (emp.totalEarnings != null && emp.netAmount != null) {
    return {
      totalEarnings: emp.totalEarnings,
      pf: emp.pf,
      pt: emp.pt,
      tds: emp.tds,
      totalDeduction: emp.totalDeduction,
      netAmount: emp.netAmount,
    };
  }

  const basic = Number(emp.basic || 0);
  const hra = Number(emp.hra || 0);
  const special = Number(emp.specialAllowance || 0);

  const calendarDays = Number(emp.salaryCalendarDays || 30);
  const payDays = Number(emp.payDays || 0);

  const earned = ((basic + hra + special) / calendarDays) * payDays;
  const pf = basic * 0.12;
  const pt = 200;
  const tds = 0;

  const totalDeduction = pf + pt + tds;

  return {
    totalEarnings: earned.toFixed(2),
    pf: pf.toFixed(2),
    pt,
    tds,
    totalDeduction: totalDeduction.toFixed(2),
    netAmount: (earned - totalDeduction).toFixed(2),
  };
};

  // FILTER LOGIC
  const filteredPayroll = payrollList.filter((emp) => {
    const employeeName = emp.name?.toLowerCase() || "";
    const employeeId = emp.empId?.toString() || "";

    return (
      (search === "" ||
        employeeName.includes(search.toLowerCase()) ||
        employeeId.includes(search.toLowerCase())) &&
      (department === "" || emp.department === department)
    );
  });

  // EXPORT TO EXCEL
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPayroll);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, "Payroll.xlsx");
  };


const monthlyDeductionData = () => {
  const monthMap = {};

  payrollList.forEach(emp => {
    if (!emp.payrollMonth) return;
    if (selectedMonth && emp.payrollMonth !== selectedMonth) return;

    if (!monthMap[emp.payrollMonth]) {
      monthMap[emp.payrollMonth] = {
        month: emp.payrollMonth,
        pf: 0,
        pt: 0,
        tds: 0
      };
    }

    monthMap[emp.payrollMonth].pf += Number(emp.pf || 0);
    monthMap[emp.payrollMonth].pt += Number(emp.pt || 0);
    monthMap[emp.payrollMonth].tds += Number(emp.tds || 0);
  });

  return Object.values(monthMap);
};





const employeeDeductionData = selectedEmployee
  ? [
      { name: "PF", value: selectedEmployee.pf || 0 },
      { name: "PT", value: selectedEmployee.pt || 0 },
      { name: "TDS", value: selectedEmployee.tds || 0 },

     ]
  : [];

  if (loading) return <p>Loading payroll data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className

={styles.payrollDashboardContainer}>
      {/* HEADER */}
      <h2 className

="payroll-header-title">
        <RiMoneyRupeeCircleFill className

="payroll-icon" />
        Payroll
      </h2>


      
      
 {/* ================= GRAPH FILTER ================= */}
<div style={{ margin: "20px 0", display: "flex", alignItems: "center", gap: "10px" }}>
  <label style={{ fontWeight: 500 }}>Payroll Month:</label>
  <select
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
    style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #ccc" }}
  >
    <option value="">All Months</option>
    {[...new Set(
      payrollList
        .map((p) => p.payrollMonth)
        .filter((month) => month) // remove null/undefined
    )]
      .sort((a, b) => {
        const monthOrder = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthOrder.indexOf(a) - monthOrder.indexOf(b);
      })
      .map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
  </select>
</div>

{/* ================= MONTHLY BAR CHART ================= */}
<h3 style={{ marginTop: "20px", marginBottom: "10px", color: "#1e3a8a" }}>
  Monthly Total Deductions Breakdown
</h3>
<ResponsiveContainer width="100%" height={400}>
  <BarChart data={monthlyDeductionData()} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#4b5563" }} />
    <YAxis tick={{ fontSize: 12, fill: "#4b5563" }} />
    <Tooltip
      formatter={(value, name) => [value, name]}
      labelFormatter={(label) => `Month: ${label}`}
      contentStyle={{ borderRadius: "8px", border: "none", backgroundColor: "#f3f4f6", padding: "10px" }}
    />
    <Legend verticalAlign="top" height={36} />
    <Bar
      dataKey="pf"
      stackId="a"
      fill="#ef4444"
      radius={[8, 8, 0, 0]}
      name="PF"
      animationDuration={800}
    />
    <Bar
      dataKey="pt"
      stackId="a"
      fill="#f59e0b"
      radius={[8, 8, 0, 0]}
      name="PT"
      animationDuration={800}
    />
    <Bar
      dataKey="tds"
      stackId="a"
      fill="#3b82f6"
      radius={[8, 8, 0, 0]}
      name="TDS"
      animationDuration={800}
    />
  </BarChart>
</ResponsiveContainer>

{/* ================= INDIVIDUAL PIE CHART ================= */}
{selectedEmployee && (
  <>
    <h3 style={{ marginTop: "30px", color: "#1e3a8a" }}>
      Deduction Breakdown – {selectedEmployee.name}
    </h3>

    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={employeeDeductionData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          innerRadius={60}
          paddingAngle={3}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          animationDuration={800}
        >
          {employeeDeductionData.map((entry, index) => (
            <Cell
              key={index}
              fill={["#ef4444", "#f59e0b", "#3b82f6"][index]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`₹${value}`, name]}
          contentStyle={{ borderRadius: "8px", border: "none", backgroundColor: "#f3f4f6", padding: "10px" }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  </>
)}


      {/* ACTION BAR */}
      <div className

="button-row">
        <button
          className

="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          Search Filters {showFilters ? <HiChevronUp /> : <HiChevronDown />}
        </button>

      

        <div className

="right-actions">



          {/* UPLOAD EXCEL */}
 <label className

={styles.uploadBtn}>
  <BsFileEarmarkExcel />
  Upload Excel
  <input
    type="file"
    accept=".xlsx,.xls"
    hidden
    onChange={handleExcelUpload}
  />
</label>




          <button
            className

="add-btn"
            onClick={() => navigate("/employee-manager/addPayroll")}
          >
            + Add Payroll
          </button>
          <button className

="export-btn" onClick={exportToExcel}>
            <BsFileEarmarkExcel /> Export Excel
          </button>
        </div>
      </div>

{/* FILTER PANEL */}
<div className

="payroll-filter-row">
  <input
    type="text"
    placeholder="Search by Employee ID or Name"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
  >
    <option value="">All Departments</option>
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Finance">Finance</option>
    <option value="Sales">Sales</option>
  </select>

  <button
    onClick={() => {
      setSearch("");
      setDepartment("");
    }}
  >
    Clear
  </button>
</div>







      {/* TABLE */}
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

                {/* Payroll (future) */}
              <th>Sal Calendar days</th>
              <th>Weakly off</th>
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
  {/* Employee Rows */}
  {payrollList
    .filter(emp => emp.empId) // Only employees with master EmpId
    .map((emp, idx) => {
      const salary = calculateSalary(emp);
      return (
        <tr
          key={`emp-${emp.empId}-${idx}`}
          onClick={() => setSelectedEmployee(emp)}
          style={{
            cursor: "pointer",
            background: selectedEmployee?.empId === emp.empId ? "#eef2ff" : "transparent",
          }}
        >
          <td>{idx + 1}</td>
          <td>{emp.empId || "-"}</td>
          <td>{emp.name || "-"}</td>
          <td>{emp.fatherName || "-"}</td>
          <td>{emp.dateOfJoining ? emp.dateOfJoining.split("T")[0] : "-"}</td>
          <td>{emp.dateOfLeaving ? emp.dateOfLeaving.split("T")[0] : "-"}</td>
          <td>{emp.pfNo || "-"}</td>
          <td>{emp.esiNo || "-"}</td>
          <td>{emp.panNo || "-"}</td>
          <td>{emp.bankName || "-"}</td>
          <td>{emp.accountNo || "-"}</td>
          <td>{emp.ifsc || "-"}</td>
          <td>{emp.designation || "-"}</td>
          <td>{emp.occupation || "-"}</td>
          <td>{emp.department || "-"}</td>
          <td>{emp.salaryCalendarDays !== "" ? emp.salaryCalendarDays : "-"}</td>
          <td>{emp.weeklyOff !== "" ? emp.weeklyOff : "-"}</td>
          <td>{emp.generalHolidays !== "" ? emp.generalHolidays : "-"}</td>
          <td>{emp.uan || "-"}</td>
          <td>{emp.aadharNumber || "-"}</td>
          <td>{emp.payDays !== "" ? emp.payDays : "-"}</td>
          <td>{emp.presentDays !== "" ? emp.presentDays : "-"}</td>
          <td>{emp.basic !== "" ? emp.basic : "-"}</td>
          <td>{emp.hra !== "" ? emp.hra : "-"}</td>
          <td>{emp.specialAllowance !== "" ? emp.specialAllowance : "-"}</td>
          <td>{emp.weekendAllowance !== "" ? emp.weekendAllowance : "-"}</td>
          <td>{emp.statBonus !== "" ? emp.statBonus : "-"}</td>
          <td>{emp.incentives !== "" ? emp.incentives : "-"}</td>
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

  {/* Excel-only Rows */}
  {payrollList.some(emp => !emp.empId) && (
    <tr>
      <td colSpan={36} style={{ background: "#fef3c7", textAlign: "center", fontWeight: 600 }}>
        Excel-only Payroll Data
      </td>
    </tr>
  )}
  {payrollList
    .filter(emp => !emp.empId) // Only Excel rows without master EmpId
    .map((emp, idx) => {
      const salary = calculateSalary(emp);
      return (
        <tr
          key={`excel-${idx}`}
          style={{ background: "#fff8e1" }}
        >
          <td>{idx + 1}</td>
          <td>{emp.empId || "-"}</td>
          <td>{emp.name || "-"}</td>
          <td>{emp.fatherName || "-"}</td>
          <td>{emp.dateOfJoining ? emp.dateOfJoining.split("T")[0] : "-"}</td>
          <td>{emp.dateOfLeaving ? emp.dateOfLeaving.split("T")[0] : "-"}</td>
          <td>{emp.pfNo || "-"}</td>
          <td>{emp.esiNo || "-"}</td>
          <td>{emp.panNo || "-"}</td>
          <td>{emp.bankName || "-"}</td>
          <td>{emp.accountNo || "-"}</td>
          <td>{emp.ifsc || "-"}</td>
          <td>{emp.designation || "-"}</td>
          <td>{emp.occupation || "-"}</td>
          <td>{emp.department || "-"}</td>
          <td>{emp.salaryCalendarDays !== "" ? emp.salaryCalendarDays : "-"}</td>
          <td>{emp.weeklyOff !== "" ? emp.weeklyOff : "-"}</td>
          <td>{emp.generalHolidays !== "" ? emp.generalHolidays : "-"}</td>
          <td>{emp.uan || "-"}</td>
          <td>{emp.aadharNumber || "-"}</td>
          <td>{emp.payDays !== "" ? emp.payDays : "-"}</td>
          <td>{emp.presentDays !== "" ? emp.presentDays : "-"}</td>
          <td>{emp.basic !== "" ? emp.basic : "-"}</td>
          <td>{emp.hra !== "" ? emp.hra : "-"}</td>
          <td>{emp.specialAllowance !== "" ? emp.specialAllowance : "-"}</td>
          <td>{emp.weekendAllowance !== "" ? emp.weekendAllowance : "-"}</td>
          <td>{emp.statBonus !== "" ? emp.statBonus : "-"}</td>
          <td>{emp.incentives !== "" ? emp.incentives : "-"}</td>
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

export default PayrollDashboard;
