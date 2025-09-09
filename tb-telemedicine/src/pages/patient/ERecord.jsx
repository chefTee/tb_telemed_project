import React, { useEffect, useState } from "react";
import { supabase } from "../../client";

export default function ERecords({ token, patientId }) {
  const [role, setRole] = useState(null);
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  // Prescriptions + Notes state
  const [prescriptions, setPrescriptions] = useState("");
  const [notes, setNotes] = useState("");

  // 🔹 Fetch role for logged-in user
  useEffect(() => {
    async function fetchRole() {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", token.user.id)
        .single();

      if (!error && data) {
        setRole(data.role); // "doctor" or "patient"
      }
    }
    fetchRole();
  }, [token]);

  // 🔹 Fetch patient record
  useEffect(() => {
    async function fetchRecord() {
      const { data, error } = await supabase
        .from("e_records")
        .select("id, prescriptions, notes")
        .eq("patient_id", patientId)
        .single();

      if (!error && data) {
        setRecord(data);
        setPrescriptions(data.prescriptions || "");
        setNotes(data.notes || "");
      }
      setLoading(false);
    }
    fetchRecord();
  }, [patientId]);

  async function handleUpdate(e) {
    e.preventDefault();
    if (role !== "doctor") return;

    const { error } = await supabase
      .from("e_records")
      .update({
        prescriptions,
        notes,
        updated_at: new Date(),
      })
      .eq("id", record.id);

    if (error) {
      alert(error.message);
    } else {
      alert("Record updated successfully!");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-green-700 mb-4">Patient E-Record</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Prescriptions</label>
          <textarea
            className="w-full border rounded-lg p-2"
            value={prescriptions}
            onChange={(e) => setPrescriptions(e.target.value)}
            disabled={role !== "doctor"} // patients can’t edit
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Additional Notes</label>
          <textarea
            className="w-full border rounded-lg p-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={role !== "doctor"} // patients can’t edit
          />
        </div>

        {role === "doctor" && (
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Update Record
          </button>
        )}
      </form>
    </div>
  );
}

