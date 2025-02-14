import { useNavigate } from 'react-router-dom'

function Dashboard() {
  
  const navigate = useNavigate();
  
  return (
    <div>
        dashboard
   <button onClick={() => navigate("/login")} >Login</button>
 
    </div>
  )
}

export default Dashboard


