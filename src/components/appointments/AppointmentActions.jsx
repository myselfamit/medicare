import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Save, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Edit
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import patientAppointmentsApi from '../../apis/PatientAppointmentsApi.js';

const AppointmentActions = ({ appointment, isOpen, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [action, setAction] = useState('reschedule');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [slotsLoading, setSlotsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && appointment) {
      setAction('reschedule');
      setSelectedDate('');
      setSelectedTime('');
      setAvailableSlots([]);
      setError('');
    }
  }, [isOpen, appointment]);

  useEffect(() => {
    if (selectedDate && appointment) {
      loadAvailableSlots();
    }
  }, [selectedDate]);

  const loadAvailableSlots = async () => {
    try {
      setSlotsLoading(true);
      const result = await patientAppointmentsApi.getDoctorSlots(appointment.doctor_id, selectedDate);
      
      if (result.success) {
        setAvailableSlots(result.data.slots || []);
      } else {
        setError('Failed to load available slots');
        setAvailableSlots([]);
      }
    } catch (err) {
      setError('Error loading slots');
      setAvailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  };

  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    
    // Start from tomorrow for rescheduling
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      days.push({
        date: date,
        dateString: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return days;
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      setSaving(true);
      setError('');

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      const result = await patientAppointmentsApi.cancelAppointment(userType, emailId, appointment.id);

      if (result.success) {
        onUpdate();
        onClose();
      } else {
        setError(result.error || 'Failed to cancel appointment');
      }
    } catch (err) {
      setError('Error canceling appointment');
    } finally {
      setSaving(false);
    }
  };

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      const result = await patientAppointmentsApi.rescheduleAppointment(
        userType, 
        emailId, 
        appointment.id, 
        selectedDate, 
        selectedTime
      );

      if (result.success) {
        onUpdate();
        onClose();
      } else {
        setError(result.error || 'Failed to reschedule appointment');
      }
    } catch (err) {
      setError('Error rescheduling appointment');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (action === 'cancel') {
      await handleCancel();
    } else if (action === 'reschedule') {
      await handleReschedule();
    }
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Manage Appointment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Appointment Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Current Appointment</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Type:</strong> {appointment.type}</p>
            </div>
          </div>

          {/* Action Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What would you like to do?
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="action"
                  value="reschedule"
                  checked={action === 'reschedule'}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-gray-700">Reschedule appointment</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="action"
                  value="cancel"
                  checked={action === 'cancel'}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-4 h-4 text-red-600"
                />
                <span className="ml-3 text-gray-700">Cancel appointment</span>
              </label>
            </div>
          </div>

          {/* Reschedule Form */}
          {action === 'reschedule' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select New Date
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {getNextSevenDays().map((day, index) => {
                    const isSelected = selectedDate === day.dateString;
                    
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedDate(day.dateString)}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          isSelected 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-xs">{day.dayName}</div>
                        <div className="font-semibold">{day.dayNumber}</div>
                        <div className="text-xs">{day.monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select New Time
                  </label>
                  {slotsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                            selectedTime === slot.time
                              ? 'bg-blue-600 text-white border-blue-600'
                              : slot.available
                              ? 'border-gray-300 hover:bg-gray-50'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No available slots for this date
                    </p>
                  )}
                </div>
              )}
            </form>
          )}

          {/* Cancel Confirmation */}
          {action === 'cancel' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <h4 className="font-medium text-red-900">Cancel Appointment</h4>
              </div>
              <p className="text-red-800 text-sm">
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving || (action === 'reschedule' && (!selectedDate || !selectedTime))}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                action === 'cancel'
                  ? saving
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                  : saving || (!selectedDate || !selectedTime)
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {saving ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                  {action === 'cancel' ? 'Canceling...' : 'Rescheduling...'}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {action === 'cancel' ? (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Cancel Appointment
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Reschedule Appointment
                    </>
                  )}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentActions;