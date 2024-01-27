import React from 'react'
import Balance from '../components/Balance'
import Avatar from '../components/Avatar'
import UserList from '../components/UserList'

function Dashbaord() {
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
            <input className=' border border-gray-300 p-2 mt-4 rounded-lg w-full' type="text" placeholder='Search users...' />
            <UserList username="User1"/>
            <UserList username="User2" />
            <UserList username="User3" />
        </div>
    </div>
    </>
  )
}

export default Dashbaord