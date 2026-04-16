import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import EmployeesPage from "./pages/EmployeesPage";
import LeavePage from "./pages/LeavePage";
import HRDashboardPage from "./pages/HRDashboardPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

// Employee routes components
import ViewEmployee from "./components/ViewEmployee";
import EditEmployee from "./components/EditEmployee";

// HR Dashboard Components
import LeaveCalendar from "./components/HRDashboard/LeaveCalendar";
import TeamMember from "./components/HRDashboard/TeamMember";
import OrganizationChart from "./components/HRDashboard/OrganizationChart";
import HolidayManagement from "./components/HRDashboard/HolidayManagement";
import PayrollDashboard from "./components/HRDashboard/PayrollDashboard";



import Gallery from "./components/HRDashboard/Gallery";

import UserApprovals from "./components/HRDashboard/AdminUserApprovals";

import ActivityPlanner from "./components/HRDashboard/ActivityPlanner";

import AdminCalendar from "./components/HRDashboard/AdminCalendar";

import EventRegistration from "./components/HRDashboard/EventRegistration";

import ParticipantsList from "./components/HRDashboard/ParticipantsList";

import MeetingScheduler from "./components/HRDashboard/MeetingScheduler";

import ToDoList from "./components/HRDashboard/ToDoList";

import MyCalendar from "./components/HRDashboard/MyCalendar";

import DownloadBankSheet from "./components/HRDashboard/DownloadBankSheet";

import DownloadPayslip from "./components/HRDashboard/DownloadPayslip";

import ApprovePayroll from "./components/HRDashboard/ApprovePayroll";

import InsuranceForm from "./components/HRDashboard/InsuranceForm";

import InsurancePolicies from "./components/HRDashboard/Insurancepolicies";


import InvoicesPage from "./components/HRDashboard/InvoicesPage";
import PurchaseVoucher from "./components/HRDashboard/PurchaseVoucher";

import AddPurchaseVoucher from "./components/HRDashboard/AddPurchaseVoucher";


import SalesVoucher from "./components/HRDashboard/SalesVoucher";
import AddSalesVoucher from "./components/HRDashboard/AddSalesVoucher";
import LedgersPage from "./components/HRDashboard/LedgersPage";

import BalanceSheetPage from "./components/HRDashboard/BalanceSheetPage";

import ProfitLossPage from "./components/HRDashboard/ProfitLossPage";

import ExpensesPage from "./components/HRDashboard/ExpensesPage";


import TrialBalancePage from "./components/HRDashboard/TrialBalancePage";


// ⬇️ NEW — Performance Dashboard Component
import PerformanceDashboard from "./components/HRDashboard/PerformanceDashboard";

// Employee Dashboard Components
import Profile from "./components/EmployeeDashboard/Profile";
import Payslip from "./components/EmployeeDashboard/Payslip";
import HolidayCalendar from "./components/EmployeeDashboard/HolidayCalendar";
import MyTeam from "./components/EmployeeDashboard/MyTeam";
import Attendance from "./components/EmployeeDashboard/Attendance";
import IncomeDeclaration from "./components/EmployeeDashboard/IncomeDeclaration";
import EmployeeDashboardPageComponent from "./components/EmployeeDashboard/EmployeeDashboard";// main EmployeeDashboard page

import ViewInsurance from "./components/EmployeeDashboard/ViewInsurance";
import RequestInsurance from "./components/EmployeeDashboard/RequestInsurance";




import ProviderDashboard from "./components/ProviderDashboard/ProviderDashboard";

// Employee Manager Components
import EmployeeManager from "./components/EmployeeManager/EmployeeManager";
import AddEmployeePage from "./components/EmployeeManager/AddEmployeePage";

// Employee Manager Tabs
import GeneralInfo from "./components/EmployeeManager/GeneralInfo";
import AttendanceManager from "./components/EmployeeManager/AttendanceManager";
import PayrollManager from "./components/EmployeeManager/PayrollManager";
import SchedulingManager from "./components/EmployeeManager/SchedulingManager";
import LeaveDetailsManager from "./components/EmployeeManager/LeaveDetailsManager";
import AddHrStatsPage from "./components/EmployeeManager/AddHrStatsPage";

import CreateEmployeeCredentials from "./components/EmployeeManager/CreateEmployeeCredentials";

import SalesKPIForm from "./components/EmployeeManager/SalesKPIForm";


import ITKPIForm from "./components/EmployeeManager/ITKPIForm";

import HRKPIForm from "./components/EmployeeManager/HRKPIForm";

import FinanceKPIForm from "./components/EmployeeManager/FinanceKPIForm";


import  MarketingKPIForm from "./components/EmployeeManager/MarketingKPIForm";

import  HRPayrollForm from "./components/EmployeeManager/HRPayrollForm";



import  Payroll from "./components/EmployeeManager/Payroll"

import EditPayroll from "./components/EmployeeManager/EditPayroll";

import AddCTC from "./components/EmployeeManager/AddCTC";

import PayrollReports from "./components/EmployeeManager/PayrollReports";

import CTCReport from "./components/EmployeeManager/CTCReport";

import AttendanceReport from "./components/EmployeeManager/AttendanceReport";

import EmployeeReport from "./components/EmployeeManager/EmployeeReport";

import PayslipReport from "./components/EmployeeManager/PayslipReport";

import ViewPayslip from "./components/EmployeeManager/ViewPayslip";

import LeaveReport from "./components/EmployeeManager/LeaveReport";


import Settings from "./components/EmployeeManager/Settings";


import HrProfile from "./components/EmployeeManager/HrProfile";




import AddCompanyPage from "./pages/Provider/AddCompanyPage";
import AllPaidCompanies from "./pages/Provider/AllPaidCompanies";


import PendingDues from "./pages/Provider/PendingDues";
import Invoices from "./pages/Provider/Invoices";
import PaymentOverview from "./pages/Provider/PaymentOverview";

import PaymentReports from "./pages/Provider/PaymentReports";

import FailedPayments from "./pages/Provider/FailedPayments";

import CompanyReport from "./pages/Provider/CompanyReport";
import RevenueReport from "./pages/Provider/RevenueReport";


import Companies from "./pages/Provider/Companies";

import Users from "./pages/Provider/Users";


import CompanySettings from "./pages/Provider/CompanySettings";

import ProviderSettings from "./pages/Provider/ProviderSettings";


import TotalEmployees from "./pages/Provider/TotalEmployees";
import EmployeeList from "./pages/Provider/EmployeeList";

import ActivePlans from "./pages/Provider/subscriptions/ActivePlans";
import ExpiredPlans from "./pages/Provider/subscriptions/ExpiredPlans";
import UpgradeRequests from "./pages/Provider/subscriptions/UpgradeRequests";
import SubscribedCompanies from "./pages/Provider/subscriptions/SubscribedCompanies";
import Renewals from "./pages/Provider/subscriptions/Renewals";
import PlanManagement from "./pages/Provider/subscriptions/PlanManagement";
import Transactions from "./pages/Provider/subscriptions/Transactions";

import ProviderDashboardSidebar from "./pages/Provider/ProviderDashboardSidebar";

import BillingHistory from "./pages/Provider/BillingHistory";


function App() {
  return (
    <Router>
      <Routes>
   {/* Default page → Login */}
    

         <Route path="/" element={<Navigate to="/home" />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Home Page */}
        <Route path="/home" element={<HomePage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<HRDashboardPage />} />


        
      {/* Default route */}
      <Route path="/" element={<Navigate to="/provider-dashboard" />} />





            {/* Provider Dashboard route */}
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />

        {/* HR Manager Dashboard Routes */}
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/view/:id" element={<ViewEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/calendar" element={<LeaveCalendar />} />
        <Route path="/team" element={<TeamMember />} />
        <Route path="/organization" element={<OrganizationChart />} />
        <Route path="/manage-holidays" element={<HolidayManagement />} />
         <Route path="/payroll" element={<PayrollDashboard />} />

         <Route path="/admin/user-approvals" element={<UserApprovals />} />

       

         <Route path="/activities/gallery" element={<Gallery />} />

         <Route path="/activities/planner" element={<ActivityPlanner />} />

         <Route path="/activities/calendar" element={<AdminCalendar />} />

          {/* Event Registration */}
        <Route path="/activities/event-registration" element={<EventRegistration />} />

        <Route path="/activities/participants" element={<ParticipantsList />} />

           <Route path="/planner/meeting-scheduler" element={<MeetingScheduler />} />

                 {/* To Do List */}
        <Route path="/planner/todo-list" element={<ToDoList />} />

        <Route path="/planner/my-calendar" element={<MyCalendar />} />



        <Route path="/insuranceform" element={<InsuranceForm/>} />

        <Route path ="/insurancepolicies" element={<InsurancePolicies/>}/>

        <Route path="/finance/invoicesPage" element={<InvoicesPage />} />

        <Route path="/finance/purchase-voucher" element={<PurchaseVoucher />} />

        <Route path="/finance/add-purchase-voucher" element={<AddPurchaseVoucher />} />

        <Route path="/finance/sales-voucher" element={<SalesVoucher />} />
        <Route path="/finance/add-sales-voucher" element={<AddSalesVoucher />} />


            <Route path="/finance/ledgers" element={<LedgersPage />} />

            <Route path="/finance/balance-sheet" element={<BalanceSheetPage />} />

            <Route path="/finance/pnl" element={<ProfitLossPage />} />

               <Route path="/finance/expenses" element={<ExpensesPage />} />


                <Route path="/finance/trial-balance" element={<TrialBalancePage />} />



  
         <Route path="/download-bank-sheet" element={<DownloadBankSheet />} />
          <Route path="/download-pay-slip" element={<DownloadPayslip />} />
           <Route path="/approve-payroll" element={<ApprovePayroll/>} />

        {/* Employee Dashboard Routes */}
        <Route path="/employee-dashboard" element={<EmployeeDashboardPageComponent />} />
        {/* ✅ Use URL param OR localStorage in Profile.js to load employee data */}
        <Route path="/profile" element={<Profile />} />
         
        <Route path="/payslip" element={<Payslip />} />
        <Route path="/holiday-calendar" element={<HolidayCalendar />} />
        <Route path="/my-team" element={<MyTeam />} />

        <Route path="/income-declaration" element={<IncomeDeclaration />} />

           <Route path="/employee/view-insurance" element={<ViewInsurance />} />
            <Route path="/employee/request-insurance" element={<RequestInsurance />} />

        {/* Employee Manager Routes */}
        <Route path="/employee-manager" element={<EmployeeManager />} />
        <Route path="/employee-manager/add" element={<AddEmployeePage />} />
        <Route path="/employee-manager/addPayroll" element={<HRPayrollForm />} />
        <Route path="/employee-manager/addHrStat" element={<AddHrStatsPage/>} />
        <Route path="/employee-manager/SalesKPIForm" element={<SalesKPIForm/>} />
        <Route path="/employee-manager/ITKPIForm" element={<ITKPIForm/>} />
        <Route path="/employee-manager/HRKPIForm" element={<HRKPIForm/>} />
        <Route path="/employee-manager/FinanceKPIForm" element={<FinanceKPIForm/>} />
        <Route path="/employee-manager/MarketingKPIForm" element={<MarketingKPIForm/>}/>
        <Route path="/employee-manager/HRPayrollForm" element={<HRPayrollForm/>}/>
        <Route path="/employee-manager/Payroll" element={<Payroll/>}/>

        <Route path="/employee-manager/editPayroll/:id" element={<EditPayroll />}/>


      <Route path="/attendance" element={<Attendance />} />

           
{/* Employee Manager Sub-Routes */}
<Route path="/employee-manager/general" element={<GeneralInfo />} />
<Route path="/employee-manager/attendance" element={<AttendanceManager />} />
<Route path="/employee-manager/payroll" element={<PayrollManager />} />
<Route path="/employee-manager/scheduling" element={<SchedulingManager />} />
<Route path="/employee-manager/leaves" element={<LeaveDetailsManager />} />

    <Route path="/employee-manager/create-credentials" element={<CreateEmployeeCredentials />} />

<Route path="/employee-manager/addctc" element={<AddCTC />} />



 <Route path="/employee-manager/payrollreports" element={<PayrollReports />}/>

  <Route path="/employee-manager/CTCreport" element={<CTCReport />}/>
    <Route path="/employee-manager/AttendanceReport" element={<AttendanceReport/>}/>
        <Route path="/employee-manager/EmployeeReport" element={<EmployeeReport/>}/>


          <Route path="/employee-manager/PayslipReport" element={<PayslipReport/>}/>
        <Route path="/employee-manager/ViewPayslip/:empId" element={<ViewPayslip />} />
        <Route path="/employee-manager/LeaveReport" element={<LeaveReport />} />

         <Route path="/employee-manager/Settings" element={<Settings />} />
         <Route path="/employee-manager/HrProfile" element={<HrProfile/>}/>

           <Route path="/provider/add-company" element={<AddCompanyPage />} />
             <Route path="/provider/add-company" element={<AddCompanyPage />} />

                  <Route path="/provider/all-paid-companies" element={<AllPaidCompanies />} />

                    <Route path="/provider/pending-dues" element={<PendingDues />} />
                    
                    <Route path="/provider/invoices" element={<Invoices />} />

                    <Route path="/provider/payments/overview" element={<PaymentOverview />} />

                    <Route path="/provider/payments/failed" element={<FailedPayments />} />

                    <Route path="/provider/payments/reports" element={<PaymentReports />} />





                    <Route path="/provider/companyreports" element={<CompanyReport />} />
                    <Route path="/provider/revenuereports" element={<RevenueReport/>} />

                       <Route path="/provider/companies" element={<Companies/>} />
                       <Route path="/provider/Users" element={<Users/>} />

                       <Route path="/company-settings/:id" element={<CompanySettings />} />

                       <Route path="/provider-dashboard/settings" element={<ProviderSettings />} />



                      <Route path="/provider/employees/total" element={<TotalEmployees />} />
                      <Route path="/provider/employees/list" element={<EmployeeList />} />


                        <Route path="/provider/subscriptions/active" element={<ActivePlans />} />
                        <Route path="/provider/subscriptions/expired" element={<ExpiredPlans />} />
                        <Route path="/provider/subscriptions/upgrade" element={<UpgradeRequests />} />
                        <Route path="provider/subscriptions/companies" element={<SubscribedCompanies />} />
                        <Route path="provider/subscriptions/renewals" element={<Renewals />} />
                        <Route path="/provider/subscriptions/plans" element={<PlanManagement />} />
                        <Route path="/provider/subscriptions/transactions" element={<Transactions />} />





                        <Route path="/provider/subscriptions/billing-history" element={<BillingHistory />}/>

                        <Route path="/provider/dashboard" element={<ProviderDashboardSidebar/>}/>


        
        {/* ⬇️ NEW — Performance Dashboard Route (Approver Dashboard) */}
        <Route path="/performance" element={<PerformanceDashboard />} />

 
        {/* Fallback */}
        <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;


