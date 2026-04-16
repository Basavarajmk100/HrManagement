import React, { useState } from "react";
import "../../styles/Users.css";
import AddUserForm from "../../components/ProviderDashboard/AddUserForm";
import EditUserForm from "../../components/ProviderDashboard/EditUserForm";
import "../../styles/EditUserForm.css";

const Users = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [users, setUsers] = useState([
    { id: 1, name: "Basavaraj", email: "basu@gmail.com", company: "Sunrise Pvt Ltd", role: "Employee", status: "Active" },
    { id: 2, name: "Ravi", email: "ravi@gmail.com", company: "Bright Tech", role: "HR", status: "Active" },
    { id: 3, name: "Anita Sharma", email: "anita@skylinesolutions.com", company: "Skyline Solutions", role: "Manager", status: "Active" },
    { id: 4, name: "Karthik Reddy", email: "karthik@greenleaf.com", company: "GreenLeaf", role: "Admin", status: "Active" },
    { id: 5, name: "Priya Verma", email: "priya@techwave.com", company: "TechWave Pvt Ltd", role: "Employee", status: "Inactive" },
  ]);


 const theme = localStorage.getItem("theme") || "simple";
  const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";


  // Filter
  const filteredUsers = users.filter(
    (u) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.company.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "" || u.role === roleFilter)
  );

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
    setShowEditForm(true);
  };

  return (
  <div className

={`companies-panel theme-${theme}`}>

    
    {/* BACKGROUND EFFECTS */}
    <div className

="bg-canvas">
      {isDark && (
        <>
          <div className

="ambient-orb orb-1"></div>
          <div className

="ambient-orb orb-2"></div>
          <div className

="ambient-orb orb-3"></div>
          <div className

="ambient-orb orb-4"></div>

          <div
            className

="bg-glass-layer"
            style={{
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(100px)"
            }}
          ></div>
        </>
      )}

      {isColorful && (
        <>
          <div className

="ambient-orb orb-1"></div>
          <div className

="ambient-orb orb-2"></div>
          <div className

="ambient-orb orb-3"></div>
          <div className

="ambient-orb orb-4"></div>

          <div className

="bg-glass-layer"></div>
        </>
      )}
    </div>

      {/* ===============================
              USERS DATA TABLE
      =============================== */}
      <div className

="table-panel theme-light">

        {/* Header */}
        <div className

="table-header-row">
          <div>
            <div className

="table-title">Users</div>
            <div className

="table-subtitle">
              Manage all registered users and their roles
            </div>
          </div>

          <button
            className

="add-btn"
            onClick={() => setShowForm(true)}
          >
            + Add User
          </button>
        </div>

        {/* Add Modal */}
        {showForm && (
          <AddUserForm
            closeForm={() => setShowForm(false)}
            users={users}
            setUsers={setUsers}
          />
        )}

        {/* Edit Modal */}
        {showEditForm && editUser && (
          <EditUserForm
            editUser={editUser}
            users={users}
            setUsers={setUsers}
            closeForm={() => setShowEditForm(false)}
          />
        )}

        {/* Table Section */}
        <div className

="table-wrapper">

          {/* Filters */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className

="users-search"
            />

            <select
              className

="role-filter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <table className

="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr className

="table-row" key={u.id}>

                  <td>{u.id}</td>

                  {/* User with Avatar */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div className

="cell-avatar">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className

="cell-name">{u.name}</span>
                        <div className

="cell-id">{u.role}</div>
                      </div>
                    </div>
                  </td>

                  <td>{u.email}</td>
                  <td className

="cell-type">{u.company}</td>
                  <td className

="cell-type">{u.role}</td>

                  {/* Status */}
                  <td>
                    <span
                      className

="status-pill"
                      style={{
                        background:
                          u.status === "Active"
                            ? "rgba(34,197,94,0.2)"
                            : "rgba(239,68,68,0.2)",
                        color:
                          u.status === "Active"
                            ? "#22c55e"
                            : "#ef4444"
                      }}
                    >
                      {u.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <button
                      className

="more-action-btn"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>

                    <button
                      className

="more-action-btn"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Users;