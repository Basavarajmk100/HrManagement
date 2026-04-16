import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/EditPayroll.css";

const EditPayroll = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [payroll, setPayroll] = useState({
    employeeName: "",
    department: "",
    month: "",
    basicSalary: 0,
    hra: 0,
    allowances: 0,
    deductions: 0,
  });

  /* ---------------- FETCH PAYROLL BY ID ---------------- */
  useEffect(() => {
    fetch(`http://localhost:5133/api/payroll/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPayroll({
          employeeName: data.employee.name,
          department: data.employee.department,
          month: data.month,
          basicSalary: data.basicSalary,
          hra: data.hra,
          allowances: data.allowances,
          deductions: data.deductions,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  /* ---------------- CALCULATIONS ---------------- */
  const grossSalary =
    Number(payroll.basicSalary) +
    Number(payroll.hra) +
    Number(payroll.allowances);

  const netSalary = grossSalary - Number(payroll.deductions);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    setPayroll({ ...payroll, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPayroll = {
      month: payroll.month,
      basicSalary: payroll.basicSalary,
      hra: payroll.hra,
      allowances: payroll.allowances,
      deductions: payroll.deductions,
      netSalary,
    };

    await fetch(`http://localhost:5133/api/payroll/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPayroll),
    });

    navigate("/employee-manager/payroll");
  };

  if (loading) return <p>Loading payroll...</p>;

  return (
    <div className

="edit-payroll-container">
      <h2>Edit Payroll</h2>

      <form className

="edit-payroll-card" onSubmit={handleSubmit}>
        <div className

="grid">

          <div>
            <label>Employee Name</label>
            <input value={payroll.employeeName} disabled />
          </div>

          <div>
            <label>Department</label>
            <input value={payroll.department} disabled />
          </div>

          <div>
            <label>Payroll Month</label>
            <input
              type="month"
              name="month"
              value={payroll.month}
              onChange={handleChange}
              required
            />
          </div>

       

          <div>
            <label>Deductions</label>
            <input
              type="number"
              name="deductions"
              value={payroll.deductions}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Gross Salary</label>
            <input value={`₹${grossSalary}`} disabled />
          </div>

          <div>
            <label>Net Salary</label>
            <input value={`₹${netSalary}`} disabled />
          </div>
        </div>

        <div className

="actions">
          <button
            type="button"
            className

="btn cancel"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className

="btn save">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPayroll;
