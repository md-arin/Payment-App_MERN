import React from 'react'
import Avatar from './Avatar'
import { useNavigate } from 'react-router-dom';


function User({user}) {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between my-5'>
        <div className='flex'>
            <Avatar />
            <p className='m-5 font-medium'>{user.firstName} {user.lastName}</p>
        </div>
        <div>
            <button onClick={(e)=>{
               navigate("/sendmoney?id=" + user._id + "&name=" + user.firstName);
            }} className='m-3 focus:outline-none text-slate-950 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900'>Send Money</button>
        </div>
    </div>
  )
}

export default User