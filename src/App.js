import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import ViewEmployee from "./components/ViewEmployee";
import EditEmployee from "./components/EditEmployee";
import LeavePage from "./pages/LeavePage";
import HRDashboardPage from "./pages/HRDashboardPage";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage"; // ✅ import

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Default route goes to HRDashboard */}
        <Route path="/" element={<HRDashboardPage />} />

        <Route path="/dashboard" element={<HRDashboardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/view/:id" element={<ViewEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboardPage />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
