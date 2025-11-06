import { useState, useEffect } from 'react';
import { supabase } from '../../client';

export default function DoctorAppointments({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        appointment_date,
        appointment_time,
        reason,
        status,
        patient:patient_id (full_name, email)
      `)
      .eq('doctor_id', token.user.id)
      .order('appointment_date', { ascending: true });

    if (error) console.error(error);
    else setAppointments(data);
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) alert('Error updating status: ' + error.message);
    else fetchAppointments();
  };

  if (loading) return <div className="p-6">Loading appointments...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Appointment Requests</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments yet.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((a) => (
            <div key={a.id} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {a.patient?.full_name || 'Unknown Patient'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{a.patient?.email}</p>
                  <p className="text-sm text-gray-700">
                    <strong>Date:</strong> {a.appointment_date}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Time:</strong> {a.appointment_time}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    a.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      : a.status === 'accepted'
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : a.status === 'declined'
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : 'bg-blue-100 text-blue-800 border-blue-200'
                  }`}
                >
                  {a.status}
                </span>
              </div>

              <p className="text-sm mb-3 text-gray-700">
                <strong>Reason:</strong> {a.reason}
              </p>

              {a.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(a.id, 'accepted')}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(a.id, 'declined')}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
