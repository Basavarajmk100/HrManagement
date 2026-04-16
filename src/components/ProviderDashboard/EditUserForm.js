import React, { useState } from "react";

const EditUserForm = ({ editUser, users, setUsers, closeForm }) => {
  const [formData, setFormData] = useState(editUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const updated = users.map((u) =>
      u.id === formData.id ? formData : u
    );
    setUsers(updated);
    closeForm();
  };

  return (
    <div className

="modal-overlay">
      <div className

="modal-box">
        <h3>Edit User</h3>

        <input name="name" value={formData.name} onChange={handleChange} />
        <input name="email" value={formData.email} onChange={handleChange} />
        <input name="company" value={formData.company} onChange={handleChange} />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option>Admin</option>
          <option>HR</option>
          <option>Manager</option>
          <option>Employee</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
<div className

="form-buttons">
  <button className

="update-btn" onClick={handleUpdate}>
    Update
  </button>
  <button className

="cancel-btn" onClick={closeForm}>
    Cancel
  </button>
</div>

      </div>
    </div>
  );
};

export default EditUserForm;
