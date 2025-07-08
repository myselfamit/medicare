// apis/DoctorDashboardApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class DoctorDashboardApi {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

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
      console.log(`🔥 Making request to: ${url}`);
      console.log('🔥 Request options:', requestOptions);
      
      const response = await fetch(url, requestOptions);
      const responseText = await response.text();
      
      console.log('🔥 Response status:', response.status);
      console.log('🔥 Response text:', responseText);
      
      if (response.ok) {
        const data = responseText ? JSON.parse(responseText) : {};
        console.log('✅ Success response:', data);
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        console.error('❌ Error response:', response.status, responseText);
        let errorData = {};
        try {
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('❌ Error parsing error response:', parseError);
        }
        
        return {
          success: false,
          error: errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      return {
        success: false,
        error: error.message || 'Network error occurred. Please check your connection.',
        status: 0
      };
    }
  }

  async getDashboardData(userType, emailId) {
    console.log('🔥 getDashboardData called with:', { userType, emailId });
    
    if (!userType) {
      return { success: false, error: 'User type is required' };
    }

    if (!emailId) {
      return { success: false, error: 'Email ID is required' };
    }

    if (userType !== 'doctor') {
      return { success: false, error: 'Invalid user type. Must be doctor.' };
    }

    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    console.log('🔥 Sending dashboard request with payload:', payload);

    const result = await this.makeRequest('/v1/doctor/dashboard', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Dashboard API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Dashboard data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Dashboard data retrieved successfully',
          data: result.data.data,
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      // Handle specific error status codes
      if (result.status === 403) {
        return { success: false, error: 'Access denied. Only doctors can access this dashboard.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Doctor not found or dashboard data unavailable' };
      } else if (result.status === 400) {
        return { success: false, error: result.error || 'Invalid request data' };
      } else if (result.status === 500) {
        return { success: false, error: 'Server error. Please try again later.' };
      } else if (result.status === 0) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000' };
      } else {
        return { success: false, error: result.error || 'Failed to retrieve dashboard data' };
      }
    }
  }
}

const doctorDashboardApi = new DoctorDashboardApi();
export default doctorDashboardApi;