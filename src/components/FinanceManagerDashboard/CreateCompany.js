import React, { useState } from "react";

function CreateCompany() {
  const [company, setCompany] = useState({
    companyName: "",
    registerNumber: "",
    gstNumber: "",
    arnNumber: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(company);
    alert("Company details saved successfully!");
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Create Company</h3>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={company.companyName}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="registerNumber"
          placeholder="Register Number"
          value={company.registerNumber}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="gstNumber"
          placeholder="GST Number"
          value={company.gstNumber}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="arnNumber"
          placeholder="ARN Number"
          value={company.arnNumber}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={company.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={company.phone}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={company.address}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>
          Save
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

export default CreateCompany;
