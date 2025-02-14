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
            <img src={image} alt=""   className={styles.parties}  />
          ))}

        </div>
        
      </div>


<div className={styles.footerItems}>

<footer>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWO5X5wTypXs_GdWc2lTJTvtVv-mjfXh8hPg&s" alt="instagram " />
        <img src="https://e7.pngegg.com/pngimages/708/311/png-clipart-twitter-twitter-thumbnail.png" alt="Twitter" />
        <img src="https://images.vexels.com/media/users/3/137253/isolated/preview/90dd9f12fdd1eefb8c8976903944c026-facebook-icon-logo.png" alt="facebook" />
      </footer>

</div>
      
      












    </>
  );
}

export default Dashboard;
