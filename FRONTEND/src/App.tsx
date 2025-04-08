import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Contact from "./Components/Contact"
import Help from "./Components/Help"
import Voting from "./Components/Voting"
import LiveResult from "./Components/LiveResult"
import ForgetPassword from "./Components/ForgetPassword"
import ResetPassword from "./Small-components/ResetPassword"
import { useAuthContext } from "./Context/UserContext"
import Admin from "./Small-components/Admin"
import About from "./Components/About"
import AdminLogin from "./Components/AdminLogin"
import NotFound from "./Small-components/NotFound"
import ElectionResult from "./Components/ElectionResult"
import { useEffect, useState } from "react"
import Preloader from "./Small-components/PreLoader"

function App() {


  const { user, admin, START_TIME, END_TIME } = useAuthContext();

  const [showMain, setShowMain] = useState<boolean>(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!showMain) {
    return <Preloader />
  }


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          {Date.now() > START_TIME && <Route path="/live-result" element={user ? <LiveResult /> : <Login />} />}
          {Date.now() > START_TIME && Date.now() < END_TIME && <Route path="/voting/:id" element={user ? <Voting /> : <Login />} />}
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/admin-access" element={admin ? <Admin /> : <AdminLogin />} />
          <Route path="/rs/:id1/:id2" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-login" element={admin ? <Admin /> : <AdminLogin />} />
          {Date.now() > END_TIME && <Route path="/election-result" element={<ElectionResult />} />}
          <Route path="*" element={<NotFound />} />






        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
