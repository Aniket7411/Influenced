import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Influencer Pages
import InfluencerDashboard from './pages/influencer/InfluencerDashboard';
import InfluencerProfile from './pages/influencer/InfluencerProfile';
import InfluencerSearch from './pages/influencer/InfluencerSearch';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientProfile from './pages/client/ClientProfile';
import ClientSearch from './pages/client/ClientSearch';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-primary-black">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Influencer Routes */}
              <Route
                path="/influencer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['influencer']}>
                    <InfluencerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/influencer/profile"
                element={
                  <ProtectedRoute allowedRoles={['influencer']}>
                    <InfluencerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/influencer/search"
                element={
                  <ProtectedRoute allowedRoles={['influencer']}>
                    <InfluencerSearch />
                  </ProtectedRoute>
                }
              />

              {/* Client Routes */}
              <Route
                path="/client/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/profile"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <ClientProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/search"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <ClientSearch />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/influencers"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/clients"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Default redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;