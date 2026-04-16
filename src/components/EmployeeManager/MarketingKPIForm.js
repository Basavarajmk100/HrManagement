import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/SalesKPIForm.css"; // reuse same styling

const MarketingKPIForm = () => {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    employeeId: "",
    month: "",
    leadsGenerated: "",
    qualifiedLeads: "",
    conversions: "",
    marketingSpend: "",
    revenueGenerated: "",
    campaignROI: 0,
    websiteVisitors: "",
    socialEngagement: "",
  });

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5133/api/v1/MarketingKPI/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employees.");
      } finally {
        setLoadingEmployees(false);
      }
    };
    fetchEmployees();
  }, []);

  // Auto calculate Campaign ROI % = (Revenue - Spend) / Spend * 100
  useEffect(() => {
    const spend = parseFloat(form.marketingSpend);
    const revenue = parseFloat(form.revenueGenerated);

    if (!isNaN(spend) && spend > 0 && !isNaN(revenue)) {
      const roi = ((revenue - spend) / spend) * 100;
      setForm((prev) => ({
        ...prev,
        campaignROI: roi.toFixed(2),
      }));
    } else {
      setForm((prev) => ({ ...prev, campaignROI: 0 }));
    }
  }, [form.marketingSpend, form.revenueGenerated]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = [
      "leadsGenerated",
      "qualifiedLeads",
      "conversions",
      "marketingSpend",
      "revenueGenerated",
      "websiteVisitors",
      "socialEngagement",
    ];

    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? value.replace(/\D/g, "") : value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        employeeId: Number(form.employeeId),
        month: form.month + "-01",
        leadsGenerated: Number(form.leadsGenerated),
        qualifiedLeads: Number(form.qualifiedLeads),
        conversions: Number(form.conversions),
        marketingSpend: Number(form.marketingSpend),
        revenueGenerated: Number(form.revenueGenerated),
        campaignROI: Number(form.campaignROI),
        websiteVisitors: Number(form.websiteVisitors),
        socialEngagement: Number(form.socialEngagement),
      };

      console.log("Marketing KPI Payload:", payload);

      await axios.post("http://localhost:5133/api/v1/MarketingKPI/add", payload);
      alert("Marketing KPI saved successfully!");

      // Reset form
      setForm({
        employeeId: "",
        month: "",
        leadsGenerated: "",
        qualifiedLeads: "",
        conversions: "",
        marketingSpend: "",
        revenueGenerated: "",
        campaignROI: 0,
        websiteVisitors: "",
        socialEngagement: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save Marketing KPI.");
    }
  };

  if (loadingEmployees) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className

="kpi-form-container">
      <h2>Marketing KPI Entry</h2>
      <form onSubmit={handleSubmit} className

="kpi-form">

        <label>Employee</label>
        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>

        <label>Month</label>
        <input
          type="month"
          name="month"
          value={form.month}
          onChange={handleChange}
          required
        />

        <label>Leads Generated</label>
        <input
          type="number"
          name="leadsGenerated"
          value={form.leadsGenerated}
          onChange={handleChange}
          required
        />

        <label>Qualified Leads</label>
        <input
          type="number"
          name="qualifiedLeads"
          value={form.qualifiedLeads}
          onChange={handleChange}
          required
        />

        <label>Conversions</label>
        <input
          type="number"
          name="conversions"
          value={form.conversions}
          onChange={handleChange}
          required
        />

        <label>Total Marketing Spend (₹)</label>
        <input
          type="number"
          name="marketingSpend"
          value={form.marketingSpend}
          onChange={handleChange}
          required
        />

        <label>Total Revenue Generated (₹)</label>
        <input
          type="number"
          name="revenueGenerated"
          value={form.revenueGenerated}
          onChange={handleChange}
          required
        />

        <label>Campaign ROI %</label>
        <input type="text" value={form.campaignROI + "%"} disabled />

        <label>Website Visitors</label>
        <input
          type="number"
          name="websiteVisitors"
          value={form.websiteVisitors}
          onChange={handleChange}
          required
        />

        <label>Social Engagement (Likes/Shares/Comments)</label>
        <input
          type="number"
          name="socialEngagement"
          value={form.socialEngagement}
          onChange={handleChange}
          required
        />

        <button type="submit">Save KPI</button>
      </form>
    </div>
  );
};

export default MarketingKPIForm;
