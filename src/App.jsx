// src/App.jsx
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Dashboard";
// Corrected import path for ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute"; // <-- CHANGED THIS LINE

// Import Client pages (Existing)
import MyTenders from "./Pages/Client/MyTenders";
import CreateTender from "./Pages/Client/CreateTender";
import TenderManager from "./Pages/Client/TenderManager";
import Guidelines from "./Pages/Client/Guidelines"; // <-- Keep this if you added it earlier

// Import Vendor pages (Existing)
import TenderList from "./Pages/vendor/TenderList";
import TenderDetails from "./Pages/vendor/TenderDetails";
import MyProposals from "./Pages/vendor/MyProposals";

// Import NEW Admin pages
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserManagement from "./Pages/Admin/UserManagement";
import TenderManagement from "./Pages/Admin/TenderManagement";
import ProposalManagement from "./Pages/Admin/ProposalManagement";
import ContentManagement from "./Pages/Admin/ContentManagement"; // NEW
import TaxonomyManagement from "./Pages/Admin/TaxonomyManagement"; // NEW
import AnalyticsDashboard from "./Pages/Admin/AnalyticsDashboard"; // NEW


function App() {

  return (
    <>
    <Routes>

      {/* Public/Auth Routes */}
      <Route path="/" element={<SignIn/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      {/* Protected Routes (General) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Client Specific Protected Routes (Existing) */}
      <Route
        path="/client/tenders"
        element={<ProtectedRoute><MyTenders /></ProtectedRoute>}
      />
      <Route
        path="/client/tenders/create"
        element={<ProtectedRoute><CreateTender /></ProtectedRoute>}
      />
      <Route
        path="/client/tenders/:tenderId"
        element={<ProtectedRoute><TenderManager /></ProtectedRoute>}
      />
      <Route
        path="/client/guidelines"
        element={<ProtectedRoute><Guidelines /></ProtectedRoute>}
      />


     {/* VENDOR Specific Protected Routes (Existing) */}
      <Route
        path="/vendor/tenders"
        element={<ProtectedRoute><TenderList /></ProtectedRoute>}
      />
      <Route
        path="/vendor/tenders/:tenderId"
        element={<ProtectedRoute><TenderDetails /></ProtectedRoute>}
      />
      <Route
        path="/vendor/proposals"
        element={<ProtectedRoute><MyProposals /></ProtectedRoute>}
      />

     {/* ADMIN Specific Protected Routes (NEW) */}
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
      />
      <Route
        path="/admin/users"
        element={<ProtectedRoute><UserManagement /></ProtectedRoute>}
      />
      {/* Route for viewing/managing specific user by ID */}
      <Route
        path="/admin/users/:userId"
        element={<ProtectedRoute><UserManagement /></ProtectedRoute>}
      />
      <Route
        path="/admin/tenders"
        element={<ProtectedRoute><TenderManagement /></ProtectedRoute>}
      />
      {/* Route for moderating/editing specific tender by ID */}
       <Route
        path="/admin/tenders/:tenderId"
        element={<ProtectedRoute><TenderManagement /></ProtectedRoute>}
      />
      <Route
        path="/admin/proposals"
        element={<ProtectedRoute><ProposalManagement /></ProtectedRoute>}
      />
       {/* Req 7-9 */}
       <Route
        path="/admin/content/guidelines"
        element={<ProtectedRoute><ContentManagement /></ProtectedRoute>}
      />
      {/* Req 10-13 */}
      <Route
        path="/admin/taxonomy"
        element={<ProtectedRoute><TaxonomyManagement /></ProtectedRoute>}
      />
      {/* Req 14 */}
      <Route
        path="/admin/analytics"
        element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>}
      />

    </Routes>
    </>
  )
}

export default App