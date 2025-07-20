import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Star, Clock, DollarSign, MapPin, X, AlertCircle, RefreshCw, User } from 'lucide-react';
import DoctorProfileModal from './DoctorProfileModal';
import doctorSearchApi from '../../apis/DoctorSearchApi';

const DoctorSearch = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  
  // Modal state - FIXED: Better state management
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Debug function to log state changes
  const debugLog = (action, data) => {
    console.log(`🔍 [DoctorSearch] ${action}:`, data);
  };

  // Load initial data
  useEffect(() => {
    loadDepartmentsAndDoctors();
  }, []);

  const loadDepartmentsAndDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      debugLog('Loading departments and doctors', 'Starting...');
      
      // Fetch departments
      const deptResult = await doctorSearchApi.getDepartments();
      debugLog('Departments result', deptResult);
      
      if (deptResult.success) {
        setDepartments(deptResult.data || []);
        debugLog('Departments loaded', deptResult.data);
      } else {
        console.warn('⚠️ Failed to load departments, using fallback');
        // Set fallback departments
        setDepartments([
          { id: 1, name: 'Cardiology', specialties: ['General Cardiology', 'Interventional Cardiology'] },
          { id: 2, name: 'Neurology', specialties: ['General Neurology', 'Neurosurgery'] },
          { id: 3, name: 'Pediatrics', specialties: ['General Pediatrics', 'Pediatric Surgery'] },
          { id: 4, name: 'Orthopedics', specialties: ['Orthopedic Surgery', 'Sports Medicine'] },
          { id: 5, name: 'Dermatology', specialties: ['General Dermatology', 'Cosmetic Dermatology'] }
        ]);
      }
      
      // Fetch all doctors initially
      const doctorResult = await doctorSearchApi.searchDoctors({});
      debugLog('Doctors result', doctorResult);
      
      if (doctorResult.success) {
        setDoctors(doctorResult.data || []);
        setFilteredDoctors(doctorResult.data || []);
        debugLog('Doctors loaded', doctorResult.data);
      } else {
        console.warn('⚠️ Failed to load doctors, using fallback');
        // Set fallback doctors
        const fallbackDoctors = [
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
        ];
        setDoctors(fallbackDoctors);
        setFilteredDoctors(fallbackDoctors);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('❌ Error loading data:', error);
      setError(error.message || 'Failed to load data');
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadDepartmentsAndDoctors();
  };

  // Handle department change
  const handleDepartmentChange = async (e) => {
    const dept = e.target.value;
    setSelectedDepartment(dept);
    setSelectedSpecialty('');
    
    if (dept) {
      const department = departments.find(d => d.name === dept);
      setAvailableSpecialties(department ? department.specialties || [] : []);
      await searchDoctors(dept, '');
    } else {
      setAvailableSpecialties([]);
      setFilteredDoctors(doctors);
    }
  };

  // Handle specialty change
  const handleSpecialtyChange = async (e) => {
    const spec = e.target.value;
    setSelectedSpecialty(spec);
    await searchDoctors(selectedDepartment, spec);
  };

  // Search doctors from backend
  const searchDoctors = async (dept, spec) => {
    try {
      const filters = {};
      if (dept) filters.department = dept;
      if (spec) filters.specialty = spec;
      
      const result = await doctorSearchApi.searchDoctors(filters);
      if (result.success) {
        setFilteredDoctors(result.data || []);
      } else {
        console.error('Search failed:', result.error);
        // Filter from existing doctors as fallback
        let filtered = doctors;
        if (dept) {
          filtered = filtered.filter(doctor => doctor.department === dept);
        }
        if (spec) {
          filtered = filtered.filter(doctor => doctor.specialty === spec);
        }
        setFilteredDoctors(filtered);
      }
    } catch (error) {
      console.error('Error searching doctors:', error);
      setFilteredDoctors([]);
    }
  };

  // FIXED: Open doctor profile with better error handling and state management
  const openDoctorProfile = (doctor) => {
    debugLog('Opening doctor profile', { doctor, currentModalState: showProfileModal });
    
    try {
      // Validate doctor data
      if (!doctor || !doctor.id) {
        console.error('❌ Invalid doctor data:', doctor);
        alert('Error: Invalid doctor information. Please try again.');
        return;
      }

      // Set selected doctor first
      setSelectedDoctor(doctor);
      
      // Small delay to ensure state is updated before opening modal
      setTimeout(() => {
        setShowProfileModal(true);
        debugLog('Modal state updated', { 
          selectedDoctor: doctor, 
          showProfileModal: true 
        });
      }, 10);

    } catch (error) {
      console.error('❌ Error opening doctor profile:', error);
      alert('Error opening doctor profile. Please try again.');
    }
  };

  // FIXED: Close modal with proper cleanup
  const closeModal = () => {
    debugLog('Closing modal', { currentState: { selectedDoctor, showProfileModal } });
    
    setShowProfileModal(false);
    
    // Small delay before clearing doctor to prevent flash
    setTimeout(() => {
      setSelectedDoctor(null);
      debugLog('Modal closed and cleaned up', null);
    }, 300);
  };

  // Handle successful booking
  const handleBookingSuccess = (bookingData) => {
    debugLog('Booking successful', bookingData);
    alert(`Appointment booked successfully with ${bookingData.doctor_name || selectedDoctor?.first_name} ${selectedDoctor?.last_name}!`);
    closeModal();
  };

  // FIXED: Updated DoctorCard component with better error handling
  const DoctorCard = ({ doctor }) => {
    const handleViewProfile = () => {
      debugLog('DoctorCard: View profile clicked', doctor);
      openDoctorProfile(doctor);
    };

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-start space-x-4">
          <img 
            src={doctor.profile_image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.first_name}`} 
            alt={`${doctor.first_name} ${doctor.last_name}`}
            className="w-20 h-20 rounded-full bg-gray-200"
            onError={(e) => {
              e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.first_name}`;
            }}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {doctor.first_name} {doctor.last_name}
            </h3>
            <p className="text-sm text-gray-600 mb-1">{doctor.specialty}</p>
            <p className="text-xs text-gray-500">{doctor.qualification}</p>
            
            <div className="flex items-center mt-2 space-x-4 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                <span className="font-medium">{doctor.rating || 'N/A'}</span>
                <span className="text-gray-500 ml-1">({doctor.total_reviews || 0})</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {doctor.experience || 'N/A'}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {doctor.location || 'Location not specified'}
              </div>
              <div className="flex items-center font-semibold text-green-600">
                <DollarSign className="w-4 h-4" />
                {doctor.consultation_fee || 'Fee not specified'}
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleViewProfile}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          View Profile & Book Appointment
        </button>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && departments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Unable to Load Doctor Search</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button 
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <p className="text-xs text-gray-500">
              Attempt #{retryCount + 1} - Make sure the backend server is running
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error banner (if partial error) */}
      {error && departments.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <div className="flex-1">
              <p className="text-yellow-800 text-sm">{error}</p>
              <p className="text-yellow-700 text-xs mt-1">Using cached data. Some features may be limited.</p>
            </div>
            <button 
              onClick={handleRetry}
              className="text-yellow-600 hover:text-yellow-800 ml-4"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Find Doctors
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id || dept.name} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialty
            </label>
            <select
              value={selectedSpecialty}
              onChange={handleSpecialtyChange}
              disabled={!selectedDepartment}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">All Specialties</option>
              {availableSpecialties.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear filters button */}
        {(selectedDepartment || selectedSpecialty) && (
          <div className="mt-4">
            <button
              onClick={() => {
                setSelectedDepartment('');
                setSelectedSpecialty('');
                setAvailableSpecialties([]);
                setFilteredDoctors(doctors);
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Available Doctors ({filteredDoctors.length})
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        
        {filteredDoctors.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 mb-4">
              {selectedDepartment || selectedSpecialty 
                ? 'Try adjusting your filters to see more results'
                : 'No doctors are currently available'
              }
            </p>
            {(selectedDepartment || selectedSpecialty) && (
              <button
                onClick={() => {
                  setSelectedDepartment('');
                  setSelectedSpecialty('');
                  setAvailableSpecialties([]);
                  setFilteredDoctors(doctors);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* FIXED: Doctor Profile Modal with proper conditional rendering */}
      {selectedDoctor && showProfileModal && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          isOpen={showProfileModal}
          onClose={closeModal}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default DoctorSearch;