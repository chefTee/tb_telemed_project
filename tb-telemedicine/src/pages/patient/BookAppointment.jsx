import { useState, useEffect } from 'react';
import { supabase } from '../../client';

export default function BookAppointment({ token }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
    reason: ''
  });

  // Fetch available doctors
  useEffect(() => {
    async function fetchDoctors() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'doctor');
      
      if (!error) {
        setDoctors(data || []);
      }
    }
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([{
          patient_id: token.user.id,
          doctor_id: formData.doctor_id,
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          reason: formData.reason,
          status: 'pending'
        }]);

      if (error) throw error;

      alert('Appointment request submitted successfully!');
      setFormData({
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
        reason: ''
      });
    } catch (error) {
      alert('Error booking appointment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor
            </label>
            <select
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-green-600"
            >
              <option value="">Choose a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-green-600"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time
            </label>
            <select
              name="appointment_time"
              value={formData.appointment_time}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-green-600"
            >
              <option value="">Select time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Visit
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Please describe your symptoms or reason for the appointment"
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-green-600 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Booking Appointment...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}