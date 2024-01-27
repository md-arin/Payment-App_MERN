import React from 'react'
import { Link } from 'react-router-dom'

function Signin() {
  const handleclick = ()=>{
    
  }
  return (
    <div className=' flex flex-col justify-center items-center bg-white mt-22 border-2 border-slate-500 rounded-xl shadow-xl w-3/4 m-auto md:w-1/4  p-3'>
      <div>
        <h1 className='text-center text-3xl font-bold p-4'>Sign In</h1>
        <p className='text-center text-slate-500'>Enter your credentials to log in to your account</p>

      </div>
      <div className='p-6'>
        <p className='font-bold m-2' >Email</p>
        <input className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your email' />

        <p className='font-bold m-2' >Password</p>
        <input className=' border border-gray-300 p-2 m-2 rounded-lg' type="text" placeholder='Enter your password' />

      </div>
      <button className='p-4 px-20 bg-green-700 hover:bg-green-900 text-white rounded-md' onClick={handleclick}>Sign In</button>

      <p className=' m-1'>Dont have an account? <Link to="/" className='underline'> Sign Up </Link></p>
    </div>
  )
}

export default Signin