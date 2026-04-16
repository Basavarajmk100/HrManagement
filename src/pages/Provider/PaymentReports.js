import React, { useState, useMemo } from "react";
import "../../styles/PaymentReports.css";

// Dummy Payment Data (Later replace with API data)
const paymentsData = [
  { id: 1, company: "Sunrise Pvt Ltd", plan: "Monthly", amount: 2000, date: "2026-01-05" },
  { id: 2, company: "Bright Tech", plan: "Quarterly", amount: 6000, date: "2026-01-10" },
  { id: 3, company: "Skyline Solutions", plan: "Yearly", amount: 20000, date: "2026-02-01" },
  { id: 4, company: "Sunrise Pvt Ltd", plan: "Monthly", amount: 2000, date: "2026-02-03" },
];

export default function PaymentReports() {
  const [monthFilter, setMonthFilter] = useState("");

  // Filter by month
  const filteredPayments = useMemo(() => {
    return paymentsData.filter((payment) =>
      monthFilter ? payment.date.startsWith(monthFilter) : true
    );
  }, [monthFilter]);

  // Total Revenue
  const totalRevenue = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

  // Plan-wise Revenue
  const planRevenue = filteredPayments.reduce((acc, p) => {
    acc[p.plan] = (acc[p.plan] || 0) + p.amount;
    return acc;
  }, {});

  // Company-wise Revenue
  const companyRevenue = filteredPayments.reduce((acc, p) => {
    acc[p.company] = (acc[p.company] || 0) + p.amount;
    return acc;
  }, {});

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

="table-title">💳 Payment Reports</h2>
            <p className

="table-subtitle">
              Monthly revenue overview and breakdown
            </p>
          </div>
        </div>

        {/* FILTER */}
        <div className

="top-bar">
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          />
        </div>

        {/* SUMMARY CARDS */}
        <div className

="summaryGrid">
          <div className

="summaryCard revenue">
            <h4>Total Revenue</h4>
            <p>₹ {totalRevenue.toLocaleString()}</p>
          </div>

          <div className

="summaryCard plans">
            <h4>Total Plans</h4>
            <p>{Object.keys(planRevenue).length}</p>
          </div>

          <div className

="summaryCard companies">
            <h4>Total Companies</h4>
            <p>{Object.keys(companyRevenue).length}</p>
          </div>
        </div>
      </div>

      {/* PLAN WISE TABLE */}
      <div className

="table-panel fade-in">
        <div className

="table-header-row">
          <div>
            <h3 className

="table-title">Plan-wise Revenue</h3>
          </div>
        </div>

        <div className

="table-wrapper custom-scrollbar">
          <table className

="styled-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(planRevenue).map(([plan, amount]) => (
                <tr key={plan} className

="table-row tr-card">
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div className

="cell-avatar">
                        {plan.charAt(0)}
                      </div>
                      <span className

="cell-name">{plan}</span>
                    </div>
                  </td>
                  <td>
                    <span className

="cell-total">
                      ₹ {amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPANY WISE TABLE */}
      <div className

="table-panel fade-in">
        <div className

="table-header-row">
          <div>
            <h3 className

="table-title">Company-wise Revenue</h3>
          </div>
        </div>

        <div className

="table-wrapper custom-scrollbar">
          <table className

="styled-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(companyRevenue).map(([company, amount]) => (
                <tr key={company} className

="table-row tr-card">
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div className

="cell-avatar">
                        {company.charAt(0)}
                      </div>
                      <span className

="cell-name">{company}</span>
                    </div>
                  </td>
                  <td>
                    <span className

="cell-total">
                      ₹ {amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}