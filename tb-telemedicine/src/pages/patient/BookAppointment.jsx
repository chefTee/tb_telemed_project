import React, { useState, useEffect } from "react";
import { supabase } from "../../client";

export default function BookAppointment({ token }) {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDoctors() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("role", "doctor");

      if (error) console.error(error);
      else setDoctors(data);
    }

    fetchDoctors();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const appointmentDateTime = new Date(`${date}T${time}`);

    const { error } = await supabase.from("appointments").insert([
      {
        patient_id: token.user.id,
        doctor_id: doctorId,
        appointment_date: appointmentDateTime,
        reason,
        status: "pending",
      },
    ]);

    if (error) alert(error.message);
    else {
      alert("Appointment booked successfully!");
      setDate("");
      setTime("");
      setReason("");
      setDoctorId("");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          required
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.full_name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="flex-1 px-4 py-2 border rounded-md"
          />
        </div>

        <textarea
          placeholder="Reason / Notes"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          rows={3}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}
