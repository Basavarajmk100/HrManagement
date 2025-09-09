import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import ViewEmployee from "./components/ViewEmployee";
import EditEmployee from "./components/EditEmployee";
import LeavePage from "./pages/LeavePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeesPage />} />
        <Route path="/employees/view/:id" element={<ViewEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/leave" element={<LeavePage />} />
      </Routes>
    </Router>
  );
}

export default App;
