import { Suspense } from "react"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import SignupPage from "./pages/SignupPage"
import SignInPage from "./pages/SignInPage"

function App() {

  return (
    <div>
        <BrowserRouter>
        {/* <Appbar /> */}
          <Routes>
              <Route path="/" element={<Suspense fallback={"loading......"}><SignupPage/> </Suspense>}/>
              <Route path="/dashboard" element={<Suspense fallback={"loading......"}> <Dashboard/> </Suspense>}/>
              <Route path="/signin" element={<Suspense fallback={"loading......"}> <SignInPage /> </Suspense>}/>
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
