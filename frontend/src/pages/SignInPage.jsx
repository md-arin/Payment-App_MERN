import React from 'react'
import Signin from '../components/Signin'
import bg2 from "../assets/bg-2.jpeg"

function SignInPage() {
  return (
    <>
      <div className='flex -space-x-28  justify-center h-screen bg-emerald-950'>
        <div className='md:w-3/6 mt-10 '>
          <img src={bg2} alt="" className='rounded-lg' style={{height: "600px"}} />
        </div>
        <Signin/>
        </div>
    </>
  )
}

export default SignInPage