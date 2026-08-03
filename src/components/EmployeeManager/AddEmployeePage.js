import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AddEmployeeForm.css";
import API_URL from "../../config/api";
import { useParams } from "react-router-dom";
const AddEmployeePage = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    father: "",
    doj: "",
    mobileNo: "",
    email: "",
    gender: "",
    maritalStatus: "",
    pfNo: "",
    pan: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    designation: "",
    occupation: "",
    department: "",
    uan: "",
    aadhaar: "",
    panCardPhoto: "",
    aadhaarCardPhoto: "",

    photo: "",
    source: "Form",
    documents: [],
  });

  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchEmployee = async () => {
        try {
          const response = await fetch(`${API_URL}/api/EmployeeManager/${id}`);

          const data = await response.json();

          setEmployee({
            ...data,
            doj: data.doj ? data.doj.substring(0, 10) : "",
            documents: data.documents || [],
          });
        } catch (error) {
          console.log("Fetch employee error", error);
        }
      };

      fetchEmployee();
    }
  }, [id]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setEmployee((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handlePanCardUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setEmployee((prev) => ({
        ...prev,
        panCardPhoto: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleAadhaarCardUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setEmployee((prev) => ({
        ...prev,
        aadhaarCardPhoto: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve({
            fileName: file.name,
            fileType: file.type,
            fileData: reader.result,
          });
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((uploadedFiles) => {
      setEmployee((prev) => ({
        ...prev,
        documents: [...prev.documents, ...uploadedFiles],
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...employee,
        doj: employee.doj ? new Date(employee.doj).toISOString() : null,
      };

      console.log("Submitting employee:", payload);

      const response = await fetch(
        isEditMode
          ? `${API_URL}/api/EmployeeManager/${id}`
          : `${API_URL}/api/EmployeeManager`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(errorText || "Unknown backend error");
      }

      alert(
        isEditMode
          ? "Employee updated successfully!"
          : "Employee added successfully!",
      );

      navigate("/employee-manager");
    } catch (err) {
      console.error("Error adding employee:", err);

      setError(`Error adding employee: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/employee-manager");
  };

  return (
    <div className="add-employee-page">
      <h2>Add New Employee</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="add-employee-form">
        {/* Employee Name */}
        {/* Employee ID */}
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={employee.employeeId}
          onChange={handleChange}
          required
        />

        {/* Employee Name */}
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={employee.name}
          onChange={handleChange}
          required
        />

        {/* Employee Mobile Number */}
        <input
          type="tel"
          name="mobileNo"
          placeholder="Employee Mobile Number"
          value={employee.mobileNo}
          onChange={handleChange}
        />

        {/* Employee Email ID */}
        <input
          type="email"
          name="email"
          placeholder="Employee Email ID"
          value={employee.email}
          onChange={handleChange}
        />

        {/* Father's Name */}
        <input
          type="text"
          name="father"
          placeholder="Father's Name"
          value={employee.father}
          onChange={handleChange}
        />

        {/* Date of Joining */}
        <input
          type="date"
          name="doj"
          value={employee.doj}
          onChange={handleChange}
        />

        {/* PF */}
        <input
          type="text"
          name="pfNo"
          placeholder="PF Number"
          value={employee.pfNo}
          onChange={handleChange}
        />

        {/* PAN */}
        <input
          type="text"
          name="pan"
          placeholder="PAN"
          value={employee.pan}
          onChange={handleChange}
        />

        {/* Bank Name */}
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={employee.bankName}
          onChange={handleChange}
        />

        {/* Account Number */}
        <input
          type="text"
          name="accountNo"
          placeholder="Account Number"
          value={employee.accountNo}
          onChange={handleChange}
        />

        {/* IFSC */}
        <input
          type="text"
          name="ifsc"
          placeholder="IFSC Code"
          value={employee.ifsc}
          onChange={handleChange}
        />

        {/* Designation */}
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
        />

        {/* Occupation */}
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={employee.occupation}
          onChange={handleChange}
        />

        {/* Department */}
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
        />

        {/* UAN */}
        <input
          type="text"
          name="uan"
          placeholder="UAN"
          value={employee.uan}
          onChange={handleChange}
        />

        {/* Aadhaar */}
        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar Number"
          value={employee.aadhaar}
          onChange={handleChange}
        />

        {/* Gender */}
        <select
          name="gender"
          value={employee.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Marital Status */}
        <select
          name="maritalStatus"
          value={employee.maritalStatus}
          onChange={handleChange}
        >
          <option value="">Select Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>

        {/* Photo Upload */}
        <div className="file-upload">
          <label htmlFor="photo">Upload Photo:</label>

          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </div>

        <div className="file-upload">
          <label htmlFor="panCardPhoto">Upload PAN:</label>

          <input
            type="file"
            name="panCardPhoto"
            id="panCardPhoto"
            accept="image/*,.pdf"
            onChange={handlePanCardUpload}
          />

          {/* PAN Preview */}
          {employee.panCardPhoto && (
            <div className="photo-preview">
              {employee.panCardPhoto.startsWith("data:image") ? (
                <img
                  src={employee.panCardPhoto}
                  alt="PAN Card"
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <p>PAN PDF Selected</p>
              )}
            </div>
          )}
        </div>

        <div className="file-upload">
          <label htmlFor="aadhaarCardPhoto">Upload Aadhaar:</label>

          <input
            type="file"
            name="aadhaarCardPhoto"
            id="aadhaarCardPhoto"
            accept="image/*,.pdf"
            onChange={handleAadhaarCardUpload}
          />

          {/* Aadhaar Preview */}
          {employee.aadhaarCardPhoto && (
            <div className="photo-preview">
              {employee.aadhaarCardPhoto.startsWith("data:image") ? (
                <img
                  src={employee.aadhaarCardPhoto}
                  alt="Aadhaar Card"
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <p>Aadhaar PDF Selected</p>
              )}
            </div>
          )}
        </div>

        {/* Photo Preview */}
        {employee.photo && (
          <div className="photo-preview">
            <img
              src={employee.photo}
              alt="Employee Preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
        {/* Employee Documents */}

        <div className="file-upload">
          <label htmlFor="documents">Upload Employee Documents:</label>

          <input
            type="file"
            id="documents"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleDocumentUpload}
          />

          {employee.documents.length > 0 && (
            <div className="document-list">
              <h4>Uploaded Documents</h4>

              {employee.documents.map((doc, index) => (
                <div key={index} className="document-item">
                  <span>{doc.fileName}</span>

                  <button
                    type="button"
                    onClick={() => {
                      setEmployee((prev) => ({
                        ...prev,
                        documents: prev.documents.filter((_, i) => i !== index),
                      }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : isEditMode
                ? "Update Employee"
                : "Add Employee"}
          </button>

          <button type="button" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePage;
