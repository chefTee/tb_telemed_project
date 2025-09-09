// import React, { useState, useEffect } from 'react'
// import { HomePage, Landing, Login, SignUpDoctor, SignUpPatient } from './pages'
// import { Routes, Route } from 'react-router-dom'

// const App = () => {
//   const [token, setToken] = useState(false)

// if(token){
//   sessionStorage.setItem('token',JSON.stringify(token))
// }

//   useEffect(() => {
//   if(sessionStorage.getItem('token')){
//     let data = JSON.parse(sessionStorage.getItem('token'))
//     setToken(data)
//   }
// }, [])


//   return (
//     <div>
//       <Routes>
//         <Route path={'/SignUpPatient'} element={<SignUpPatient/>}/>
//         <Route path={'/SignUpDoctor'} element={<SignUpDoctor/>}/>
//         <Route path={'/login'} element={<Login setToken={setToken} />}/>
//         {token?<Route path={'/homepage'} element={<HomePage token={token}/>} /> : "" }
//         <Route path='/' element={<Landing/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default App


import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Login, SignUpPatient, PatientDashboard, DoctorDashboard, Landing } from "./pages";
import {
  Home as PatientHome, 
  Profile as PatientProfile,
  SymptomChecklist as PatientSymptomChecklist,
  LabResults as PatientLabResults,
  Teleconsultation as PatientTeleconsultation,
  ERecord as PatientERecord,
  BookAppointment as PatientBookAppointment
 } from "./pages/patient";
import { Home as DoctorHome, Profile as DoctorProfile } from "./pages/doctor";

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

      <Route path="/patient" element={<PatientDashboard />}>
        <Route path="home" element={<PatientHome token={token} />} />
        <Route path="patientprofile" element={<PatientProfile token={token} />} />
        <Route path="symptomchecklist" element={<PatientSymptomChecklist/>}/>
        <Route path="labresults" element={<PatientLabResults token={token}/>}/>
        <Route path="erecord" element={<PatientERecord/>}/>
        <Route path="teleconsultation" element={<PatientTeleconsultation/>}/>
        <Route path="patientbookappointment" element={<PatientBookAppointment/>}/>
      </Route>

      <Route path="/doctor" element={<DoctorDashboard />}>
        <Route path="home" element={<DoctorHome token={token} />} />
        <Route path="profile" element={<DoctorProfile token={token} />} />
      </Route>
    </Routes>
  );
};

export default App;