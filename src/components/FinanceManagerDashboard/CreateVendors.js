import React, { useState } from "react";

const CreateVendors = () => {
  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vendor Created:", vendor);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Vendor</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          value={vendor.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Vendor Email"
          value={vendor.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={vendor.mobile}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={vendor.address}
          onChange={handleChange}
        />

        <button type="submit">Save Vendor</button>
      </form>
    </div>
  );
};

export default CreateVendors;
