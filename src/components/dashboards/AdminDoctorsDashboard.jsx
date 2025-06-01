import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Save,
  X,
  Stethoscope,
  Users,
  Star,
  Eye
} from 'lucide-react';

const AdminDoctorsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Sample doctors data
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@medicare.com',
      phone: '+1 (555) 123-4567',
      specialization: 'Cardiology',
      department: 'Cardiology',
      experience: '8 years',
      qualification: 'MD, FACC',
      status: 'active',
      rating: 4.8,
      patients: 245,
      location: 'Building A, Floor 2',
      joinDate: '2020-03-15',
      schedule: {
        monday: { start: '09:00', end: '17:00', active: true },
        tuesday: { start: '09:00', end: '17:00', active: true },
        wednesday: { start: '09:00', end: '17:00', active: true },
        thursday: { start: '09:00', end: '17:00', active: true },
        friday: { start: '09:00', end: '15:00', active: true },
        saturday: { start: '', end: '', active: false },
        sunday: { start: '', end: '', active: false }
      }
    },
    {
      id: 2,
      firstName: 'Dr. Michael',
      lastName: 'Chen',
      email: 'michael.chen@medicare.com',
      phone: '+1 (555) 234-5678',
      specialization: 'Neurology',
      department: 'Neurology',
      experience: '12 years',
      qualification: 'MD, PhD',
      status: 'active',
      rating: 4.9,
      patients: 189,
      location: 'Building B, Floor 3',
      joinDate: '2018-07-22',
      schedule: {
        monday: { start: '08:00', end: '16:00', active: true },
        tuesday: { start: '08:00', end: '16:00', active: true },
        wednesday: { start: '08:00', end: '16:00', active: true },
        thursday: { start: '08:00', end: '16:00', active: true },
        friday: { start: '08:00', end: '14:00', active: true },
        saturday: { start: '10:00', end: '14:00', active: true },
        sunday: { start: '', end: '', active: false }
      }
    },
    {
      id: 3,
      firstName: 'Dr. Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@medicare.com',
      phone: '+1 (555) 345-6789',
      specialization: 'Pediatrics',
      department: 'Pediatrics',
      experience: '6 years',
      qualification: 'MD, FAAP',
      status: 'inactive',
      rating: 4.7,
      patients: 156,
      location: 'Building A, Floor 1',
      joinDate: '2021-01-10',
      schedule: {
        monday: { start: '10:00', end: '18:00', active: true },
        tuesday: { start: '10:00', end: '18:00', active: true },
        wednesday: { start: '10:00', end: '18:00', active: true },
        thursday: { start: '10:00', end: '18:00', active: true },
        friday: { start: '10:00', end: '16:00', active: true },
        saturday: { start: '', end: '', active: false },
        sunday: { start: '', end: '', active: false }
      }
    }
  ]);

  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Emergency Medicine'];
  const specializations = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Emergency Medicine', 'Internal Medicine'];

  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    department: '',
    experience: '',
    qualification: '',
    location: '',
    status: 'active'
  });

  const [editDoctor, setEditDoctor] = useState({});

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || doctor.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || doctor.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddDoctor = () => {
    if (newDoctor.firstName && newDoctor.lastName && newDoctor.email) {
      const doctor = {
        ...newDoctor,
        id: doctors.length + 1,
        rating: 0,
        patients: 0,
        joinDate: new Date().toISOString().split('T')[0],
        schedule: {
          monday: { start: '09:00', end: '17:00', active: true },
          tuesday: { start: '09:00', end: '17:00', active: true },
          wednesday: { start: '09:00', end: '17:00', active: true },
          thursday: { start: '09:00', end: '17:00', active: true },
          friday: { start: '09:00', end: '17:00', active: true },
          saturday: { start: '', end: '', active: false },
          sunday: { start: '', end: '', active: false }
        }
      };
      setDoctors([...doctors, doctor]);
      setNewDoctor({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialization: '',
        department: '',
        experience: '',
        qualification: '',
        location: '',
        status: 'active'
      });
      setShowAddModal(false);
    }
  };

  const handleEditDoctor = () => {
    setDoctors(doctors.map(doc => doc.id === editDoctor.id ? editDoctor : doc));
    setShowEditModal(false);
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(doc => doc.id !== id));
    }
  };

  const handleUpdateSchedule = (schedule) => {
    setDoctors(doctors.map(doc => 
      doc.id === selectedDoctor.id ? { ...doc, schedule } : doc
    ));
    setShowScheduleModal(false);
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {doctor.firstName} {doctor.lastName}
            </h3>
            <p className="text-sm text-gray-600">{doctor.specialization}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            doctor.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {doctor.status}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Award className="w-4 h-4 mr-2" />
          {doctor.qualification}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {doctor.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          {doctor.patients} patients
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Star className="w-4 h-4 mr-2 text-yellow-500" />
          {doctor.rating}/5.0
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setEditDoctor(doctor);
            setShowEditModal(true);
          }}
          className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => {
            setSelectedDoctor(doctor);
            setShowScheduleModal(true);
          }}
          className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <Calendar className="w-4 h-4" />
          Schedule
        </button>
        <button
          onClick={() => handleDeleteDoctor(doctor.id)}
          className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const DoctorModal = ({ show, onClose, title, doctor, setDoctor, onSave }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={doctor.firstName}
                  onChange={(e) => setDoctor({...doctor, firstName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={doctor.lastName}
                  onChange={(e) => setDoctor({...doctor, lastName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={doctor.email}
                  onChange={(e) => setDoctor({...doctor, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="doctor@medicare.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={doctor.phone}
                  onChange={(e) => setDoctor({...doctor, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={doctor.department}
                  onChange={(e) => setDoctor({...doctor, department: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                  value={doctor.specialization}
                  onChange={(e) => setDoctor({...doctor, specialization: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Specialization</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  value={doctor.experience}
                  onChange={(e) => setDoctor({...doctor, experience: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 8 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
                <input
                  type="text"
                  value={doctor.qualification}
                  onChange={(e) => setDoctor({...doctor, qualification: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., MD, FACC"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={doctor.location}
                  onChange={(e) => setDoctor({...doctor, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Building A, Floor 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={doctor.status}
                  onChange={(e) => setDoctor({...doctor, status: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onSave}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {title.includes('Add') ? 'Add Doctor' : 'Save Changes'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ScheduleModal = ({ show, onClose, doctor }) => {
    const [schedule, setSchedule] = useState(doctor?.schedule || {});

    if (!show || !doctor) return null;

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Manage Schedule - {doctor.firstName} {doctor.lastName}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {days.map(day => (
                <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24">
                    <span className="font-medium text-gray-700 capitalize">{day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={schedule[day]?.active || false}
                      onChange={(e) => setSchedule({
                        ...schedule,
                        [day]: { ...schedule[day], active: e.target.checked }
                      })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  {schedule[day]?.active && (
                    <>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Start:</label>
                        <input
                          type="time"
                          value={schedule[day]?.start || ''}
                          onChange={(e) => setSchedule({
                            ...schedule,
                            [day]: { ...schedule[day], start: e.target.value }
                          })}
                          className="p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">End:</label>
                        <input
                          type="time"
                          value={schedule[day]?.end || ''}
                          onChange={(e) => setSchedule({
                            ...schedule,
                            [day]: { ...schedule[day], end: e.target.value }
                          })}
                          className="p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleUpdateSchedule(schedule)}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Schedule
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
          <p className="text-gray-600 mt-1">Manage doctors, schedules, and assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Doctor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Doctors</p>
              <p className="text-2xl font-bold text-gray-900">
                {doctors.filter(d => d.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {(doctors.reduce((acc, d) => acc + d.rating, 0) / doctors.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Modals */}
      <DoctorModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Doctor"
        doctor={newDoctor}
        setDoctor={setNewDoctor}
        onSave={handleAddDoctor}
      />

      <DoctorModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Doctor"
        doctor={editDoctor}
        setDoctor={setEditDoctor}
        onSave={handleEditDoctor}
      />

      <ScheduleModal
        show={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default AdminDoctorsDashboard;