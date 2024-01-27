import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const handleclick = ()=>{
    const navigate = useNavigate();
    navigate("/sendmoney")
  }
  return (
    <div className=' flex flex-col justify-center items-center bg-white mt-6 border-2 border-black rounded-xl shadow-2xl w-3/4 m-auto md:w-1/4  p-3'>
      <div>
        <h1 className='text-center text-3xl font-bold p-4'>Sign Up</h1>
        <p className='text-center text-slate-500'>Enter your information to create your account</p>

      </div>
      <div className='p-6'>
        <p className='font-bold m-2'>First Name</p>
        <input className=' border border-gray-300 p-2 m-2 rounded-lg ' type="text" placeholder='Enter your first name' />

        <p className='font-bold m-2'>Last Name</p>
        <input className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your last name' />

        <p className='font-bold m-2' >Email</p>
        <input className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your email' />

        <p className='font-bold m-2' >Password</p>
        <input className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your password' />

      </div>
      <button className='p-4 px-20 bg-sky-950 hover:bg-sky-800 focus:outline-none text-white rounded-md' onClick={handleclick}>Sign Up</button>

      <p className=' m-1'>Already have an account? <Link to="/signin" className='underline'> Login </Link></p>
    </div>
  )
}

export default Signup