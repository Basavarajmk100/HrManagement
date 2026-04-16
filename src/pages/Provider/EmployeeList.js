import React, { useEffect, useState } from "react";
import "../../styles/CompanyReport.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    setEmployees([
      { id: 1, name: "Rahul", company: "Kinsoft", email: "rahul@gmail.com" },
      { id: 2, name: "Anita", company: "Key Computers", email: "anita@gmail.com" },
      { id: 4, name: "Ravi Kumar", company: "Kinsoft", email: "ravi@gmail.com" },
      { id: 5, name: "Meena Patel", company: "ABC Pvt Ltd", email: "meena@gmail.com" },
      { id: 6, name: "Suresh", company: "Key Computers", email: "suresh@gmail.com" },
    ]);
  }, []);

  // FILTER LOGIC (UNCHANGED)
  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) &&
    (companyFilter === "" || emp.company === companyFilter)
  );

  // PAGINATION LOGIC (UNCHANGED)
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentEmployees = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / perPage);

  const totalCompanies = [...new Set(employees.map(emp => emp.company))].length;

  return (
    <div className

="failed-payments">

      {/* HEADER PANEL */}
      <div className

="table-panel fade-in">
        <div className

="table-header-row">
          <div>
            <h2 className

="table-title">Employee List</h2>
            <p className

="table-subtitle">
              Employee directory and company mapping
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <input
              type="text"
              className

="search-box"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <select
              className

="search-box"
              onChange={(e) => {
                setCompanyFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Companies</option>
              <option value="Kinsoft">Kinsoft</option>
              <option value="Key Computers">Key Computers</option>
              <option value="ABC Pvt Ltd">ABC Pvt Ltd</option>
            </select>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className

="summaryGrid">
          <div className

="summaryCard">
            <h4>Total Employees</h4>
            <p>{employees.length}</p>
          </div>

          <div className

="summaryCard">
            <h4>Showing Results</h4>
            <p>{filtered.length}</p>
          </div>

          <div className

="summaryCard">
            <h4>Total Companies</h4>
            <p>{totalCompanies}</p>
          </div>
        </div>
      </div>

      {/* TABLE PANEL */}
      <div className

="table-panel fade-in">
        <div className

="table-wrapper custom-scrollbar">
          <table className

="styled-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Company</th>
                <th>Email</th>
                <th>ID</th>
              </tr>
            </thead>

            <tbody>
              {currentEmployees.map((emp) => (
                <tr key={emp.id} className

="table-row tr-card">

                  {/* Employee Column with Avatar */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div className

="cell-avatar">
                        {emp.name.charAt(0)}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span className

="cell-name">{emp.name}</span>
                        <span className

="cell-id">#{emp.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className

="status-pill status-paid">
                      {emp.company}
                    </span>
                  </td>

                  <td>{emp.email}</td>

                  <td>{emp.id}</td>

                </tr>
              ))}

              {currentEmployees.length === 0 && (
                <tr>
                  <td colSpan="4" className

="no-data">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className

="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className

={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};

export default EmployeeList;