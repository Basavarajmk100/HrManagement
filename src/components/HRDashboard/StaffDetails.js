import React, { useState } from "react";
import "../../styles/StaffDetails.css";

const employeesData = [
  {
    id: 1,
    name: "Basavaraj",
    email: "basavaraj@gmail.com",
    mobile: "9876543210",
    department: "IT",
    role: "Software Developer",
    manager: "Kiran",
    location: "Bangalore",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "12-03-2023",
    ctc: "₹5,00,000",
    insurance: "Plan A",
    salaryPaid: "₹3,50,000",
    leaves: 5,
  },
  {
    id: 2,
    name: "Deepak",
    email: "deepak@gmail.com",
    mobile: "9123456780",
    department: "HR",
    role: "HR Manager",
    manager: "Sneha",
    location: "Bangalore",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "01-06-2022",
    ctc: "₹6,20,000",
    insurance: "Plan B",
    salaryPaid: "₹4,20,000",
    leaves: 3,
  },
  {
    id: 3,
    name: "Varun",
    email: "varun@gmail.com",
    mobile: "9988776655",
    department: "IT",
    role: "Frontend Developer",
    manager: "Basavaraj",
    location: "Hyderabad",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "15-01-2024",
    ctc: "₹4,80,000",
    insurance: "Plan A",
    salaryPaid: "₹2,80,000",
    leaves: 7,
  },
  {
    id: 4,
    name: "Rahul",
    email: "rahul@gmail.com",
    mobile: "9012345678",
    department: "Finance",
    role: "Finance Analyst",
    manager: "Suresh",
    location: "Bangalore",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "20-09-2021",
    ctc: "₹5,50,000",
    insurance: "Plan B",
    salaryPaid: "₹3,10,000",
    leaves: 4,
  },
  {
    id: 5,
    name: "Sneha",
    email: "sneha@gmail.com",
    mobile: "9898989898",
    department: "HR",
    role: "HR Executive",
    manager: "Deepak",
    location: "Chennai",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "05-12-2022",
    ctc: "₹6,80,000",
    insurance: "Plan A",
    salaryPaid: "₹4,50,000",
    leaves: 2,
  },
  {
    id: 6,
    name: "Kiran",
    email: "kiran@gmail.com",
    mobile: "9765432109",
    department: "IT",
    role: "Backend Developer",
    manager: "Basavaraj",
    location: "Bangalore",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "11-04-2023",
    ctc: "₹5,20,000",
    insurance: "Plan B",
    salaryPaid: "₹3,80,000",
    leaves: 6,
  },
  {
    id: 7,
    name: "Anjali",
    email: "anjali@gmail.com",
    mobile: "9345678123",
    department: "Marketing",
    role: "Marketing Specialist",
    manager: "Rahul",
    location: "Mumbai",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "10-02-2024",
    ctc: "₹7,00,000",
    insurance: "Plan A",
    salaryPaid: "₹5,20,000",
    leaves: 1,
  },
  {
    id: 8,
    name: "Ramesh",
    email: "ramesh@gmail.com",
    mobile: "9001122334",
    department: "Finance",
    role: "Accountant",
    manager: "Suresh",
    location: "Hyderabad",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "18-07-2021",
    ctc: "₹4,50,000",
    insurance: "Plan B",
    salaryPaid: "₹2,90,000",
    leaves: 8,
  },
  {
    id: 9,
    name: "Pooja",
    email: "pooja@gmail.com",
    mobile: "9887766554",
    department: "IT",
    role: "QA Engineer",
    manager: "Kiran",
    location: "Bangalore",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "09-03-2023",
    ctc: "₹5,80,000",
    insurance: "Plan A",
    salaryPaid: "₹3,60,000",
    leaves: 3,
  },
  {
    id: 10,
    name: "Suresh",
    email: "suresh@gmail.com",
    mobile: "9554433221",
    department: "Finance",
    role: "Finance Manager",
    manager: "CEO",
    location: "Bangalore",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "25-10-2022",
    ctc: "₹6,00,000",
    insurance: "Plan B",
    salaryPaid: "₹4,00,000",
    leaves: 5,
  },
];

const StaffDetails = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("name");

  const filteredEmployees = employeesData.filter((emp) => {
    const value = emp[filterType]?.toString().toLowerCase();
    return value.includes(search.toLowerCase());
  });

  return (
    <div className="staff-container">
      <h2 className="staff-title">Staff Details</h2>

      <div className="staff-filter">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="mobile">Mobile</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          className="staff-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="clear-btn"
          onClick={() => {
            setSearch("");
            setFilterType("name");
          }}
        >
          Clear
        </button>
      </div>

      <table className="staff-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Role</th>
            <th>status</th>
            <th>Joining Date</th>
            <th>CTC</th>
            <th>Salary Paid</th>
            <th>Total Leaves</th>
            <th>Insurance</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.mobile}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>{emp.status}</td>
              <td>{emp.joiningDate}</td>
              <td>{emp.ctc}</td>
              <td>{emp.salaryPaid}</td>
              <td>{emp.leaves}</td>
              <td>{emp.insurance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StaffDetails;
