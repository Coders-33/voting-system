import { useNavigate } from "react-router-dom";
import styles from "../Styling/Dashboard.module.css";
import logo from "../images/logo.jpeg";

function Dashboard() {
 
  const navigate = useNavigate();

  return (
    <>
      <nav className={styles.navBar}>
      
      <div className={ styles.navLeftSideItems} >
      <img src={logo} alt=""  style={{ width : "70px" , borderRadius : "50%" }} />
       <span>Parties List</span>
       <span>About</span>
      <span>Elections</span>
       <span>Contact</span>
      </div>

      <div  className={ styles.navRightSideItems} >

      <button>Vote now</button>
      <button onClick={() => navigate("/login")}>Login</button>
      </div>
        
      </nav>

    </>
  );
}

export default Dashboard;
