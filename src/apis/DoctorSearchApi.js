// apis/DoctorSearchApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class DoctorSearchApi {
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

  async getDepartments() {
    const result = await this.makeRequest('/v1/doctors/departments', {
      method: 'GET'
    });

    if (result.success && result.data) {
      return {
        success: true,
        data: result.data.departments || []
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to fetch departments'
      };
    }
  }

  async searchDoctors(filters) {
    const result = await this.makeRequest('/v1/doctors/search', {
      method: 'POST',
      body: JSON.stringify(filters)
    });

    if (result.success && result.data) {
      return {
        success: true,
        data: result.data.doctors || []
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to search doctors'
      };
    }
  }

  async getDoctorSlots(doctorId, date) {
    const result = await this.makeRequest('/v1/doctors/slots', {
      method: 'POST',
      body: JSON.stringify({ doctor_id: doctorId, date: date })
    });

    if (result.success && result.data) {
      return {
        success: true,
        data: result.data.slots || []
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to fetch slots'
      };
    }
  }

  async bookAppointment(bookingData) {
    const result = await this.makeRequest('/v1/doctors/appointments/book', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to book appointment'
      };
    }
  }
}

const doctorSearchApi = new DoctorSearchApi();
export default doctorSearchApi;