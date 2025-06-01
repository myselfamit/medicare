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
    // Check if user is logged in (check localStorage, token, etc.)
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('medicare_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('medicare_user');
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (userData) => {
    // Simulate API call - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validate required fields
          if (!userData.email || !userData.userType) {
            reject(new Error('Email and user type are required'));
            return;
          }

          const user = {
            id: Date.now(), // Use timestamp as ID for demo
            email: userData.email,
            userType: userData.userType || 'patient',
            firstName: userData.firstName || 'John',
            lastName: userData.lastName || 'Doe',
            loginTime: new Date().toISOString()
          };

          setUser(user);
          localStorage.setItem('medicare_user', JSON.stringify(user));
          resolve(user);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medicare_user');
    // Clear any other user-related data
    localStorage.removeItem('medicare_token');
    
    // Redirect to auth page
    window.history.replaceState({}, '', '/auth');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (Array.isArray(roles)) {
      return roles.includes(user.userType);
    }
    return user.userType === roles;
  };

  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('medicare_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};