import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Phone,
  Mail,
  Heart,
  Activity,
  FileText,
  Bell,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  X,
  History,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import patientDashboardApi from '../../apis/PatientDashboardApi.js';
import DoctorSearch from '../doctors/DoctorSearch';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showDoctorSearch, setShowDoctorSearch] = useState(false);

  // Load dashboard data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      if (!userType || !emailId) {
        throw new Error('User information not available');
      }

      const result = await patientDashboardApi.getDashboardData(userType, emailId);

      if (result.success) {
        setDashboardData(result.data);
      } else {
        // Set fallback data if API fails
        console.warn('Dashboard API failed, using fallback data:', result.error);
        setDashboardData({
          patient_info: {
            first_name: user?.firstName || 'Patient',
            last_name: user?.lastName || '',
            email_id: emailId,
            mobile: 'Not provided',
            member_since: new Date().toISOString()
          },
          dashboard_stats: {
            total_appointments: 0,
            upcoming_appointments: 0,
            completed_appointments: 0,
            cancelled_appointments: 0,
            pending_appointments: 0,
            average_rating: 0,
            total_reviews: 0,
            last_checkup: null
          },
          upcoming_appointments: [],
          past_appointments: [],
          notifications: [],
          health_tips: []
        });
        setError('Some features may be limited due to server connectivity issues.');
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err.message || 'An unexpected error occurred');
      // Set minimal fallback data
      setDashboardData({
        patient_info: {
          first_name: user?.firstName || 'Patient',
          last_name: user?.lastName || '',
          email_id: user?.email_id || user?.email,
          mobile: 'Not provided'
        },
        dashboard_stats: {
          total_appointments: 0,
          upcoming_appointments: 0,
          completed_appointments: 0,
          cancelled_appointments: 0,
          pending_appointments: 0,
          average_rating: 0,
          total_reviews: 0
        },
        upcoming_appointments: [],
        past_appointments: [],
        notifications: [],
        health_tips: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const AppointmentCard = ({ appointment, isPast = false }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{appointment.doctor_name}</h4>
          <p className="text-sm text-gray-600">{appointment.specialty}</p>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {appointment.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {appointment.time}
            </div>
          </div>
          {!isPast && appointment.location && (
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {appointment.location}
            </div>
          )}
          <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {appointment.type}
          </span>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status}
          </span>
          
          {isPast && appointment.rating && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < appointment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          )}
          
          <div className="flex space-x-1">
            {!isPast && (
              <>
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            {isPast && appointment.can_review && (
              <button className="text-green-600 hover:text-green-800 text-xs px-2 py-1 border border-green-200 rounded">
                Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );

  const NotificationCard = ({ notification }) => (
    <div className={`p-4 rounded-lg border-l-4 ${
      notification.priority === 'high' ? 'border-red-500 bg-red-50' :
      notification.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
      'border-blue-500 bg-blue-50'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        </div>
        <div className={`w-2 h-2 rounded-full ${
          notification.priority === 'high' ? 'bg-red-500' :
          notification.priority === 'medium' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`}></div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Main dashboard render
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {dashboardData?.patient_info?.first_name} {dashboardData?.patient_info?.last_name}
          </h1>
          <p className="text-gray-600 mt-1">Manage your appointments and health records</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button 
            onClick={() => setShowDoctorSearch(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Book Appointment
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Health Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Appointments"
          value={dashboardData?.dashboard_stats?.total_appointments || 0}
          change="+2 this month"
          trend="up"
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Upcoming Appointments"
          value={dashboardData?.dashboard_stats?.upcoming_appointments || 0}
          icon={Clock}
          color="bg-green-500"
        />
        <StatCard
          title="Average Rating Given"
          value={dashboardData?.dashboard_stats?.average_rating || 0}
          change="+0.1 from last visit"
          trend="up"
          icon={Star}
          color="bg-yellow-500"
        />
        <StatCard
          title="Last Checkup"
          value={dashboardData?.dashboard_stats?.last_checkup ? new Date(dashboardData.dashboard_stats.last_checkup).toLocaleDateString() : 'N/A'}
          icon={Activity}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Find Doctors"
          description="Search and book appointments"
          icon={User}
          color="bg-blue-500"
          onClick={() => setShowDoctorSearch(true)}
        />
        <QuickActionCard
          title="My Appointments"
          description="Manage current appointments"
          icon={Calendar}
          color="bg-green-500"
          onClick={() => window.location.href = '/patient/appointments'}
        />
        <QuickActionCard
          title="Medical History"
          description="View past appointments"
          icon={History}
          color="bg-purple-500"
          onClick={() => window.location.href = '/patient/history'}
        />
        <QuickActionCard
          title="My Reviews"
          description="Rate your experiences"
          icon={MessageSquare}
          color="bg-yellow-500"
          onClick={() => window.location.href = '/patient/reviews'}
        />
      </div>

      {/* Doctor Search Section */}
      {showDoctorSearch && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Find Doctors & Book Appointments</h3>
            <button
              onClick={() => setShowDoctorSearch(false)}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <DoctorSearch />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                <button 
                  onClick={() => window.location.href = '/patient/appointments'}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.upcoming_appointments?.length > 0 ? (
                dashboardData.upcoming_appointments.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h4>
                  <p className="text-gray-600">Book your first appointment to get started</p>
                  <button 
                    onClick={() => setShowDoctorSearch(true)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.notifications?.length > 0 ? (
                dashboardData.notifications.map((notification, index) => (
                  <NotificationCard key={index} notification={notification} />
                ))
              ) : (
                <div className="text-center py-4">
                  <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">No new notifications</p>
                </div>
              )}
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Health Tips</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.health_tips?.length > 0 ? (
                dashboardData.health_tips.map((tip, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    tip.category === 'hydration' ? 'bg-blue-50 border-blue-200' :
                    tip.category === 'exercise' ? 'bg-green-50 border-green-200' :
                    'bg-purple-50 border-purple-200'
                  }`}>
                    <h4 className={`font-medium mb-1 ${
                      tip.category === 'hydration' ? 'text-blue-900' :
                      tip.category === 'exercise' ? 'text-green-900' :
                      'text-purple-900'
                    }`}>{tip.title}</h4>
                    <p className={`text-sm ${
                      tip.category === 'hydration' ? 'text-blue-700' :
                      tip.category === 'exercise' ? 'text-green-700' :
                      'text-purple-700'
                    }`}>{tip.description}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Stay Hydrated</h4>
                    <p className="text-sm text-blue-700">Drink at least 8 glasses of water daily for optimal health.</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-1">Regular Exercise</h4>
                    <p className="text-sm text-green-700">30 minutes of daily exercise can improve your overall health.</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-1">Sleep Well</h4>
                    <p className="text-sm text-purple-700">Aim for 7-9 hours of quality sleep each night.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed Appointments</span>
                <span className="font-semibold text-green-600">{dashboardData?.dashboard_stats?.completed_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending Appointments</span>
                <span className="font-semibold text-yellow-600">{dashboardData?.dashboard_stats?.pending_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cancelled Appointments</span>
                <span className="font-semibold text-red-600">{dashboardData?.dashboard_stats?.cancelled_appointments || 0}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Reviews Given</span>
                  <span className="font-semibold text-gray-900">{dashboardData?.dashboard_stats?.total_reviews || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Appointments */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
            <button 
              onClick={() => window.location.href = '/patient/history'}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Full History
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardData?.past_appointments?.length > 0 ? (
              dashboardData.past_appointments.slice(0, 4).map((appointment, index) => (
                <AppointmentCard key={index} appointment={appointment} isPast={true} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No past appointments</h4>
                <p className="text-gray-600">Your appointment history will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{dashboardData?.patient_info?.email_id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{dashboardData?.patient_info?.mobile}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-medium text-gray-900">
                {dashboardData?.patient_info?.member_since ? 
                  new Date(dashboardData.patient_info.member_since).toLocaleDateString() : 
                  'N/A'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Health Score</p>
              <p className="font-medium text-gray-900">{dashboardData?.patient_info?.health_score || 'Good'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;