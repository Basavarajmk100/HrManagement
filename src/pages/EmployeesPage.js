import React, { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee"; // new component
import ViewEmployee from "../components/ViewEmployee"; // new component

const EmployeesPage = () => {
  const [mode, setMode] = useState("list"); // "list" | "add" | "edit" | "view"
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEmployeeAdded = () => {
    setMode("list");
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      {mode === "list" && (
        <EmployeeList
          key={refreshKey}
          onAddClick={() => setMode("add")}
          onView={(emp) => {
            setSelectedEmployee(emp);
            setMode("view");
          }}
          onEdit={(emp) => {
            setSelectedEmployee(emp);
            setMode("edit");
          }}
        />
      )}

      {mode === "add" && (
        <AddEmployee onAdd={handleEmployeeAdded} onCancel={() => setMode("list")} />
      )}

      {mode === "edit" && selectedEmployee && (
        <EditEmployee employee={selectedEmployee} onCancel={() => setMode("list")} />
      )}

      {mode === "view" && selectedEmployee && (
        <ViewEmployee employee={selectedEmployee} onBack={() => setMode("list")} />
      )}
    </div>
  );
};

export default EmployeesPage;
