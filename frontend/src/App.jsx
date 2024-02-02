import { Suspense } from "react"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SignInPage from "./pages/SignInPage"
import Dashbaord from "./pages/Dashbaord"
import SendMoney from "./pages/SendMoney"
import Landing from "./pages/Landing"

function App() {

  return (
    <div>
        <BrowserRouter>
        {/* <Appbar /> */}
          <Routes>
              <Route path="/" element={<Suspense fallback={"loading......"}><Landing/> </Suspense>}/>
              <Route path="/signup" element={<Suspense fallback={"loading......"}><SignupPage/> </Suspense>}/>
              <Route path="/dashboard" element={<Suspense fallback={"loading......"}> <Dashbaord/> </Suspense>}/>
              <Route path="/signin" element={<Suspense fallback={"loading......"}> <SignInPage /> </Suspense>}/>
              <Route path="/sendmoney" element={<Suspense fallback={"loading......"}> <SendMoney /> </Suspense>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

// function Appbar(){
//   const navigate = useNavigate();
//   return(
//     <>
//     <button onClick={()=>{
//       navigate("/signup")
//     }}>
//       Signup
//     </button>

//     <button onClick={()=>{
//       navigate("/signin")
//     }}>
//       Signin
//     </button>
//     </>
//   )
// }

export default App
