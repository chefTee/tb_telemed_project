import { useState, useEffect } from 'react';
import { supabase } from '../../client';

export default function PatientAppointments({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_date,
          appointment_time,
          reason,
          status,
          notes,
          created_at,
          doctor:doctor_id (
            id,
            email
          ),
          doctor_profile:doctor_id (
            full_name
          )
        `)
        .eq('patient_id', token.user.id)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      accepted: 'bg-green-100 text-green-800 border-green-200',
      declined: 'bg-red-100 text-red-800 border-red-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    const statusText = {
      pending: 'Pending Review',
      accepted: 'Confirmed',
      declined: 'Declined',
      completed: 'Completed'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusMessage = (status) => {
    const messages = {
      pending: 'Your appointment request is being reviewed by the doctor.',
      accepted: 'Your appointment has been confirmed. Please arrive on time.',
      declined: 'Unfortunately, your appointment request was declined. Please book another time.',
      completed: 'Your appointment has been completed.'
    };
    return messages[status];
  };

  if (loading) {
    return <div className="p-6">Loading your appointments...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 mb-4">You haven't booked any appointments yet.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
            Book Your First Appointment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Appointment with Dr. {appointment.doctor_profile?.full_name || 'Unknown Doctor'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Date</p>
                        <p className="text-sm text-gray-900">{formatDate(appointment.appointment_date)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Time</p>
                        <p className="text-sm text-gray-900">{formatTime(appointment.appointment_time)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {getStatusBadge(appointment.status)}
                  </div>
                </div>

                {/* Reason */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Reason for Visit</p>
                  <p className="text-sm text-gray-900 bg-gray-50 rounded-md p-3">
                    {appointment.reason}
                  </p>
                </div>

                {/* Status Message */}
                <div className={`p-4 rounded-md ${
                  appointment.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
                  appointment.status === 'accepted' ? 'bg-green-50 border border-green-200' :
                  appointment.status === 'declined' ? 'bg-red-50 border border-red-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <p className="text-sm text-gray-700">
                    {getStatusMessage(appointment.status)}
                  </p>
                </div>

                {/* Doctor Notes (if any) */}
                {appointment.notes && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Doctor's Notes</p>
                    <p className="text-sm text-gray-900 bg-blue-50 rounded-md p-3 border border-blue-200">
                      {appointment.notes}
                    </p>
                  </div>
                )}

                {/* Booking Date */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Booked on {new Date(appointment.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}