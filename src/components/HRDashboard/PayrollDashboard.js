import "../../styles/PayrollDashboard.css";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

import { FiCheck, FiX, FiEye } from "react-icons/fi"; // already imported
import { useNavigate } from "react-router-dom";
 


const PayrollDashboard = () => {
  
    const navigate = useNavigate();
  // Example data
  const payrollSummary = {
    totalEmployees: 48,
    totalSalary: "₹12,40,000",
    totalDeductions: "₹2,10,000",
    netPayout: "₹10,30,000",
  };

  const payrollList = [
    { id: "EMP001", name: "Basavaraj", department: "IT", net: "₹42,000", status: "Processed" },
    { id: "EMP002", name: "Deepak", department: "HR", net: "₹38,500", status: "Pending" },
    { id: "EMP003", name: "Arun", department: "Finance", net: "₹45,200", status: "Approved" },
    { id: "EMP004", name: "Santosh", department: "Finance", net: "₹45,200", status: "Approved" },
  ];

  const pendingApprovals = [
    { id: 1, name: "Basavaraj", type: "Attendance Approval" },
    { id: 2, name: "Deepak", type: "Overtime Approval" },
    { id: 3, name: "Arun", type: "Payroll Verification" },
    { id: 7, name: "Vikram", type: "Bonus Approval" }

  ];
  

  return (
    <div className

="payroll-dashboard-container">

      {/* HEADER */}
      <h2 className

="payroll-header-title">
        <RiMoneyRupeeCircleFill className

="payroll-icon" />
        Payroll Dashboard
      </h2>

      {/* SUMMARY CARDS */}
      <div className

="summary-cards">
        <div className

="card total-employees">
          <h4>Total Employees</h4>
          <p>{payrollSummary.totalEmployees}</p>
        </div>

        <div className

="card total-salary">
          <h4>Total Salary</h4>
          <p>{payrollSummary.totalSalary}</p>
        </div>

        <div className

="card total-deductions">
          <h4>Total Deductions</h4>
          <p>{payrollSummary.totalDeductions}</p>
        </div>

        <div className

="card net-payout">
          <h4>Net Payout</h4>
          <p>{payrollSummary.netPayout}</p>
        </div>
      </div>


          {/* QUICK ACTIONS */}
      <div className

="actions">
       
        <button 
        className

="btn btn-green"
        onClick={() => navigate("/approve-payroll")}
        >Approve Payroll</button>
    <button
  className

="btn btn-orange"
  onClick={() => navigate("/download-bank-sheet")}
>
  Download Bank Sheet
</button>

<button
  className

="btn btn-black"
  onClick={() => navigate("/download-pay-slip")}
>
  Download Payslips
</button>
      </div>

     
 {/* PENDING APPROVALS - CARD STYLE */}
<div className

="approvals-section">
  <h3>Pending Approvals</h3>
  <div className

="approval-cards">
    {pendingApprovals.map((item) => (
      <div key={item.id} className

="approval-card">
        <div className

="approval-info">
          <span className

="employee-name">{item.name}</span>
          <span className

="approval-type">{item.type}</span>
        </div>
        <div className

="approval-actions">
          <button
            className

="btn-view"
            onClick={() => console.log(`Viewed: ${item.name}`)}
          >
            < FiEye className

="icon" /> View
          </button>
          <button
            className

="btn-approve"
            onClick={() => console.log(`Approved: ${item.name}`)}
          >
            <FiCheck className

="icon" /> Approve
          </button>
          <button
            className

="btn-reject"
            onClick={() => console.log(`Rejected: ${item.name}`)}
          >
            <FiX className

="icon" /> Reject
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default PayrollDashboard;
