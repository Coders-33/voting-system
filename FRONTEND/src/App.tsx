import { BrowserRouter , Routes , Route} from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Contact from "./Components/Contact"
import Help from "./Components/Help"
import Voting from "./Components/Voting"
import LiveResult from "./Components/LiveResult"
import ForgetPassword from "./Components/ForgetPassword"
import ResetPassword from "./Small-components/ResetPassword"


function App() {

  



  return (
    <>
   <BrowserRouter>
   
    <Routes>
    <Route path="/" element={<Dashboard/>} />
     <Route path="/login" element={<Login/>} />
     <Route path="/contact" element={<Contact/>} />
     <Route path="/help" element={<Help/>} />
     <Route path="/live-result" element={<LiveResult/>} />
     <Route path="/voting/:id" element={ <Voting/>} />
     <Route path="/forget-password" element={<ForgetPassword/>} />
     <Route path="/rs/:id1/:id2" element={<ResetPassword/>} />


    
    </Routes>
   </BrowserRouter>


    </>
  )
}

export default App
