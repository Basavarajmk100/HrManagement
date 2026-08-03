import React, { useEffect, useState } from "react";
import "../../styles/HRPayrollForm.css";

const API = "/api";

const daysInMonth = (monthStr) => {
  // monthStr is "YYYY-MM" from <input type="month">
  if (!monthStr) return 30;
  const [y, m] = monthStr.split("-").map(Number);
  return new Date(y, m, 0).getDate(); // day 0 of next month = last day of this month
};

export default function HrPayrollForm() {
  const [employees, setEmployees] = useState([]);
  const [holidays, setHolidays] = useState([]);

  const [showTdsModal, setShowTdsModal] = useState(false);

  const [taxData, setTaxData] = useState({
    annualCTC: "",
    taxRegime: "Old",
    hra: "",
    lta: "",
    section80C: "",
    section80D: "",
    homeLoanInterest: "",
    nps: "",
  });

  const [taxResult, setTaxResult] = useState({
    annualIncome: 0,
    totalDeduction: 0,
    taxableIncome: 0,
    annualTax: 0,
    monthlyTDS: 0,
  });

  const [form, setForm] = useState({
    employeeId: "",
    month: "",

    // Attendance
    salaryCalendarDays: 0,
    paidLeaves: 0,
    generalHolidays: 0,
    presentDays: 0,

    // Earnings
    basicSalary: 0,
    hra: 0,
    allowances: 0, // -> specialAllowance
    overtime: 0, // folded into statBonus on submit
    bonus: 0, // -> statBonus
    otherAllowance: 0, // folded into specialAllowance on submit
    weekendAllowance: 0,
    incentives: 0,

    // Statutory / deductions
    uan: "",
    aadharNumber: "",
    pf: 0,
    pt: 0,
    tds: 0,
    deductions: 0, // catch-all "other" deductions

    remarks: "",
  });

  useEffect(() => {
    fetch(`${API}/EmployeeManager/all`)
      .then((r) => r.json())
      .then(setEmployees);
  }, []);

  useEffect(() => {
    fetch(`${API}/HolidayCalendar`)
      .then((res) => res.json())
      .then((data) => setHolidays(data))
      .catch((err) => console.error(err));
  }, []);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Auto-fill Sal Calendar Days whenever the month changes (still editable after)
  const onMonthChange = (e) => {
    const month = e.target.value;
    setForm((prev) => ({
      ...prev,
      month,
      salaryCalendarDays: daysInMonth(month),
    }));
  };

  // Auto-suggest PF as 12% of Basic whenever Basic changes (still editable after)
  const onBasicChange = (e) => {
    const basicSalary = e.target.value;
    setForm((prev) => ({
      ...prev,
      basicSalary,
      pf: (parseFloat(basicSalary || 0) * 0.12).toFixed(2),
    }));
  };

  const selectedEmployee = employees.find(
    (e) => String(e.id) === String(form.employeeId),
  );

  // ---- Live derived numbers (attendance + totals) ----
  // ===================== ATTENDANCE =====================

  const calendarDays = Number(form.salaryCalendarDays) || 0;
  const paidLeaves = Number(form.paidLeaves) || 0;
  const generalHolidays = Number(form.generalHolidays) || 0;
  const presentDays = Number(form.presentDays) || 0;

  // Working days
  const workingDays = calendarDays - paidLeaves - generalHolidays;

  // LOP Days
  const lopDays = Math.max(workingDays - presentDays, 0);

  // Paid Days
  const payDays = calendarDays - lopDays;

  // ===================== EARNINGS =====================
  const basic = Number(form.basicSalary) || 0;
  const hra = Number(form.hra) || 0;
  const allowances = Number(form.allowances) || 0;
  const weekendAllowance = Number(form.weekendAllowance) || 0;
  const overtime = Number(form.overtime) || 0;
  const bonus = Number(form.bonus) || 0;
  const incentives = Number(form.incentives) || 0;
  const otherAllowance = Number(form.otherAllowance) || 0;

  // Per Day Salary
  const perDaySalary = calendarDays > 0 ? basic / calendarDays : 0;

  // LOP Deduction
  const lopDeduction = perDaySalary * lopDays;

  // Total Earnings
  const totalEarnings =
    basic +
    hra +
    allowances +
    weekendAllowance +
    overtime +
    bonus +
    incentives +
    otherAllowance;

  // ===================== DEDUCTIONS =====================
  const pf = Number(form.pf) || 0;
  const pt = Number(form.pt) || 0;
  const tds = Number(form.tds) || 0;
  const otherDeductions = Number(form.deductions) || 0;

  const totalDeduction = pf + pt + tds + otherDeductions + lopDeduction;

  // ===================== NET =====================
  const netAmount = totalEarnings - totalDeduction;

  const resetForm = () =>
    setForm({
      employeeId: "",
      month: "",
      salaryCalendarDays: 0,
      paidLeaves: 0,
      generalHolidays: 0,
      presentDays: 0,
      basicSalary: 0,
      hra: 0,
      allowances: 0,
      overtime: 0,
      bonus: 0,
      otherAllowance: 0,
      weekendAllowance: 0,
      incentives: 0,
      uan: "",
      aadharNumber: "",
      pf: 0,
      pt: 0,
      tds: 0,
      deductions: 0,
      remarks: "",
    });

  const submit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      alert("Please select an employee");
      return;
    }

    // Payload matches the SAME schema the dashboard reads via
    // GET /api/hrdashboard-payroll, and the SAME endpoint the Excel
    // upload already posts to — so this row shows up in the table
    // without any backend changes.
    const record = {
      empId: selectedEmployee.empId || selectedEmployee.EmpId,
      payrollMonth: form.month,

      name: selectedEmployee.name,
      fatherName: selectedEmployee.fatherName,
      dateOfJoining: selectedEmployee.dateOfJoining,
      dateOfLeaving: selectedEmployee.dateOfLeaving,
      pfNo: selectedEmployee.pfNo,
      esiNo: selectedEmployee.esiNo,
      panNo: selectedEmployee.panNo,
      bankName: selectedEmployee.bankName,
      accountNo: selectedEmployee.accountNo,
      ifsc: selectedEmployee.ifsc,
      designation: selectedEmployee.designation,
      occupation: selectedEmployee.occupation,
      department: selectedEmployee.department,

      salaryCalendarDays: calendarDays,
      paidLeaves,
      generalHolidays,
      payDays,
      presentDays,

      uan: form.uan,
      aadharNumber: form.aadharNumber,

      basic,
      hra,
      allowances,
      weekendAllowance,
      overtime,
      bonus,
      incentives,
      otherAllowance,

      totalEarnings: Number(totalEarnings.toFixed(2)),
      lopDays,
      lopDeduction: Number(lopDeduction.toFixed(2)),
      pf,
      pt,
      tds,
      otherDeductions,
      totalDeduction: Number(totalDeduction.toFixed(2)),
      netAmount: Number(netAmount.toFixed(2)),

      remarks: form.remarks,
    };

    const res = await fetch(`${API}/hrdashboard-payroll/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([record]), // same endpoint as Excel upload expects an array
    });

    if (res.ok) {
      alert("Payroll added for approval");
      resetForm();
    } else {
      const err = await res.text();
      alert("Error adding payroll: " + err);
    }
  };
  const calculateTDS = () => {
    const annualIncome = Number(taxData.annualCTC) || 0;

    const totalDeduction =
      (Number(taxData.section80C) || 0) +
      (Number(taxData.section80D) || 0) +
      (Number(taxData.homeLoanInterest) || 0) +
      (Number(taxData.nps) || 0);

    const taxableIncome = Math.max(annualIncome - totalDeduction, 0);

    let annualTax = 0;

    // Example tax calculation
    if (taxData.taxRegime === "Old") {
      if (taxableIncome <= 250000) {
        annualTax = 0;
      } else if (taxableIncome <= 500000) {
        annualTax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        annualTax = 12500 + (taxableIncome - 500000) * 0.2;
      } else {
        annualTax = 112500 + (taxableIncome - 1000000) * 0.3;
      }
    } else {
      // Simple example for New Regime
      if (taxableIncome <= 300000) {
        annualTax = 0;
      } else {
        annualTax = taxableIncome * 0.1;
      }
    }

    const monthlyTDS = Math.round(annualTax / 12);

    // Update right panel
    setTaxResult({
      annualIncome,
      totalDeduction,
      taxableIncome,
      annualTax: Math.round(annualTax),
      monthlyTDS,
    });

    // Update payroll form
    setForm((prev) => ({
      ...prev,
      tds: monthlyTDS,
    }));
  };

  return (
    <div className="payroll-entry-page">
      <h2 className="payroll-title">HR Payroll Processing</h2>
      <form className="hr-payroll-form-container" onSubmit={submit}>
        {/* ===================== EMPLOYEE ===================== */}
        <div className="hr-form-group">
          <label>Employee</label>
          <select
            name="employeeId"
            value={form.employeeId}
            onChange={onChange}
            required
          >
            <option value="">Select</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.empId || e.EmpId} - {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="hr-form-group">
          <label>Month</label>
          <input
            type="month"
            name="month"
            value={form.month}
            onChange={onMonthChange}
            required
          />
        </div>

        {/* ===================== AUTO-FILLED EMPLOYEE DETAILS ===================== */}
        {selectedEmployee && (
          <div className="hr-form-section hr-readonly-section full-width">
            <h4>Employee Details</h4>
            <div className="hr-readonly-grid">
              <div>
                <span>Father's Name</span>
                <b>{selectedEmployee.fatherName || "-"}</b>
              </div>
              <div>
                <span>Date of Joining</span>
                <b>{selectedEmployee.dateOfJoining?.split("T")[0] || "-"}</b>
              </div>
              <div>
                <span>Date of Leaving</span>
                <b>{selectedEmployee.dateOfLeaving?.split("T")[0] || "-"}</b>
              </div>
              <div>
                <span>PF No</span>
                <b>{selectedEmployee.pfNo || "-"}</b>
              </div>
              <div>
                <span>ESI No</span>
                <b>{selectedEmployee.esiNo || "-"}</b>
              </div>
              <div>
                <span>PAN No</span>
                <b>{selectedEmployee.panNo || "-"}</b>
              </div>
              <div>
                <span>Bank Name</span>
                <b>{selectedEmployee.bankName || "-"}</b>
              </div>
              <div>
                <span>Account No</span>
                <b>{selectedEmployee.accountNo || "-"}</b>
              </div>
              <div>
                <span>IFSC</span>
                <b>{selectedEmployee.ifsc || "-"}</b>
              </div>
              <div>
                <span>Designation</span>
                <b>{selectedEmployee.designation || "-"}</b>
              </div>
              <div>
                <span>Occupation</span>
                <b>{selectedEmployee.occupation || "-"}</b>
              </div>
              <div>
                <span>Department</span>
                <b>{selectedEmployee.department || "-"}</b>
              </div>
            </div>
          </div>
        )}

        {/* ===================== ATTENDANCE (drives LOP) ===================== */}
        <div className="hr-form-section full-width">
          <h4>Attendance</h4>
          <div className="hr-readonly-grid">
            <div className="hr-form-group">
              <label>Sal Calendar Days</label>
              <input
                name="salaryCalendarDays"
                type="number"
                value={form.salaryCalendarDays}
                onChange={onChange}
              />
            </div>

            <div className="hr-form-group">
              <label>paid Leaves</label>
              <input
                name="paidLeaves"
                type="number"
                value={form.paidLeaves}
                onChange={onChange}
              />
            </div>

            <div className="hr-form-group">
              <label>General Holidays</label>
              <input
                name="generalHolidays"
                type="number"
                value={form.generalHolidays}
                onChange={onChange}
              />
            </div>

            <div className="hr-form-group">
              <label>Present Days</label>
              <input
                name="presentDays"
                type="number"
                min="0"
                max={workingDays}
                value={form.presentDays}
                onChange={onChange}
              />
            </div>

            <div className="hr-form-group hr-readonly-field">
              <label>Pay Days</label>
              <input value={payDays} readOnly />
            </div>

            <div className="hr-form-group hr-readonly-field">
              <label>LOP Days</label>
              <input value={lopDays} readOnly />
            </div>
          </div>
        </div>

        {/* ===================== STATUTORY ===================== */}
        <div className="hr-form-group">
          <label>UAN</label>
          <input name="uan" value={form.uan} onChange={onChange} />
        </div>

        <div className="hr-form-group">
          <label>Aadhar Number</label>
          <input
            name="aadharNumber"
            value={form.aadharNumber}
            onChange={onChange}
          />
        </div>

        {/* ===================== EARNINGS ===================== */}
        <div className="hr-form-group">
          <label>Basic Salary</label>
          <input
            name="basicSalary"
            type="number"
            value={form.basicSalary}
            onChange={onBasicChange}
            required
          />
        </div>

        <div className="hr-form-group">
          <label>HRA</label>
          <input
            name="hra"
            type="number"
            value={form.hra}
            onChange={onChange}
          />
        </div>

        <div className="hr-form-group">
          <label>Allowances</label>
          <input
            name="allowances"
            type="number"
            value={form.allowances}
            onChange={onChange}
          />
        </div>

        <div className="hr-form-group">
          <label>Weekend Allowance</label>
          <input
            name="weekendAllowance"
            type="number"
            value={form.weekendAllowance}
            onChange={onChange}
          />
        </div>

        <div className="hr-form-group">
          <label>Overtime</label>
          <input
            name="overtime"
            type="number"
            value={form.overtime}
            onChange={onChange}
          />
        </div>

        <div className="hr-form-group">
          <label>Bonus</label>
          <input
            name="bonus"
            type="number"
            value={form.bonus}
            onChange={onChange}
          />
        </div>

        <div className="hr-form-group">
          <label>Incentives</label>
          <input
            name="incentives"
            type="number"
            value={form.incentives}
            onChange={onChange}
          />
        </div>

        <div className="hr-form-group">
          <label>Other Allowance</label>
          <input
            name="otherAllowance"
            type="number"
            value={form.otherAllowance}
            onChange={onChange}
          />
        </div>

        {/* ===================== DEDUCTIONS ===================== */}
        <div className="hr-form-group">
          <label>PF</label>
          <input name="pf" type="number" value={form.pf} onChange={onChange} />
        </div>

        <div className="hr-form-group">
          <label>PT</label>
          <input name="pt" type="number" value={form.pt} onChange={onChange} />
        </div>
        <div className="hr-form-group">
          <div className="label-with-link">
            <label>TDS</label>
            <button
              type="button"
              className="tds-link"
              onClick={() => setShowTdsModal(true)}
            >
              Calculate TDS
            </button>
          </div>

          <input
            name="tds"
            type="number"
            value={form.tds}
            onChange={onChange}
          />
        </div>

        <div className="hr-form-group">
          <label>Other Deductions</label>
          <input
            name="deductions"
            type="number"
            value={form.deductions}
            onChange={onChange}
          />
        </div>

        <div className="hr-form-group">
          <label>Remarks</label>
          <input name="remarks" value={form.remarks} onChange={onChange} />
        </div>

        {/* ===================== ADDITIONAL ADJUSTMENTS ===================== */}
        <div className="hr-form-section full-width">
          <div className="adjustments-container">
            {/* Left Side */}
            <div className="adjustments-left">
              <h6>Other Deductions</h6>

              <div className="adjustment-row">
                <input
                  type="text"
                  name="deductionLabel1"
                  placeholder="Enter Label"
                  value={form.deductionLabel1 || ""}
                  onChange={onChange}
                  className="label-input"
                />

                <input
                  type="number"
                  name="deductionAmount1"
                  placeholder="Amount"
                  value={form.deductionAmount1 || ""}
                  onChange={onChange}
                />
              </div>

              <div className="adjustment-row">
                <input
                  type="text"
                  name="deductionLabel2"
                  placeholder="Enter Label"
                  value={form.deductionLabel2 || ""}
                  onChange={onChange}
                  className="label-input"
                />

                <input
                  type="number"
                  name="deductionAmount2"
                  placeholder="Amount"
                  value={form.deductionAmount2 || ""}
                  onChange={onChange}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="adjustments-right">
              <h6>Other Allowance</h6>

              <div className="adjustment-row">
                <input
                  type="text"
                  name="buyOutLabel"
                  placeholder="Buy Out"
                  value={form.buyOutLabel || ""}
                  onChange={onChange}
                  className="label-input"
                />

                <input
                  type="number"
                  name="buyOut"
                  placeholder="Amount"
                  value={form.buyOut || ""}
                  onChange={onChange}
                />
              </div>

              <div className="adjustment-row">
                <input
                  type="text"
                  name="allowanceLabel1"
                  placeholder="Enter Label"
                  value={form.allowanceLabel1 || ""}
                  onChange={onChange}
                  className="label-input"
                />

                <input
                  type="number"
                  name="allowanceAmount1"
                  placeholder="Amount"
                  value={form.allowanceAmount1 || ""}
                  onChange={onChange}
                />
              </div>

              <div className="adjustment-row">
                <input
                  type="text"
                  name="allowanceLabel2"
                  placeholder="Enter Label"
                  value={form.allowanceLabel2 || ""}
                  onChange={onChange}
                  className="label-input"
                />

                <input
                  type="number"
                  name="allowanceAmount2"
                  placeholder="Amount"
                  value={form.allowanceAmount2 || ""}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================== LIVE SUMMARY ===================== */}
        <div className="hr-form-section hr-summary-box full-width">
          <h4>Summary (auto-calculated)</h4>
          <div className="hr-readonly-grid">
            <div>
              <span>Total Earnings</span>
              <b>₹ {totalEarnings.toFixed(2)}</b>
            </div>

            <div>
              <span>LOP Deduction</span>
              <b>₹ {lopDeduction.toFixed(2)}</b>
            </div>

            <div>
              <span>Total Deduction</span>
              <b>₹ {totalDeduction.toFixed(2)}</b>
            </div>

            <div>
              <span>Net Amount</span>
              <b>₹ {netAmount.toFixed(2)}</b>
            </div>
          </div>
        </div>

        <button className="hr-submit-btn" type="submit">
          Add Payroll (for approval)
        </button>
      </form>
      \
      {showTdsModal && (
        <div className="tds-modal-overlay">
          <div className="tds-modal">
            {/* YOUR EXISTING CODE STARTS HERE */}

            {/* Left Panel */}
            <div className="tds-left">
              <h2>Income Details</h2>

              {/* Annual CTC */}
              <div className="tds-form-group">
                <label>
                  Annual CTC (₹) <span>*</span>
                </label>
                <input
                  type="number"
                  value={taxData.annualCTC}
                  onChange={(e) =>
                    setTaxData({
                      ...taxData,
                      annualCTC: e.target.value,
                    })
                  }
                />
              </div>

              {/* Tax Regime */}
              <div className="tds-form-group">
                <label>Tax Regime</label>
                <select
                  value={taxData.taxRegime}
                  onChange={(e) =>
                    setTaxData({
                      ...taxData,
                      taxRegime: e.target.value,
                    })
                  }
                >
                  <option value="Old">Old Tax Regime</option>
                  <option value="New">New Tax Regime</option>
                </select>
              </div>

              {/* HRA - Show for Old and New */}
              <div className="tds-form-group">
                <label>HRA (₹)</label>
                <input
                  type="number"
                  placeholder="House Rent Allowance"
                  value={taxData.hra}
                  onChange={(e) =>
                    setTaxData({
                      ...taxData,
                      hra: e.target.value,
                    })
                  }
                />
              </div>

              {/* LTA - Show for Old and New */}
              <div className="tds-form-group">
                <label>LTA (₹)</label>
                <input
                  type="number"
                  placeholder="Leave Travel Allowance"
                  value={taxData.lta}
                  onChange={(e) =>
                    setTaxData({
                      ...taxData,
                      lta: e.target.value,
                    })
                  }
                />
              </div>

              {/* DEDUCTIONS ONLY FOR OLD REGIME */}
              {taxData.taxRegime === "Old" && (
                <>
                  <hr />

                  <h3>Deductions (Old Regime Only)</h3>

                  <div className="tds-form-group">
                    <label>Section 80C (₹) - Max ₹1,50,000</label>
                    <input
                      type="number"
                      placeholder="PPF, ELSS, Life Insurance"
                      value={taxData.section80C}
                      onChange={(e) =>
                        setTaxData({
                          ...taxData,
                          section80C: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="tds-form-group">
                    <label>Section 80D (₹) - Max ₹25,000</label>
                    <input
                      type="number"
                      placeholder="Health Insurance"
                      value={taxData.section80D}
                      onChange={(e) =>
                        setTaxData({
                          ...taxData,
                          section80D: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="tds-form-group">
                    <label>Home Loan Interest (₹)</label>
                    <input
                      type="number"
                      placeholder="Section 24"
                      value={taxData.homeLoanInterest}
                      onChange={(e) =>
                        setTaxData({
                          ...taxData,
                          homeLoanInterest: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="tds-form-group">
                    <label>NPS (₹) - Max ₹50,000</label>
                    <input
                      type="number"
                      placeholder="Section 80CCD(1B)"
                      value={taxData.nps}
                      onChange={(e) =>
                        setTaxData({
                          ...taxData,
                          nps: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              <button className="calculate-btn" onClick={calculateTDS}>
                Calculate TDS
              </button>
            </div>

            {/* Right Panel */}
            <div className="tds-right">
              <h2>Tax Calculation</h2>

              <div className="tax-summary">
                <div className="tax-row">
                  <span>Annual Income</span>
                  <strong>₹ {taxResult.annualIncome}</strong>
                </div>

                <div className="tax-row">
                  <span>Total Deductions</span>
                  <strong>₹ {taxResult.totalDeduction}</strong>
                </div>

                <div className="tax-row">
                  <span>Taxable Income</span>
                  <strong>₹ {taxResult.taxableIncome}</strong>
                </div>

                <div className="tax-row">
                  <span>Annual Tax</span>
                  <strong>₹ {taxResult.annualTax}</strong>
                </div>

                <div className="tax-row monthly">
                  <span>Monthly TDS</span>
                  <strong>₹ {taxResult.monthlyTDS}</strong>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              className="close-modal"
              onClick={() => setShowTdsModal(false)}
            >
              ✕
            </button>

            {/* YOUR EXISTING CODE ENDS HERE */}
          </div>
        </div>
      )}
    </div>
  );
}
