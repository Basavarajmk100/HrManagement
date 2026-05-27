import React, { useState } from "react";

function CreateVendors() {
  const [vendor, setVendor] = useState({
    vendorName: "",
    companyName: "",
    gstNumber: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Vendor Details:", vendor);

    alert("Vendor created successfully!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Vendor</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="vendorName"
          placeholder="Vendor Name"
          value={vendor.vendorName}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={vendor.companyName}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="gstNumber"
          placeholder="GST Number"
          value={vendor.gstNumber}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={vendor.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={vendor.phone}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={vendor.address}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>
          Save Vendor
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    maxWidth: "700px",
    margin: "20px auto",
    padding: "25px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    width: "100%",
    boxSizing: "border-box",
  },

  textarea: {
    gridColumn: "1 / 3",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    minHeight: "80px",
    resize: "none",
    fontSize: "15px",
    width: "100%",
    boxSizing: "border-box",
  },

  button: {
    gridColumn: "1 / 3",
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default CreateVendors;
