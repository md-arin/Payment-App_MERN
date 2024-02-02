import React, { useEffect, useState } from 'react'
import Balance from '../components/Balance'
import Avatar from '../components/Avatar'
import User from '../components/User'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashbaord() {
    const [users,setUsers] = useState([])
    const [loggedUser, setLoggeduser] = useState({
        firstName: " "
    });
    const [balance, setBalance] = useState("");
    const [filter,setFilter] = useState("")
    const navigate = useNavigate();

    //when the page loads it should check login status via localstorage token
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/me", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                setLoggeduser(response.data.decodedValue);
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error in fetching user data:", error);
                navigate("/signin"); // Redirect to the home route on error
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(()=>{
         axios.get("http://localhost:3000/api/v1/user/bulk?filter="+ filter,{
            headers:{
                Authorization:"Bearer "+ localStorage.getItem('token')
            }
         })
            .then(res => setUsers(res.data.user))
    },[filter])



  return (
    <>
    <div className='mx-10 '>
        <div className='flex justify-between mt-4 '>
            <div>
            <h1 className='text-3xl text-slate-800 font-semibold'>EduWallet</h1>
            </div>
           <div className='flex '>
           <p className=' m-5'>Hello, { loggedUser && loggedUser.firstName ? loggedUser.firstName : "Guest"}</p>
            <Avatar />
            <button onClick={()=>{
                localStorage.removeItem('token');
                navigate('/signin')
            }} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 
            font-normal rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700
             dark:border-gray-700'>Logout</button>
           </div>
        </div>

        <hr className=' shadow-2xl bg-slate-700 mt-3' />
        <Balance balance={balance} />

        <div>
            <h1 className='text-2xl mt-6 font-medium'>Users</h1>
            <input onChange={e => setFilter(e.target.value)} className=' border border-gray-300 p-2 mt-4 rounded-lg w-full' type="text" placeholder='Search users...' />
            <div>
            {users && users.map(user => <User key={user.id} user={user} />)}
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashbaord