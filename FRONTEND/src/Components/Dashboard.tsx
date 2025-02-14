import { useNavigate } from "react-router-dom";
import styles from "../Styling/Dashboard.module.css";
import logo from "../images/logo.jpeg";
import voteNow from "../images/vote-now.png";
import { Images } from "../script/GetImages"

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.navLeftSideItems}>
          <img
            src={logo}
            alt=""
            style={{ width: "70px", borderRadius: "50%" }}
          />
          <span>Parties List</span>
          <span>About</span>
          <span>Elections</span>
          <span>Contact</span>
          <span>Help</span>
        </div>

        <div className={styles.navRightSideItems}>
          <button>Vote now</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>

      <div className={styles.bottomContainer}>
        <div
          style={{
            fontWeight: "bolder",
            marginLeft: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            marginTop :"20px"
          }}
        >
          <img src={voteNow} alt="" id={styles.voteNow} />
          <span style={{ fontSize: "2rem" }}> 4 hr 50 min 45 sec</span>
        </div>

        <div style={{ display :'flex' , flexDirection  :"column" , gap :"20px", marginTop :"20px" }}> 
          
           {Images.map((image) => (
            <img src={image} alt="" style={{ width: "100px"  ,borderRadius : "50%" }} />
          ))}

        </div>
      </div>

      <footer>
        me sahil joshi creating footer
      </footer>
    </>
  );
}

export default Dashboard;
