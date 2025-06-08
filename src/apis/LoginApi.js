// apis/LoginApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class LoginApi {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Helper method to make HTTP requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
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
      console.log(`Making request to: ${url}`);
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

  // Login user - updated to match backend API format
  async loginUser(userType, emailId, password) {
    // Validate inputs using if-then
    if (!userType) {
      return {
        success: false,
        error: 'User type is required'
      };
    }

    if (!emailId) {
      return {
        success: false,
        error: 'Email ID is required'
      };
    }

    if (!password) {
      return {
        success: false,
        error: 'Password is required'
      };
    }

    // Validate email format using if-then
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(emailId)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Validate password length using if-then
    if (password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters'
      };
    }

    // Validate user type
    const validUserTypes = ['patient', 'doctor', 'admin'];
    if (!validUserTypes.includes(userType.toLowerCase())) {
      return {
        success: false,
        error: 'Invalid user type. Must be patient, doctor, or admin'
      };
    }

    // Prepare login payload - match backend API schema exactly
    const loginPayload = {
      user_type: userType.toLowerCase(),
      email_id: emailId,
      password: password
    };

    console.log('Sending login request with payload:', loginPayload);

    // Make API request to login user
    const result = await this.makeRequest('/v1/users/log-in', {
      method: 'POST',
      body: JSON.stringify(loginPayload)
    });

    console.log('Login API result:', result);

    // Handle response using if-then logic
    if (result.success) {
      // Check if response has the expected structure
      if (result.data && result.data.success && result.data.data) {
        return {
          success: true,
          message: result.data.message || 'Login successful',
          user: result.data.data,
          status_code: result.data.status_code
        };
      } else {
        return {
          success: false,
          error: 'Invalid response format from server'
        };
      }
    } else {
      // Handle specific error status codes using if-then
      if (result.status === 401) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      } else if (result.status === 404) {
        return {
          success: false,
          error: 'User not found'
        };
      } else if (result.status === 400) {
        return {
          success: false,
          error: result.error || 'Invalid login credentials'
        };
      } else if (result.status === 403) {
        return {
          success: false,
          error: 'Account is disabled or suspended'
        };
      } else if (result.status === 422) {
        return {
          success: false,
          error: 'Invalid email or password format'
        };
      } else if (result.status === 429) {
        return {
          success: false,
          error: 'Too many login attempts. Please try again later.'
        };
      } else if (result.status === 500) {
        return {
          success: false,
          error: 'Server error. Please try again later.'
        };
      } else if (result.status === 0) {
        return {
          success: false,
          error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000'
        };
      } else {
        return {
          success: false,
          error: result.error || 'Login failed'
        };
      }
    }
  }

  // Helper method to validate user session
  async validateSession(userType, emailId) {
    if (!userType || !emailId) {
      return {
        success: false,
        error: 'User type and email ID are required for session validation'
      };
    }

    // This could be expanded to call a backend session validation endpoint
    return {
      success: true,
      message: 'Session is valid'
    };
  }
}

// Create and export a singleton instance
const loginApi = new LoginApi();
export default loginApi;