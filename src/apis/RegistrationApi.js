// apis/RegistrationApi.js
const API_BASE_URL = 'http://127.0.0.1:8000/v1';

class RegistrationApi {
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

  // Create new user account - using if-then logic
  async createUser(userData) {
    // Validate required fields using if-then
    if (!userData.email) {
      return {
        success: false,
        error: 'Email is required'
      };
    }

    if (!userData.password) {
      return {
        success: false,
        error: 'Password is required'
      };
    }

    if (!userData.firstName) {
      return {
        success: false,
        error: 'First name is required'
      };
    }

    if (!userData.lastName) {
      return {
        success: false,
        error: 'Last name is required'
      };
    }

    if (!userData.phone) {
      return {
        success: false,
        error: 'Phone number is required'
      };
    }

    if (!userData.userType) {
      return {
        success: false,
        error: 'User type is required'
      };
    }

    // Validate email format using if-then
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(userData.email)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Clean and validate phone number using if-then
    const cleanedPhone = userData.phone.replace(/\D/g, '');
    const phoneNumber = parseInt(cleanedPhone);
    
    if (isNaN(phoneNumber) || phoneNumber <= 0) {
      return {
        success: false,
        error: 'Invalid mobile number'
      };
    }

    // Transform frontend data to backend schema format
    const apiPayload = {
      user_type: userData.userType,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email_id: userData.email,
      mobile: phoneNumber,
      password: userData.password
    };

    // Make API request to create user
    const result = await this.makeRequest('/users/sign-in', {
      method: 'POST',
      body: JSON.stringify(apiPayload)
    });

    // Handle response using if-then logic
    if (result.success) {
      return {
        success: true,
        message: 'Account created successfully',
        user: result.data
      };
    } else {
      // Handle specific error status codes using if-then
      if (result.status === 400) {
        return {
          success: false,
          error: result.error || 'Invalid data provided'
        };
      } else if (result.status === 409) {
        return {
          success: false,
          error: 'Email already exists'
        };
      } else if (result.status === 422) {
        return {
          success: false,
          error: 'Validation failed. Please check your data.'
        };
      } else if (result.status === 500) {
        return {
          success: false,
          error: 'Server error. Please try again later.'
        };
      } else {
        return {
          success: false,
          error: result.error || 'Failed to create account'
        };
      }
    }
  }
}

// Create and export a singleton instance
const registrationApi = new RegistrationApi();
export default registrationApi;