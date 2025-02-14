import Login from "./Components/Login"


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
