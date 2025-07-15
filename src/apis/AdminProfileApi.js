// apis/AdminProfileApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class AdminProfileApi {
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

  async getProfile(userType, emailId) {
    console.log('🔥 getProfile called with:', { userType, emailId });
    
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

    console.log('🔥 Sending profile request with payload:', payload);

    const result = await this.makeRequest('/v1/med-admin/profile', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Profile API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Profile data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Profile retrieved successfully',
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
        return { success: false, error: 'Access denied. Only administrators can access this profile.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Administrator profile not found' };
      } else if (result.status === 400) {
        return { success: false, error: result.error || 'Invalid request data' };
      } else if (result.status === 500) {
        return { success: false, error: 'Server error. Please try again later.' };
      } else if (result.status === 0) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000' };
      } else {
        return { success: false, error: result.error || 'Failed to retrieve profile data' };
      }
    }
  }

  async updateProfile(userType, emailId, profileData) {
    console.log('🔥 updateProfile called with:', { userType, emailId, profileData });
    
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
      email_id: emailId.toLowerCase(),
      profile_data: profileData
    };

    console.log('🔥 Sending profile update request with payload:', payload);

    const result = await this.makeRequest('/v1/med-admin/profile', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Profile update API result:', result);

    if (result.success) {
      if (result.data && result.data.success) {
        console.log('✅ Profile updated successfully:', result.data);
        return {
          success: true,
          message: result.data.message || 'Profile updated successfully',
          data: result.data.data || profileData,
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
        return { success: false, error: 'Access denied. You can only update your own profile.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Administrator profile not found' };
      } else if (result.status === 400) {
        return { success: false, error: result.error || 'Invalid profile data' };
      } else if (result.status === 422) {
        return { success: false, error: 'Validation failed. Please check your profile data.' };
      } else if (result.status === 500) {
        return { success: false, error: 'Server error. Please try again later.' };
      } else if (result.status === 0) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000' };
      } else {
        return { success: false, error: result.error || 'Failed to update profile' };
      }
    }
  }

  async uploadProfilePicture(userType, emailId, imageFile) {
    console.log('🔥 uploadProfilePicture called with:', { userType, emailId, imageFile });
    
    if (!userType) {
      return { success: false, error: 'User type is required' };
    }

    if (!emailId) {
      return { success: false, error: 'Email ID is required' };
    }

    if (userType !== 'admin') {
      return { success: false, error: 'Invalid user type. Must be admin.' };
    }

    if (!imageFile) {
      return { success: false, error: 'Image file is required' };
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('user_type', userType.toLowerCase());
    formData.append('email_id', emailId.toLowerCase());
    formData.append('profile_picture', imageFile);

    console.log('🔥 Uploading profile picture...');

    const result = await this.makeRequest('/v1/med-admin/profile/picture', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        'Accept': 'application/json'
      }
    });

    console.log('🔥 Profile picture upload API result:', result);

    if (result.success) {
      if (result.data && result.data.success) {
        console.log('✅ Profile picture uploaded successfully:', result.data);
        return {
          success: true,
          message: result.data.message || 'Profile picture updated successfully',
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
        return { success: false, error: 'Access denied. You can only upload your own profile picture.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Administrator profile not found' };
      } else if (result.status === 400) {
        return { success: false, error: result.error || 'Invalid image file' };
      } else if (result.status === 413) {
        return { success: false, error: 'Image file is too large. Please choose a smaller file.' };
      } else if (result.status === 415) {
        return { success: false, error: 'Invalid file type. Please upload a valid image file (JPEG, PNG, etc.).' };
      } else if (result.status === 500) {
        return { success: false, error: 'Server error. Please try again later.' };
      } else if (result.status === 0) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000' };
      } else {
        return { success: false, error: result.error || 'Failed to upload profile picture' };
      }
    }
  }

  async deleteProfile(userType, emailId) {
    console.log('🔥 deleteProfile called with:', { userType, emailId });
    
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

    console.log('🔥 Sending profile deletion request with payload:', payload);

    const result = await this.makeRequest('/v1/med-admin/profile', {
      method: 'DELETE',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Profile deletion API result:', result);

    if (result.success) {
      if (result.data && result.data.success) {
        console.log('✅ Profile deleted successfully:', result.data);
        return {
          success: true,
          message: result.data.message || 'Profile deleted successfully',
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
        return { success: false, error: 'Access denied. You can only delete your own profile.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Administrator profile not found' };
      } else if (result.status === 400) {
        return { success: false, error: result.error || 'Invalid request data' };
      } else if (result.status === 500) {
        return { success: false, error: 'Server error. Please try again later.' };
      } else if (result.status === 0) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000' };
      } else {
        return { success: false, error: result.error || 'Failed to delete profile' };
      }
    }
  }
}

const adminProfileApi = new AdminProfileApi();
export default adminProfileApi;