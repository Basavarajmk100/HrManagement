import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/AddCompanyPage.css";

const AddCompanyPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    logo:"",
    loginId: "",
    password: "",
    address: "",
    website: "",
    totalEmployees: "",
    subscriptionPlan: "Monthly",
    contactName: "",
    designation: "",
    contactPhone: "",
    contactEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleLogoUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, logo: imageUrl });
  }
};
  const handleAddCompany = (e) => {
    e.preventDefault();

    const newCompany = {
      id: "C" + Math.floor(Math.random() * 1000),
      ...formData,
      users: 0,
      limit: 50,
      total: 0,
      paid: 0,
      status: "Pending",
      createdAt: new Date().toLocaleDateString(),
    };

    console.log("Company created:", newCompany);
    alert("Company login created successfully!");

    navigate("/provider/dashboard");
  };

  return (
    <div className

="add-company-page">
      <h1>Generate Company Login</h1>

      <form onSubmit={handleAddCompany}>



        <div className

="logo-section">

  <div className

="logo-preview">
    {formData.logo ? (
      <img src={formData.logo} alt="logo" />
    ) : (
      <span>Logo</span>
    )}
  </div>

  <div className

="logo-upload">
    <label>Upload Company Logo</label>
    <input type="file" accept="image/*" onChange={handleLogoUpload} />
  </div>

</div>

        <h3>Company Details</h3>

        <div className

="row">
          <div className

="col">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className

="col">
            <label>Login ID:</label>
            <input
              type="text"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              required
            />
          </div>

          <div className

="col">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className

="col">
            <label>Website:</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className

="row">
          <div className

="col">
            <label>Company Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className

="col">
            <label>Total Employees:</label>
            <input
              type="number"
              name="totalEmployees"
              value={formData.totalEmployees}
              onChange={handleChange}
            />
          </div>

          <div className

="col">
            <label>Subscription Plan:</label>
            <select
              name="subscriptionPlan"
              value={formData.subscriptionPlan}
              onChange={handleChange}
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className

="col">
            {/* Empty column just to balance layout */}
          </div>
        </div>

        <hr />

        <h3>Important Person Contact</h3>

        <div className

="row">
          <div className

="col">
            <label>Contact Person Name:</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className

="col">
            <label>Designation:</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>

          <div className

="col">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className

="col">
            <label>Email ID:</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className

="col">
            <label>Contact Number</label>
            <input
              type="contact"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit">Generate Company Login</button>
      </form>
    </div>
  );
};

export default AddCompanyPage;
