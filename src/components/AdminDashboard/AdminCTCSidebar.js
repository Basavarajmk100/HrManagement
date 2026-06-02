import React, { useEffect, useState } from "react";
import "../../styles/AdminCTCSidebar.css";

function AdminCTCSidebar() {
  const [employeeCTCList, setEmployeeCTCList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5133/api/ctc/report")
      .then((response) => response.json())
      .then((result) => setEmployeeCTCList(result))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="ctc-container">
      <h3 className="ctc-title"> Employee CTC Overview</h3>

      {employeeCTCList.length === 0 ? (
        <p className="ctc-empty">No CTC data available</p>
      ) : (
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
      )}
    </div>
  );
}

export default AdminCTCSidebar;
