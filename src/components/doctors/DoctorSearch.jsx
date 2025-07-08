import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Star, Clock, DollarSign, MapPin, X, AlertCircle } from 'lucide-react';
import DoctorProfileModal from './DoctorProfileModal';
import doctorSearchApi from '../../apis/DoctorSearchApi';

const DoctorSearch = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadDepartmentsAndDoctors();
  }, []);

  const loadDepartmentsAndDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch departments
      const deptResult = await doctorSearchApi.getDepartments();
      if (deptResult.success) {
        setDepartments(deptResult.data);
      } else {
        throw new Error(deptResult.error);
      }
      
      // Fetch all doctors initially
      const doctorResult = await doctorSearchApi.searchDoctors({});
      if (doctorResult.success) {
        setDoctors(doctorResult.data);
        setFilteredDoctors(doctorResult.data);
      } else {
        throw new Error(doctorResult.error);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message || 'Failed to load data');
      setLoading(false);
    }
  };

  // Handle department change
  const handleDepartmentChange = async (e) => {
    const dept = e.target.value;
    setSelectedDepartment(dept);
    setSelectedSpecialty('');
    
    if (dept) {
      const department = departments.find(d => d.name === dept);
      setAvailableSpecialties(department ? department.specialties : []);
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
        setFilteredDoctors(result.data);
      } else {
        console.error('Search failed:', result.error);
      }
    } catch (error) {
      console.error('Error searching doctors:', error);
    }
  };

  // Open doctor profile
  const openDoctorProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setShowProfileModal(true);
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
         onClick={() => openDoctorProfile(doctor)}>
      <div className="flex items-start space-x-4">
        <img 
          src={doctor.profile_image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.first_name}`} 
          alt={`${doctor.first_name} ${doctor.last_name}`}
          className="w-20 h-20 rounded-full bg-gray-200"
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
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-gray-500 ml-1">({doctor.total_reviews})</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {doctor.experience}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {doctor.location}
            </div>
            <div className="flex items-center font-semibold text-green-600">
              <DollarSign className="w-4 h-4" />
              {doctor.consultation_fee}
            </div>
          </div>
        </div>
      </div>
      
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
        View Profile & Book Appointment
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadDepartmentsAndDoctors}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                <option key={dept.id} value={dept.name}>{dept.name}</option>
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
        
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      {/* Doctor Profile Modal */}
      {showProfileModal && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorSearch;