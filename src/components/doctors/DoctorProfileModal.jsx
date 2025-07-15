import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, Star, MapPin, Phone, Mail, 
  Award, Briefcase, DollarSign, ChevronLeft, ChevronRight,
  AlertCircle, CheckCircle, RefreshCw
} from 'lucide-react';
import doctorSearchApi from '../../apis/DoctorSearchApi';
import { useAuth } from '../../contexts/AuthContext';

const DoctorProfileModal = ({ doctor, isOpen, onClose }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedDate && doctor) {
      loadAvailableSlots();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setSelectedDate('');
      setSelectedSlot('');
      setAvailableSlots([]);
      setError('');
      setBookingSuccess(false);
    }
  }, [isOpen]);

  const loadAvailableSlots = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await doctorSearchApi.getDoctorSlots(doctor.id, selectedDate);
      
      if (result.success) {
        setAvailableSlots(result.data || []);
      } else {
        console.error('Failed to load slots:', result.error);
        setError('Failed to load available time slots. Please try a different date.');
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error loading slots:', error);
      setError('Unable to load time slots. Please check your connection and try again.');
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Check if doctor works on this day
      const dayName = date.toLocaleDateString('en-US', { weekday: 'lowercase' });
      const isWorkingDay = doctor.working_hours && doctor.working_hours[dayName];
      
      days.push({
        date: date,
        dateString: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isWorkingDay: isWorkingDay
      });
    }
    return days;
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedSlot) {
      setError('Please select both a date and time slot');
      return;
    }
    
    try {
      setBooking(true);
      setError('');
      
      const userEmail = user?.email_id || user?.email;
      if (!userEmail) {
        setError('User email not found. Please log in again.');
        return;
      }
      
      const bookingData = {
        doctor_id: doctor.id,
        patient_email: userEmail,
        date: selectedDate,
        time_slot: selectedSlot,
        type: 'Consultation',
        doctor_name: `${doctor.first_name} ${doctor.last_name}`,
        patient_name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Patient'
      };
      
      const result = await doctorSearchApi.bookAppointment(bookingData);
      
      if (result.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          onClose();
          // Optionally redirect to appointments page
          // window.location.href = '/patient/appointments';
        }, 2000);
      } else {
        setError(result.error || 'Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError('An error occurred while booking. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Doctor Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Success Message */}
          {bookingSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-800">Appointment booked successfully! Redirecting...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Doctor Info */}
          <div className="flex items-start space-x-6 mb-8">
            <img 
              src={doctor.profile_image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.first_name}`} 
              alt={`${doctor.first_name} ${doctor.last_name}`}
              className="w-32 h-32 rounded-full bg-gray-200"
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.first_name}`;
              }}
            />
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                {doctor.first_name} {doctor.last_name}
              </h3>
              <p className="text-lg text-gray-600 mb-2">{doctor.specialty}</p>
              <p className="text-sm text-gray-500 mb-4">{doctor.qualification}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current mr-2" />
                  <div>
                    <p className="font-semibold">{doctor.rating || 'N/A'}</p>
                    <p className="text-xs text-gray-500">{doctor.total_reviews || 0} reviews</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <p className="font-semibold">{doctor.experience || 'N/A'}</p>
                    <p className="text-xs text-gray-500">Experience</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                  <div>
                    <p className="font-semibold">${doctor.consultation_fee || 'N/A'}</p>
                    <p className="text-xs text-gray-500">Per Visit</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-purple-600 mr-2" />
                  <div>
                    <p className="font-semibold">{doctor.department}</p>
                    <p className="text-xs text-gray-500">Department</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {doctor.location || 'Location not specified'}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {doctor.phone || 'Phone not provided'}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {doctor.email || 'Email not provided'}
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">About</h4>
            <p className="text-gray-600">{doctor.about || 'No additional information available.'}</p>
          </div>

          {/* Working Hours */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Working Hours</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <div key={day} className="text-sm">
                  <p className="font-medium capitalize text-gray-700">{day}</p>
                  {doctor.working_hours && doctor.working_hours[day] ? (
                    <p className="text-gray-600">{doctor.working_hours[day].start} - {doctor.working_hours[day].end}</p>
                  ) : (
                    <p className="text-gray-400">Closed</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Book Appointment Section */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Book Appointment</h4>
            
            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <div className="grid grid-cols-7 gap-2">
                {getNextSevenDays().map((day, index) => {
                  const isSelected = selectedDate === day.dateString;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => day.isWorkingDay && setSelectedDate(day.dateString)}
                      disabled={!day.isWorkingDay}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        isSelected 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : day.isWorkingDay
                          ? 'border-gray-300 hover:bg-gray-50'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-xs">{day.dayName}</div>
                      <div className="font-semibold">{day.dayNumber}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time Slot
                </label>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="flex items-center">
                      <RefreshCw className="w-5 h-5 animate-spin text-blue-600 mr-2" />
                      <span className="text-gray-600">Loading available slots...</span>
                    </div>
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => slot.available && setSelectedSlot(slot.time)}
                        disabled={!slot.available}
                        className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                          selectedSlot === slot.time
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
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No available slots for this date</p>
                    <p className="text-xs text-gray-400 mt-1">Please try a different date</p>
                  </div>
                )}
              </div>
            )}

            {/* Booking Summary */}
            {selectedDate && selectedSlot && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Booking Summary</h5>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Doctor:</strong> {doctor.first_name} {doctor.last_name}</p>
                  <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p><strong>Time:</strong> {selectedSlot}</p>
                  <p><strong>Type:</strong> Consultation</p>
                  <p><strong>Fee:</strong> ${doctor.consultation_fee || 'N/A'}</p>
                </div>
              </div>
            )}

            {/* Book Button */}
            <div className="flex gap-4">
              <button
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedSlot || booking || bookingSuccess}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  selectedDate && selectedSlot && !booking && !bookingSuccess
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {booking ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                    Booking...
                  </div>
                ) : bookingSuccess ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Booked Successfully
                  </div>
                ) : (
                  'Book Appointment'
                )}
              </button>
              <button
                onClick={onClose}
                disabled={booking}
                className="flex-1 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {bookingSuccess ? 'Close' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;