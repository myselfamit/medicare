import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle,
  Activity,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  TrendingUp
} from 'lucide-react';

const DoctorDashboard = () => {
  const [todayAppointments, setTodayAppointments] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'confirmed',
      duration: '30 min',
      notes: 'Cardiology follow-up, check blood pressure'
    },
    {
      id: 2,
      patientName: 'Sarah Davis',
      time: '11:30 AM',
      type: 'New Patient',
      status: 'confirmed',
      duration: '45 min',
      notes: 'Initial consultation for chest pain'
    },
    {
      id: 3,
      patientName: 'Mike Wilson',
      time: '2:00 PM',
      type: 'Check-up',
      status: 'pending',
      duration: '30 min',
      notes: 'Routine annual check-up'
    },
    {
      id: 4,
      patientName: 'Emma Johnson',
      time: '3:30 PM',
      type: 'Consultation',
      status: 'confirmed',
      duration: '30 min',
      notes: 'Discuss test results'
    }
  ]);

  const [stats] = useState({
    todayPatients: 8,
    weeklyPatients: 42,
    monthlyPatients: 167,
    averageRating: 4.8,
    totalReviews: 89,
    completedToday: 3,
    upcomingToday: 5
  });

  const [recentReviews] = useState([
    {
      id: 1,
      patientName: 'Alice Cooper',
      rating: 5,
      comment: 'Dr. Johnson was very thorough and explained everything clearly. Excellent care!',
      date: '2025-05-30'
    },
    {
      id: 2,
      patientName: 'Robert Lee',
      rating: 4,
      comment: 'Professional service, though the waiting time was a bit longer than expected.',
      date: '2025-05-28'
    },
    {
      id: 3,
      patientName: 'Maria Garcia',
      rating: 5,
      comment: 'Great doctor! Very caring and knowledgeable. Highly recommend.',
      date: '2025-05-25'
    }
  ]);

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2 text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{trend}</span>
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
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h4 className="font-semibold text-gray-900">{appointment.patientName}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {appointment.status}
            </span>
          </div>
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
          <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {appointment.type}
          </span>
          {appointment.notes && (
            <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50">
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50">
            <CheckCircle className="w-4 h-4" />
          </button>
          <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50">
            <Edit className="w-4 h-4" />
          </button>
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
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Dr. Johnson! Here's your day overview.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Notes
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Schedule
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Patients"
          value={stats.todayPatients}
          subtitle={`${stats.completedToday} completed, ${stats.upcomingToday} upcoming`}
          icon={Users}
          color="bg-blue-500"
          trend="+12%"
        />
        <StatCard
          title="This Week"
          value={stats.weeklyPatients}
          subtitle="Total appointments"
          icon={Calendar}
          color="bg-green-500"
          trend="+8%"
        />
        <StatCard
          title="Patient Rating"
          value={stats.averageRating}
          subtitle={`${stats.totalReviews} reviews`}
          icon={Star}
          color="bg-yellow-500"
          trend="+0.2"
        />
        <StatCard
          title="This Month"
          value={stats.monthlyPatients}
          subtitle="Patients served"
          icon={Activity}
          color="bg-purple-500"
          trend="+15%"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="My Schedule"
          description="View and manage availability"
          icon={Calendar}
          color="bg-blue-500"
          onClick={() => window.location.href = '/doctor/schedule'}
        />
        <QuickActionCard
          title="Patient Records"
          description="Access medical histories"
          icon={FileText}
          color="bg-green-500"
          onClick={() => window.location.href = '/doctor/patients'}
        />
        <QuickActionCard
          title="Reviews"
          description="View patient feedback"
          icon={MessageSquare}
          color="bg-yellow-500"
          onClick={() => window.location.href = '/doctor/reviews'}
        />
        <QuickActionCard
          title="Profile"
          description="Update your information"
          icon={Users}
          color="bg-purple-500"
          onClick={() => window.location.href = '/doctor/profile'}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">June 1, 2025</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Full Schedule
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {todayAppointments.length > 0 ? (
                todayAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No appointments today</h4>
                  <p className="text-gray-600">Your schedule is clear for today</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Appointments Today</span>
                <span className="font-semibold text-gray-900">{stats.todayPatients}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{stats.completedToday}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Upcoming</span>
                <span className="font-semibold text-blue-600">{stats.upcomingToday}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Duration</span>
                <span className="font-semibold text-gray-900">32 min</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New appointment request</p>
                  <p className="text-xs text-gray-600">Sarah Davis - June 3, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Appointment confirmed</p>
                  <p className="text-xs text-gray-600">Mike Wilson - June 2, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New review received</p>
                  <p className="text-xs text-gray-600">5 stars from Alice Cooper</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Patient Reviews</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Reviews
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentReviews.map(review => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{review.patientName}</h4>
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
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Schedule Overview */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">This Week's Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">{day}</p>
                <div className={`h-16 rounded-lg flex items-center justify-center ${
                  index < 5 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  <span className="text-sm font-medium">
                    {index < 5 ? `${6 + index}` : '0'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {index < 5 ? 'patients' : 'off'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;