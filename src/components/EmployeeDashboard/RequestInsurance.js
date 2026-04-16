import React, { useState } from "react";
import "../../styles/RequestInsurance.css";
const RequestInsurance = () => {
  const [formData, setFormData] = useState({
    employeeNo: "",
    name: "",
    email: "",
    mobile: "",
    gender: "",
    maritalStatus: "",
    dob: "",
    age: "",
    fathersDob: "",
    mothersDob: "",
    spouseName: "",
    spouseGender: "",
    spouseDob: "",
    spouseAge: ""
  });

  const [showSpouse, setShowSpouse] = useState(false);

  const [showParents,setShowParents]= useState(false);

  const [children, setChildren] = useState([]);


  const theme = localStorage.getItem("theme") || "simple";

const isSimple = theme === "simple";
const isDark = theme === "dark";
const isColorful = theme === "colorful";

  /* AGE CALCULATION FUNCTION */
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return `${age} years old`; ;
  };

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "dob") {
    const age = calculateAge(value);
    setFormData({ ...formData, dob: value, age });
  }

  else if (name === "fathersDob") {
    const age = calculateAge(value);
    setFormData({ ...formData, fathersDob: value, fatherAge: age });
  }

  else if (name === "mothersDob") {
    const age = calculateAge(value);
    setFormData({ ...formData, mothersDob: value, motherAge: age });
  }



  else if (name === "spouseDob") {
    const age = calculateAge(value);
    setFormData({ ...formData, spouseDob: value, spouseAge: age });
  }

  else {
    setFormData({ ...formData, [name]: value });
  }
};

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;

    const updatedChildren = [...children];

    if (name === "dob") {
      const age = calculateAge(value);
      updatedChildren[index]["dob"] = value;
      updatedChildren[index]["age"] = age;
    } else {
      updatedChildren[index][name] = value;
    }

    setChildren(updatedChildren);
  };

  const addChild = () => {
    setChildren([...children, { name: "", gender: "", dob: "", age: "" }]);
  };

const handleSubmit = async () => {
  const data = { ...formData, children };

  try {
    const response = await fetch("http://localhost:5133/api/Insurance/RequestInsurance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Insurance Request Submitted Successfully!");
      // Optional: reset form
      setFormData({
        employeeNo: "",
        name: "",
        email: "",
        mobile: "",
        gender: "",
        maritalStatus: "",
        dob: "",
        age: "",
        fathersDob: "",
        mothersDob: "",
        spouseName: "",
        spouseGender: "",
        spouseDob: "",
        spouseAge: ""
      });
      setChildren([]);
      setShowSpouse(false);
      setShowParents(false);
    } else {
      alert("Failed to submit request.");
    }
    
  } catch (error) {
    console.error("Error submitting request:", error);
    alert("Error submitting request.");
  }
};

  return (
    <div className

={`employee-insurance-container theme-${theme}`}>

        {/* BACKGROUND EFFECTS */}
    <div className

="bg-canvas">
      {isDark && (
        <>
          <div className

="ambient-orb orb-1"></div>
          <div className

="ambient-orb orb-2"></div>
          <div className

="ambient-orb orb-3"></div>
          <div className

="ambient-orb orb-4"></div>

          <div
            className

="bg-glass-layer"
            style={{
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(30px)"
            }}
          ></div>
        </>
      )}

      {isColorful && (
        <>
          <div className

="ambient-orb orb-1"></div>
          <div className

="ambient-orb orb-2"></div>
          <div className

="ambient-orb orb-3"></div>
          <div className

="ambient-orb orb-4"></div>

          <div className

="bg-glass-layer"></div>
        </>
      )}
    </div>

      <h2>Request Insurance</h2>

      <div className

="insurance-card">

        <h3>Employee Details</h3>

        <input name="employeeNo" placeholder="Employee No" onChange={handleChange}/>
        <input name="name" placeholder="Name" onChange={handleChange}/>
        <input name="email" placeholder="Email" onChange={handleChange}/>
        <input name="mobile" placeholder="Mobile" onChange={handleChange}/>

        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input type="date" name="dob" onChange={handleChange}/>
        <input value={formData.age} placeholder="Age" readOnly />



        <select name="maritalStatus" onChange={handleChange}>
         <option value="">Marital Status</option>
         <option value="Married">Married</option>
         <option value="Unmarried">Unmarried</option>
        </select>

        <hr />

 <h3>Parents</h3>

{!showParents && (
  <button
    className

="add-btn"
    onClick={() => setShowParents(true)}
  >
    + Add Parents
  </button>
)}

{showParents && (
  <>
    <input
      type="date"
      name="fathersDob"
      onChange={handleChange}
    />

    <input
      value={formData.fatherAge}
      placeholder="Father Age"
      readOnly
    />

    <input
      type="date"
      name="mothersDob"
      onChange={handleChange}
    />

    <input
      value={formData.motherAge}
      placeholder="Mother Age"
      readOnly
    />
  </>
)}


        <hr />

        {!showSpouse && (
         <button
            className

="add-btn"
            onClick={() => setShowSpouse(true)}
            disabled={formData.maritalStatus !== "Married"}
          >
  + Add Spouse
</button>
        )}

        {showSpouse && (
          <>
            <h3>Spouse</h3>

            <input name="spouseName" placeholder="Spouse Name" onChange={handleChange}/>

            <select name="spouseGender" onChange={handleChange}>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input type="date" name="spouseDob" onChange={handleChange}/>
            <input value={formData.spouseAge} placeholder="Age" readOnly />

            <hr />
          </>
        )}

        <h3>Children</h3>

        {children.map((child, index) => (
          <div key={index} className

="child-box">
<input
  name="name"
  placeholder="Child Name"
  disabled={formData.maritalStatus !== "Married"}
  onChange={(e) => handleChildChange(index, e)}
/>

            <select
              name="gender"
              onChange={(e) => handleChildChange(index, e)}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              type="date"
              name="dob"
              onChange={(e) => handleChildChange(index, e)}
            />

            <input
              value={child.age || ""}
              placeholder="Age"
              readOnly
            />

          </div>
        ))}

     <button
  className

="add-btn"
  onClick={addChild}
  disabled={formData.maritalStatus !== "Married"}
>
  + Add Child
</button>

        <hr />

        <button className

="download-btn1" onClick={handleSubmit}>
          Submit Request
        </button>

      </div>
    </div>
  );
};

export default RequestInsurance;