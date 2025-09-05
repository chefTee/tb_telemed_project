import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = ({token}) => {
    let navigate = useNavigate()
    function handleLogout(){
        sessionStorage.removeItem('token')
        navigate('/')
    }


  return (
    <div className='text-black'>
        <h3 className='text-black'>Welcome Back, <span className='text-green-600 font-bold'>{token.user.user_metadata.full_name}</span></h3>
        <button className='text-black bg-green-600' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HomePage