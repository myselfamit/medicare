import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Send, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  User,
  Calendar,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import patientDashboardApi from '../../apis/PatientDashboardApi.js';

const RatingModal = ({ appointment, isOpen, onClose, onSubmit }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('overall');
  const [wouldRecommend, setWouldRecommend] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && appointment) {
      // Reset form
      setRating(0);
      setHoveredRating(0);
      setComment('');
      setCategory('overall');
      setWouldRecommend('');
      setError('');
      setSuccess(false);
    }
  }, [isOpen, appointment]);

  const ratingCategories = [
    { value: 'overall', label: 'Overall Experience' },
    { value: 'punctuality', label: 'Punctuality' },
    { value: 'communication', label: 'Communication' },
    { value: 'professionalism', label: 'Professionalism' },
    { value: 'facility', label: 'Facility & Staff' }
  ];

  const ratingDescriptions = {
    1: 'Very Poor',
    2: 'Poor', 
    3: 'Average',
    4: 'Good',
    5: 'Excellent'
  };

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please provide a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please provide a comment about your experience');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      const feedbackData = {
        appointment_id: appointment.id,
        doctor_id: appointment.doctor_id,
        doctor_name: appointment.doctor_name,
        department: appointment.department,
        specialty: appointment.specialty,
        rating: rating,
        category: category,
        comment: comment.trim(),
        would_recommend: wouldRecommend,
        appointment_date: appointment.date,
        appointment_time: appointment.time,
        feedback_date: new Date().toISOString().split('T')[0],
        feedback_time: new Date().toTimeString().split(' ')[0]
      };

      const result = await patientDashboardApi.submitFeedback(userType, emailId, feedbackData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onSubmit();
          onClose();
        }, 2000);
      } else {
        setError(result.error || 'Failed to submit feedback');
      }
    } catch (err) {
      setError('Error submitting feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !appointment) return null;

  const displayRating = hoveredRating || rating;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Rate Your Experience</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-800">Thank you for your feedback! Your review has been submitted successfully.</p>
              </div>
            </div>
          )}

          {/* Appointment Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{appointment.doctor_name}</h3>
                <p className="text-sm text-blue-700">{appointment.specialty}</p>
                <p className="text-xs text-blue-600">{appointment.department}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(appointment.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {appointment.time}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to rate?
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submitting}
              >
                {ratingCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience? *
              </label>
              <div className="flex items-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                    className="focus:outline-none transition-transform hover:scale-110"
                    disabled={submitting}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= displayRating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {displayRating > 0 && (
                <p className="text-sm text-gray-600">
                  {ratingDescriptions[displayRating]} ({displayRating}/5)
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share your experience *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell others about your experience with this doctor. What did you like? What could be improved?"
                required
                disabled={submitting}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {comment.length}/500 characters
              </p>
            </div>

            {/* Recommendation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Would you recommend this doctor to others?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="recommend"
                    value="yes"
                    checked={wouldRecommend === 'yes'}
                    onChange={(e) => setWouldRecommend(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                    disabled={submitting}
                  />
                  <span className="ml-3 text-gray-700 flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1 text-green-600" />
                    Yes, I would recommend
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="recommend"
                    value="no"
                    checked={wouldRecommend === 'no'}
                    onChange={(e) => setWouldRecommend(e.target.value)}
                    className="w-4 h-4 text-red-600"
                    disabled={submitting}
                  />
                  <span className="ml-3 text-gray-700 flex items-center">
                    <ThumbsDown className="w-4 h-4 mr-1 text-red-600" />
                    No, I would not recommend
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="recommend"
                    value="maybe"
                    checked={wouldRecommend === 'maybe'}
                    onChange={(e) => setWouldRecommend(e.target.value)}
                    className="w-4 h-4 text-yellow-600"
                    disabled={submitting}
                  />
                  <span className="ml-3 text-gray-700 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1 text-yellow-600" />
                    Maybe, with some improvements
                  </span>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || rating === 0 || !comment.trim() || success}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                  submitting || rating === 0 || !comment.trim() || success
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </div>
                ) : success ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submitted!
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Review
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Privacy Notice */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>Privacy Notice:</strong> Your review will be visible to other patients to help them make informed decisions. 
              Your personal information will not be shared. Reviews are moderated to ensure quality and appropriateness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;