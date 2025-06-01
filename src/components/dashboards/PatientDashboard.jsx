import React, { useState } from 'react';
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
  Bell
} from 'lucide-react';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-06-05',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'confirmed',
      location: 'Building A, Room 201'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Neurology',
      date: '2025-06-08',
      time: '2:30 PM',
      type: 'Consultation',
      status: 'confirmed',
      location: 'Building B, Room 305'
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      date: '2025-06-12',
      time: '11:15 AM',
      type: 'Check-up',
      status: 'pending',
      location: 'Building A, Room 105'
    }
  ]);

  const [pastAppointments] = useState([
    {
      id: 4,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-05-28',
      time: '10:00 AM',
      type: 'Check-up',
      status: 'completed',
      rating: 5,
      canReview: true
    },
    {
      id: 5,
      doctorName: 'Dr. Robert Kim',
      specialty: 'General Medicine',
      date: '2025-05-15',
      time: '3:00 PM',
      type: 'Consultation',
      status: 'completed',
      rating: 4,
      canReview: false
    }
  ]);

  const [healthMetrics] = useState({
    lastCheckup: '2025-05-28',
    nextDue: '2025-08-28',
    totalAppointments: 12,
    missedAppointments: 1,
    averageRating: 4.8
  });

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

  const AppointmentCard = ({ appointment, isPast = false }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{appointment.doctorName}</h4>
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
            {isPast && appointment.canReview && (
              <button className="text-green-600 hover:text-green-800 text-xs px-2 py-1 border border-green-200 rounded">
                Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your appointments and health records</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Book Appointment
        </button>
      </div>

      {/* Health Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{healthMetrics.totalAppointments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Checkup</p>
              <p className="text-lg font-bold text-gray-900">{healthMetrics.lastCheckup}</p>
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
              <p className="text-2xl font-bold text-gray-900">{healthMetrics.averageRating}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Checkup</p>
              <p className="text-lg font-bold text-gray-900">{healthMetrics.nextDue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Find Doctors"
          description="Search and book appointments"
          icon={User}
          color="bg-blue-500"
          onClick={() => window.location.href = '/doctors'}
        />
        <QuickActionCard
          title="Medical History"
          description="View past appointments"
          icon={FileText}
          color="bg-green-500"
          onClick={() => window.location.href = '/patient/history'}
        />
        <QuickActionCard
          title="My Reviews"
          description="Rate your experiences"
          icon={Star}
          color="bg-yellow-500"
          onClick={() => window.location.href = '/patient/reviews'}
        />
        <QuickActionCard
          title="Emergency"
          description="Contact emergency services"
          icon={Heart}
          color="bg-red-500"
          onClick={() => alert('Emergency services: 911')}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {appointments.length > 0 ? (
                appointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h4>
                  <p className="text-gray-600">Book your first appointment to get started</p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Appointment confirmed</p>
                  <p className="text-xs text-gray-600">Dr. Sarah Johnson - June 5</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Review submitted</p>
                  <p className="text-xs text-gray-600">5 stars for Dr. Johnson</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Reminder set</p>
                  <p className="text-xs text-gray-600">Appointment in 2 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Health Tips</h3>
            </div>
            <div className="p-6 space-y-4">
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
            </div>
          </div>
        </div>
      </div>

      {/* Past Appointments */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} isPast={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;