import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios  from "axios"

function Signup() {
  const [firstName, setFirstname] = useState("")
  const [lastName,setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassowrd] = useState("")
  const navigate = useNavigate();

  return (
    <div className=' flex flex-col justify-center items-center bg-white mt-6 border-2 border-black rounded-xl shadow-2xl w-3/4 m-auto md:w-1/4  p-3'>
      <div>
        <h1 className='text-center text-3xl font-bold p-4'>Sign Up</h1>
        <p className='text-center text-slate-500'>Enter your information to create your account</p>

      </div>
      <div className='p-6'>
        <p className='font-bold m-2'>First Name</p>
        <input onChange={e=>setFirstname(e.target.value)} className=' border border-gray-300 p-2 m-2 rounded-lg ' type="text" placeholder='Enter your first name' autoFocus />

        <p className='font-bold m-2'>Last Name</p>
        <input onChange={e=>setLastname(e.target.value)} className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your last name' />

        <p className='font-bold m-2' >Email</p>
        <input onChange={e=>setUsername(e.target.value)} className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your email' />

        <p className='font-bold m-2' >Password</p>
        <input onChange={e=> setPassowrd(e.target.value)} className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your password' />

      </div>
      <button onClick={async()=>{
        const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
          firstName,
          lastName,
          username,
          password
        })
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")
      }} 
      className='p-4 px-20 bg-sky-950 hover:bg-sky-800 focus:outline-none text-white rounded-md'
      > Sign Up </button>

      <p className=' m-1'>Already have an account? <Link to="/signin" className='underline'> Login </Link></p>
    </div>
  )
}

export default Signup