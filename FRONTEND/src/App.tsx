import { BrowserRouter , Routes , Route, useNavigate} from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Contact from "./Components/Contact"
import Help from "./Components/Help"
import Voting from "./Components/Voting"
import LiveResult from "./Components/LiveResult"
import ForgetPassword from "./Components/ForgetPassword"
import ResetPassword from "./Small-components/ResetPassword"
import { useAuthContext } from "./Context/UserContext"
import { startingTime , cacheTime } from "./script/GetData"
import Admin from "./Small-components/Admin"
import About from "./Components/About"


function App() {

  
const { user }  = useAuthContext();


  return (
    <>
   <BrowserRouter>
   
    <Routes>
    <Route path="/" element={<Dashboard/>} />
     <Route path="/login" element={<Login/>} />
     <Route path="/contact" element={<Contact/>} />
     <Route path="/help" element={<Help/>} />
     <Route path="/live-result" element={ user ?  <LiveResult/> : <Login/>} />
    <Route path="/voting/:id" element={ user ?  <Voting/> : <Login/> } />
     <Route path="/forget-password" element={<ForgetPassword/>} />
     <Route path="/admin" element={<Admin/>} />
     <Route path="/rs/:id1/:id2" element={<ResetPassword/>} />
     <Route path="/about" element={<About/>} />



    
    </Routes>
   </BrowserRouter>


    </>
  )
}

export default App
