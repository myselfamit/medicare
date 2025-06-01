import React, { useState } from 'react';
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
  Plus
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const statsData = {
    totalAppointments: 1247,
    todayAppointments: 23,
    pendingFeedback: 15,
    activeDoctors: 28,
    averageRating: 4.6,
    totalPatients: 5420,
    revenue: 125000,
    satisfaction: 94
  };

  const recentAppointments = [
    {
      id: 1,
      patientName: 'John Smith',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      date: '2025-06-02',
      time: '10:00 AM',
      status: 'confirmed',
      type: 'consultation'
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      doctorName: 'Dr. Michael Chen',
      department: 'Neurology',
      date: '2025-06-02',
      time: '2:30 PM',
      status: 'pending',
      type: 'examination'
    },
    {
      id: 3,
      patientName: 'Robert Wilson',
      doctorName: 'Dr. Emily Rodriguez',
      department: 'Pediatrics',
      date: '2025-06-03',
      time: '9:15 AM',
      status: 'cancelled',
      type: 'vaccination'
    }
  ];

  const recentFeedback = [
    {
      id: 1,
      patientName: 'Alice Johnson',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      rating: 5,
      comment: 'Excellent service! Dr. Johnson was very professional and caring.',
      date: '2025-05-30',
      status: 'pending'
    },
    {
      id: 2,
      patientName: 'Mark Thompson',
      doctorName: 'Dr. Michael Chen',
      department: 'Neurology',
      rating: 4,
      comment: 'Good experience overall, but the waiting time was a bit long.',
      date: '2025-05-28',
      status: 'responded'
    },
    {
      id: 3,
      patientName: 'Sarah Brown',
      doctorName: 'Dr. Emily Rodriguez',
      department: 'Pediatrics',
      rating: 2,
      comment: 'Not satisfied with the appointment scheduling system.',
      date: '2025-05-25',
      status: 'pending'
    }
  ];

  const topDoctors = [
    { id: 1, name: 'Dr. Sarah Johnson', department: 'Cardiology', patients: 245, rating: 4.8, appointments: 32 },
    { id: 2, name: 'Dr. Michael Chen', department: 'Neurology', patients: 189, rating: 4.9, appointments: 28 },
    { id: 3, name: 'Dr. Emily Rodriguez', department: 'Pediatrics', patients: 156, rating: 4.7, appointments: 24 }
  ];

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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at Medicare today.</p>
        </div>
        <div className="flex space-x-3">
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
          value={statsData.totalAppointments.toLocaleString()}
          change="+12%"
          trend="up"
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Today's Appointments"
          value={statsData.todayAppointments}
          change="+5%"
          trend="up"
          icon={Clock}
          color="bg-green-500"
        />
        <StatCard
          title="Active Doctors"
          value={statsData.activeDoctors}
          change="+2"
          trend="up"
          icon={Users}
          color="bg-purple-500"
        />
        <StatCard
          title="Average Rating"
          value={statsData.averageRating}
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
          <div className="divide-y divide-gray-200">
            {recentAppointments.map(appointment => (
              <div key={appointment.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{appointment.patientName}</p>
                    <p className="text-sm text-gray-600">{appointment.doctorName} - {appointment.department}</p>
                    <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
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
            ))}
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
          <div className="divide-y divide-gray-200">
            {recentFeedback.map(feedback => (
              <div key={feedback.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-gray-900">{feedback.patientName}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{feedback.doctorName} - {feedback.department}</p>
                    <p className="text-sm text-gray-500 mt-1">{feedback.comment.substring(0, 60)}...</p>
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
            ))}
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
              {topDoctors.map(doctor => (
                <tr key={doctor.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-5 h-5 text-white" />
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-yellow-800">15 feedback responses pending</p>
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;