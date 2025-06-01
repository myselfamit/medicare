import React from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useRouter } from './Router';
import { Shield, User, Stethoscope } from 'lucide-react';

// Protected Route Component
export const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = '/auth' }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const { navigate, currentPath } = useRouter();

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

  // Redirect to auth if not authenticated
  if (!isAuthenticated()) {
    // Store the attempted path for redirect after login
    localStorage.setItem('medicare_redirect_path', currentPath);
    navigate(redirectTo, { replace: true });
    return null;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.userType)) {
    return <UnauthorizedPage userType={user.userType} />;
  }

  return children;
};

// Public Route Component (redirects if already authenticated)
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { navigate } = useRouter();

  if (isAuthenticated()) {
    // Check for stored redirect path
    const redirectPath = localStorage.getItem('medicare_redirect_path');
    if (redirectPath && redirectPath !== '/auth') {
      localStorage.removeItem('medicare_redirect_path');
      navigate(redirectPath, { replace: true });
      return null;
    }

    // Default redirect based on user type
    const defaultPath = getDashboardPath(user.userType);
    navigate(defaultPath, { replace: true });
    return null;
  }

  return children;
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

// Unauthorized Page Component
const UnauthorizedPage = ({ userType }) => {
  const { navigate } = useRouter();

  const getIcon = () => {
    switch (userType) {
      case 'admin': return <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      case 'doctor': return <Stethoscope className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      case 'patient': return <User className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      default: return <User className="w-16 h-16 text-red-500 mx-auto mb-4" />;
    }
  };

  const handleGoToDashboard = () => {
    const dashboardPath = getDashboardPath(userType);
    navigate(dashboardPath);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        {getIcon()}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. 
          Your account type ({userType}) doesn't have the required privileges.
        </p>
        <div className="space-y-2">
          <button 
            onClick={handleGoToDashboard}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go to My Dashboard
          </button>
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Go Back
          </button>
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
      const dashboardPath = getDashboardPath(user.userType);
      navigate(dashboardPath);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-2">
          <button 
            onClick={handleGoHome}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {isAuthenticated() ? 'Go to Dashboard' : 'Go to Login'}
          </button>
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};