// apis/LoginApi.js
const API_BASE_URL = 'http://127.0.0.1:8000/v1';

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
      const response = await fetch(url, requestOptions);
      
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || errorData.error || 'Request failed',
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
        status: 0
      };
    }
  }

  // Login user - using if-then logic
  async loginUser(email, password) {
    // Validate inputs using if-then
    if (!email) {
      return {
        success: false,
        error: 'Email is required'
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
    if (!emailRegex.test(email)) {
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

    // Prepare login payload - schema: email and password
    const loginPayload = {
      email: email,
      password: password
    };

    // Make API request to login user
    const result = await this.makeRequest('/users/log-in', {
      method: 'POST',
      body: JSON.stringify(loginPayload)
    });

    // Handle response using if-then logic
    if (result.success) {
      return {
        success: true,
        message: 'Login successful',
        user: result.data,
        token: result.data?.token || null
      };
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
          error: 'Invalid login credentials'
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
      } else {
        return {
          success: false,
          error: result.error || 'Login failed'
        };
      }
    }
  }
}

// Create and export a singleton instance
const loginApi = new LoginApi();
export default loginApi;