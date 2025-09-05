import React, { useState, useEffect } from 'react'
import { HomePage, Landing, Login, SignUpDoctor, SignUpPatient } from './pages'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [token, setToken] = useState(false)

if(token){
  sessionStorage.setItem('token',JSON.stringify(token))
}

  useEffect(() => {
  if(sessionStorage.getItem('token')){
    let data = JSON.parse(sessionStorage.getItem('token'))
    setToken(data)
  }
}, [])


  return (
    <div>
      <Routes>
        <Route path={'/SignUpPatient'} element={<SignUpPatient/>}/>
        <Route path={'/SignUpDoctor'} element={<SignUpDoctor/>}/>
        <Route path={'/login'} element={<Login setToken={setToken} />}/>
        {token?<Route path={'/homepage'} element={<HomePage token={token}/>} /> : "" }
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </div>
  )
}

export default App