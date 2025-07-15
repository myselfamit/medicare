import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  FileText, 
  Download,
  Filter,
  Search,
  RefreshCw,
  AlertTriangle,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import patientAppointmentsApi from '../../apis/PatientAppointmentsApi.js';
import RatingModal from './RatingModal';

const AppointmentHistory = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  // Get unique departments and years for filters
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    loadAppointmentHistory();
  }, []);

  useEffect(() => {
    filterAppointments();
    extractFilters();
  }, [appointments, searchTerm, departmentFilter, yearFilter, ratingFilter]);

  const loadAppointmentHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      if (!userType || !emailId) {
        throw new Error('User information not available');
      }

      const result = await patientAppointmentsApi.getPatientAppointments(userType, emailId, 'past');

      if (result.success) {
        // Sort by date (most recent first)
        const sortedAppointments = result.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAppointments(sortedAppointments);
      } else {
        setError(result.error || 'Failed to load appointment history');
      }
    } catch (err) {
      console.error('Error loading appointment history:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const extractFilters = () => {
    // Extract unique departments
    const uniqueDepartments = [...new Set(appointments.map(apt => apt.department).filter(Boolean))];
    setDepartments(uniqueDepartments);

    // Extract unique years
    const uniqueYears = [...new Set(appointments.map(apt => new Date(apt.date).getFullYear()))];
    setYears(uniqueYears.sort((a, b) => b - a));
  };

  const filterAppointments = () => {
    let filtered = [...appointments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(apt => apt.department === departmentFilter);
    }

    // Year filter
    if (yearFilter !== 'all') {
      filtered = filtered.filter(apt => new Date(apt.date).getFullYear() === parseInt(yearFilter));
    }

    // Rating filter
    if (ratingFilter === 'rated') {
      filtered = filtered.filter(apt => apt.rated === true);
    } else if (ratingFilter === 'unrated') {
      filtered = filtered.filter(apt => apt.status === 'completed' && !apt.rated);
    }

    setFilteredAppointments(filtered);
  };

  const handleRateAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRatingModal(true);
  };

  const onRatingSubmit = () => {
    loadAppointmentHistory();
    setShowRatingModal(false);
    setSelectedAppointment(null);
  };

  const canRateAppointment = (appointment) => {
    return appointment.status === 'completed' && !appointment.rated;
  };

  const exportHistory = () => {
    // Create CSV content
    const headers = ['Date', 'Doctor', 'Department', 'Specialty', 'Time', 'Status', 'Rating', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredAppointments.map(apt => [
        apt.date,
        apt.doctor_name,
        apt.department,
        apt.specialty,
        apt.time,
        apt.status,
        apt.rating || 'Not Rated',
        `"${apt.notes || ''}"`
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment-history-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor_name}</h3>
          <p className="text-sm text-gray-600">{appointment.specialty}</p>
          <p className="text-xs text-gray-500">{appointment.department}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status}
          </span>
          {appointment.rated && appointment.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
              <span className="text-sm font-medium">{appointment.rating}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(appointment.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {appointment.time}
        </div>
        {appointment.type && (
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="w-4 h-4 mr-2" />
            {appointment.type}
          </div>
        )}
      </div>

      {appointment.notes && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{appointment.notes}</p>
        </div>
      )}

      {appointment.diagnosis && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-1">Diagnosis:</p>
          <p className="text-sm text-blue-800">{appointment.diagnosis}</p>
        </div>
      )}

      {appointment.prescription && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-900 mb-1">Prescription:</p>
          <p className="text-sm text-green-800">{appointment.prescription}</p>
        </div>
      )}

      <div className="flex space-x-2">
        {canRateAppointment(appointment) && (
          <button
            onClick={() => handleRateAppointment(appointment)}
            className="flex-1 bg-yellow-50 text-yellow-600 px-3 py-2 rounded-lg hover:bg-yellow-100 transition-colors duration-200 flex items-center justify-center gap-1"
          >
            <Star className="w-4 h-4" />
            Rate Experience
          </button>
        )}
        
        <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-1">
          <Eye className="w-4 h-4" />
          View Details
        </button>

        {appointment.prescription && (
          <button className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <Download className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading History</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadAppointmentHistory}
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
          <h1 className="text-3xl font-bold text-gray-900">Appointment History</h1>
          <p className="text-gray-600 mt-1">View your past medical appointments and records</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={loadAppointmentHistory}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={exportHistory}
            disabled={filteredAppointments.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 disabled:bg-gray-400"
          >
            <Download className="w-4 h-4" />
            Export History
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Unique Doctors</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(appointments.map(apt => apt.doctor_name)).size}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.rating).length > 0 
                  ? (appointments.filter(apt => apt.rating).reduce((sum, apt) => sum + apt.rating, 0) / 
                     appointments.filter(apt => apt.rating).length).toFixed(1)
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => canRateAppointment(apt)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Reviews</option>
            <option value="rated">Reviewed</option>
            <option value="unrated">Pending Review</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setDepartmentFilter('all');
              setYearFilter('all');
              setRatingFilter('all');
            }}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>

      {filteredAppointments.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || departmentFilter !== 'all' || yearFilter !== 'all' || ratingFilter !== 'all'
              ? 'Try adjusting your filters to see more results'
              : "You don't have any appointment history yet"
            }
          </p>
          {appointments.length === 0 && (
            <button 
              onClick={() => window.location.href = '/doctors'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Book Your First Appointment
            </button>
          )}
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <RatingModal
          appointment={selectedAppointment}
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          onSubmit={onRatingSubmit}
        />
      )}
    </div>
  );
};

export default AppointmentHistory;