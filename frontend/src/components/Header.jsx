import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='flex justify-around shadow-2x px-5 py-2 bg-gray-400'>
        <div className='text-3xl font-bold text-zinc-950 '> EduWallet</div>
        <div className='my-1'>
            <a className="navbar navbar-expand-lg navbar-light bg-light font-medium text-xl mx-2 my-1"  href='https://github.com/md-arin/Payment-App_MERN' target='_blank'>Github</a>
        </div>
        <div className='flex' >
            <p className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                <Link to="/signup">Signup</Link></p>
            <p className='mx-4 border-black bg-yellow-500 hover:bg-slate-300 px-5 py-2.5 me-2 mb-2 rounded-full'><Link to="/signin">Signin</Link></p>
        </div>

        
        
    </div>
  )
}

export default Header