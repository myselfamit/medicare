// utils/apiHelper.js
const API_BASE_URL = 'http://127.0.0.1:8000/v1';

class ApiHelper {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Get user data from localStorage for API requests
  getUserData() {
    return {
      user_type: localStorage.getItem('medicare_user_type'),
      email_id: localStorage.getItem('medicare_email_id')
    };
  }

  // Get headers with user authentication data
  getAuthHeaders(additionalHeaders = {}) {
    const userData = this.getUserData();
    
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(userData.user_type && { 'X-User-Type': userData.user_type }),
      ...(userData.email_id && { 'X-User-Email': userData.email_id }),
      ...additionalHeaders
    };
  }

  // Make authenticated API request
  async makeAuthenticatedRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const userData = this.getUserData();

    // Check if user is authenticated
    if (!userData.user_type || !userData.email_id) {
      throw new Error('User not authenticated. Please login again.');
    }

    const defaultOptions = {
      headers: this.getAuthHeaders(options.headers)
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      console.log(`Making authenticated request to: ${url}`);
      console.log('Request options:', requestOptions);
      
      const response = await fetch(url, requestOptions);
      const responseText = await response.text();
      
      console.log('Response status:', response.status);
      console.log('Response text:', responseText);
      
      if (response.ok) {
        const data = responseText ? JSON.parse(responseText) : {};
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        let errorData = {};
        try {
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
        
        // Handle authentication errors
        if (response.status === 401 || response.status === 403) {
          // Clear local storage and redirect to login
          localStorage.removeItem('medicare_user');
          localStorage.removeItem('medicare_user_type');
          localStorage.removeItem('medicare_email_id');
          window.location.href = '/auth';
          return {
            success: false,
            error: 'Session expired. Please login again.',
            status: response.status
          };
        }
        
        return {
          success: false,
          error: errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      console.error('Network error:', error);
      return {
        success: false,
        error: error.message || 'Network error occurred. Please check your connection.',
        status: 0
      };
    }
  }

  // Helper method for GET requests
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.makeAuthenticatedRequest(url, {
      method: 'GET'
    });
  }

  // Helper method for POST requests
  async post(endpoint, data = {}) {
    const userData = this.getUserData();
    
    // Include user data in the request body
    const requestBody = {
      ...data,
      user_type: userData.user_type,
      email_id: userData.email_id
    };

    return this.makeAuthenticatedRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    });
  }

  // Helper method for PUT requests
  async put(endpoint, data = {}) {
    const userData = this.getUserData();
    
    // Include user data in the request body
    const requestBody = {
      ...data,
      user_type: userData.user_type,
      email_id: userData.email_id
    };

    return this.makeAuthenticatedRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    });
  }

  // Helper method for DELETE requests
  async delete(endpoint, data = {}) {
    const userData = this.getUserData();
    
    // Include user data in the request body for DELETE requests
    const requestBody = {
      ...data,
      user_type: userData.user_type,
      email_id: userData.email_id
    };

    return this.makeAuthenticatedRequest(endpoint, {
      method: 'DELETE',
      body: JSON.stringify(requestBody)
    });
  }

  // Check if user is authenticated
  isAuthenticated() {
    const userData = this.getUserData();
    return !!(userData.user_type && userData.email_id);
  }

  // Get current user type
  getCurrentUserType() {
    return localStorage.getItem('medicare_user_type');
  }

  // Get current user email
  getCurrentUserEmail() {
    return localStorage.getItem('medicare_email_id');
  }
}

// Create and export a singleton instance
const apiHelper = new ApiHelper();
export default apiHelper;