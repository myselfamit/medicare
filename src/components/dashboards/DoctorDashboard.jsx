import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Bell, 
  Activity,
  TrendingUp,
  TrendingDown,
  Heart,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  Award,
  BookOpen,
  MessageSquare,
  RefreshCw,
  User,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import doctorDashboardApi from '../../apis/DoctorDashboardApi.js';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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

      const result = await doctorDashboardApi.getDashboardData(userType, emailId);

      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError(result.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err.message || 'An unexpected error occurred');
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

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{appointment.patient_name}</h4>
          <p className="text-sm text-gray-600">{appointment.type}</p>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {appointment.time}
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              {appointment.duration}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status}
          </span>
          <div className="flex space-x-1">
            <button className="text-blue-600 hover:text-blue-800 p-1">
              <Eye className="w-4 h-4" />
            </button>
            <button className="text-green-600 hover:text-green-800 p-1">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientCard = ({ patient }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{patient.name}</h4>
            <p className="text-sm text-gray-600">{patient.condition}</p>
            <p className="text-xs text-gray-500">Last visit: {patient.last_visit}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            patient.status === 'Active' ? 'bg-green-100 text-green-800' :
            patient.status === 'Follow-up needed' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {patient.status}
          </span>
          <button className="text-blue-600 hover:text-blue-800 p-1">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ReviewCard = ({ review }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <p className="font-medium text-gray-900">{review.patient_name}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
          <p className="text-xs text-gray-500">{review.date}</p>
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

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
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
            Welcome back, Dr. {dashboardData?.doctor_info?.first_name} {dashboardData?.doctor_info?.last_name}
          </h1>
          <p className="text-gray-600 mt-1">
            {dashboardData?.doctor_info?.specialty} • {dashboardData?.doctor_info?.experience}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Appointments"
          value={dashboardData?.dashboard_stats?.today_appointments || 0}
          change="+2 from yesterday"
          trend="up"
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Patients"
          value={dashboardData?.dashboard_stats?.total_patients || 0}
          change="+12 this month"
          trend="up"
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Average Rating"
          value={dashboardData?.dashboard_stats?.average_rating || 0}
          change="+0.1 from last month"
          trend="up"
          icon={Star}
          color="bg-yellow-500"
        />
        <StatCard
          title="Pending Reviews"
          value={dashboardData?.dashboard_stats?.pending_reviews || 0}
          icon={MessageSquare}
          color="bg-purple-500"
        />
      </div>

      {/* Doctor Info Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{dashboardData?.doctor_info?.email_id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{dashboardData?.doctor_info?.mobile}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Qualifications</p>
              <p className="font-medium text-gray-900">{dashboardData?.doctor_info?.qualifications}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Experience</p>
              <p className="font-medium text-gray-900">{dashboardData?.doctor_info?.experience}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.today_schedule?.length > 0 ? (
                dashboardData.today_schedule.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No appointments today</h4>
                  <p className="text-gray-600">Enjoy your free day!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Notifications */}
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

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Appointments</span>
                <span className="font-semibold text-gray-900">{dashboardData?.dashboard_stats?.total_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{dashboardData?.dashboard_stats?.completed_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-semibold text-yellow-600">{dashboardData?.dashboard_stats?.pending_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cancelled</span>
                <span className="font-semibold text-red-600">{dashboardData?.dashboard_stats?.cancelled_appointments || 0}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Reviews</span>
                  <span className="font-semibold text-gray-900">{dashboardData?.dashboard_stats?.total_reviews || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Patients and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Patients */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData?.recent_patients?.length > 0 ? (
              dashboardData.recent_patients.map((patient, index) => (
                <PatientCard key={index} patient={patient} />
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No recent patients</h4>
                <p className="text-gray-600">Patient data will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData?.recent_reviews?.length > 0 ? (
              dashboardData.recent_reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))
            ) : (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No recent reviews</h4>
                <p className="text-gray-600">Patient reviews will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Patient Satisfaction</h4>
              <p className="text-3xl font-bold text-blue-600 mt-2">{dashboardData?.dashboard_stats?.average_rating || 0}/5</p>
              <p className="text-sm text-gray-600 mt-1">Based on {dashboardData?.dashboard_stats?.total_reviews || 0} reviews</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Appointment Success</h4>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {dashboardData?.dashboard_stats?.completed_appointments && dashboardData?.dashboard_stats?.total_appointments
                  ? Math.round((dashboardData.dashboard_stats.completed_appointments / dashboardData.dashboard_stats.total_appointments) * 100)
                  : 0}%
              </p>
              <p className="text-sm text-gray-600 mt-1">Completion rate</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Patient Growth</h4>
              <p className="text-3xl font-bold text-purple-600 mt-2">+15%</p>
              <p className="text-sm text-gray-600 mt-1">This month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Schedule</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Patients</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <MessageSquare className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Reviews</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <User className="w-8 h-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;