import React, { useEffect, useState } from "react";
import "../../styles/HrManagerCTCSidebar.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function HrManagerCTCSidebar() {
  const [employeeCTCList, setEmployeeCTCList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5133/api/ctc/report")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEmployeeCTCList(result);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="ctc-container">
      <h2 className="ctc-title">Employee CTC Details (HR Manager View)</h2>

      {loading ? (
        <p className="ctc-empty">Loading CTC data...</p>
      ) : employeeCTCList.length === 0 ? (
        <p className="ctc-empty">No CTC data available</p>
      ) : (
        <>
          {/* ✅ BAR CHART */}
          <div style={{ height: 300, background: "red" }}>TEST CHART AREA</div>

          {/* TABLE */}
          <div className="ctc-card">
            <h3 className="section-title">Employee CTC Table</h3>

            <div className="table-wrapper">
              <table className="ctc-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Annual CTC</th>
                  </tr>
                </thead>

                <tbody>
                  {employeeCTCList.map((employee, index) => (
                    <tr key={index}>
                      <td>{employee.empId}</td>
                      <td>{employee.empName}</td>
                      <td>₹ {employee.totalCTC}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HrManagerCTCSidebar;
