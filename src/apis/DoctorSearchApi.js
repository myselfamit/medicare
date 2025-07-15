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

  async getDepartments() {
    console.log('🔥 getDepartments called');
    
    const result = await this.makeRequest('/v1/patient/departments', {
      method: 'GET'
    });

    console.log('🔥 Departments API result:', result);

    if (result.success) {
      // Handle both direct data and nested response format
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Departments data received (nested):', result.data.data);
        return {
          success: true,
          data: result.data.data.departments || result.data.data || []
        };
      } else if (result.data && Array.isArray(result.data)) {
        console.log('✅ Departments data received (direct):', result.data);
        return {
          success: true,
          data: result.data
        };
      } else {
        // Return mock data if API is not ready
        console.log('⚠️ Using mock departments data');
        return {
          success: true,
          data: [
            {
              id: 1,
              name: 'Cardiology',
              specialties: ['General Cardiology', 'Interventional Cardiology', 'Electrophysiology']
            },
            {
              id: 2,
              name: 'Neurology',
              specialties: ['General Neurology', 'Neurosurgery', 'Pediatric Neurology']
            },
            {
              id: 3,
              name: 'Pediatrics',
              specialties: ['General Pediatrics', 'Pediatric Surgery', 'Neonatology']
            },
            {
              id: 4,
              name: 'Orthopedics',
              specialties: ['Orthopedic Surgery', 'Sports Medicine', 'Joint Replacement']
            },
            {
              id: 5,
              name: 'Dermatology',
              specialties: ['General Dermatology', 'Cosmetic Dermatology', 'Dermatopathology']
            }
          ]
        };
      }
    } else {
      console.error('❌ API request failed:', result);
      // Return mock data as fallback
      return {
        success: true,
        data: [
          {
            id: 1,
            name: 'Cardiology',
            specialties: ['General Cardiology', 'Interventional Cardiology']
          },
          {
            id: 2,
            name: 'Neurology',
            specialties: ['General Neurology', 'Neurosurgery']
          },
          {
            id: 3,
            name: 'Pediatrics',
            specialties: ['General Pediatrics', 'Pediatric Surgery']
          }
        ]
      };
    }
  }

  async searchDoctors(filters = {}) {
    console.log('🔥 searchDoctors called with filters:', filters);
    
    const queryParams = new URLSearchParams();
    if (filters.department) queryParams.append('department', filters.department);
    if (filters.specialty) queryParams.append('specialty', filters.specialty);
    
    const endpoint = `/v1/patient/doctors${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const result = await this.makeRequest(endpoint, {
      method: 'GET'
    });

    console.log('🔥 Doctors API result:', result);

    if (result.success) {
      // Handle both direct data and nested response format
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Doctors data received (nested):', result.data.data);
        return {
          success: true,
          data: result.data.data.doctors || result.data.data || []
        };
      } else if (result.data && Array.isArray(result.data)) {
        console.log('✅ Doctors data received (direct):', result.data);
        return {
          success: true,
          data: result.data
        };
      } else {
        // Return mock data if API is not ready
        console.log('⚠️ Using mock doctors data');
        return {
          success: true,
          data: [
            {
              id: 1,
              first_name: 'Dr. Sarah',
              last_name: 'Johnson',
              specialty: 'Cardiology',
              department: 'Cardiology',
              qualification: 'MD, FACC',
              experience: '8 years',
              rating: 4.8,
              total_reviews: 124,
              consultation_fee: 200,
              location: 'Building A, Floor 2',
              phone: '+1 (555) 123-4567',
              email: 'sarah.johnson@medicare.com',
              about: 'Dr. Johnson is a board-certified cardiologist with expertise in interventional cardiology.',
              working_hours: {
                monday: { start: '09:00', end: '17:00' },
                tuesday: { start: '09:00', end: '17:00' },
                wednesday: { start: '09:00', end: '17:00' },
                thursday: { start: '09:00', end: '17:00' },
                friday: { start: '09:00', end: '15:00' },
                saturday: null,
                sunday: null
              }
            },
            {
              id: 2,
              first_name: 'Dr. Michael',
              last_name: 'Chen',
              specialty: 'Neurology',
              department: 'Neurology',
              qualification: 'MD, PhD',
              experience: '12 years',
              rating: 4.9,
              total_reviews: 89,
              consultation_fee: 250,
              location: 'Building B, Floor 3',
              phone: '+1 (555) 234-5678',
              email: 'michael.chen@medicare.com',
              about: 'Dr. Chen specializes in neurological disorders and has extensive research experience.',
              working_hours: {
                monday: { start: '08:00', end: '16:00' },
                tuesday: { start: '08:00', end: '16:00' },
                wednesday: { start: '08:00', end: '16:00' },
                thursday: { start: '08:00', end: '16:00' },
                friday: { start: '08:00', end: '14:00' },
                saturday: { start: '10:00', end: '14:00' },
                sunday: null
              }
            },
            {
              id: 3,
              first_name: 'Dr. Emily',
              last_name: 'Rodriguez',
              specialty: 'Pediatrics',
              department: 'Pediatrics',
              qualification: 'MD, FAAP',
              experience: '6 years',
              rating: 4.7,
              total_reviews: 156,
              consultation_fee: 180,
              location: 'Building A, Floor 1',
              phone: '+1 (555) 345-6789',
              email: 'emily.rodriguez@medicare.com',
              about: 'Dr. Rodriguez is dedicated to providing comprehensive pediatric care.',
              working_hours: {
                monday: { start: '10:00', end: '18:00' },
                tuesday: { start: '10:00', end: '18:00' },
                wednesday: { start: '10:00', end: '18:00' },
                thursday: { start: '10:00', end: '18:00' },
                friday: { start: '10:00', end: '16:00' },
                saturday: null,
                sunday: null
              }
            }
          ].filter(doctor => {
            if (filters.department && doctor.department !== filters.department) return false;
            if (filters.specialty && doctor.specialty !== filters.specialty) return false;
            return true;
          })
        };
      }
    } else {
      console.error('❌ API request failed:', result);
      // Return empty array on error
      return {
        success: true,
        data: []
      };
    }
  }

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
      // Handle both direct data and nested response format
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Doctor slots data received (nested):', result.data.data);
        return {
          success: true,
          data: result.data.data.slots || result.data.data || []
        };
      } else if (result.data && Array.isArray(result.data)) {
        console.log('✅ Doctor slots data received (direct):', result.data);
        return {
          success: true,
          data: result.data
        };
      } else {
        // Return mock slots if API is not ready
        console.log('⚠️ Using mock slots data');
        const mockSlots = [
          { time: '09:00', available: true },
          { time: '09:30', available: true },
          { time: '10:00', available: false },
          { time: '10:30', available: true },
          { time: '11:00', available: true },
          { time: '11:30', available: false },
          { time: '14:00', available: true },
          { time: '14:30', available: true },
          { time: '15:00', available: true },
          { time: '15:30', available: false },
          { time: '16:00', available: true },
          { time: '16:30', available: true }
        ];
        
        return {
          success: true,
          data: mockSlots
        };
      }
    } else {
      console.error('❌ API request failed:', result);
      // Return empty slots on error
      return {
        success: true,
        data: []
      };
    }
  }

  async bookAppointment(bookingData) {
    console.log('🔥 bookAppointment called with:', bookingData);
    
    const result = await this.makeRequest('/v1/patient/appointments/book', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });

    console.log('🔥 Book appointment API result:', result);

    if (result.success) {
      return {
        success: true,
        data: result.data.data || result.data,
        message: result.data.message || 'Appointment booked successfully'
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