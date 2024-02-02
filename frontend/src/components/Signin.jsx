import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState("")
  const navigate = useNavigate();
  
  return (
    <div className=' flex flex-col justify-center items-center bg-white mt-22 border-2 border-slate-500 rounded-xl shadow-xl w-3/4 m-auto md:w-1/4  p-3'>
      <div>
        <h1 className='text-center text-3xl font-bold p-4'>Sign In</h1>
        <p className='text-center text-slate-500'>Enter your credentials to log in to your account</p>

      </div>
      <div className='p-6'>
        <p className='font-bold m-2' >Email</p>
        <input onChange={e=>setEmail(e.target.value)}  className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your email' autoFocus />

        <p className='font-bold m-2' >Password</p>
        <input onChange={e=>setPassowrd(e.target.value)} className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your password' />

      </div>
      <button onClick={async()=>{
        const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
          username: email,
          password: password
        })
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")
      }} className='p-4 px-20 bg-green-700 hover:bg-green-900 text-white rounded-md'>Sign In</button>

      <p className=' m-1'>Dont have an account? <Link to="/signup " className='underline'> Sign Up </Link></p>
    </div>
  )
}

export default Signin