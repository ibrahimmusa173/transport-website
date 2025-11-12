// src/App.jsx (MODIFIED - Admin Routes Added)

import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Import Client pages (Existing)
import MyTenders from "./Pages/Client/MyTenders";
import CreateTender from "./Pages/Client/CreateTender";
import TenderManager from "./Pages/Client/TenderManager"; 

// Import Vendor pages (Existing)
import TenderList from "./Pages/vendor/TenderList";      
import TenderDetails from "./Pages/vendor/TenderDetails"; 
import MyProposals from "./Pages/vendor/MyProposals";   

// Import NEW Admin pages
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserManagement from "./Pages/Admin/UserManagement";
import TenderManagement from "./Pages/Admin/TenderManagement";
import ProposalManagement from "./Pages/Admin/ProposalManagement";


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
     
    </Routes>
    </>
  )
}

export default App