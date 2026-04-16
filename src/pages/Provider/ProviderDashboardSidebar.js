import React from "react";
import "../../styles/ProviderDashboardSidebar.css";

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

// Dummy Data
const stats = [
  { title: "Total Companies", value: 3 },
  { title: "Total Users", value: 175 },
  { title: "Total Revenue", value: "₹1,50,000" },
  { title: "Pending Due", value: "₹40,000" }
];

const chartData = [
  { month: "Jan", users: 50, revenue: 20000 },
  { month: "Feb", users: 80, revenue: 35000 },
  { month: "Mar", users: 120, revenue: 60000 },
  { month: "Apr", users: 175, revenue: 150000 }
];

const ProviderDashboard = () => {
  return (
    <div className

="dashboard-container">

      {/* ===== Overview Cards ===== */}
      <div className

="dashboard-cards">
        {stats.map((s, i) => (
          <div key={i} className

="card-box">
            <p className

="card-title">{s.title}</p>
            <h2 className

="card-value">{s.value}</h2>
          </div>
        ))}
      </div>

      {/* ===== Charts Section ===== */}
      <div className

="chart-section">

        <div className

="chart-box">
          <h3>Users Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className

="chart-box">
          <h3>Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ===== KPI Section ===== */}
      <div className

="kpi-section">
        <div className

="kpi-box green">
          <p>Active Companies</p>
          <h2>2</h2>
        </div>

        <div className

="kpi-box yellow">
          <p>Trial Companies</p>
          <h2>1</h2>
        </div>

        <div className

="kpi-box red">
          <p>Expired Subscriptions</p>
          <h2>0</h2>
        </div>
      </div>

    </div>
  );
};

export default ProviderDashboard;
