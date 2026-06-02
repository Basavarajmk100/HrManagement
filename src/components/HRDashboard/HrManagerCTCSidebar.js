import React, { useEffect, useState } from "react";
import "../../styles/HrManagerCTCSidebar.css";

function HrManagerCTCSidebar() {
  const [employeeCTCList, setEmployeeCTCList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedCTC, setEditedCTC] = useState("");

  useEffect(() => {
    fetch("http://localhost:5133/api/ctc/report")
      .then((response) => response.json())
      .then((result) => setEmployeeCTCList(result))
      .catch((error) => console.log(error));
  }, []);

  // Start editing
  const handleEdit = (index, currentCTC) => {
    setEditIndex(index);
    setEditedCTC(currentCTC);
  };

  // Save updated CTC
  const handleSave = (index) => {
    const updatedList = [...employeeCTCList];
    updatedList[index].totalCTC = editedCTC;

    setEmployeeCTCList(updatedList);
    setEditIndex(null);

    // OPTIONAL: send update to backend API
    fetch(`http://localhost:5133/api/ctc/update/${updatedList[index].empId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalCTC: editedCTC }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Updated:", data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="ctc-container">
      <h3 className="ctc-title">
        Employee CTC Details (HR Manager Edit Access)
      </h3>

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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employeeCTCList.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.empId}</td>
                  <td>{employee.empName}</td>

                  <td>
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={editedCTC}
                        onChange={(e) => setEditedCTC(e.target.value)}
                      />
                    ) : (
                      `₹ ${employee.totalCTC}`
                    )}
                  </td>

                  <td>
                    {editIndex === index ? (
                      <button
                        className="save-btn"
                        onClick={() => handleSave(index)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(index, employee.totalCTC)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HrManagerCTCSidebar;
