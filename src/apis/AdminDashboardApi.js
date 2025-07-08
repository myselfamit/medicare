// apis/AdminDashboardApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class AdminDashboardApi {
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

    if (userType !== 'admin') {
      return { success: false, error: 'Invalid user type. Must be admin.' };
    }

    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    console.log('🔥 Sending dashboard request with payload:', payload);

    const result = await this.makeRequest('/v1/med-admin/dashboard', {
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
        return { success: false, error: 'Access denied. Only administrators can access this dashboard.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Admin not found or dashboard data unavailable' };
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

  async getAllAppointments(userType, emailId) {
    console.log('🔥 getAllAppointments called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/med-admin/appointments/all', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'All appointments retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve appointments'
      };
    }
  }

  async getAllFeedback(userType, emailId) {
    console.log('🔥 getAllFeedback called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/med-admin/feedback/all', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'All feedback retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve feedback'
      };
    }
  }

  async getDoctorManagement(userType, emailId) {
    console.log('🔥 getDoctorManagement called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/med-admin/doctors/manage', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'Doctor management data retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve doctor management data'
      };
    }
  }

  async addDoctor(userType, emailId, doctorData) {
    console.log('🔥 addDoctor called with:', { userType, emailId, doctorData });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      ...doctorData
    };

    const result = await this.makeRequest('/v1/med-admin/doctors/add', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Doctor added successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to add doctor'
      };
    }
  }

  async updateDoctor(userType, emailId, doctorId, doctorData) {
    console.log('🔥 updateDoctor called with:', { userType, emailId, doctorId, doctorData });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      doctor_id: doctorId,
      ...doctorData
    };

    const result = await this.makeRequest('/v1/med-admin/doctors/update', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Doctor updated successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to update doctor'
      };
    }
  }

  async deleteDoctor(userType, emailId, doctorId) {
    console.log('🔥 deleteDoctor called with:', { userType, emailId, doctorId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      doctor_id: doctorId
    };

    const result = await this.makeRequest('/v1/med-admin/doctors/delete', {
      method: 'DELETE',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Doctor deleted successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to delete doctor'
      };
    }
  }

  async getSystemAnalytics(userType, emailId) {
    console.log('🔥 getSystemAnalytics called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/med-admin/analytics', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'System analytics retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve system analytics'
      };
    }
  }

  async respondToFeedback(userType, emailId, feedbackId, responseText) {
    console.log('🔥 respondToFeedback called with:', { userType, emailId, feedbackId, responseText });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      feedback_id: feedbackId,
      response_text: responseText
    };

    const result = await this.makeRequest('/v1/med-admin/feedback/respond', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Response submitted successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to submit response'
      };
    }
  }
}

const adminDashboardApi = new AdminDashboardApi();
export default adminDashboardApi;