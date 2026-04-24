import React, { useState } from "react";
import "../../styles/InsuranceForm.css";
import { useNavigate } from "react-router-dom";

const InsurancePage = () => {
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    employeeNo: "",
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    healthcareType: "",
    healthcareName: "",
    fathersDob: "",
    mothersDob: "",
    spouseName: "",
    spouseGender: "",
    spouseDob: "",
    child1Name: "",
    child1Gender: "",
    child1Dob: "",
    child2Name: "",
    child2Gender: "",
    child2Dob: "",
    planA: "",
    planAGST: "",
    planB: ""
  });

  const [policyFile, setPolicyFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);

  const theme = localStorage.getItem("theme") || "simple";
  const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  // ================= Handle Input Change =================
  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value
    });
  };

  // ================= Fetch Employee Request =================
  const fetchEmployeeRequest = async (employeeNo) => {

    if (!employeeNo) return;

    try {

      const response = await fetch(
        `http://localhost:5133/api/Insurance/RequestInsurance/${employeeNo}`
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setEmployeeData(prev => ({
        ...prev,
        employeeNo: data.employeeNo || "",
        name: data.name || "",
        email: data.email || "",
        mobile: data.mobile || "",
        gender: data.gender || "",
        dob: data.dob ? data.dob.split("T")[0] : "",
        fathersDob: data.fathersDob ? data.fathersDob.split("T")[0] : "",
        mothersDob: data.mothersDob ? data.mothersDob.split("T")[0] : "",
        spouseName: data.spouseName || "",
        spouseGender: data.spouseGender || "",
        spouseDob: data.spouseDob ? data.spouseDob.split("T")[0] : "",

        child1Name: data.children?.[0]?.name || "",
        child1Gender: data.children?.[0]?.gender || "",
        child1Dob: data.children?.[0]?.dob
          ? data.children[0].dob.split("T")[0]
          : "",

        child2Name: data.children?.[1]?.name || "",
        child2Gender: data.children?.[1]?.gender || "",
        child2Dob: data.children?.[1]?.dob
          ? data.children[1].dob.split("T")[0]
          : ""
      }));

    } catch (error) {
      console.error("Error fetching employee request:", error);
    }
  };

  // ================= File Upload =================
  const handlePolicyUpload = (e) => {
    setPolicyFile(e.target.files[0]);
  };

  const handleExcelUpload = (e) => {
    setExcelFile(e.target.files[0]);
  };

  // ================= Submit Insurance =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(employeeData).forEach((key) => {
      const value = employeeData[key];
      if (value !== "" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    if (policyFile) formData.append("PolicyCopy", policyFile);
    if (excelFile) formData.append("ExcelFile", excelFile);

    try {

      const response = await fetch(
        "http://localhost:5133/api/EmployeeInsurance",
        {
          method: "POST",
          body: formData
        }
      );

      if (response.ok) {
        alert("Employee Insurance Saved Successfully!");
      } else {
        alert("Error saving data");
      }

    } catch (error) 
    {
      console.error("Error:", error);
    }
  };

 return (
  <div className={`insurance-container theme-${theme}`}>

    {/* BACKGROUND EFFECTS */}
    <div className="bg-canvas">
      {(isDark || isColorful) && (
        <>
          <div className="ambient-orb orb-1"></div>
          <div className="ambient-orb orb-2"></div>
          <div className="ambient-orb orb-3"></div>
          <div className="ambient-orb orb-4"></div>
          <div className="bg-glass-layer"></div>
        </>
      )}
    </div>



     

    {/* MAIN PANEL */}
    <div className="table-panel">

       
      {/* HEADER */}
{/* HEADER */}
<div className="table-header-row">

  <button
    className="back-btn"
    onClick={() => window.history.back()}
  >
    ← Back
  </button>

  <div className="header-text">
    <div className="table-title">Employee Insurance Form</div>
    <div className="table-subtitle">
      Add or update employee insurance details
    </div>
  </div>

</div>

      <form onSubmit={handleSubmit} className="insurance-form-grid">

        {/* ================= EMPLOYEE INFO ================= */}
        <div className="form-section">
          <h3>Employee Info</h3>

          <input
            type="text"
            name="employeeNo"
            placeholder="Employee No"
            value={employeeData.employeeNo}
            onChange={(e) => {
              handleChange(e);
              fetchEmployeeRequest(e.target.value);
            }}
          />

          <input name="name" placeholder="Name" value={employeeData.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={employeeData.email} onChange={handleChange} />
          <input name="mobile" placeholder="Mobile" value={employeeData.mobile} onChange={handleChange} />
          <input name="gender" placeholder="Gender" value={employeeData.gender} onChange={handleChange} />
          <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} />
        </div>

        {/* ================= HEALTHCARE ================= */}
        <div className="form-section">
          <h3>Healthcare Details</h3>

          <input name="healthcareType" placeholder="Healthcare Type" value={employeeData.healthcareType} onChange={handleChange} />
          <input name="healthcareName" placeholder="Healthcare Name" value={employeeData.healthcareName} onChange={handleChange} />
          <input type="date" name="fathersDob" value={employeeData.fathersDob} onChange={handleChange} />
          <input type="date" name="mothersDob" value={employeeData.mothersDob} onChange={handleChange} />
        </div>

        {/* ================= SPOUSE ================= */}
        <div className="form-section">
          <h3>Spouse Details</h3>

          <input name="spouseName" placeholder="Spouse Name" value={employeeData.spouseName} onChange={handleChange} />
          <input name="spouseGender" placeholder="Spouse Gender" value={employeeData.spouseGender} onChange={handleChange} />
          <input type="date" name="spouseDob" value={employeeData.spouseDob} onChange={handleChange} />
        </div>

        {/* ================= CHILDREN ================= */}
        <div className="form-section">
          <h3>Children</h3>

          <input name="child1Name" placeholder="Child 1 Name" value={employeeData.child1Name} onChange={handleChange} />
          <input name="child1Gender" placeholder="Child 1 Gender" value={employeeData.child1Gender} onChange={handleChange} />
          <input type="date" name="child1Dob" value={employeeData.child1Dob} onChange={handleChange} />

          <input name="child2Name" placeholder="Child 2 Name" value={employeeData.child2Name} onChange={handleChange} />
          <input name="child2Gender" placeholder="Child 2 Gender" value={employeeData.child2Gender} onChange={handleChange} />
          <input type="date" name="child2Dob" value={employeeData.child2Dob} onChange={handleChange} />
        </div>

        {/* ================= PLANS ================= */}
        <div className="form-section">
          <h3>Plans</h3>

          <input type="number" name="planA" placeholder="Plan A" value={employeeData.planA} onChange={handleChange} />
          <input type="number" name="planAGST" placeholder="Plan A with GST" value={employeeData.planAGST} onChange={handleChange} />
          <input type="number" name="planB" placeholder="Plan B" value={employeeData.planB} onChange={handleChange} />
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="form-actions">

          <input type="file" accept=".pdf,.jpg,.png" onChange={handlePolicyUpload} />

          <input type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} />

          <button type="submit" className="add-btn">
            Save Insurance
          </button>

        </div>

      </form>

    </div>
  </div>
);
};

export default InsurancePage;