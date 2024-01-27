import React from 'react'
import Signin from '../components/Signin'
import bg2 from "../assets/bg-2.jpeg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react'

function SignInPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    
    axios.get("http://localhost:3000/me", {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then((res)=>{
       alert("You are already logged in as " + res.data.decodedValue.firstName + ". logout to login as a different user")
       navigate("/dashboard")
    })

},[])
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