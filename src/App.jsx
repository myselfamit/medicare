import React, { Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { Router, useRouter } from './components/routing/Router';
import { ProtectedRoute, PublicRoute, NotFoundPage } from './components/routing/ProtectedRoute';

// Lazy load components for better performance
const Layout = lazy(() => import('./components/layout/Layout'));
const AuthPage = lazy(() => import('./components/auth/AuthPage'));
const AdminDashboard = lazy(() => import('./components/dashboards/AdminDashboard'));
const PatientDashboard = lazy(() => import('./components/dashboards/PatientDashboard'));
const DoctorDashboard = lazy(() => import('./components/dashboards/DoctorDashboard'));
const AdminDoctorsDashboard = lazy(() => import('./components/dashboards/AdminDoctorsDashboard'));

// Loading component for Suspense
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

// Placeholder components for pages not yet created
const DoctorPersonalDashboard = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Doctor Dashboard</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">Doctor personal dashboard with schedule and patient management will be implemented here.</p>
      <p className="text-sm text-gray-500 mt-2">
        This will include today's appointments, patient records, and availability management.
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

// Helper function to get dashboard path based on user type
const getDashboardPath = (userType) => {
  switch (userType) {
    case 'admin':
      return '/admin';
    case 'doctor':
      return '/doctor';
    case 'patient':
      return '/patient';
    default:
      return '/patient';
  }
};

// Main App routing component
const AppRoutes = () => {
  const { currentPath } = useRouter();
  const { isAuthenticated, user, loading } = useAuth();

  console.log('AppRoutes render:', { currentPath, isAuthenticated: isAuthenticated(), user, loading });

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // Public routes (no authentication required)
  if (currentPath === '/auth' || currentPath === '/') {
    // If user is already authenticated, redirect to their dashboard
    if (isAuthenticated() && user) {
      console.log('User already authenticated, redirecting to dashboard');
      const dashboardPath = getDashboardPath(user.user_type || user.userType);
      window.history.replaceState({}, '', dashboardPath);
      return null;
    }
    
    return (
      <PublicRoute>
        <Suspense fallback={<LoadingSpinner message="Loading login page..." />}>
          <AuthPage />
        </Suspense>
      </PublicRoute>
    );
  }

  // All other routes require authentication
  if (!isAuthenticated()) {
    console.log('User not authenticated, redirecting to auth');
    window.history.replaceState({}, '', '/auth');
    return null;
  }

  // Get user type for routing decisions
  const userType = user.user_type || user.userType;
  console.log('Authenticated user type:', userType);

  // Route definitions based on user role and path
  const renderRoute = () => {
    // Admin routes
    if (currentPath.startsWith('/admin')) {
      if (userType !== 'admin') {
        console.log('Access denied: user is not admin');
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Layout>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-600 mb-4">You don't have permission to access admin pages.</p>
                <button 
                  onClick={() => {
                    const path = getDashboardPath(userType);
                    window.history.pushState({}, '', path);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Go to My Dashboard
                </button>
              </div>
            </Layout>
          </Suspense>
        );
      }

      const AdminComponent = () => {
        switch (currentPath) {
          case '/admin':
            return <AdminDashboard />;
          case '/admin/doctors':
            return <AdminDoctorsDashboard />;
          case '/admin/appointments':
            return <AppointmentsPage />;
          case '/admin/feedback':
            return <FeedbackPage />;
          case '/admin/analytics':
            return <AnalyticsPage />;
          case '/admin/settings':
            return <SettingsPage />;
          default:
            return <AdminDashboard />;
        }
      };

      return (
        <Suspense fallback={<LoadingSpinner message="Loading admin dashboard..." />}>
          <Layout>
            <AdminComponent />
          </Layout>
        </Suspense>
      );
    }

    // Doctor routes
    if (currentPath.startsWith('/doctor')) {
      if (userType !== 'doctor') {
        console.log('Access denied: user is not doctor');
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Layout>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-600 mb-4">You don't have permission to access doctor pages.</p>
                <button 
                  onClick={() => {
                    const path = getDashboardPath(userType);
                    window.history.pushState({}, '', path);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Go to My Dashboard
                </button>
              </div>
            </Layout>
          </Suspense>
        );
      }

      const DoctorComponent = () => {
        switch (currentPath) {
          case '/doctor':
            return <DoctorPersonalDashboard />;
          case '/doctor/schedule':
            return <SchedulePage />;
          case '/doctor/appointments':
            return <AppointmentsPage />;
          case '/doctor/patients':
            return <PatientsPage />;
          case '/doctor/reviews':
            return <ReviewsPage />;
          case '/doctor/profile':
            return <ProfilePage />;
          default:
            return <DoctorPersonalDashboard />;
        }
      };

      return (
        <Suspense fallback={<LoadingSpinner message="Loading doctor dashboard..." />}>
          <Layout>
            <DoctorComponent />
          </Layout>
        </Suspense>
      );
    }

    // Patient routes
    if (currentPath.startsWith('/patient') || currentPath === '/doctors') {
      if (userType !== 'patient') {
        console.log('Access denied: user is not patient');
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Layout>
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-600 mb-4">You don't have permission to access patient pages.</p>
                <button 
                  onClick={() => {
                    const path = getDashboardPath(userType);
                    window.history.pushState({}, '', path);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Go to My Dashboard
                </button>
              </div>
            </Layout>
          </Suspense>
        );
      }

      const PatientComponent = () => {
        switch (currentPath) {
          case '/patient':
            return <PatientDashboard />;
          case '/doctors':
            return <DoctorDashboard />;
          case '/patient/appointments':
            return <AppointmentsPage />;
          case '/patient/history':
            return <MedicalHistoryPage />;
          case '/patient/reviews':
            return <ReviewsPage />;
          case '/patient/profile':
            return <ProfilePage />;
          default:
            return <PatientDashboard />;
        }
      };

      return (
        <Suspense fallback={<LoadingSpinner message="Loading patient dashboard..." />}>
          <Layout>
            <PatientComponent />
          </Layout>
        </Suspense>
      );
    }

    // Shared protected routes
    if (currentPath === '/profile') {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <Layout>
            <ProfilePage />
          </Layout>
        </Suspense>
      );
    }

    // If user is authenticated but on an invalid path, redirect to their dashboard
    console.log('Invalid path for authenticated user, redirecting to dashboard');
    const dashboardPath = getDashboardPath(userType);
    window.history.replaceState({}, '', dashboardPath);
    return null;
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