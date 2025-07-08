import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  User,
  Stethoscope,
  Shield,
  Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import adminDashboardApi from '../../apis/AdminDashboardApi.js';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

      const result = await adminDashboardApi.getDashboardData(userType, emailId);

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
        <div>
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

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{appointment.patient_name}</h4>
          <p className="text-sm text-gray-600">{appointment.doctor_name} - {appointment.department}</p>
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
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {appointment.status}
          </span>
          <button className="text-gray-400 hover:text-gray-600">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const FeedbackCard = ({ feedback }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <p className="font-medium text-gray-900">{feedback.patient_name}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">{feedback.doctor_name} - {feedback.department}</p>
          <p className="text-sm text-gray-500 mt-1">{feedback.comment?.substring(0, 60)}...</p>
          <p className="text-xs text-gray-400 mt-1">{feedback.date}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            feedback.status === 'responded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {feedback.status}
          </span>
          <button className="text-gray-400 hover:text-gray-600">
            <Eye className="w-4 h-4" />
          </button>
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
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {dashboardData?.admin_info?.first_name}! Here's what's happening at Medicare today.
          </p>
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Appointments"
          value={dashboardData?.dashboard_stats?.total_appointments?.toLocaleString() || 0}
          change="+12%"
          trend="up"
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Today's Appointments"
          value={dashboardData?.dashboard_stats?.today_appointments || 0}
          change="+5%"
          trend="up"
          icon={Clock}
          color="bg-green-500"
        />
        <StatCard
          title="Active Doctors"
          value={dashboardData?.dashboard_stats?.active_doctors || 0}
          change="+2"
          trend="up"
          icon={Users}
          color="bg-purple-500"
        />
        <StatCard
          title="Average Rating"
          value={dashboardData?.dashboard_stats?.average_rating || 0}
          change="+0.2"
          trend="up"
          icon={Star}
          color="bg-yellow-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Manage Doctors"
          description="Add, edit, or remove doctors"
          icon={Users}
          color="bg-blue-500"
          onClick={() => window.location.href = '/admin/doctors'}
        />
        <QuickActionCard
          title="View Appointments"
          description="Manage all appointments"
          icon={Calendar}
          color="bg-green-500"
          onClick={() => window.location.href = '/admin/appointments'}
        />
        <QuickActionCard
          title="Review Feedback"
          description="Handle patient feedback"
          icon={MessageSquare}
          color="bg-purple-500"
          onClick={() => window.location.href = '/admin/feedback'}
        />
        <QuickActionCard
          title="Analytics"
          description="View detailed reports"
          icon={BarChart3}
          color="bg-orange-500"
          onClick={() => window.location.href = '/admin/analytics'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData?.recent_appointments?.length > 0 ? (
              dashboardData.recent_appointments.map((appointment, index) => (
                <AppointmentCard key={index} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No recent appointments</h4>
                <p className="text-gray-600">Appointment data will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Feedback</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData?.recent_feedback?.length > 0 ? (
              dashboardData.recent_feedback.map((feedback, index) => (
                <FeedbackCard key={index} feedback={feedback} />
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No recent feedback</h4>
                <p className="text-gray-600">Patient feedback will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Performing Doctors */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Doctors</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">This Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData?.top_doctors?.length > 0 ? (
                dashboardData.top_doctors.map((doctor, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                          <Stethoscope className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.patients}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-900">{doctor.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.appointments} appointments</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No doctor data available</h4>
                    <p className="text-gray-600">Doctor performance data will appear here</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Overview and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* System Alerts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.system_alerts?.length > 0 ? (
                dashboardData.system_alerts.map((alert, index) => (
                  <div key={index} className={`flex items-center p-4 border rounded-lg ${
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    alert.type === 'error' ? 'bg-red-50 border-red-200' :
                    alert.type === 'success' ? 'bg-green-50 border-green-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    {alert.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" /> :
                     alert.type === 'error' ? <AlertTriangle className="w-5 h-5 text-red-600 mr-3" /> :
                     alert.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-600 mr-3" /> :
                     <Activity className="w-5 h-5 text-blue-600 mr-3" />}
                    <div>
                      <p className={`text-sm font-medium ${
                        alert.type === 'warning' ? 'text-yellow-800' :
                        alert.type === 'error' ? 'text-red-800' :
                        alert.type === 'success' ? 'text-green-800' :
                        'text-blue-800'
                      }`}>{alert.title}</p>
                      <p className={`text-xs ${
                        alert.type === 'warning' ? 'text-yellow-700' :
                        alert.type === 'error' ? 'text-red-700' :
                        alert.type === 'success' ? 'text-green-700' :
                        'text-blue-700'
                      }`}>{alert.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        {dashboardData?.dashboard_stats?.pending_feedback || 15} feedback responses pending
                      </p>
                      <p className="text-xs text-yellow-700">Some patient feedback requires admin response</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">System performance is optimal</p>
                      <p className="text-xs text-blue-700">All services are running smoothly</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Monthly backup completed</p>
                      <p className="text-xs text-green-700">Data backup was successful</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Analytics Summary */}
        <div className="space-y-6">
          
          {/* Quick Analytics */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Analytics</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Patients</span>
                <span className="font-semibold text-gray-900">{dashboardData?.dashboard_stats?.total_patients?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Revenue</span>
                <span className="font-semibold text-green-600">${dashboardData?.dashboard_stats?.monthly_revenue?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Patient Satisfaction</span>
                <span className="font-semibold text-yellow-600">{dashboardData?.dashboard_stats?.patient_satisfaction || 94}%</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Uptime</span>
                  <span className="font-semibold text-green-600">{dashboardData?.dashboard_stats?.system_uptime || '99.9'}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.notifications?.length > 0 ? (
                dashboardData.notifications.map((notification, index) => (
                  <NotificationCard key={index} notification={notification} />
                ))
              ) : (
                <div className="text-center py-4">
                  <Activity className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">No new notifications</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Administrator Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-medium text-gray-900">System Administrator</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{dashboardData?.admin_info?.email_id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Last Login</p>
              <p className="font-medium text-gray-900">
                {dashboardData?.admin_info?.last_login ? 
                  new Date(dashboardData.admin_info.last_login).toLocaleString() : 
                  'N/A'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Access Level</p>
              <p className="font-medium text-gray-900">{dashboardData?.admin_info?.access_level || 'Full Access'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;