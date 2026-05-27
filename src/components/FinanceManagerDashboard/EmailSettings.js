import React, { useState } from "react";

function EmailSettings() {
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setEmailSettings({
      ...emailSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email Settings:", emailSettings);

    alert("Email settings saved successfully!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Email Settings</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="smtpHost"
          placeholder="SMTP Host"
          value={emailSettings.smtpHost}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="smtpPort"
          placeholder="SMTP Port"
          value={emailSettings.smtpPort}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={emailSettings.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={emailSettings.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Save Settings
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    maxWidth: "600px",
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

export default EmailSettings;
