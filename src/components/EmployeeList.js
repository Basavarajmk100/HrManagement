// src/components/EmployeeList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/EmployeeList.css";
import { useNavigate } from "react-router-dom";

const EmployeeList = ({ onAddClick }) => {
  const [employees, setEmployees] = useState([]);

   const navigate = useNavigate();
  

  // Fetch employees from backend
  useEffect(() => {
    axios
      .get("http://localhost:5133/api/v1/employees") // replace with your backend URL
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  // Delete handler (optional: you can call backend delete API here)
const handleDelete = (id) => {
  // Step 1: Initial confirmation
  if (window.confirm("Are you sure you want to delete this employee?")) {
    // Step 2: Extra security confirmation
    const confirmation = prompt(
      "⚠️ Please type DEL to confirm removing this employee:"
    );

    if (confirmation === "DEL") {
      axios
        .delete(`http://localhost:5133/api/v1/employees/${id}`)
        .then(() => {
          setEmployees((prev) => prev.filter((emp) => emp.id !== id));
          alert("✅ Employee deleted successfully");
        })
        .catch((error) => {
          console.error(
            "Error deleting employee:",
            error.response || error.message
          );
          alert("❌ Failed to delete employee. Try again.");
        });
    } else {
      alert("Deletion cancelled. You did not type DELETE.");
    }
  }
};


  const handleView = (emp) => {
    navigate(`/employees/view/${emp.id}`);
  };

  const handleEdit = (emp) => {
    navigate(`/employees/edit/${emp.id}`);
  };

  return (
    <div className

="employee-container">
      <div className

="employee-header">
        <h2>Employee List</h2>
        <button className

="add-btn" onClick={onAddClick}>
          + Add Employee
        </button>
      </div>

      <table className

="employee-table">
        <thead>
          <tr>
            <th>Employee Code</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Personal Email</th>
            <th>Date of Joining</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employeeCode}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.personalEmail}</td>
                <td>{emp.dateOfJoining}</td>
                <td>{emp.designation}</td>
                <td>{emp.department}</td>
                <td>
                  <div className

="action-buttons">
                    <button className

="view-btn" onClick={() => handleView(emp)}>
                      View
                    </button>
                    <button className

="edit-btn" onClick={() => handleEdit(emp)}>
                      Edit
                    </button>
                    <button className

="delete-btn" onClick={() => handleDelete(emp.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
