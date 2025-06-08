import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Authentication Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (check localStorage)
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('medicare_user');
        const savedUserType = localStorage.getItem('medicare_user_type');
        const savedEmailId = localStorage.getItem('medicare_email_id');
        
        console.log('Checking auth - localStorage data:', { savedUser, savedUserType, savedEmailId });
        
        if (savedUser && savedUserType && savedEmailId) {
          const userData = JSON.parse(savedUser);
          // Ensure we have the required fields
          if (userData.user_type && userData.email_id) {
            setUser(userData);
            console.log('User restored from localStorage:', userData);
          } else {
            // Clear incomplete data
            clearAuthData();
            console.log('Cleared incomplete auth data');
          }
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Clear corrupted data
        clearAuthData();
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem('medicare_user');
    localStorage.removeItem('medicare_user_type');
    localStorage.removeItem('medicare_email_id');
    localStorage.removeItem('medicare_token');
  };

  const login = async (userData) => {
    // This function now expects userData from the backend API response
    return new Promise((resolve, reject) => {
      try {
        console.log('Login function called with userData:', userData);
        
        // Validate required fields from backend
        if (!userData.user_type || !userData.email_id) {
          reject(new Error('Invalid user data: user_type and email_id are required'));
          return;
        }

        // Create user object with backend data
        const user = {
          user_type: userData.user_type,
          email_id: userData.email_id,
          userType: userData.user_type, // Keep both formats for compatibility
          email: userData.email_id,     // Keep both formats for compatibility
          firstName: userData.first_name || extractFirstName(userData.email_id),
          lastName: userData.last_name || '',
          loginTime: new Date().toISOString(),
          id: userData.id || Date.now()
        };

        console.log('Setting user in state:', user);

        // Save to state
        setUser(user);
        
        // Save to localStorage - save each piece separately for easy access in API calls
        localStorage.setItem('medicare_user', JSON.stringify(user));
        localStorage.setItem('medicare_user_type', userData.user_type);
        localStorage.setItem('medicare_email_id', userData.email_id);
        
        console.log('User logged in successfully and saved to localStorage');
        
        // Redirect based on user type
        redirectUserToDashboard(userData.user_type);
        
        resolve(user);
      } catch (error) {
        console.error('Login error in AuthContext:', error);
        reject(error);
      }
    });
  };

  const redirectUserToDashboard = (userType) => {
    console.log('Redirecting user based on type:', userType);
    
    let redirectPath;
    switch (userType) {
      case 'admin':
        redirectPath = '/admin';
        break;
      case 'doctor':
        redirectPath = '/doctor';
        break;
      case 'patient':
        redirectPath = '/patient';
        break;
      default:
        redirectPath = '/patient'; // Default fallback
    }
    
    console.log('Redirecting to:', redirectPath);
    
    // Use setTimeout to ensure state is updated before navigation
    setTimeout(() => {
      window.history.pushState({}, '', redirectPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 100);
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    
    // Clear all localStorage data
    clearAuthData();
    
    console.log('User logged out successfully');
    
    // Redirect to auth page
    window.history.replaceState({}, '', '/auth');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const isAuthenticated = () => {
    const authenticated = !!(user && user.user_type && user.email_id);
    console.log('isAuthenticated check:', authenticated, user);
    return authenticated;
  };

  const hasRole = (roles) => {
    if (!user) {
      console.log('hasRole check: no user');
      return false;
    }
    
    const userRole = user.user_type || user.userType;
    console.log('hasRole check:', { userRole, roles });
    
    if (Array.isArray(roles)) {
      return roles.includes(userRole);
    }
    return userRole === roles;
  };

  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('medicare_user', JSON.stringify(updatedUser));
      
      // Update individual localStorage items if they changed
      if (updatedData.user_type) {
        localStorage.setItem('medicare_user_type', updatedData.user_type);
      }
      if (updatedData.email_id) {
        localStorage.setItem('medicare_email_id', updatedData.email_id);
      }
      
      console.log('User updated:', updatedUser);
    }
  };

  // Helper function to extract first name from email
  const extractFirstName = (email) => {
    if (!email) return 'User';
    const localPart = email.split('@')[0];
    // Remove numbers and special characters, capitalize first letter
    const cleanName = localPart.replace(/[^a-zA-Z]/g, '');
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase() || 'User';
  };

  // Helper function to get user data for API requests
  const getUserForApi = () => {
    return {
      user_type: localStorage.getItem('medicare_user_type'),
      email_id: localStorage.getItem('medicare_email_id')
    };
  };

  // Helper function to get headers for API requests
  const getApiHeaders = (additionalHeaders = {}) => {
    const userType = localStorage.getItem('medicare_user_type');
    const emailId = localStorage.getItem('medicare_email_id');
    
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(userType && { 'X-User-Type': userType }),
      ...(emailId && { 'X-User-Email': emailId }),
      ...additionalHeaders
    };
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    updateUser,
    loading,
    getUserForApi,
    getApiHeaders
  };

  console.log('AuthContext current state:', { user, loading, isAuthenticated: isAuthenticated() });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};