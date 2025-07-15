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
  Shield,
  Award,
  Settings,
  Clock,
  Key,
  Users,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Activity,
  Lock,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import adminProfileApi from '../../apis/AdminProfileApi.js';

const AdminProfile = () => {
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

      const result = await adminProfileApi.getProfile(userType, emailId);

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

      const result = await adminProfileApi.updateProfile(userType, emailId, editData);

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
        <Icon className="w-5 h-5 text-purple-600 mr-2" />
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          <h1 className="text-3xl font-bold text-gray-900">Administrator Profile</h1>
          <p className="text-gray-600 mt-1">Manage your administrative information and system settings</p>
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
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
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
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
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
                  <button className="absolute bottom-4 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {profileData?.first_name} {profileData?.last_name}
              </h3>
              <p className="text-gray-600">{profileData?.role || 'System Administrator'}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Admin since {profileData?.admin_since ? new Date(profileData.admin_since).getFullYear() : 'N/A'}
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin ID: {profileData?.admin_id || 'N/A'}
                </div>
              </div>
            </div>
          </InfoCard>

          {/* Administrative Stats */}
          <div className="mt-6">
            <InfoCard title="Administrative Overview" icon={Activity}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Access Level</span>
                  <span className="font-semibold text-purple-600">{profileData?.access_level || 'Full Access'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Departments Managed</span>
                  <span className="font-semibold">{profileData?.departments_managed || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Login</span>
                  <span className="font-semibold">{profileData?.last_login ? new Date(profileData.last_login).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">System Uptime</span>
                  <span className="font-semibold text-green-600">{profileData?.system_uptime || '99.9%'}</span>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Administrative Information */}
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

          {/* Administrative Role & Permissions */}
          <InfoCard title="Administrative Role & Permissions" icon={Shield}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField label="Employee ID" field="employee_id" required />
              <EditableField label="Department" field="department" required />
              <SelectField 
                label="Role" 
                field="role" 
                options={['System Administrator', 'Senior Administrator', 'Department Administrator', 'IT Administrator', 'Security Administrator']} 
                required 
              />
              <SelectField 
                label="Access Level" 
                field="access_level" 
                options={['Full Access', 'Limited Access', 'Read Only', 'Department Specific']} 
                required 
              />
              <EditableField label="Reporting Manager" field="reporting_manager" />
              <EditableField label="Hire Date" field="hire_date" type="date" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  System Permissions
                </label>
                {editMode ? (
                  <textarea
                    value={editData.system_permissions || ''}
                    onChange={(e) => handleInputChange('system_permissions', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="3"
                    placeholder="List system permissions and access rights..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.system_permissions || 'No permissions listed'}
                  </p>
                )}
              </div>
            </div>
          </InfoCard>

          {/* Security Settings */}
          <InfoCard title="Security Settings" icon={Lock}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField label="Two-Factor Authentication" field="two_factor_enabled" />
              <EditableField label="Password Last Changed" field="password_last_changed" type="date" />
              <EditableField label="Security Question 1" field="security_question_1" />
              <EditableField label="Security Question 2" field="security_question_2" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Authorized IP Addresses
                </label>
                {editMode ? (
                  <textarea
                    value={editData.authorized_ips || ''}
                    onChange={(e) => handleInputChange('authorized_ips', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="3"
                    placeholder="List authorized IP addresses (one per line)..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.authorized_ips || 'No IP restrictions'}
                  </p>
                )}
              </div>
            </div>
          </InfoCard>

          {/* Contact & Address Information */}
          <InfoCard title="Contact & Address Information" icon={MapPin}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <EditableField label="Home Address" field="address" />
              </div>
              <EditableField label="City" field="city" />
              <EditableField label="State" field="state" />
              <EditableField label="ZIP Code" field="zip_code" />
              <EditableField label="Country" field="country" />
              <EditableField label="Emergency Contact Name" field="emergency_contact_name" />
              <EditableField label="Emergency Contact Phone" field="emergency_contact_phone" />
            </div>
          </InfoCard>

          {/* Professional Background */}
          <InfoCard title="Professional Background" icon={Briefcase}>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableField label="Education" field="education" />
                <EditableField label="Years of Experience" field="years_of_experience" type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Experience
                </label>
                {editMode ? (
                  <textarea
                    value={editData.previous_experience || ''}
                    onChange={(e) => handleInputChange('previous_experience', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="4"
                    placeholder="Describe your previous work experience..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.previous_experience || 'No previous experience listed'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certifications
                </label>
                {editMode ? (
                  <textarea
                    value={editData.certifications || ''}
                    onChange={(e) => handleInputChange('certifications', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="3"
                    placeholder="List your professional certifications..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.certifications || 'No certifications listed'}
                  </p>
                )}
              </div>
            </div>
          </InfoCard>

          {/* System Management Responsibilities */}
          <InfoCard title="System Management Responsibilities" icon={Settings}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Responsibilities
                </label>
                {editMode ? (
                  <textarea
                    value={editData.primary_responsibilities || ''}
                    onChange={(e) => handleInputChange('primary_responsibilities', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="4"
                    placeholder="List your primary administrative responsibilities..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.primary_responsibilities || 'No responsibilities listed'}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departments Managed
                  </label>
                  {editMode ? (
                    <textarea
                      value={editData.departments_managed_list || ''}
                      onChange={(e) => handleInputChange('departments_managed_list', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="List departments you manage..."
                    />
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                      {profileData?.departments_managed_list || 'No departments listed'}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    System Access Areas
                  </label>
                  {editMode ? (
                    <textarea
                      value={editData.system_access_areas || ''}
                      onChange={(e) => handleInputChange('system_access_areas', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="List system areas you have access to..."
                    />
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                      {profileData?.system_access_areas || 'No access areas listed'}
                    </p>
                  )}
                </div>
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
                            : 'Off'
                          }
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <EditableField label="Office Location" field="office_location" />
                <EditableField label="Extension" field="extension" />
                <SelectField 
                  label="Remote Work Available" 
                  field="remote_work_available" 
                  options={['Yes', 'No', 'Hybrid']} 
                />
              </div>
            </div>
          </InfoCard>

          {/* System Preferences */}
          <InfoCard title="System Preferences" icon={Settings}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField 
                label="Preferred Language" 
                field="preferred_language" 
                options={['English', 'Spanish', 'French', 'German', 'Chinese', 'Other']} 
              />
              <SelectField 
                label="Timezone" 
                field="timezone" 
                options={['EST', 'CST', 'MST', 'PST', 'UTC', 'Other']} 
              />
              <SelectField 
                label="Email Notifications" 
                field="email_notifications" 
                options={['All', 'Important Only', 'None']} 
              />
              <SelectField 
                label="SMS Alerts" 
                field="sms_alerts" 
                options={['Enabled', 'Disabled', 'Emergency Only']} 
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Notes
                </label>
                {editMode ? (
                  <textarea
                    value={editData.special_notes || ''}
                    onChange={(e) => handleInputChange('special_notes', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

          {/* Administrative Achievements */}
          <InfoCard title="Administrative Achievements" icon={Award}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Achievements
                </label>
                {editMode ? (
                  <textarea
                    value={editData.key_achievements || ''}
                    onChange={(e) => handleInputChange('key_achievements', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="4"
                    placeholder="List your key administrative achievements..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.key_achievements || 'No achievements listed'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Awards & Recognition
                </label>
                {editMode ? (
                  <textarea
                    value={editData.awards_recognition || ''}
                    onChange={(e) => handleInputChange('awards_recognition', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="3"
                    placeholder="List any awards or recognition received..."
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData?.awards_recognition || 'No awards listed'}
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

export default AdminProfile;