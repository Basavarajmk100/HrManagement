import React, { useState } from "react";
import "../../styles/IncomeDeclaration.css";

const IncomeDeclaration = () => {

  const [formData, setFormData] = useState({
    employeeNo: "",
    basicSalary: "",
    hra: "",
    otherIncome: "",
    deductions: "",
    declarationAccepted: false
  });



  

  const theme = localStorage.getItem("theme") || "simple";
      const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5133/api/IncomeDeclaration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Income declaration submitted successfully");
      } else {
        alert("Error submitting form");
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className

={`income-container theme-${theme}`}>
      <h2>Income Details & Declaration</h2>

      <form onSubmit={handleSubmit} className

="income-form">


        <label htmlFor="id">ID</label>
      <input
        type="number"
        id="id"
        name="id"
        value={formData.id}
        onChange={handleChange}
      />

        <label>Employee No</label>
        <input
          type="text"
          name="employeeNo"
          value={formData.employeeNo}
          onChange={handleChange}
          required
        />

        <label>Basic Salary</label>
        <input
          type="number"
          name="basicSalary"
          value={formData.basicSalary}
          onChange={handleChange}
        />

        <label>HRA</label>
        <input
          type="number"
          name="hra"
          value={formData.hra}
          onChange={handleChange}
        />

        <label>Other Income</label>
        <input
          type="number"
          name="otherIncome"
          value={formData.otherIncome}
          onChange={handleChange}
        />

        <label>Deductions</label>
        <input
          type="number"
          name="deductions"
          value={formData.deductions}
          onChange={handleChange}
        />

        <div className

="declaration">
          <input
            type="checkbox"
            name="declarationAccepted"
            checked={formData.declarationAccepted}
            onChange={handleChange}
          />
          <span>
            I declare that the above information is true and correct.
          </span>
        </div>

        <button type="submit">Submit Declaration</button>

      </form>
    </div>
  );
};

export default IncomeDeclaration;