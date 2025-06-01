import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { Router, useRouter } from './components/routing/Router';
import { ProtectedRoute, PublicRoute, NotFoundPage } from './components/routing/ProtectedRoute';
import Layout from './components/layout/Layout';

// Import page components
import AuthPage from './components/auth/AuthPage';
import AdminDashboard from './components/dashboards/AdminDashboard';
import PatientDashboard from './components/dashboards/PatientDashboard';
import DoctorDashboard from './components/dashboards/DoctorDashboard';

// Import additional components (these would be created separately)
// import AdminDoctorsDashboard from './components/dashboards/AdminDoctorsDashboard';
// import DoctorListing from './components/pages/DoctorListing';

// Placeholder components for pages not yet created
const AdminDoctorsDashboard = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Doctor Management</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Doctor management dashboard will be implemented here.</p>
      <p className="text-sm text-gray-500 mt-2">
        This will include adding, editing, removing doctors and managing their schedules.
      </p>
    </div>
  </div>
);

const DoctorListing = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Doctors</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Doctor listing and search functionality will be implemented here.</p>
      <p className="text-sm text-gray-500 mt-2">
        Patients will be able to search, filter, and book appointments with doctors.
      </p>
    </div>
  </div>
);

const AppointmentsPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Appointments</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Appointments management page will be implemented here.</p>
    </div>
  </div>
);

const FeedbackPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Feedback Management</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Feedback management page will be implemented here.</p>
    </div>
  </div>
);

const AnalyticsPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Analytics and reports page will be implemented here.</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Settings page will be implemented here.</p>
    </div>
  </div>
);

const ProfilePage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">User profile page will be implemented here.</p>
    </div>
  </div>
);

const SchedulePage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Schedule Management</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Schedule management page will be implemented here.</p>
    </div>
  </div>
);

const MedicalHistoryPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Medical History</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Medical history page will be implemented here.</p>
    </div>
  </div>
);

const ReviewsPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Reviews</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Reviews page will be implemented here.</p>
    </div>
  </div>
);

const PatientsPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">My Patients</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Patient management page will be implemented here.</p>
    </div>
  </div>
);

// Main App routing component
const AppRoutes = () => {
  const { currentPath } = useRouter();
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Public routes (no authentication required)
  if (currentPath === '/auth' || currentPath === '/') {
    return (
      <PublicRoute>
        <AuthPage />
      </PublicRoute>
    );
  }

  // All other routes require authentication
  if (!isAuthenticated()) {
    return (
      <PublicRoute>
        <AuthPage />
      </PublicRoute>
    );
  }

  // Route definitions based on user role and path
  const renderRoute = () => {
    // Admin routes
    if (currentPath.startsWith('/admin')) {
      if (user.userType !== 'admin') {
        return (
          <ProtectedRoute allowedRoles={['admin']}>
            <div>Access Denied</div>
          </ProtectedRoute>
        );
      }

      switch (currentPath) {
        case '/admin':
          return (
            <Layout>
              <AdminDashboard />
            </Layout>
          );
        case '/admin/doctors':
          return (
            <Layout>
              <AdminDoctorsDashboard />
            </Layout>
          );
        case '/admin/appointments':
          return (
            <Layout>
              <AppointmentsPage />
            </Layout>
          );
        case '/admin/feedback':
          return (
            <Layout>
              <FeedbackPage />
            </Layout>
          );
        case '/admin/analytics':
          return (
            <Layout>
              <AnalyticsPage />
            </Layout>
          );
        case '/admin/settings':
          return (
            <Layout>
              <SettingsPage />
            </Layout>
          );
        default:
          return (
            <Layout>
              <AdminDashboard />
            </Layout>
          );
      }
    }

    // Doctor routes
    if (currentPath.startsWith('/doctor')) {
      if (user.userType !== 'doctor') {
        return (
          <ProtectedRoute allowedRoles={['doctor']}>
            <div>Access Denied</div>
          </ProtectedRoute>
        );
      }

      switch (currentPath) {
        case '/doctor':
          return (
            <Layout>
              <DoctorDashboard />
            </Layout>
          );
        case '/doctor/schedule':
          return (
            <Layout>
              <SchedulePage />
            </Layout>
          );
        case '/doctor/appointments':
          return (
            <Layout>
              <AppointmentsPage />
            </Layout>
          );
        case '/doctor/patients':
          return (
            <Layout>
              <PatientsPage />
            </Layout>
          );
        case '/doctor/reviews':
          return (
            <Layout>
              <ReviewsPage />
            </Layout>
          );
        case '/doctor/profile':
          return (
            <Layout>
              <ProfilePage />
            </Layout>
          );
        default:
          return (
            <Layout>
              <DoctorDashboard />
            </Layout>
          );
      }
    }

    // Patient routes
    if (currentPath.startsWith('/patient') || currentPath === '/doctors') {
      if (user.userType !== 'patient') {
        return (
          <ProtectedRoute allowedRoles={['patient']}>
            <div>Access Denied</div>
          </ProtectedRoute>
        );
      }

      switch (currentPath) {
        case '/patient':
          return (
            <Layout>
              <PatientDashboard />
            </Layout>
          );
        case '/doctors':
          return (
            <Layout>
              <DoctorListing />
            </Layout>
          );
        case '/patient/appointments':
          return (
            <Layout>
              <AppointmentsPage />
            </Layout>
          );
        case '/patient/history':
          return (
            <Layout>
              <MedicalHistoryPage />
            </Layout>
          );
        case '/patient/reviews':
          return (
            <Layout>
              <ReviewsPage />
            </Layout>
          );
        case '/patient/profile':
          return (
            <Layout>
              <ProfilePage />
            </Layout>
          );
        default:
          return (
            <Layout>
              <PatientDashboard />
            </Layout>
          );
      }
    }

    // Shared protected routes
    if (currentPath === '/profile') {
      return (
        <Layout>
          <ProfilePage />
        </Layout>
      );
    }

    // 404 - Page not found
    return <NotFoundPage />;
  };

  return renderRoute();
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;