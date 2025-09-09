import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ token }) => {
  let navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="text-gray-800">
      {/* ✅ Hero Section */}
      <section className="bg-green-50 py-10 px-6 text-center">
        <h1 className="text-3xl font-bold text-green-700">
          Welcome Back, {token.user.user_metadata.full_name} 👋
        </h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto">
          TB TeleHealth helps you detect tuberculosis symptoms early, consult
          doctors remotely, and keep your medical records safe.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/patient/symptomchecklist"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Check Your TB Risk
          </Link>
          <Link
            to="/patient/patientprofile"
            className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50"
          >
            Profile Page
          </Link>
        </div>
      </section>

      {/* ✅ Problem Statement */}
      <section className="py-10 px-6 text-center bg-white">
        <h2 className="text-2xl font-semibold text-green-700">
          Why This Matters
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600">
          Nigeria is one of the top 10 countries with the highest TB burden
          globally and ranks first in Africa. Millions of people remain
          undiagnosed until it’s too late. Our system helps bridge this gap
          through early detection and telemedicine.
        </p>
      </section>

      {/* ✅ Features */}
      <section className="py-10 px-6 bg-green-50">
        <h2 className="text-2xl font-semibold text-center text-green-700">
          What You Can Do Here
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-lg font-bold text-green-700">
              📝 Symptom Checker
            </h3>
            <p className="mt-2 text-gray-600">
              Know your TB risk instantly with our checklist.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-lg font-bold text-green-700">💻 Teleconsult</h3>
            <p className="mt-2 text-gray-600">
              Talk to a doctor online without leaving your home.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-lg font-bold text-green-700">📂 E-Records</h3>
            <p className="mt-2 text-gray-600">
              Keep your medical history safe and accessible anytime.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-lg font-bold text-green-700">📅 Appointments</h3>
            <p className="mt-2 text-gray-600">
              Book visits and consultations with ease.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Educational Facts */}
      <section className="py-10 px-6 bg-white text-center">
        <h2 className="text-2xl font-semibold text-green-700">
          Did You Know? 🤔
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          <div className="p-6 bg-green-50 rounded-2xl shadow">
            🦠 TB spreads through the air when someone coughs or sneezes.
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow">
            ⏱ Early detection and treatment saves lives.
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow">
            🇳🇬 Nigeria has the highest TB burden in Africa.
          </div>
        </div>
      </section>

      {/* ✅ Logout Button */}
      <div className="flex justify-center py-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
