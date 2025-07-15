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
  Stethoscope,
  Award,
  BookOpen,
  Clock,
  Star,
  Users,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Shield,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import doctorProfileApi from '../../apis/DoctorProfileApi.js';

const DoctorProfile = () => {
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

      const result = await doctorProfileApi.getProfile(userType, emailId);

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

      const result = await doctorProfileApi.updateProfile(userType, emailId, editData);

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
        <Icon className="w-5 h-5 text-green-600 mr-2" />
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          <p className="text-gray-600 mt-1">Manage your professional information and settings</p>
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
                    : 'bg-green-600 hover:bg-green-700 text-white'
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
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
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
                  <button className="absolute bottom-4 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Dr. {profileData?.first_name} {profileData?.last_name}
              </h3>
              <p className="text-gray-600">{profileData?.specialty}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {profileData?.join_date ? new Date(profileData.join_date).getFullYear() : 'N/A'}
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Doctor ID: {profileData?.doctor_id || 'N/A'}
                </div>
              </div>
            </div>
          </InfoCard>

          {/* Professional Stats */}
          <div className="mt-6">
            <InfoCard title="Professional Overview" icon={Star}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold">{profileData?.experience || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Patients Treated</span>
                  <span className="font-semibold">{profileData?.total_patients || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-semibold text-yellow-600">{profileData?.rating || 0}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-semibold text-green-600">${profileData?.consultation_fee || 0}</span>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Professional Information */}
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

          {/* Professional Information */}
          <InfoCard title="Professional Information" icon={Stethoscope}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField label="Medical License Number" field="license_number" required />
              <EditableField label="Department" field="department" required />
              <EditableField label="Specialty" field="specialty" required />
              <EditableField label="Sub-specialty" field="sub_specialty" />
              <EditableField label="Experience" field="experience" />
              <EditableField label="Consultation Fee ($)" field="consultation_fee" type="number" />
              <div className="md:col-span-2">
                <EditableField label="Qualifications" field="qualifications" />
              </div>
            </div>
          </InfoCard>

          {/* Education & Certifications */}
          <InfoCard title="Education & Certifications" icon={Award}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField label="Medical School" field="medical_school" />
              <EditableField label="Graduation Year" field="graduation_year" type="number" />
              <EditableField label="Residency" field="residency" />
              <EditableField label="Fellowship" field="fellowship" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Board Certifications
                </label>
                {editMode ? (
                  <textarea
                    value={editData.board_certifications || ''}
                    onChange={(e) => handleInputChange('board_certifications', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                    placeholder="List your board certifications..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.board_certifications || 'No certifications listed'}
                  </p>
                )}
              </div>
            </div>
          </InfoCard>

          {/* Professional Experience */}
          <InfoCard title="Professional Experience" icon={Briefcase}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Positions
                </label>
                {editMode ? (
                  <textarea
                    value={editData.previous_positions || ''}
                    onChange={(e) => handleInputChange('previous_positions', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="4"
                    placeholder="List your previous positions and experience..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.previous_positions || 'No previous positions listed'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Research & Publications
                </label>
                {editMode ? (
                  <textarea
                    value={editData.research_publications || ''}
                    onChange={(e) => handleInputChange('research_publications', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="4"
                    placeholder="List your research work and publications..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.research_publications || 'No research or publications listed'}
                  </p>
                )}
              </div>
            </div>
          </InfoCard>

          {/* Work Schedule & Availability */}
          <InfoCard title="Work Schedule & Availability" icon={Clock}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Working Hours</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div key={day} className="text-sm">
                      <p className="font-medium text-gray-700">{day}</p>
                      {editMode ? (
                        <div className="space-y-1">
                          <input
                            type="time"
                            value={editData.working_hours?.[day.toLowerCase()]?.start || ''}
                            onChange={(e) => handleInputChange(`working_hours.${day.toLowerCase()}.start`, e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded text-xs"
                          />
                          <input
                            type="time"
                            value={editData.working_hours?.[day.toLowerCase()]?.end || ''}
                            onChange={(e) => handleInputChange(`working_hours.${day.toLowerCase()}.end`, e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded text-xs"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-600 text-xs">
                          {profileData?.working_hours?.[day.toLowerCase()]?.start && profileData?.working_hours?.[day.toLowerCase()]?.end
                            ? `${profileData.working_hours[day.toLowerCase()].start} - ${profileData.working_hours[day.toLowerCase()].end}`
                            : 'Closed'
                          }
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableField label="Office Location" field="office_location" />
                <EditableField label="Room Number" field="room_number" />
              </div>
            </div>
          </InfoCard>

          {/* Contact & Address Information */}
          <InfoCard title="Contact & Address Information" icon={MapPin}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <EditableField label="Office Address" field="office_address" />
              </div>
              <EditableField label="City" field="city" />
              <EditableField label="State" field="state" />
              <EditableField label="ZIP Code" field="zip_code" />
              <EditableField label="Country" field="country" />
              <EditableField label="Emergency Contact" field="emergency_contact" />
              <EditableField label="Emergency Phone" field="emergency_phone" />
            </div>
          </InfoCard>

          {/* Professional Bio */}
          <InfoCard title="Professional Bio" icon={BookOpen}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Me
              </label>
              {editMode ? (
                <textarea
                  value={editData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="5"
                  placeholder="Write a brief professional bio that patients will see..."
                />
              ) : (
                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {profileData?.bio || 'No bio provided'}
                </p>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField 
                label="Languages Spoken" 
                field="languages" 
                options={['English', 'Spanish', 'French', 'German', 'Chinese', 'Hindi', 'Arabic', 'Other']} 
              />
              <SelectField 
                label="Telemedicine Available" 
                field="telemedicine_available" 
                options={['Yes', 'No']} 
              />
            </div>
          </InfoCard>

          {/* Professional Memberships */}
          <InfoCard title="Professional Memberships & Awards" icon={Award}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Memberships
                </label>
                {editMode ? (
                  <textarea
                    value={editData.professional_memberships || ''}
                    onChange={(e) => handleInputChange('professional_memberships', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                    placeholder="List your professional memberships and associations..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.professional_memberships || 'No memberships listed'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Awards & Recognition
                </label>
                {editMode ? (
                  <textarea
                    value={editData.awards || ''}
                    onChange={(e) => handleInputChange('awards', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                    placeholder="List any awards or recognition you've received..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.awards || 'No awards listed'}
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

export default DoctorProfile;