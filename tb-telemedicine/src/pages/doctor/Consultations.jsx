
import { useState, useEffect } from 'react';
import { supabase } from '../../client';

export default function Consultations({ token }) {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeNote, setActiveNote] = useState('');

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        appointment_date,
        appointment_time,
        reason,
        status,
        notes,
        patient:patient_id (full_name)
      `)
      .eq('doctor_id', token.user.id)
      .in('status', ['accepted', 'completed'])
      .order('appointment_date', { ascending: true });

    if (error) console.error(error);
    else setConsultations(data);
    setLoading(false);
  };

  const updateConsultation = async (id) => {
    const { error } = await supabase
      .from('appointments')
      .update({
        notes: activeNote,
        status: 'completed'
      })
      .eq('id', id);

    if (error) alert('Error updating consultation: ' + error.message);
    else {
      setActiveNote('');
      fetchConsultations();
    }
  };

  if (loading) return <div className="p-6">Loading consultations...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Consultations</h1>

      {consultations.length === 0 ? (
        <p className="text-gray-600">No consultations yet.</p>
      ) : (
        <div className="space-y-6">
          {consultations.map((c) => (
            <div key={c.id} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {c.patient?.full_name || 'Unknown Patient'}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                {c.appointment_date} at {c.appointment_time}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Reason:</strong> {c.reason}
              </p>

              <div className="mb-3">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Consultation Notes
                </label>
                <textarea
                  value={activeNote}
                  onChange={(e) => setActiveNote(e.target.value)}
                  placeholder="Write your notes or recommendations..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-600"
                />
              </div>

              <button
                onClick={() => updateConsultation(c.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Save & Mark as Completed
              </button>

              {c.notes && (
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-gray-800">
                  <strong>Previous Notes:</strong> {c.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
