import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Edit,
  Trash2,
  Star,
  Filter,
  Search,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import patientAppointmentsApi from '../../apis/PatientAppointmentsApi.js';
import AppointmentActions from './AppointmentActions';
import RatingModal from './RatingModal';

const PatientAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      if (!userType || !emailId) {
        throw new Error('User information not available');
      }

      const result = await patientAppointmentsApi.getPatientAppointments(userType, emailId, 'all');

      if (result.success) {
        setAppointments(result.data);
      } else {
        setError(result.error || 'Failed to load appointments');
      }
    } catch (err) {
      console.error('Error loading appointments:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = [...appointments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }

    // Date filter
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    if (dateFilter === 'upcoming') {
      filtered = filtered.filter(apt => apt.date >= todayStr);
    } else if (dateFilter === 'past') {
      filtered = filtered.filter(apt => apt.date < todayStr);
    } else if (dateFilter === 'today') {
      filtered = filtered.filter(apt => apt.date === todayStr);
    }

    setFilteredAppointments(filtered);
  };

  const handleAppointmentAction = (appointment, action) => {
    setSelectedAppointment(appointment);
    if (action === 'rate') {
      setShowRatingModal(true);
    } else {
      setShowActionsModal(true);
    }
  };

  const onAppointmentUpdate = () => {
    loadAppointments();
    setShowActionsModal(false);
    setSelectedAppointment(null);
  };

  const onRatingSubmit = () => {
    loadAppointments();
    setShowRatingModal(false);
    setSelectedAppointment(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canModifyAppointment = (appointment) => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    return appointmentDate >= today && ['confirmed', 'pending'].includes(appointment.status);
  };

  const canRateAppointment = (appointment) => {
    return appointment.status === 'completed' && !appointment.rated;
  };

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor_name}</h3>
          <p className="text-sm text-gray-600">{appointment.specialty}</p>
          <p className="text-xs text-gray-500">{appointment.department}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
          <div className="relative">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
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
        {appointment.location && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {appointment.location}
          </div>
        )}
        {appointment.type && (
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2" />
            {appointment.type}
          </div>
        )}
      </div>

      {appointment.notes && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{appointment.notes}</p>
        </div>
      )}

      <div className="flex space-x-2">
        {canModifyAppointment(appointment) && (
          <>
            <button
              onClick={() => handleAppointmentAction(appointment, 'reschedule')}
              className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Reschedule
            </button>
            <button
              onClick={() => handleAppointmentAction(appointment, 'cancel')}
              className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center justify-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Cancel
            </button>
          </>
        )}
        
        {canRateAppointment(appointment) && (
          <button
            onClick={() => handleAppointmentAction(appointment, 'rate')}
            className="flex-1 bg-yellow-50 text-yellow-600 px-3 py-2 rounded-lg hover:bg-yellow-100 transition-colors duration-200 flex items-center justify-center gap-1"
          >
            <Star className="w-4 h-4" />
            Rate Experience
          </button>
        )}

        {appointment.status === 'completed' && appointment.rated && (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            Rated
          </div>
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
          <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Appointments</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadAppointments}
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
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your medical appointments</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={loadAppointments}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button 
            onClick={() => window.location.href = '/doctors'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Book New Appointment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => {
                  const aptDate = new Date(apt.date);
                  const today = new Date();
                  return aptDate >= today && ['confirmed', 'pending'].includes(apt.status);
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">To Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => canRateAppointment(apt)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctor or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setDateFilter('all');
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
            {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' 
              ? 'Try adjusting your filters to see more results'
              : "You don't have any appointments yet"
            }
          </p>
          <button 
            onClick={() => window.location.href = '/doctors'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Book Your First Appointment
          </button>
        </div>
      )}

      {/* Modals */}
      {showActionsModal && (
        <AppointmentActions
          appointment={selectedAppointment}
          isOpen={showActionsModal}
          onClose={() => setShowActionsModal(false)}
          onUpdate={onAppointmentUpdate}
        />
      )}

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

export default PatientAppointments;