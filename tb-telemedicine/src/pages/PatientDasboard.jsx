import React from "react";
import { Link, Outlet } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white flex flex-col border-r border-gray-200">
        <div className="p-6 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
            <h1 className="text-2xl font-semibold text-gray-800">TBcare</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          <Link to="home" className="block py-2 px-4 hover:bg-blue-100 rounded">
            🏠 Home
          </Link>
          <Link to="patientprofile" className="block py-2 px-4 hover:bg-blue-100 rounded">
            👤 Profile
          </Link>
          <Link to="symptomchecklist" className="block py-2 px-4 hover:bg-blue-100 rounded">
            ❓ Symptom Checklist
          </Link>
          <Link to="labresults" className="block py-2 px-4 hover:bg-blue-100 rounded">
            🧪 Lab Results
          </Link>
          <Link to="patientbookappointment" className="block py-2 px-4 hover:bg-blue-100 rounded">
            💼 Book Appointment
          </Link>
          <Link to="teleconsultation" className="block py-2 px-4 hover:bg-blue-100 rounded">
            📹 Teleconsultation
          </Link>
          <Link to="erecord" className="block py-2 px-4 hover:bg-blue-100 rounded">
            📄 E-Record
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h2 className="text-3xl font-bold text-gray-900">TB Patient Portal</h2>
          <p className="text-gray-500 mt-1">Manage your health with ease</p>
        </div>

        {/* Nested page will render here */}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
