// src/apis/PatientAppointmentsApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class PatientAppointmentsApi {
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

  // Get all departments
  async getDepartments() {
    console.log('🔥 getDepartments called');
    
    const result = await this.makeRequest('/v1/patient/departments', {
      method: 'GET'
    });

    console.log('🔥 Departments API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Departments data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Departments retrieved successfully',
          data: result.data.data.departments || [],
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      return this.handleErrorResponse(result);
    }
  }

  // Get doctors by department and specialty
  async getDoctors(filters = {}) {
    console.log('🔥 getDoctors called with filters:', filters);
    
    const queryParams = new URLSearchParams();
    if (filters.department) queryParams.append('department', filters.department);
    if (filters.specialty) queryParams.append('specialty', filters.specialty);
    
    const endpoint = `/v1/patient/doctors${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const result = await this.makeRequest(endpoint, {
      method: 'GET'
    });

    console.log('🔥 Doctors API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Doctors data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Doctors retrieved successfully',
          data: result.data.data.doctors || [],
          total_count: result.data.data.total_count || 0,
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      return this.handleErrorResponse(result);
    }
  }

  // Get doctor profile
  async getDoctorProfile(doctorId) {
    console.log('🔥 getDoctorProfile called with ID:', doctorId);
    
    const result = await this.makeRequest(`/v1/patient/doctors/profile`, {
      method: 'GET'
    });

    console.log('🔥 Doctor profile API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Doctor profile data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Doctor profile retrieved successfully',
          data: result.data.data,
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      return this.handleErrorResponse(result);
    }
  }

  // Get doctor available slots
  async getDoctorSlots(doctorId, date) {
    console.log('🔥 getDoctorSlots called with:', { doctorId, date });
    
    const queryParams = new URLSearchParams({
      doctor_id: doctorId,
      date: date
    });
    
    const result = await this.makeRequest(`/v1/patient/doctors/slots?${queryParams.toString()}`, {
      method: 'GET'
    });

    console.log('🔥 Doctor slots API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Doctor slots data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Doctor slots retrieved successfully',
          data: result.data.data,
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      return this.handleErrorResponse(result);
    }
  }

  // Book appointment
  async bookAppointment(userType, emailId, appointmentData) {
    console.log('🔥 bookAppointment called with:', { userType, emailId, appointmentData });
    
    if (!userType || !emailId) {
      return { success: false, error: 'User type and email ID are required' };
    }

    if (userType !== 'patient') {
      return { success: false, error: 'Invalid user type. Must be patient.' };
    }

    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      ...appointmentData
    };

    console.log('🔥 Sending book appointment request with payload:', payload);

    const result = await this.makeRequest('/v1/patient/appointments/book', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Book appointment API result:', result);

    if (result.success) {
      if (result.data && result.data.success) {
        console.log('✅ Appointment booked successfully:', result.data);
        return {
          success: true,
          message: result.data.message || 'Appointment booked successfully',
          data: result.data.data || {},
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      return this.handleErrorResponse(result);
    }
  }

  // Get patient appointments
  async getPatientAppointments(userType, emailId, appointmentType = 'all') {
    console.log('🔥 getPatientAppointments called with:', { userType, emailId, appointmentType });
    
    if (!userType || !emailId) {
      return { success: false, error: 'User type and email ID are required' };
    }

    if (userType !== 'patient') {
      return { success: false, error: 'Invalid user type. Must be patient.' };
    }

    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const queryParams = appointmentType !== 'all' ? `?type=${appointmentType}` : '';

    console.log('🔥 Sending get appointments request with payload:', payload);

    const result = await this.makeRequest(`/v1/patient/appointments${queryParams}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Get appointments API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Appointments data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Appointments retrieved successfully',
          data: result.data.data.appointments || [],
          total_count: result.data.data.total_count || 0,
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      return this.handleErrorResponse(result);
    }
  }

  // Update appointment (cancel, reschedule, update)
  async updateAppointment(userType, emailId, appointmentId, updateData) {
    console.log('🔥 updateAppointment called with:', { userType, emailId, appointmentId, updateData });
    
    if (!userType || !emailId) {
      return { success: false, error: 'User type and email ID are required' };
    }

    if (userType !== 'patient') {
      return { success: false, error: 'Invalid user type. Must be patient.' };
    }

    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      ...updateData
    };

    console.log('🔥 Sending update appointment request with payload:', payload);

    const result = await this.makeRequest(`/v1/patient/appointments/update`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Update appointment API result:', result);

    if (result.success) {
      if (result.data && result.data.success) {
        console.log('✅ Appointment updated successfully:', result.data);
        return {
          success: true,
          message: result.data.message || 'Appointment updated successfully',
          data: result.data.data || {},
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      return this.handleErrorResponse(result);
    }
  }

  // Cancel appointment (convenience method)
  async cancelAppointment(userType, emailId, appointmentId) {
    return this.updateAppointment(userType, emailId, appointmentId, { action: 'cancel' });
  }

  // Reschedule appointment (convenience method)
  async rescheduleAppointment(userType, emailId, appointmentId, newDate, newTime) {
    return this.updateAppointment(userType, emailId, appointmentId, {
      action: 'reschedule',
      new_date: newDate,
      new_time: newTime
    });
  }

  // Helper method to handle error responses
  handleErrorResponse(result) {
    if (result.status === 403) {
      return { success: false, error: 'Access denied. Only patients can perform this action.' };
    } else if (result.status === 404) {
      return { success: false, error: 'Resource not found' };
    } else if (result.status === 400) {
      return { success: false, error: result.error || 'Invalid request data' };
    } else if (result.status === 409) {
      return { success: false, error: result.error || 'Conflict - resource already exists' };
    } else if (result.status === 500) {
      return { success: false, error: 'Server error. Please try again later.' };
    } else if (result.status === 0) {
      return { success: false, error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000' };
    } else {
      return { success: false, error: result.error || 'Failed to process request' };
    }
  }
}

const patientAppointmentsApi = new PatientAppointmentsApi();
export default patientAppointmentsApi;