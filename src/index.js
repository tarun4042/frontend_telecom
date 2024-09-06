import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './CommonPages/App.js';
import Services from './AdminPages/Services.js';
import UpdateTvServices from './AdminPages/UpdateTvServices.js';
import UpdateInternetServices from './AdminPages/UpdateInternetServices.js';
import TerminateServices from './AdminPages/TerminateServices.js';
import PendingRequests from './AdminPages/PendingRequests.js';
import RequestsValidation from './AdminPages/RequestsValidation.js';
import Login from './CommonPages/Login.js';
import Home from './CommonPages/Home.js';
import AdminApp from './AdminPages/AdminApp.js';
import ProtectedRoute from './CommonPages/ProtectedRoute.js';

export default function Index() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status from localStorage when app loads
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login setIsAdmin={setIsAdmin} />} />

        {/* Protecting admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminApp />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/services" 
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <Services />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/updateInternet" 
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <UpdateInternetServices />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/updateTv" 
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <UpdateTvServices />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/terminate" 
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <TerminateServices />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/requests" 
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <PendingRequests />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/validation" 
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <RequestsValidation />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
