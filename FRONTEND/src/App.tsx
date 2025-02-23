import { BrowserRouter , Routes , Route} from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Contact from "./Components/Contact"
import Help from "./Components/Help"
import Voting from "./Components/Voting"
import LiveResult from "./Components/LiveResult"


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
     <Route path="/voting/:id" element={<Voting/>} />
    
    </Routes>
   </BrowserRouter>


    </>
  )
}

export default App
