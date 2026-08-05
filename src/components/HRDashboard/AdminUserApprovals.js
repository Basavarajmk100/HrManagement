import React, { useState, useEffect } from "react";
import "../../styles/AdminUserApprovals.css";

import API_URL from "../../config/api";

function UserApprovals() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Basavaraj",
      email: "basavaraj@gmail.com",
      status: "Pending",
    },
    { id: 2, name: "Deepak", email: "deepak@gmail.com", status: "Pending" },
    { id: 3, name: "Arun", email: "arun@gmail.com", status: "Pending" },
  ]);

  const [showPending, setShowPending] = useState(true);
  const [showApproved, setShowApproved] = useState(true);
  const [showRejected, setShowRejected] = useState(true);

  /*for pop up modal*/
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectRemark, setRejectRemark] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const approveUser = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: "Approved" } : user,
    );
    setUsers(updatedUsers);
  };

  const updateStatus = (id, status) => {
    setStaff((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status } : emp)),
    );
  };

  const openRejectModal = (id) => {
    setSelectedEmployeeId(id);
    setRejectRemark("");
    setShowRejectModal(true);
  };

  const submitReject = () => {
    if (!rejectRemark.trim()) {
      alert("Please enter a rejection remark.");
      return;
    }

    setStaff((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployeeId
          ? {
              ...emp,
              status: "Rejected",
              rejectRemark: rejectRemark,
            }
          : emp,
      ),
    );

    setShowRejectModal(false);
    setRejectRemark("");
    setSelectedEmployeeId(null);
  };

  const filteredStaff = staff.filter((emp) => {
    const status = emp.status || "Pending";

    return (
      (showPending && status === "Pending") ||
      (showApproved && status === "Approved") ||
      (showRejected && status === "Rejected")
    );
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch(`${API_URL}/api/EmployeeManager`);

      if (!response.ok) {
        throw new Error("Failed to fetch staff");
      }

      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-continer">
      {/* MAIN CONTENT */}
      <div className="page-content">
        {/* PAGE CONTENT WRAPPER */}
        <div className="content-wrapper">
          <h5>User Approvals</h5>

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>

                  <td>
                    {user.status === "Pending" && (
                      <button
                        onClick={() => approveUser(user.id)}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              gap: "25px",
              margin: "15px 0",
              alignItems: "center",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={showPending}
                onChange={() => setShowPending(!showPending)}
              />
              Pending
            </label>

            <label>
              <input
                type="checkbox"
                checked={showApproved}
                onChange={() => setShowApproved(!showApproved)}
              />
              Approved
            </label>

            <label>
              <input
                type="checkbox"
                checked={showRejected}
                onChange={() => setShowRejected(!showRejected)}
              />
              Rejected
            </label>
          </div>

          <h5 style={{ marginTop: "30px" }}>Staff Details</h5>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>Photo</th>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Father</th>
                    <th>Mobile No</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Marital Status</th>
                    <th>DOJ</th>
                    <th>PF</th>
                    <th>UAN</th>
                    <th>PAN</th>
                    <th>Aadhaar</th>
                    <th>Designation</th>
                    <th>Occupation</th>
                    <th>Department</th>
                    <th>Bank</th>
                    <th>Account No</th>
                    <th>IFSC</th>
                    <th>PAN Card</th>
                    <th>Aadhaar Card</th>
                    <th>Documents</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStaff.map((emp, index) => (
                    <tr key={emp.id}>
                      <td>{index + 1}</td>

                      <td>
                        <img
                          src={emp.photo || "/default-profile.png"}
                          alt="Profile"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </td>

                      <td>{emp.employeeId}</td>
                      <td>{emp.name}</td>
                      <td>{emp.father}</td>
                      <td>{emp.mobileNo}</td>
                      <td>{emp.email}</td>
                      <td>{emp.gender}</td>
                      <td>{emp.maritalStatus}</td>

                      <td>
                        {emp.doj ? new Date(emp.doj).toLocaleDateString() : ""}
                      </td>

                      <td>{emp.pfNo}</td>
                      <td>{emp.uan}</td>
                      <td>{emp.pan}</td>
                      <td>{emp.aadhaar}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.occupation}</td>
                      <td>{emp.department}</td>
                      <td>{emp.bankName}</td>
                      <td>{emp.accountNo}</td>
                      <td>{emp.ifsc}</td>

                      <td>
                        {emp.panCardPhoto ? (
                          <img
                            src={emp.panCardPhoto}
                            alt="PAN"
                            style={{
                              width: "70px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>
                        {emp.aadhaarCardPhoto ? (
                          <img
                            src={emp.aadhaarCardPhoto}
                            alt="Aadhaar"
                            style={{
                              width: "70px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>
                        {emp.documents && emp.documents.length > 0
                          ? emp.documents.map((doc, i) => (
                              <div key={i}>
                                <a
                                  href={doc.fileData}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {doc.fileName}
                                </a>
                              </div>
                            ))
                          : "-"}
                      </td>

                      <td>
                        <span
                          style={{
                            color:
                              (emp.status || "Pending") === "Approved"
                                ? "green"
                                : (emp.status || "Pending") === "Rejected"
                                  ? "red"
                                  : "orange",
                            fontWeight: "bold",
                          }}
                        >
                          {emp.status || "Pending"}
                        </span>
                      </td>

                      <td>
                        {(emp.status || "Pending") === "Pending" ? (
                          <div className="action-buttons">
                            <button
                              className="approve-btn"
                              onClick={() => updateStatus(emp.id, "Approved")}
                            >
                              Approve
                            </button>

                            <button
                              className="reject-btn"
                              onClick={() => openRejectModal(emp.id)}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showRejectModal && (
        <div className="modal-overlay">
          <div className="reject-modal">
            <h3>Reject Employee</h3>

            <p>Please enter the rejection remark.</p>

            <textarea
              rows="4"
              placeholder="Enter remark..."
              value={rejectRemark}
              onChange={(e) => setRejectRemark(e.target.value)}
            />

            <div className="modal-buttons">
              <button
                className="cancel-btn1"
                onClick={() => setShowRejectModal(false)}
              >
                Cancel
              </button>

              <button className="submit-btn" onClick={submitReject}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserApprovals;
