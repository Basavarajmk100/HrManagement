import React, { useState } from "react";
import { FaUserTie, FaUserAlt, FaUserFriends } from "react-icons/fa"; // icons
import "../../styles/OrganizationChart.css";

const OrganizationChart = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "CEO", role: "Chief Executive Officer", reportsTo: null },

    { id: 2, name: "Manager A", role: "Manager", reportsTo: 1 },
    { id: 3, name: "Manager B", role: "Manager", reportsTo: 1 },

    // Employees under Manager A
    { id: 4, name: "Basavaraj", role: "Developer", reportsTo: 2 },
    { id: 5, name: "Pavan", role: "Designer", reportsTo: 2 },

    // Employees under Manager B
    { id: 6, name: "Deeapak", role: "Developer", reportsTo: 3 },
    { id: 7, name: "Arun", role: "Designer", reportsTo: 3 },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    reportsTo: 1,
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    role: "",
    reportsTo: null,
  });

  // Add employee
  const addEmployee = () => {
    if (!newEmployee.name || !newEmployee.role) return;
    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
    setNewEmployee({ name: "", role: "", reportsTo: 1 });
  };

  // Delete employee
  const deleteEmployee = (id) => {
    setEmployees(
      employees.filter((emp) => emp.id !== id && emp.reportsTo !== id),
    );
  };

  // Start editing
  const startEditing = (emp) => {
    setEditingId(emp.id);
    setEditData({ name: emp.name, role: emp.role, reportsTo: emp.reportsTo });
  };

  // Save edited employee
  const saveEdit = () => {
    setEmployees(
      employees.map((emp) =>
        emp.id === editingId ? { ...emp, ...editData } : emp,
      ),
    );
    setEditingId(null);
    setEditData({ name: "", role: "", reportsTo: null });
  };

  return (
    <div className="org-container">
      {/* Header */}
      <div className="org-header">
        <h1>📊 Organization Chart</h1>
        <p>Manage and visualize your company structure</p>
      </div>

      {/* Org Tree */}
      <div className="org-tree">
        {employees
          .filter((emp) => emp.reportsTo === null)
          .map((emp) => (
            <OrgNode
              key={emp.id}
              employee={emp}
              employees={employees}
              onEdit={startEditing}
              onDelete={deleteEmployee}
            />
          ))}
      </div>

      {/* Add Employee Form */}
      <div className="org-form">
        <h3>Add Employee</h3>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Role"
          value={newEmployee.role}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, role: e.target.value })
          }
        />
        <select
          value={newEmployee.reportsTo}
          onChange={(e) =>
            setNewEmployee({
              ...newEmployee,
              reportsTo: Number(e.target.value),
            })
          }
        >
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              Reports to: {emp.name}
            </option>
          ))}
        </select>
        <button onClick={addEmployee}>Add</button>
      </div>

      {/* Edit Employee Form */}
      {editingId && (
        <div className="org-form edit-form">
          <h3>Edit Employee</h3>
          <input
            type="text"
            placeholder="Name"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={editData.role}
            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
          />
          <select
            value={editData.reportsTo ?? ""}
            onChange={(e) =>
              setEditData({ ...editData, reportsTo: Number(e.target.value) })
            }
          >
            <option value="">Reports to: None</option>
            {employees
              .filter((emp) => emp.id !== editingId)
              .map((emp) => (
                <option key={emp.id} value={emp.id}>
                  Reports to: {emp.name}
                </option>
              ))}
          </select>
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

// Node Component with Icons + Arrows
const OrgNode = ({ employee, employees, onEdit, onDelete }) => {
  const subordinates = employees.filter((emp) => emp.reportsTo === employee.id);

  // Role-based icons
  const getIcon = (role) => {
    if (role.toLowerCase().includes("chief")) return <FaUserTie size={20} />;
    if (role.toLowerCase().includes("manager")) return <FaUserAlt size={20} />;
    return <FaUserFriends size={20} />;
  };

  return (
    <div className="org-node">
      <div className={`org-card ${employee.role.replace(/\s/g, "")}`}>
        {getIcon(employee.role)}
        <strong>{employee.name}</strong>
        <div className="role">{employee.role}</div>
        <div className="actions">
          <button onClick={() => onEdit(employee)}>✏️ Edit</button>
          {employee.role !== "Chief Executive Officer" && (
            <button onClick={() => onDelete(employee.id)}>🗑 Delete</button>
          )}
        </div>
      </div>

      {subordinates.length > 0 && (
        <div className="org-children">
          {subordinates.map((sub) => (
            <OrgNode
              key={sub.id}
              employee={sub}
              employees={employees}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationChart;
