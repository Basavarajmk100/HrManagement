import React, { useState } from "react";
import "../../../styles/PlanManagement.css";
import { MoreVertical } from "lucide-react";

const PlanManagement = ({ isDark, isSimple, isColorful }) => {

  const [plans, setPlans] = useState([
    { id: 1, name: "Basic", price: 999, users: 25 },
    { id: 2, name: "Standard", price: 1999, users: 50 },
    { id: 3, name: "Premium", price: 3999, users: 100 },
  ]);

  const [form, setForm] = useState({ name: "", price: "", users: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setPlans(
        plans.map((plan) =>
          plan.id === editId ? { ...form, id: editId } : plan
        )
      );
      setEditId(null);
    } else {
      setPlans([...plans, { ...form, id: Date.now() }]);
    }

    setForm({ name: "", price: "", users: "" });
  };

  const handleEdit = (plan) => {
    setForm(plan);
    setEditId(plan.id);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div className

="table-panel fade-in">

      {/* Header */}
      <div className

="table-header-row">
        <div>
          <h2 
            className

="table-title"
            style={{ color: isDark ? "#ffffff" : "inherit" }}
          >
            Plan Management
          </h2>
          <p className

="table-subtitle">
            Create, update and manage subscription plans
          </p>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className

="plan-form dashboard-form">
        <input
          type="text"
          name="name"
          placeholder="Plan Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="users"
          placeholder="User Limit"
          value={form.users}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className

="add-btn"
          style={{
            background: isSimple
              ? "rgba(250,133,185,0.1)"
              : isDark
              ? "rgba(255,255,255,0.1)"
              : "linear-gradient(to right, #FA85B9, #C387C2)",
            color: isSimple ? "#FA85B9" : "#fff",
            border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
            boxShadow: isColorful
              ? "0 8px 20px rgba(250,133,185,0.3)"
              : "none"
          }}
        >
          {editId ? "Update Plan" : "Add Plan"}
        </button>
      </form>

      {/* Table */}
      <div className

="table-wrapper custom-scrollbar">
        <table className

="styled-table">
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Price</th>
              <th>User Limit</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {plans.length > 0 ? (
              plans.map((plan) => (
                <tr key={plan.id} className

="table-row tr-card">
                  <td className

="cell-name">{plan.name}</td>

                  <td style={{ color: isDark ? "#ffffff" : "inherit" }}>
                    ₹{plan.price}
                  </td>

                  <td>
                    <div className

="prog-container">
                      <span className

="prog-text">{plan.users} Users</span>
                      <div className

="prog-track">
                        <div
                          className

="prog-fill"
                          style={{
                            width: `${Math.min(plan.users, 100)}%`,
                            background: "#FA85B9"
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td style={{ textAlign: "right" }}>
                    <button
                      className

="more-action-btn"
                      onClick={() => handleEdit(plan)}
                    >
                      Edit
                    </button>

                    <button
                      className

="more-action-btn"
                      onClick={() => handleDelete(plan.id)}
                      style={{ marginLeft: 8 }}
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No plans available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Simple Footer */}
      {isSimple && (
        <div className

="simple-footer">
          <span
            style={{
              fontSize: 11,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-muted)"
            }}
          >
            Showing {plans.length} plans
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            <button className

="btn-outline">Prev</button>
            <button className

="btn-outline">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagement;