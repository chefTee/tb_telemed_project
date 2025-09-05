import React from 'react'
import { HomePage, Landing, Login, SignUpDoctor, SignUpPatient } from './pages'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'/SignUpPatient'} element={<SignUpPatient/>}/>
        <Route path={'/SignUpDoctor'} element={<SignUpDoctor/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/homepage'} element={<HomePage/>} />
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </div>
  )
}

export default App