import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Award, 
  BookOpen, 
  Users, 
  X,
  CheckCircle,
  Eye,
  Heart,
  Stethoscope
} from 'lucide-react';

// Mock data for doctors - in real app this would come from API
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    department: "Cardiology",
    image: "/api/placeholder/150/150",
    rating: 4.8,
    experience: 12,
    qualifications: ["MD", "FACC", "Board Certified Cardiologist"],
    location: "Building A, Floor 3",
    phone: "(555) 123-4567",
    email: "s.johnson@medicare.com",
    nextAvailable: "Today 2:30 PM",
    availableSlots: ["2:30 PM", "3:45 PM", "4:15 PM"],
    patients: 850,
    bio: "Specialized in interventional cardiology with focus on minimally invasive procedures.",
    isOnline: true
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Pediatrics", 
    department: "Pediatrics",
    image: "/api/placeholder/150/150",
    rating: 4.9,
    experience: 8,
    qualifications: ["MD", "FAAP", "Pediatric Emergency Medicine"],
    location: "Building B, Floor 2",
    phone: "(555) 234-5678",
    email: "m.chen@medicare.com",
    nextAvailable: "Tomorrow 9:00 AM",
    availableSlots: ["9:00 AM", "10:30 AM", "2:00 PM"],
    patients: 1200,
    bio: "Expert in pediatric emergency medicine and child development.",
    isOnline: true
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    department: "Dermatology",
    image: "/api/placeholder/150/150", 
    rating: 4.7,
    experience: 15,
    qualifications: ["MD", "FAAD", "Mohs Surgery Certified"],
    location: "Building C, Floor 1",
    phone: "(555) 345-6789",
    email: "e.rodriguez@medicare.com",
    nextAvailable: "Today 4:00 PM",
    availableSlots: ["4:00 PM", "4:30 PM"],
    patients: 650,
    bio: "Specializes in skin cancer treatment and cosmetic dermatology.",
    isOnline: false
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    department: "Orthopedics",
    image: "/api/placeholder/150/150",
    rating: 4.6,
    experience: 20,
    qualifications: ["MD", "Board Certified Orthopedic Surgeon"],
    location: "Building A, Floor 2", 
    phone: "(555) 456-7890",
    email: "j.wilson@medicare.com",
    nextAvailable: "Friday 11:00 AM",
    availableSlots: ["11:00 AM", "1:30 PM"],
    patients: 920,
    bio: "Expert in joint replacement and sports medicine.",
    isOnline: true
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson", 
    specialty: "Internal Medicine",
    department: "Internal Medicine",
    image: "/api/placeholder/150/150",
    rating: 4.8,
    experience: 10,
    qualifications: ["MD", "ABIM Certified", "Hospitalist"],
    location: "Building B, Floor 1",
    phone: "(555) 567-8901",
    email: "l.anderson@medicare.com",
    nextAvailable: "Today 1:15 PM",
    availableSlots: ["1:15 PM", "3:00 PM", "4:45 PM"],
    patients: 1100,
    bio: "Primary care specialist with expertise in chronic disease management.",
    isOnline: true
  },
  {
    id: 6,
    name: "Dr. Robert Kumar",
    specialty: "Neurology",
    department: "Neurology",
    image: "/api/placeholder/150/150",
    rating: 4.9,
    experience: 18,
    qualifications: ["MD", "PhD", "Board Certified Neurologist"],
    location: "Building C, Floor 3",
    phone: "(555) 678-9012",
    email: "r.kumar@medicare.com", 
    nextAvailable: "Monday 10:00 AM",
    availableSlots: ["10:00 AM", "2:30 PM"],
    patients: 780,
    bio: "Specialist in movement disorders and epilepsy treatment.",
    isOnline: true
  }
];

const departments = ["All Departments", "Cardiology", "Pediatrics", "Dermatology", "Orthopedics", "Internal Medicine", "Neurology"];
const specialties = ["All Specialties", "Cardiology", "Pediatrics", "Dermatology", "Orthopedics", "Internal Medicine", "Neurology"];

const DoctorDashboard = () => {
  const [doctors] = useState(mockDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  // Filter doctors based on search and filters
  useEffect(() => {
    let filtered = doctors;

    // Filter by department
    if (selectedDepartment !== "All Departments") {
      filtered = filtered.filter(doctor => doctor.department === selectedDepartment);
    }

    // Filter by specialty
    if (selectedSpecialty !== "All Specialties") {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.qualifications.some(qual => qual.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredDoctors(filtered);
  }, [selectedDepartment, selectedSpecialty, searchTerm, doctors]);

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Doctor Avatar */}
          <div className="relative mx-auto sm:mx-0 flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={24} className="sm:hidden text-white" />
              <User size={32} className="hidden sm:block text-white" />
            </div>
            {doctor.isOnline && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          
          {/* Doctor Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
            <p className="text-blue-600 font-medium mb-2 text-sm sm:text-base">{doctor.specialty}</p>
            
            {/* Stats Row */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Star size={14} className="sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{doctor.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                <span>{doctor.experience} years</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                <span className="hidden sm:inline">{doctor.patients}+ patients</span>
                <span className="sm:hidden">{doctor.patients}+</span>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs sm:text-sm mb-3">
              <Clock size={14} className="sm:w-4 sm:h-4 text-green-500" />
              <span className="text-gray-700">
                <span className="hidden sm:inline">Next available: </span>
                <span className="font-medium text-green-600">{doctor.nextAvailable}</span>
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs sm:text-sm text-gray-600 mb-4">
              <MapPin size={14} className="sm:w-4 sm:h-4 text-gray-400" />
              <span>{doctor.location}</span>
            </div>

            {/* Qualifications */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 mb-4">
              {doctor.qualifications.slice(0, 2).map((qual, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {qual}
                </span>
              ))}
              {doctor.qualifications.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{doctor.qualifications.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-100">
          <button 
            onClick={() => setSelectedDoctor(doctor)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            View Profile
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );

  const DoctorModal = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={32} className="sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{doctor.name}</h2>
                  <p className="text-blue-600 font-medium text-base sm:text-lg">{doctor.specialty}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-gray-600 text-sm sm:text-base">{doctor.experience} years experience</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="self-end sm:self-start text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                      <Phone size={16} className="sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                      <Mail size={16} className="sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base break-all">{doctor.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                      <MapPin size={16} className="sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{doctor.location}</span>
                    </div>
                  </div>
                </div>

                {/* Qualifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Qualifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.qualifications.map((qual, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm">
                        {qual}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">{doctor.patients}+</div>
                      <div className="text-xs sm:text-sm text-gray-600">Patients Treated</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-green-600">{doctor.rating}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Patient Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Available Time Slots */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Available Time Slots</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
                    {doctor.availableSlots.map((slot, index) => (
                      <button 
                        key={index}
                        className="p-2 border border-green-300 text-green-700 hover:bg-green-50 rounded-lg text-xs sm:text-sm transition-colors"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* About */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">About</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{doctor.bio}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Book Appointment
              </button>
              <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Doctors</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Search and book appointments with our medical specialists</p>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-blue-800 font-medium text-sm sm:text-base">{filteredDoctors.length} doctors available</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Department Filter */}
          <select
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Specialty Filter */}
          <select
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              className={`flex-1 py-2 px-4 text-xs sm:text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`flex-1 py-2 px-4 text-xs sm:text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <div className={`grid gap-4 sm:gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}

      {/* Doctor Modal */}
      {selectedDoctor && (
        <DoctorModal 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
        />
      )}
    </div>
  );
};

export default DoctorDashboard;