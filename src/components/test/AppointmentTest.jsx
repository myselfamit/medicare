import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Calendar, Star, User } from 'lucide-react';
import DoctorSearch from '../doctors/DoctorSearch';
import PatientAppointments from '../appointments/PatientAppointments';
import AppointmentHistory from '../appointments/AppointmentHistory';

const AppointmentTest = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [testResults, setTestResults] = useState([]);

  const addTestResult = (test, success, message) => {
    setTestResults(prev => [...prev, { test, success, message, timestamp: new Date().toISOString() }]);
  };

  const TestResult = ({ result }) => (
    <div className={`flex items-center p-2 rounded-lg ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
      {result.success ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
      <span className="text-sm">
        <strong>{result.test}:</strong> {result.message}
      </span>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment System Test</h1>
        <p className="text-gray-600">Test all three user stories: Book, Cancel/Reschedule, and Rate appointments</p>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h2>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <TestResult key={index} result={result} />
            ))}
          </div>
          <button 
            onClick={() => setTestResults([])}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800"
          >
            Clear Results
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('search')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'search'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              1. Book Appointment
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              2. Manage Appointments
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Star className="w-4 h-4 inline mr-2" />
              3. Rate Experience
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'search' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                User Story 1: Book Appointment
              </h3>
              <p className="text-gray-600 mb-6">
                Test the doctor search and booking functionality. Click "View Profile & Book Appointment" to test the popup.
              </p>
              <DoctorSearch onBookingSuccess={(data) => {
                addTestResult('Booking', true, `Successfully booked appointment with ${data.doctor_name} on ${data.date} at ${data.time}`);
              }} />
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                User Story 2: Cancel/Reschedule Appointment
              </h3>
              <p className="text-gray-600 mb-6">
                Test the appointment management functionality. Use the Reschedule and Cancel buttons.
              </p>
              <PatientAppointments onAppointmentUpdate={(action, appointment) => {
                addTestResult('Appointment Management', true, `Successfully ${action}d appointment with ${appointment.doctor_name}`);
              }} />
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                User Story 3: Rate Experience
              </h3>
              <p className="text-gray-600 mb-6">
                Test the rating functionality. Click "Rate Experience" for completed appointments.
              </p>
              <AppointmentHistory onRatingSubmit={(rating, appointment) => {
                addTestResult('Rating', true, `Successfully rated ${appointment.doctor_name} with ${rating} stars`);
              }} />
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Testing Instructions</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Step 1:</strong> Go to "Book Appointment" tab and click "View Profile & Book Appointment" on any doctor</p>
          <p><strong>Step 2:</strong> Select a date and time slot, then click "Book Appointment"</p>
          <p><strong>Step 3:</strong> Go to "Manage Appointments" tab and test Reschedule/Cancel buttons</p>
          <p><strong>Step 4:</strong> Go to "Rate Experience" tab and click "Rate Experience" for completed appointments</p>
          <p><strong>Step 5:</strong> Submit ratings and check if they save properly</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTest;