import React, { useEffect, useState } from "react";
import "../../styles/AdminCTCSidebar.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminCTCSidebar() {
  const [employeeCTCList, setEmployeeCTCList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
      <h2 className="ctc-title">Employee CTC Overview</h2>

      {employeeCTCList.length === 0 ? (
        <p className="ctc-empty">No CTC data available</p>
      ) : (
        <div className="ctc-layout">
          {/* LEFT SECTION */}
          <div className="ctc-left">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={employeeCTCList}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="empName" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="totalCTC"
                    fill="#C387C2"
                    radius={[0, 0, 0, 0]}
                    barSize={80}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Employee ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="table-wrapper">
              <table className="ctc-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Annual CTC</th>
                    <th>Appraisal %</th>
                    <th>Appraised On</th>
                  </tr>
                </thead>

                <tbody>
                  {employeeCTCList
                    .filter(
                      (employee) =>
                        employee.empId
                          .toString()
                          .includes(searchTerm.toLowerCase()) ||
                        employee.empName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                    )
                    .map((employee) => (
                      <tr
                        key={employee.empId}
                        onClick={() => setSelectedEmployee(employee)}
                        className={
                          selectedEmployee?.empId === employee.empId
                            ? "selected-row"
                            : ""
                        }
                      >
                        <td>{employee.empId}</td>
                        <td>{employee.empName}</td>
                        <td>₹ {employee.totalCTC}</td>
                        <td>{employee.appraisalPercentage || "-"}</td>
                        <td>
                          {employee.appraisedOn
                            ? new Date(
                                employee.appraisedOn,
                              ).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="comment-section">
              <h3>CTC Change History</h3>

              {selectedEmployee ? (
                <table className="comment-table">
                  <thead>
                    <tr>
                      <th>Previous CTC</th>
                      <th>Current CTC</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>₹ {selectedEmployee.previousCTC || "-"}</td>
                      <td>₹ {selectedEmployee.totalCTC}</td>
                      <td>
                        {selectedEmployee.comment || "No comments available"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Select an employee to view CTC history.</p>
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="ctc-right">
            {selectedEmployee ? (
              <>
                <h3>Employee Details</h3>

                <div className="detail-item">
                  <strong>Employee ID:</strong>
                  <span>{selectedEmployee.empId}</span>
                </div>

                <div className="detail-item">
                  <strong>Name:</strong>
                  <span>{selectedEmployee.empName}</span>
                </div>

                <div className="detail-item">
                  <strong>Annual CTC:</strong>
                  <span>₹ {selectedEmployee.totalCTC}</span>
                </div>

                <div className="detail-item">
                  <strong>Appraisal %:</strong>
                  <span>{selectedEmployee.appraisalPercentage || "-"}</span>
                </div>

                <div className="detail-item">
                  <strong>Appraised On:</strong>
                  <span>
                    {selectedEmployee.appraisedOn
                      ? new Date(
                          selectedEmployee.appraisedOn,
                        ).toLocaleDateString()
                      : "-"}
                  </span>
                </div>

                <div className="detail-item">
                  <strong>Basic:</strong>
                  <span>₹ {selectedEmployee.basic}</span>
                </div>

                <div className="detail-item">
                  <strong>HRA:</strong>
                  <span>₹ {selectedEmployee.hra}</span>
                </div>

                <div className="detail-item">
                  <strong>Medical:</strong>
                  <span>₹ {selectedEmployee.medical}</span>
                </div>

                <div className="detail-item">
                  <strong>Transport:</strong>
                  <span>₹ {selectedEmployee.transport}</span>
                </div>

                <div className="detail-item">
                  <strong>Bonus:</strong>
                  <span>₹ {selectedEmployee.bonus}</span>
                </div>

                <div className="detail-item">
                  <strong>Employer PF:</strong>
                  <span>₹ {selectedEmployee.employerPF}</span>
                </div>

                <div className="detail-item">
                  <strong>Special:</strong>
                  <span>₹ {selectedEmployee.special}</span>
                </div>
              </>
            ) : (
              <div className="empty-details">
                Select an employee from the table to view details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCTCSidebar;
