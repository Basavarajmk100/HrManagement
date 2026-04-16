import React, { useState } from "react";
  import "../../styles/AdminUserApprovals.css";

function UserApprovals() {

  const [users, setUsers] = useState([
    { id: 1, name: "Basavaraj", email: "basavaraj@gmail.com", status: "Pending" },
    { id: 2, name: "Deepak", email: "deepak@gmail.com", status: "Pending" },
    { id: 3, name: "Arun", email: "arun@gmail.com", status: "Pending" }
  ]);

  const approveUser = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, status: "Approved" } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className

="dashboard-container">
      <h2>User Approvals</h2>

      <table className

="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>

              <td>
                {user.status === "Pending" && (
                  <button 
                    onClick={() => approveUser(user.id)}
                    className

="approve-btn"
                  >
                    Approve
                  </button>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserApprovals;