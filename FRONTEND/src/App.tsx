import {  BrowserRouter , Routes ,Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <>
   <BrowserRouter>
   
    <Routes>
    <Route path="/" element={<Dashboard/>} />
     
     <Route path="/login" element={<Login/>} />

    </Routes>
   </BrowserRouter>


    </>
  )
}

export default App
