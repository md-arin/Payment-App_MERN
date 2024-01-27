import React, { useEffect } from 'react';
import Signup from '../components/Signup';
import bg1 from "../assets/bg-1.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    
    axios.get("http://localhost:3000/me", {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then((res)=>{
       alert("welcome back " + res.data.decodedValue.firstName)
       navigate("/dashboard")
    })

},[])

  return (
    <>
      <div className='flex -space-x-28  justify-center h-screen bg-sky-950 '>
        <div className='md:w-3/6 mt-6 shadow-2xl'>
          <img src={bg1} alt="" className='rounded-lg' style={{height: "645px"}} />
        </div>
      
        <Signup />
       
      </div>
    </>
  );
}

export default SignupPage;
