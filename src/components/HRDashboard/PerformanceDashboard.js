import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";
import "../../styles/PerformanceDashboard.css";

import { FaChartLine, FaLaptopCode, FaUserTie,FaMoneyBillWave } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi"; // Feather icon



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const PerformanceDashboard = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);





const [searchName, setSearchName] = useState("");
const [searchId, setSearchId] = useState("");
const [searchTeam, setSearchTeam] = useState("");


const [showMenu, setShowMenu] = useState(false);



  // -------------------------------------------
  // LOAD DATA BASED ON TAB
  // -------------------------------------------

  
  useEffect(() => {
    const load = async () => {
      try {
        const urls = {
          sales: "http://localhost:5133/api/v1/SalesKPI/all",
          it: "http://localhost:5133/api/v1/ITKPI/all",
          hr: "http://localhost:5133/api/v1/HRKPI/all",
          finance: "http://localhost:5133/api/v1/FinanceKPI/all"
        };

       const res = await axios.get(urls[activeTab]);
let data = res.data;

// APPLY FILTERS BASED ON DROPDOWNS
data = data.filter((k) =>
  (searchName ? k.employeeName === searchName : true) &&
  (searchId ? k.employeeId?.toString() === searchId : true) &&
  (searchTeam ? k.teamName === searchTeam : true)
);

setKpis(data);


// finally update state
setKpis(data);

      } catch (err) {
        console.error("Error loading KPI:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [activeTab]);

  if (loading) return <p>Loading dashboard…</p>;

  // -------------------------------------------
  // SALES KPI DATA
  // -------------------------------------------
  const monthLabels = [...new Set(kpis.map((k) => k.month))];

  const monthlySales = monthLabels.map((m) =>
    kpis.filter((k) => k.month === m).reduce((sum, x) => sum + (x.totalSales || 0), 0)
  );

  const salesTarget = monthLabels.map((m) =>
    kpis.filter((k) => k.month === m).reduce((sum, x) => sum + (x.salesTarget || 0), 0)
  );

  const salesEmployeeMap = {};
  kpis.forEach((k) => {
    if (!salesEmployeeMap[k.employeeName])
      salesEmployeeMap[k.employeeName] = { totalSales: 0 };

    salesEmployeeMap[k.employeeName].totalSales += k.totalSales || 0;
  });

  const salesEmployeeNames = Object.keys(salesEmployeeMap);
  const salesEmployeeValues = salesEmployeeNames.map(
    (name) => salesEmployeeMap[name].totalSales
  );

  // -------------------------------------------
  // IT KPI DATA
  // -------------------------------------------
  const itEmployeeNames = [...new Set(kpis.map((k) => k.employeeName))];

  const makeItData = (field) =>
    itEmployeeNames.map((name) =>
      kpis
        .filter((k) => k.employeeName === name)
        .reduce((total, x) => total + (x[field] || 0), 0)
    );

  const ticketsData = makeItData("ticketsResolved");
  const bugsData = makeItData("bugsFixed");
  const deploymentsData = makeItData("deployments");
  const uptimeData = makeItData("uptimePercent");

  // -------------------------------------------
  // HR KPI DATA (UPDATED)
  // -------------------------------------------
  const hrEmployeeNames = [...new Set(kpis.map((k) => k.employeeName))];

  const makeHrData = (field) =>
    hrEmployeeNames.map((name) =>
      kpis
        .filter((k) => k.employeeName === name)
        .reduce((total, x) => total + (x[field] || 0), 0)
    );

  // MUST MATCH C# MODEL FIELDS
  const onboardingData = makeHrData("onboardingCompleted");
  const grievancesData = makeHrData("grievancesResolved");
  const trainingSessionsData = makeHrData("trainingSessions");
  const recruitmentData = makeHrData("recruitmentSpeed");
  const attendanceComplianceData = makeHrData("attendanceCompliance");

    // FINANCE KPI
  // -----------------------------
  const financeEmployeeNames = [...new Set(kpis.map((k) => k.employeeName))];
  const makeFinanceData = (field) =>
    financeEmployeeNames.map((name) =>
      kpis
        .filter((k) => k.employeeName === name)
        .reduce((total, x) => total + (x[field] || 0), 0)
    );

  const invoicesData = makeFinanceData("invoicesProcessed");
  const paymentsData = makeFinanceData("paymentsCleared");
  const kpiScoreData = makeFinanceData("kpiScore");

  const monthlyInvoices = monthLabels.map((m) =>
    kpis.filter((k) => k.month === m).reduce((sum, x) => sum + (x.invoicesProcessed || 0), 0)
  );
  const monthlyPayments = monthLabels.map((m) =>
    kpis.filter((k) => k.month === m).reduce((sum, x) => sum + (x.paymentsCleared || 0), 0)
  );






  // MARKETING KPI
const marketingEmployeeNames = [...new Set(kpis.map((k) => k.employeeName))];

const makeMarketingData = (field) =>
  marketingEmployeeNames.map((name) =>
    kpis
      .filter((k) => k.employeeName === name)
      .reduce((total, x) => total + (x[field] || 0), 0)
  );

const leadsGeneratedData = makeMarketingData("leadsGenerated");
const qualifiedLeadsData = makeMarketingData("qualifiedLeads");
const conversionsData = makeMarketingData("conversions");
const marketingSpendData = makeMarketingData("marketingSpend");
const revenueGeneratedData = makeMarketingData("revenueGenerated");
const campaignROIData = makeMarketingData("campaignROI");

const monthlyLeads = monthLabels.map((m) =>
  kpis.filter((k) => k.month === m).reduce((sum, x) => sum + (x.leadsGenerated || 0), 0)
);

const monthlyRevenue = monthLabels.map((m) =>
  kpis.filter((k) => k.month === m).reduce((sum, x) => sum + (x.revenueGenerated || 0), 0)
);


  // -------------------------------------------
  // JSX UI
  // -------------------------------------------
  return (
    <div className

="perf-container">
<h2 className

="title">
 <FiBarChart2 className

="title-icon" size={40} />

  Performance Analysis Dashboard
</h2>




{/* MAIN SEARCH DROPDOWN */}
<div className="search-wrapper">

  <div className="search-main" onClick={() => setShowMenu(!showMenu)}>
    Search Filters ▼
  </div>

  {showMenu && (
    <div className="search-filters">

      <div className="menu-item">
        <span>Employee Name</span>
        <select
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        >
          <option value="">Select Name</option>
          {[...new Set(kpis.map(k => k.employeeName))].map((n, i) => (
            <option key={i} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="menu-item">
        <span>Employee ID</span>
        <select
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        >
          <option value="">Select ID</option>
          {[...new Set(kpis.map(k => k.employeeId))].map((id, i) => (
            <option key={i} value={id}>{id}</option>
          ))}
        </select>
      </div>

      <div className="menu-item">
        <span>Team Name</span>
        <select
          value={searchTeam}
          onChange={(e) => setSearchTeam(e.target.value)}
        >
          <option value="">Select Team</option>
          {[...new Set(kpis.map(k => k.teamName))].map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <button className="clear-btn" onClick={() => {
        setSearchName("");
        setSearchId("");
        setSearchTeam("");
      }}>
        Clear
      </button>

    </div>
  )}

</div>





      {/* TABS MENU */}

<div className

="tabs">

  <div className

={`tab-item sales-tab ${activeTab === "sales" ? "active" : ""}`} 
       onClick={() => setActiveTab("sales")}>
    <FaChartLine className

="tab-icon" /> Sales KPI
  </div>

  <div className

={`tab-item it-tab ${activeTab === "it" ? "active" : ""}`} 
       onClick={() => setActiveTab("it")}>
    <FaLaptopCode className

="tab-icon" /> IT KPI
  </div>

  <div className

={`tab-item hr-tab ${activeTab === "hr" ? "active" : ""}`} 
       onClick={() => setActiveTab("hr")}>
    <FaUserTie className

="tab-icon" /> HR KPI
  </div>

  <div className

={`tab-item finance-tab ${activeTab === "finance" ? "active" : ""}`} 
       onClick={() => setActiveTab("finance")}>
    <FaMoneyBillWave className

="tab-icon" /> Finance KPI
  </div>

  <div className

={`tab-item marketing-tab ${activeTab === "marketing" ? "active" : ""}`} 
       onClick={() => setActiveTab("marketing")}>
    <FaChartLine className

="tab-icon" /> Marketing KPI
  </div>

  <div
    className

="tab-indicator"
    style={{
      transform: `translateX(${activeTab === "sales" ? 0 : activeTab === "it" ? 100 : 200}%)`
    }}
  />
</div>




      {/* =====================================================
          SALES KPI TAB
      ===================================================== */}
      {activeTab === "sales" && (
        <>
          <div className

="card">
            <h3>📈 Monthly Sales</h3>
            <Line
              data={{
                labels: monthLabels,
                datasets: [
                  {
                    label: "Total Sales",
                    data: monthlySales,
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 3,
                    tension: 0.3
                  },
                  {
                    label: "Sales Target",
                    data: salesTarget,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 3,
                    tension: 0.3
                  }
                ]
              }}
              height={90}
            />
          </div>

          <div className

="card">
            <h3>📉 Sales by Employee</h3>
            <Line
              data={{
                labels: salesEmployeeNames,
                datasets: [
                  {
                    label: "Total Sales",
                    data: salesEmployeeValues,
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 3,
                    tension: 0.3
                  }
                ]
              }}
              height={100}
            />
          </div>

          <div className

="card">
            <h3>📄 Sales KPI Records</h3>
            <table className

="modern-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Month</th>
                  <th>Total Sales</th>
                  <th>Target</th>
                  <th>Achieved %</th>
                  <th>Leads</th>
                  <th>Client Hrs</th>
                  <th>Days</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((k) => (
                  <tr key={k.id}>
                    <td>{k.employeeName}</td>
                    <td>{k.month}</td>
                    <td>{k.totalSales}</td>
                    <td>{k.salesTarget}</td>
                    <td>{k.targetAchieved}%</td>
                    <td>{k.leadsGenerated}</td>
                    <td>{k.clientHours}</td>
                    <td>{k.daysWorked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* =====================================================
          IT KPI TAB
      ===================================================== */}
      {activeTab === "it" && (
        <>
          <div className

="card">
            <h3>IT KPI Overview</h3>
            <Bar
              data={{
                labels: itEmployeeNames,
                datasets: [
                  { label: "Tickets Resolved", data: ticketsData, backgroundColor: "rgba(75, 192, 192, 0.7)" },
                  { label: "Bugs Fixed", data: bugsData, backgroundColor: "rgba(255, 99, 132, 0.7)" },
                  { label: "Deployments", data: deploymentsData, backgroundColor: "rgba(54, 162, 235, 0.7)" },
                  { label: "Uptime %", data: uptimeData, backgroundColor: "rgba(255, 206, 86, 0.7)" }
                ]
              }}
              height={120}
            />
          </div>

          <div className

="card">
            <h3>IT KPI Records</h3>
            <table className

="modern-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Tickets</th>
                  <th>Bugs</th>
                  <th>Deployments</th>
                  <th>Uptime %</th>
                </tr>
              </thead>

              <tbody>
                {kpis.map((k) => (
                  <tr key={k.id}>
                    <td>{k.employeeName}</td>
                    <td>{k.ticketsResolved}</td>
                    <td>{k.bugsFixed}</td>
                    <td>{k.deployments}</td>
                    <td>{k.uptimePercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* =====================================================
          HR KPI TAB (UPDATED)
      ===================================================== */}
      {activeTab === "hr" && (
        <>
          <div className

="card">
            <h3>HR KPI Overview</h3>
            <Bar
              data={{
                labels: hrEmployeeNames,
                datasets: [
                  { label: "Onboarding Completed", data: onboardingData, backgroundColor: "rgba(54, 162, 235, 0.7)" },
                  { label: "Grievances Resolved", data: grievancesData, backgroundColor: "rgba(255, 99, 132, 0.7)" },
                  { label: "Training Sessions", data: trainingSessionsData, backgroundColor: "rgba(255, 206, 86, 0.7)" },
                  { label: "Recruitment Speed", data: recruitmentData, backgroundColor: "rgba(75, 192, 192, 0.7)" },
                  { label: "Attendance Compliance", data: attendanceComplianceData, backgroundColor: "rgba(153, 102, 255, 0.7)" }
                ]
              }}
              height={110}
            />
          </div>

          <div className

="card">
            <h3>HR KPI Records</h3>
            <table className

="modern-table compact-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Month</th>
                  <th>Onboarding</th>
                  <th>Grievances</th>
                  <th>Training</th>
                  <th>Recruitment</th>
                  <th>Attendance</th>
                  <th>KPI Score</th>
                </tr>
              </thead>

              <tbody>
                {kpis.map((k) => (
                  <tr key={k.id}>
                    <td>{k.employeeName || (k.employee ? `${k.employee.firstName} ${k.employee.lastName}` : "N/A")}</td>
                    <td>{k.month ? new Date(k.month).toLocaleDateString("en-GB") : "—"}</td>
                    <td>{k.onboardingCompleted ?? "—"}</td>
                    <td>{k.grievancesResolved ?? "—"}</td>
                    <td>{k.trainingSessions ?? "—"}</td>
                    <td>{k.recruitmentSpeed ?? "—"}</td>
                    <td>{k.attendanceCompliance ?? "—"}</td>
                    <td className

="score">{k.kpiScore ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* FINANCE KPI */}
      {activeTab === "finance" && (
        <>
          <div className

="card">
            <h3>📊 Monthly Invoices & Payments</h3>
            <Line
              data={{
                labels: monthLabels,
                datasets: [
                  {
                    label: "Invoices Processed",
                    data: monthlyInvoices,
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 3,
                    tension: 0.3
                  },
                  {
                    label: "Payments Cleared",
                    data: monthlyPayments,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 3,
                    tension: 0.3
                  }
                ]
              }}
              height={90}
            />
          </div>

          <div className

="card">
            <h3>📊 Employee KPI Overview</h3>
            <Bar
              data={{
                labels: financeEmployeeNames,
                datasets: [
                  { label: "Invoices Processed", data: invoicesData, backgroundColor: "rgba(54, 162, 235, 0.7)" },
                  { label: "Payments Cleared", data: paymentsData, backgroundColor: "rgba(255, 99, 132, 0.7)" },
                  { label: "KPI Score", data: kpiScoreData, backgroundColor: "rgba(75, 192, 192, 0.7)" }
                ]
              }}
              height={120}
            />
          </div>

          <div className

="card">
            <h3>📄 Finance KPI Records</h3>
            <table className

="modern-table compact-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Month</th>
                  <th>Invoices</th>
                  <th>Payments</th>
                  <th>Budget Variance</th>
                  <th>Expense Accuracy</th>
                  <th>Cost Savings</th>
                  <th>Audit Issues</th>
                  <th>KPI Score</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((k) => (
                  <tr key={k.id}>
                    <td>{k.employeeName || (k.employee ? `${k.employee.firstName} ${k.employee.lastName}` : "N/A")}</td>
                    <td>{k.month ? new Date(k.month).toLocaleDateString("en-GB") : "—"}</td>
                    <td>{k.invoicesProcessed ?? "—"}</td>
                    <td>{k.paymentsCleared ?? "—"}</td>
                    <td>{k.budgetVariance ?? "—"}</td>
                    <td>{k.expenseAccuracy ?? "—"}</td>
                    <td>{k.costSavings ?? "—"}</td>
                    <td>{k.auditIssues ?? "—"}</td>
                    <td className

="score">{k.kpiScore ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}






      {/* =====================================================
    MARKETING KPI TAB
===================================================== */}
{activeTab === "marketing" && (
  <>
    <div className

="card">
      <h3>📈 Monthly Leads & Revenue</h3>
      <Line
        data={{
          labels: monthLabels,
          datasets: [
            {
              label: "Leads Generated",
              data: monthlyLeads,
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 3,
              tension: 0.3
            },
            {
              label: "Revenue Generated",
              data: monthlyRevenue,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 3,
              tension: 0.3
            }
          ]
        }}
        height={90}
      />
    </div>

    <div className

="card">
      <h3>📊 Marketing KPI by Employee</h3>
      <Bar
        data={{
          labels: marketingEmployeeNames,
          datasets: [
            { label: "Leads Generated", data: leadsGeneratedData, backgroundColor: "rgba(54, 162, 235, 0.7)" },
            { label: "Qualified Leads", data: qualifiedLeadsData, backgroundColor: "rgba(255, 99, 132, 0.7)" },
            { label: "Conversions", data: conversionsData, backgroundColor: "rgba(255, 206, 86, 0.7)" },
            { label: "Marketing Spend", data: marketingSpendData, backgroundColor: "rgba(75, 192, 192, 0.7)" },
            { label: "Revenue Generated", data: revenueGeneratedData, backgroundColor: "rgba(153, 102, 255, 0.7)" },
            { label: "Campaign ROI", data: campaignROIData, backgroundColor: "rgba(255, 159, 64, 0.7)" }
          ]
        }}
        height={120}
      />
    </div>

    <div className

="card">
      <h3>📄 Marketing KPI Records</h3>
      <table className

="modern-table compact-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Month</th>
            <th>Leads</th>
            <th>Qualified Leads</th>
            <th>Conversions</th>
            <th>Marketing Spend</th>
            <th>Revenue Generated</th>
            <th>Campaign ROI</th>
          </tr>
        </thead>
        <tbody>
          {kpis.map((k) => (
            <tr key={k.id}>
              <td>{k.employeeName || (k.employee ? `${k.employee.firstName} ${k.employee.lastName}` : "N/A")}</td>
              <td>{k.month ? new Date(k.month).toLocaleDateString("en-GB") : "—"}</td>
              <td>{k.leadsGenerated ?? "—"}</td>
              <td>{k.qualifiedLeads ?? "—"}</td>
              <td>{k.conversions ?? "—"}</td>
              <td>{k.marketingSpend ?? "—"}</td>
              <td>{k.revenueGenerated ?? "—"}</td>
              <td>{k.campaignROI ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}













    </div>
  );
};

export default PerformanceDashboard;
