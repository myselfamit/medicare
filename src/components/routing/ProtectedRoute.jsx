import React from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useRouter } from './Router';
import { Shield, User, Stethoscope, AlertTriangle } from 'lucide-react';

// Route permissions configuration - centralized for easy management
export const ROUTE_PERMISSIONS = {
  // Admin-only routes
  '/admin': ['admin'],
  '/admin/doctors': ['admin'],
  '/admin/appointments': ['admin'],
  '/admin/feedback': ['admin'],
  '/admin/analytics': ['admin'],
  '/admin/settings': ['admin'],
  
  // Doctor-only routes
  '/doctor': ['doctor'],
  '/doctor/schedule': ['doctor'],
  '/doctor/appointments': ['doctor'],
  '/doctor/patients': ['doctor'],
  '/doctor/reviews': ['doctor'],
  '/doctor/profile': ['doctor'],
  
  // Patient-only routes
  '/patient': ['patient'],
  '/doctors': ['patient'], // Patient can search for doctors
  '/patient/appointments': ['patient'],
  '/patient/history': ['patient'],
  '/patient/reviews': ['patient'],
  '/patient/profile': ['patient'],
  
  // Shared routes (all authenticated users can access)
  '/profile': ['admin', 'doctor', 'patient']
};

// Function to check if user has permission for a specific route
export const hasRoutePermission = (path, userType) => {
  console.log('Checking route permission:', { path, userType });
  
  if (!userType) {
    console.log('No user type provided');
    return false;
  }
  
  const permissions = ROUTE_PERMISSIONS[path];
  if (!permissions) {
    console.log('Route not found in permissions:', path);
    return false;
  }
  
  const hasPermission = permissions.includes(userType);
  console.log('Permission check result:', hasPermission);
  return hasPermission;
};

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

// Loading Spinner Component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

// Protected Route Component
export const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = '/auth' }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const { navigate, currentPath } = useRouter();

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated()) {
    console.log('User not authenticated, redirecting to:', redirectTo);
    // Store the attempted path for redirect after login
    localStorage.setItem('medicare_redirect_path', currentPath);
    navigate(redirectTo, { replace: true });
    return null;
  }

  const userType = user?.user_type || user?.userType;

  // Check role-based access if allowedRoles is specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    console.log('User role not in allowed roles:', { userType, allowedRoles });
    return <UnauthorizedPage userType={userType} attemptedPath={currentPath} />;
  }

  return children;
};

// Public Route Component (redirects if already authenticated)
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { navigate } = useRouter();

  if (isAuthenticated()) {
    console.log('User already authenticated, redirecting to dashboard');
    
    // Check for stored redirect path
    const redirectPath = localStorage.getItem('medicare_redirect_path');
    if (redirectPath && redirectPath !== '/auth') {
      localStorage.removeItem('medicare_redirect_path');
      
      // Verify user has permission for the stored path
      const userType = user?.user_type || user?.userType;
      if (hasRoutePermission(redirectPath, userType)) {
        navigate(redirectPath, { replace: true });
        return null;
      }
    }

    // Default redirect based on user type
    const userType = user?.user_type || user?.userType;
    const defaultPath = getDashboardPath(userType);
    navigate(defaultPath, { replace: true });
    return null;
  }

  return children;
};

// Unauthorized Page Component
const UnauthorizedPage = ({ userType, attemptedPath }) => {
  const { navigate } = useRouter();

  const getIcon = () => {
    switch (userType) {
      case 'admin': return <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      case 'doctor': return <Stethoscope className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      case 'patient': return <User className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      default: return <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />;
    }
  };

  const getErrorMessage = () => {
    const routeOwner = getRouteOwner(attemptedPath);
    if (routeOwner) {
      return `This page is restricted to ${routeOwner} users only. Your account type (${userType}) does not have access to ${attemptedPath}.`;
    }
    return `You don't have permission to access this page. Your account type (${userType}) cannot access ${attemptedPath}.`;
  };

  const getRouteOwner = (path) => {
    const permissions = ROUTE_PERMISSIONS[path];
    if (!permissions || permissions.length === 0) return null;
    
    if (permissions.length === 1) {
      return permissions[0];
    } else if (permissions.length === 3) {
      return 'authenticated';
    }
    return permissions.join(' and ');
  };

  const handleGoToDashboard = () => {
    const dashboardPath = getDashboardPath(userType);
    navigate(dashboardPath);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-lg mx-auto px-4">
        {getIcon()}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {getErrorMessage()}
        </p>
        
        {/* Action buttons */}
        <div className="space-y-3">
          <button 
            onClick={handleGoToDashboard}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Go to My Dashboard
          </button>
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Go Back
          </button>
        </div>

        {/* Help text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need access?</strong> Contact your administrator if you believe you should have access to this page.
          </p>
        </div>
      </div>
    </div>
  );
};

// 404 Not Found Page
export const NotFoundPage = () => {
  const { navigate } = useRouter();
  const { user, isAuthenticated } = useAuth();

  const handleGoHome = () => {
    if (isAuthenticated()) {
      const userType = user?.user_type || user?.userType;
      const dashboardPath = getDashboardPath(userType);
      navigate(dashboardPath);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <button 
            onClick={handleGoHome}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {isAuthenticated() ? 'Go to Dashboard' : 'Go to Login'}
          </button>
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

// Route Guard Hook - can be used in components to check permissions
export const useRouteGuard = () => {
  const { user, isAuthenticated } = useAuth();
  const { currentPath } = useRouter();

  const checkPermission = (path = currentPath) => {
    if (!isAuthenticated()) return false;
    
    const userType = user?.user_type || user?.userType;
    return hasRoutePermission(path, userType);
  };

  const requiresPermission = (requiredRoles) => {
    if (!isAuthenticated()) return false;
    
    const userType = user?.user_type || user?.userType;
    return requiredRoles.includes(userType);
  };

  return {
    checkPermission,
    requiresPermission,
    userType: user?.user_type || user?.userType,
    isAuthenticated: isAuthenticated()
  };
};