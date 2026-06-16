import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/InvoicesPage';
import PaymentsPage from './pages/PaymentsPage';
import RemindersPage from './pages/RemindersPage';
import ReportsPage from './pages/ReportsPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout><DashboardPage /></Layout>
            </PrivateRoute>
          } />
          <Route path="/customers" element={
            <PrivateRoute>
              <Layout><CustomersPage /></Layout>
            </PrivateRoute>
          } />
          <Route path="/invoices" element={
            <PrivateRoute>
              <Layout><InvoicesPage /></Layout>
            </PrivateRoute>
          } />
          <Route path="/payments" element={
            <PrivateRoute>
              <Layout><PaymentsPage /></Layout>
            </PrivateRoute>
          } />
          <Route path="/reminders" element={
            <PrivateRoute>
              <Layout><RemindersPage /></Layout>
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute>
              <Layout><ReportsPage /></Layout>
            </PrivateRoute>
          } />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;