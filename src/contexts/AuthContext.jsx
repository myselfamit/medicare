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
          // Ensure we have the required fields and normalize user type
          if (userData.user_type && userData.email_id) {
            // Normalize user type field for consistency
            userData.userType = userData.user_type;
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
    // List of all possible medicare-related localStorage keys
    const medicareKeys = [
      'medicare_user',
      'medicare_user_type', 
      'medicare_email_id',
      'medicare_token',
      'medicare_refresh_token',
      'medicare_redirect_path',
      'medicare_session',
      'medicare_preferences',
      'medicare_last_login'
    ];
    
    // Remove each key
    medicareKeys.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log('Cleared localStorage key:', key);
      }
    });
    
    // Also clear any sessionStorage items
    medicareKeys.forEach(key => {
      if (sessionStorage.getItem(key)) {
        sessionStorage.removeItem(key);
        console.log('Cleared sessionStorage key:', key);
      }
    });
    
    // Verify clearance
    const remainingMedicareKeys = medicareKeys.filter(key => 
      localStorage.getItem(key) || sessionStorage.getItem(key)
    );
    
    if (remainingMedicareKeys.length > 0) {
      console.warn('Some localStorage/sessionStorage keys were not cleared:', remainingMedicareKeys);
    } else {
      console.log('All medicare-related storage cleared successfully');
    }
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

        // Create user object with backend data and normalize fields
        const user = {
          user_type: userData.user_type,
          email_id: userData.email_id,
          userType: userData.user_type, // Normalized field for component compatibility
          email: userData.email_id,     // Normalized field for component compatibility
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

  // Enhanced logout with verification
  const logout = () => {
    console.log('Initiating logout process...');
    
    try {
      // Clear user state first
      setUser(null);
      
      // Clear all localStorage data
      clearAuthData();
      
      // Additional cleanup - scan for any medicare-related keys
      const allKeys = Object.keys(localStorage);
      const medicareKeys = allKeys.filter(key => key.toLowerCase().includes('medicare'));
      
      medicareKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log('Removed additional medicare key:', key);
      });
      
      // Verify logout success
      const remainingKeys = [
        'medicare_user',
        'medicare_user_type', 
        'medicare_email_id',
        'medicare_token'
      ].filter(key => localStorage.getItem(key));
      
      if (remainingKeys.length === 0) {
        console.log('✅ Logout successful - all data cleared');
      } else {
        console.warn('⚠️ Some data may not have been cleared:', remainingKeys);
        
        // Force clear critical items one more time
        localStorage.removeItem('medicare_user');
        localStorage.removeItem('medicare_user_type');
        localStorage.removeItem('medicare_email_id');
        localStorage.removeItem('medicare_token');
      }
      
      console.log('Final localStorage state:', {
        hasUser: !!localStorage.getItem('medicare_user'),
        hasUserType: !!localStorage.getItem('medicare_user_type'),
        hasEmail: !!localStorage.getItem('medicare_email_id'),
        hasToken: !!localStorage.getItem('medicare_token'),
        totalKeys: Object.keys(localStorage).length
      });
      
    } catch (error) {
      console.error('Error during logout:', error);
      
      // Fallback - force clear critical items
      try {
        localStorage.clear(); // Nuclear option - clear everything
        console.log('Performed complete localStorage clear as fallback');
      } catch (clearError) {
        console.error('Failed to clear localStorage:', clearError);
      }
    }
    
    // Redirect to auth page
    setTimeout(() => {
      window.history.replaceState({}, '', '/auth');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 100);
  };

  const isAuthenticated = () => {
    const authenticated = !!(user && (user.user_type || user.userType) && (user.email_id || user.email));
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
      
      // Ensure both user_type and userType are updated for consistency
      if (updatedData.user_type) {
        updatedUser.userType = updatedData.user_type;
      }
      if (updatedData.userType) {
        updatedUser.user_type = updatedData.userType;
      }
      
      setUser(updatedUser);
      localStorage.setItem('medicare_user', JSON.stringify(updatedUser));
      
      // Update individual localStorage items if they changed
      if (updatedData.user_type || updatedData.userType) {
        localStorage.setItem('medicare_user_type', updatedUser.user_type);
      }
      if (updatedData.email_id || updatedData.email) {
        localStorage.setItem('medicare_email_id', updatedUser.email_id || updatedUser.email);
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