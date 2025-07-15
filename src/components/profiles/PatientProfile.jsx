import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Camera,
  Heart,
  Activity,
  FileText,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import patientProfileApi from '../../apis/PatientProfileApi.js';

const PatientProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      if (!userType || !emailId) {
        throw new Error('User information not available');
      }

      const result = await patientProfileApi.getProfile(userType, emailId);

      if (result.success) {
        setProfileData(result.data);
        setEditData(result.data);
      } else {
        setError(result.error || 'Failed to load profile');
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      const result = await patientProfileApi.updateProfile(userType, emailId, editData);

      if (result.success) {
        setProfileData(editData);
        setEditMode(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setEditMode(false);
    setError(null);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const InfoCard = ({ title, children, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Icon className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  const EditableField = ({ label, field, type = 'text', required = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {editMode ? (
        <input
          type={type}
          value={editData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required={required}
        />
      ) : (
        <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
          {profileData?.[field] || 'Not provided'}
        </p>
      )}
    </div>
  );

  const SelectField = ({ label, field, options, required = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {editMode ? (
        <select
          value={editData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required={required}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
          {profileData?.[field] || 'Not provided'}
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Profile</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadProfile}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
        </div>
        <div className="flex space-x-3">
          {editMode ? (
            <>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                  saving 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <p className="text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Picture and Basic Info */}
        <div className="lg:col-span-1">
          <InfoCard title="Profile Picture" icon={User}>
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={profileData?.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData?.first_name}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                {editMode && (
                  <button className="absolute bottom-4 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {profileData?.first_name} {profileData?.last_name}
              </h3>
              <p className="text-gray-600">Patient</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since {profileData?.member_since ? new Date(profileData.member_since).getFullYear() : 'N/A'}
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Patient ID: {profileData?.patient_id || 'N/A'}
                </div>
              </div>
            </div>
          </InfoCard>

          {/* Quick Stats */}
          <div className="mt-6">
            <InfoCard title="Health Overview" icon={Activity}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Appointments</span>
                  <span className="font-semibold">{profileData?.total_appointments || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Checkup</span>
                  <span className="font-semibold">{profileData?.last_checkup || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Health Score</span>
                  <span className="font-semibold text-green-600">{profileData?.health_score || 'Good'}</span>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Information */}
          <InfoCard title="Personal Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField label="First Name" field="first_name" required />
              <EditableField label="Last Name" field="last_name" required />
              <EditableField label="Email" field="email_id" type="email" required />
              <EditableField label="Phone" field="mobile" type="tel" required />
              <EditableField label="Date of Birth" field="date_of_birth" type="date" />
              <SelectField 
                label="Gender" 
                field="gender" 
                options={['Male', 'Female', 'Other', 'Prefer not to say']} 
              />
            </div>
          </InfoCard>

          {/* Address Information */}
          <InfoCard title="Address Information" icon={MapPin}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <EditableField label="Street Address" field="address" />
              </div>
              <EditableField label="City" field="city" />
              <EditableField label="State" field="state" />
              <EditableField label="ZIP Code" field="zip_code" />
              <EditableField label="Country" field="country" />
            </div>
          </InfoCard>

          {/* Medical Information */}
          <InfoCard title="Medical Information" icon={Heart}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField label="Blood Type" field="blood_type" />
              <EditableField label="Height (cm)" field="height" type="number" />
              <EditableField label="Weight (kg)" field="weight" type="number" />
              <EditableField label="Emergency Contact" field="emergency_contact" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allergies
                </label>
                {editMode ? (
                  <textarea
                    value={editData.allergies || ''}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="List any known allergies..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.allergies || 'No known allergies'}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical History
                </label>
                {editMode ? (
                  <textarea
                    value={editData.medical_history || ''}
                    onChange={(e) => handleInputChange('medical_history', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Brief medical history..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.medical_history || 'No medical history provided'}
                  </p>
                )}
              </div>
            </div>
          </InfoCard>

          {/* Insurance Information */}
          <InfoCard title="Insurance Information" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField label="Insurance Provider" field="insurance_provider" />
              <EditableField label="Policy Number" field="insurance_policy" />
              <EditableField label="Group Number" field="insurance_group" />
              <EditableField label="Policy Holder" field="policy_holder" />
            </div>
          </InfoCard>

          {/* Preferences */}
          <InfoCard title="Preferences" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField 
                label="Preferred Language" 
                field="preferred_language" 
                options={['English', 'Spanish', 'French', 'German', 'Chinese', 'Other']} 
              />
              <SelectField 
                label="Communication Preference" 
                field="communication_preference" 
                options={['Email', 'Phone', 'SMS', 'Mail']} 
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Notes
                </label>
                {editMode ? (
                  <textarea
                    value={editData.special_notes || ''}
                    onChange={(e) => handleInputChange('special_notes', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Any special notes or requirements..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.special_notes || 'No special notes'}
                  </p>
                )}
              </div>
            </div>
          </InfoCard>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center text-sm text-gray-500">
        Last updated: {profileData?.last_updated ? new Date(profileData.last_updated).toLocaleString() : 'Never'}
      </div>
    </div>
  );
};

export default PatientProfile;