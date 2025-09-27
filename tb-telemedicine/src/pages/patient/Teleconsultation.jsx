import React, { useEffect, useState } from "react";
import { supabase } from "../../client";

export default function Teleconsultation({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      const { data, error } = await supabase
        .from("appointments")
        .select("id, appointment_date, status, doctor_id, doctor:profiles(full_name)")
        .eq("patient_id", token.user.id)
        .order("appointment_date", { ascending: true });

      if (error) console.error(error);
      else setAppointments(data);

      setLoading(false);
    }

    fetchAppointments();
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Upcoming Teleconsultations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No upcoming consultations.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">Doctor</th>
              <th className="border px-2 py-1">Date & Time</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id}>
                <td className="border px-2 py-1">{app.doctor.full_name}</td>
                <td className="border px-2 py-1">
                  {new Date(app.appointment_date).toLocaleString()}
                </td>
                <td className="border px-2 py-1">{app.status}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                    // replace with real video link later
                    onClick={() => alert("Join consultation (placeholder)")}
                  >
                    Join
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
