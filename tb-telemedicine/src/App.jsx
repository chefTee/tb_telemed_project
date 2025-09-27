import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Login, SignUpPatient, SignUpDoctor, PatientDashboard, DoctorDashboard, Landing } from "./pages";
import {
  Home as PatientHome, 
  Profile as PatientProfile,
  SymptomChecklist as PatientSymptomChecklist,
  LabResults as PatientLabResults,
  Teleconsultation as PatientTeleconsultation,
  ERecord as PatientERecord,
  BookAppointment as PatientBookAppointment
 } from "./pages/patient";
import { 
    Appointments as Appointments,
    Home as DoctorHome,
    Profile as DoctorProfile,
    PatientList as PatientList,
    Consultations as Consultations
   } from "./pages/doctor";

const App = () => {
  const [token, setToken] = useState(false);

  // Persist token in sessionStorage
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  // Restore token on reload
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  return (
    <Routes>
      {/* ✅ Pass setToken here */}
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/SignUpPatient" element={<SignUpPatient />} />
      <Route path="/SignUpDoctor" element={<SignUpDoctor />} />

      <Route path="/patient" element={<PatientDashboard />}>
        <Route path="home" element={<PatientHome token={token} />} />
        <Route path="patientprofile" element={<PatientProfile token={token} />} />
        <Route path="symptomchecklist" element={<PatientSymptomChecklist/>}/>
        <Route path="labresults" element={<PatientLabResults token={token}/>}/>
        <Route path="erecord" element={<PatientERecord token={token}/>}/>
        <Route path="teleconsultation" element={<PatientTeleconsultation/>}/>
        <Route path="patientbookappointment" element={<PatientBookAppointment/>}/>
      </Route>

      <Route path="/doctor" element={<DoctorDashboard />}>
        <Route path="home" element={<DoctorHome token={token} />} />
        <Route path="profile" element={< DoctorProfile token={token} />} />
        <Route path="appointments" element={< Appointments/>} />
        <Route path="consultations" element={< Consultations />} />
        <Route path="patientlist" element={< PatientList />} />
          {/* ✅ New doctor routes for patient detail views */}
        <Route path="patient/:id/patientprofile" element={<PatientProfile token={token} />} /> 
        <Route path="patient/:id/labresults" element={ <PatientLabResults token={token}/>}/> 
        <Route path="patient/:id/erecord" element={ <PatientERecord token={token}/>}/> 
        
      </Route>
    </Routes>
  );
};

export default App;