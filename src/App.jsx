
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import Test from "./Pages/test/test";


function App() {

  return (
    <>
    <Routes>
      
      {/* Public/Auth Routes */}
      <Route path="/" element={<SignIn/>}/> 
      <Route path="/signin" element={<SignIn/>}/>             
      <Route path="/signup" element={<SignUp/>}/>             

      {/* Protected Route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Existing Test Route */}
      <Route path="/test" element={<Test/>}/> 
    </Routes>
    </>
  )
}

export default App

