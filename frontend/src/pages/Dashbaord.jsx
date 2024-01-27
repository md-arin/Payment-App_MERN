import React, { useEffect, useState } from 'react'
import Balance from '../components/Balance'
import Avatar from '../components/Avatar'
import User from '../components/User'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashbaord() {
    const [users,setUsers] = useState([])
    const [filter,setFilter] = useState("")


    useEffect(()=>{
         axios.get("http://localhost:3000/api/v1/user/bulk?filter="+ filter)
            .then(res => setUsers(res.data.user))
    },[filter])

  return (
    <>
    <div className='mx-10'>
        <div className='flex justify-between mt-4'>
            <div>
            <h1 className='text-3xl text-slate-800 font-semibold'>Payments App</h1>
            </div>
           <div className='flex '>
           <p className=' m-5'>Hello, user</p>
            <Avatar />
           </div>
        </div>

        <hr className=' shadow-2xl bg-slate-700 mt-3' />
        <Balance />

        <div>
            <h1 className='text-2xl mt-6 font-medium'>Users</h1>
            <input onChange={e => setFilter(e.target.value)} className=' border border-gray-300 p-2 mt-4 rounded-lg w-full' type="text" placeholder='Search users...' />
            <div>
                {users.map(user => <User user={user} />)}
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashbaord