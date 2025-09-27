import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    setLoading(true);
    try {
      let { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .eq("role", "patient");

      if (error) throw error;
      setPatients(data || []);
    } catch (err) {
      console.error("Error fetching patients:", err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="p-4">Loading patients...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Patients List</h1>

      {patients.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">No patients found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.full_name}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        className="px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-200"
                        onClick={() =>
                          navigate(`/doctor/patient/${patient.id}/patientprofile`)
                        }
                      >
                        Profile
                      </button>
                      <button
                        className="px-4 py-2 bg-white text-purple-600 border-2 border-purple-600 rounded-full text-sm font-medium hover:bg-purple-600 hover:text-white transition-all duration-200"
                        onClick={() =>
                          navigate(`/doctor/patient/${patient.id}/labresults`)
                        }
                      >
                        Lab Results
                      </button>
                      <button
                        className="px-4 py-2 bg-white text-green-600 border-2 border-green-600 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition-all duration-200"
                        onClick={() =>
                          navigate(`/doctor/patient/${patient.id}/erecord`)
                        }
                      >
                        E-Records
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}