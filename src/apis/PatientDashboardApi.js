// apis/PatientDashboardApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class PatientDashboardApi {
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

    if (userType !== 'patient') {
      return { success: false, error: 'Invalid user type. Must be patient.' };
    }

    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    console.log('🔥 Sending dashboard request with payload:', payload);

    const result = await this.makeRequest('/v1/patient/dashboard', {
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
        return { success: false, error: 'Access denied. Only patients can access this dashboard.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Patient not found or dashboard data unavailable' };
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

  async getUpcomingAppointments(userType, emailId) {
    console.log('🔥 getUpcomingAppointments called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/patient/appointments/upcoming', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'Upcoming appointments retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve upcoming appointments'
      };
    }
  }

  async getPastAppointments(userType, emailId) {
    console.log('🔥 getPastAppointments called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/patient/appointments/history', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'Appointment history retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve appointment history'
      };
    }
  }

  async bookAppointment(userType, emailId, appointmentData) {
    console.log('🔥 bookAppointment called with:', { userType, emailId, appointmentData });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      ...appointmentData
    };

    const result = await this.makeRequest('/v1/patient/appointments/book', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Appointment booked successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to book appointment'
      };
    }
  }

  async submitFeedback(userType, emailId, feedbackData) {
    console.log('🔥 submitFeedback called with:', { userType, emailId, feedbackData });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      ...feedbackData
    };

    const result = await this.makeRequest('/v1/patient/feedback/submit', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Feedback submitted successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to submit feedback'
      };
    }
  }
}

const patientDashboardApi = new PatientDashboardApi();
export default patientDashboardApi;