// import React, { Suspense, lazy } from 'react';
// import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
// import { Router, useRouter } from './components/routing/Router';

// // Lazy load components for better performance
// const Layout = lazy(() => import('./components/layout/Layout'));
// const AuthPage = lazy(() => import('./components/auth/AuthPage'));
// const AdminDashboard = lazy(() => import('./components/dashboards/AdminDashboard'));
// const PatientDashboard = lazy(() => import('./components/dashboards/PatientDashboard'));
// const DoctorDashboard = lazy(() => import('./components/dashboards/DoctorDashboard'));
// const AdminDoctorsDashboard = lazy(() => import('./components/dashboards/AdminDoctorsDashboard'));

// // Loading component for Suspense
// const LoadingSpinner = ({ message = "Loading..." }) => (
//   <div className="min-h-screen flex items-center justify-center bg-gray-50">
//     <div className="text-center">
//       <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//       <p className="text-gray-600">{message}</p>
//     </div>
//   </div>
// );

// // Placeholder components for pages not yet created
// const DoctorPersonalDashboard = () => (
//   <div className="p-8">
//     <h1 className="text-3xl font-bold text-gray-900 mb-6">Doctor Dashboard</h1>
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//       <p className="text-gray-600">Doctor personal dashboard with schedule and patient management will be implemented here.</p>
//     </div>
//   </div>
// );

// const PlaceholderPage = ({ title }) => (
//   <div className="p-8">
//     <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//       <p className="text-gray-600">{title} page will be implemented here.</p>
//     </div>
//   </div>
// );

// // Helper function to get dashboard path based on user type
// const getDashboardPath = (userType) => {
//   switch (userType) {
//     case 'admin':
//       return '/admin';
//     case 'doctor':
//       return '/doctor';
//     case 'patient':
//       return '/patient';
//     default:
//       return '/patient';
//   }
// };

// // Route permissions configuration
// const routePermissions = {
//   // Admin routes
//   '/admin': ['admin'],
//   '/admin/doctors': ['admin'],
//   '/admin/appointments': ['admin'],
//   '/admin/feedback': ['admin'],
//   '/admin/analytics': ['admin'],
//   '/admin/settings': ['admin'],
  
//   // Doctor routes
//   '/doctor': ['doctor'],
//   '/doctor/schedule': ['doctor'],
//   '/doctor/appointments': ['doctor'],
//   '/doctor/patients': ['doctor'],
//   '/doctor/reviews': ['doctor'],
//   '/doctor/profile': ['doctor'],
  
//   // Patient routes
//   '/patient': ['patient'],
//   '/doctors': ['patient'],
//   '/patient/appointments': ['patient'],
//   '/patient/history': ['patient'],
//   '/patient/reviews': ['patient'],
//   '/patient/profile': ['patient']
// };

// // Function to check if user has permission for a route
// const hasRoutePermission = (path, userType) => {
//   const permissions = routePermissions[path];
//   if (!permissions) {
//     return false;
//   }
//   return permissions.includes(userType);
// };

// // Access Denied Component
// const AccessDenied = ({ userType, attemptedPath }) => (
//   <div className="min-h-screen flex items-center justify-center bg-gray-50">
//     <div className="text-center max-w-md mx-auto px-4">
//       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//         <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//         </svg>
//       </div>
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
//       <p className="text-gray-600 mb-4">
//         You don't have permission to access this page. Your account type ({userType}) cannot access {attemptedPath}.
//       </p>
//       <button 
//         onClick={() => {
//           const dashboardPath = getDashboardPath(userType);
//           window.history.replaceState({}, '', dashboardPath);
//           window.dispatchEvent(new PopStateEvent('popstate'));
//         }}
//         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//       >
//         Go to My Dashboard
//       </button>
//     </div>
//   </div>
// );

// // Main App routing component
// const AppRoutes = () => {
//   const { currentPath } = useRouter();
//   const { isAuthenticated, user, loading } = useAuth();

//   console.log('AppRoutes render:', { currentPath, isAuthenticated: isAuthenticated(), user, loading });

//   // Show loading screen while checking authentication
//   if (loading) {
//     return <LoadingSpinner message="Checking authentication..." />;
//   }

//   // Public routes (no authentication required)
//   if (currentPath === '/auth' || currentPath === '/') {
//     // If user is already authenticated, redirect to their dashboard
//     if (isAuthenticated() && user) {
//       console.log('User already authenticated, redirecting to dashboard');
//       const dashboardPath = getDashboardPath(user.user_type || user.userType);
//       window.history.replaceState({}, '', dashboardPath);
//       return null;
//     }
    
//     return (
//       <Suspense fallback={<LoadingSpinner message="Loading login page..." />}>
//         <AuthPage />
//       </Suspense>
//     );
//   }

//   // All other routes require authentication
//   if (!isAuthenticated()) {
//     console.log('User not authenticated, redirecting to auth');
//     window.history.replaceState({}, '', '/auth');
//     return null;
//   }

//   // Get user type for routing decisions
//   const userType = user.user_type || user.userType;
//   console.log('Authenticated user type:', userType);

//   // Check route permissions
//   if (!hasRoutePermission(currentPath, userType)) {
//     console.log('Access denied for route:', currentPath, 'User type:', userType);
//     return (
//       <Suspense fallback={<LoadingSpinner />}>
//         <Layout>
//           <AccessDenied userType={userType} attemptedPath={currentPath} />
//         </Layout>
//       </Suspense>
//     );
//   }

//   // Route definitions based on user role and path
//   const renderRoute = () => {
//     // Admin routes
//     if (currentPath.startsWith('/admin')) {
//       const AdminComponent = () => {
//         switch (currentPath) {
//           case '/admin':
//             return <AdminDashboard />;
//           case '/admin/doctors':
//             return <AdminDoctorsDashboard />;
//           case '/admin/appointments':
//             return <PlaceholderPage title="Appointments" />;
//           case '/admin/feedback':
//             return <PlaceholderPage title="Feedback Management" />;
//           case '/admin/analytics':
//             return <PlaceholderPage title="Analytics" />;
//           case '/admin/settings':
//             return <PlaceholderPage title="Settings" />;
//           default:
//             return <AdminDashboard />;
//         }
//       };

//       return (
//         <Suspense fallback={<LoadingSpinner message="Loading admin dashboard..." />}>
//           <Layout>
//             <AdminComponent />
//           </Layout>
//         </Suspense>
//       );
//     }

//     // Doctor routes
//     if (currentPath.startsWith('/doctor')) {
//       const DoctorComponent = () => {
//         switch (currentPath) {
//           case '/doctor':
//             return <DoctorPersonalDashboard />;
//           case '/doctor/schedule':
//             return <PlaceholderPage title="Schedule Management" />;
//           case '/doctor/appointments':
//             return <PlaceholderPage title="Appointments" />;
//           case '/doctor/patients':
//             return <PlaceholderPage title="My Patients" />;
//           case '/doctor/reviews':
//             return <PlaceholderPage title="Reviews" />;
//           case '/doctor/profile':
//             return <PlaceholderPage title="Profile" />;
//           default:
//             return <DoctorPersonalDashboard />;
//         }
//       };

//       return (
//         <Suspense fallback={<LoadingSpinner message="Loading doctor dashboard..." />}>
//           <Layout>
//             <DoctorComponent />
//           </Layout>
//         </Suspense>
//       );
//     }

//     // Patient routes
//     if (currentPath.startsWith('/patient') || currentPath === '/doctors') {
//       const PatientComponent = () => {
//         switch (currentPath) {
//           case '/patient':
//             return <PatientDashboard />;
//           case '/doctors':
//             return <DoctorDashboard />;
//           case '/patient/appointments':
//             return <PlaceholderPage title="My Appointments" />;
//           case '/patient/history':
//             return <PlaceholderPage title="Medical History" />;
//           case '/patient/reviews':
//             return <PlaceholderPage title="Reviews" />;
//           case '/patient/profile':
//             return <PlaceholderPage title="Profile" />;
//           default:
//             return <PatientDashboard />;
//         }
//       };

//       return (
//         <Suspense fallback={<LoadingSpinner message="Loading patient dashboard..." />}>
//           <Layout>
//             <PatientComponent />
//           </Layout>
//         </Suspense>
//       );
//     }

//     // If user is authenticated but on an invalid path, redirect to their dashboard
//     console.log('Invalid path for authenticated user, redirecting to dashboard');
//     const dashboardPath = getDashboardPath(userType);
//     window.history.replaceState({}, '', dashboardPath);
//     return null;
//   };

//   return renderRoute();
// };

// // Main App component
// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <AppRoutes />
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;
import React, { Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { Router, useRouter } from './components/routing/Router';

// Lazy load components for better performance
const Layout = lazy(() => import('./components/layout/Layout'));
const AuthPage = lazy(() => import('./components/auth/AuthPage'));
const AdminDashboard = lazy(() => import('./components/dashboards/AdminDashboard'));
const PatientDashboard = lazy(() => import('./components/dashboards/PatientDashboard'));
const DoctorDashboard = lazy(() => import('./components/dashboards/DoctorDashboard')); // This is the correct one
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
const PlaceholderPage = ({ title }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">{title} page will be implemented here.</p>
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

// Route permissions configuration
const routePermissions = {
  // Admin routes
  '/admin': ['admin'],
  '/admin/doctors': ['admin'],
  '/admin/appointments': ['admin'],
  '/admin/feedback': ['admin'],
  '/admin/analytics': ['admin'],
  '/admin/settings': ['admin'],
  
  // Doctor routes
  '/doctor': ['doctor'],
  '/doctor/schedule': ['doctor'],
  '/doctor/appointments': ['doctor'],
  '/doctor/patients': ['doctor'],
  '/doctor/reviews': ['doctor'],
  '/doctor/profile': ['doctor'],
  
  // Patient routes
  '/patient': ['patient'],
  '/doctors': ['patient'],
  '/patient/appointments': ['patient'],
  '/patient/history': ['patient'],
  '/patient/reviews': ['patient'],
  '/patient/profile': ['patient']
};

// Function to check if user has permission for a route
const hasRoutePermission = (path, userType) => {
  const permissions = routePermissions[path];
  if (!permissions) {
    return false;
  }
  return permissions.includes(userType);
};

// Access Denied Component
const AccessDenied = ({ userType, attemptedPath }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-4">
        You don't have permission to access this page. Your account type ({userType}) cannot access {attemptedPath}.
      </p>
      <button 
        onClick={() => {
          const dashboardPath = getDashboardPath(userType);
          window.history.replaceState({}, '', dashboardPath);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go to My Dashboard
      </button>
    </div>
  </div>
);

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
      <Suspense fallback={<LoadingSpinner message="Loading login page..." />}>
        <AuthPage />
      </Suspense>
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

  // Check route permissions
  if (!hasRoutePermission(currentPath, userType)) {
    console.log('Access denied for route:', currentPath, 'User type:', userType);
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <AccessDenied userType={userType} attemptedPath={currentPath} />
        </Layout>
      </Suspense>
    );
  }

  // Route definitions based on user role and path
  const renderRoute = () => {
    // Admin routes
    if (currentPath.startsWith('/admin')) {
      const AdminComponent = () => {
        switch (currentPath) {
          case '/admin':
            return <AdminDashboard />;
          case '/admin/doctors':
            return <AdminDoctorsDashboard />;
          case '/admin/appointments':
            return <PlaceholderPage title="Appointments" />;
          case '/admin/feedback':
            return <PlaceholderPage title="Feedback Management" />;
          case '/admin/analytics':
            return <PlaceholderPage title="Analytics" />;
          case '/admin/settings':
            return <PlaceholderPage title="Settings" />;
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

    // Doctor routes - FIXED TO USE CORRECT COMPONENT
    if (currentPath.startsWith('/doctor')) {
      const DoctorComponent = () => {
        switch (currentPath) {
          case '/doctor':
            return <DoctorDashboard />; // THIS IS THE CORRECT COMPONENT
          case '/doctor/schedule':
            return <PlaceholderPage title="Schedule Management" />;
          case '/doctor/appointments':
            return <PlaceholderPage title="Appointments" />;
          case '/doctor/patients':
            return <PlaceholderPage title="My Patients" />;
          case '/doctor/reviews':
            return <PlaceholderPage title="Reviews" />;
          case '/doctor/profile':
            return <PlaceholderPage title="Profile" />;
          default:
            return <DoctorDashboard />; // THIS IS THE CORRECT COMPONENT
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
      const PatientComponent = () => {
        switch (currentPath) {
          case '/patient':
            return <PatientDashboard />;
          case '/doctors':
            return <DoctorDashboard />; // This shows the doctor search for patients
          case '/patient/appointments':
            return <PlaceholderPage title="My Appointments" />;
          case '/patient/history':
            return <PlaceholderPage title="Medical History" />;
          case '/patient/reviews':
            return <PlaceholderPage title="Reviews" />;
          case '/patient/profile':
            return <PlaceholderPage title="Profile" />;
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