import { useNavigate } from "react-router-dom";
import styles from "../Styling/Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../images/logo.jpeg";
import voteNow from "../images/vote-now.png";
import { Images } from "../script/GetImages";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [runningTime, setRunningTime] = useState<number>(Date.now());
  const [hours, sethours] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSeconds] = useState<number>(0);
  const [maxTime, setMaxTime] = useState<number>(Date.now() + 10000);

  useEffect(() => {

    const intervalId = setInterval(() => {
      Timer();
      const currentTime = Date.now();
      setRunningTime(currentTime);
      console.log(currentTime);

      if (currentTime > maxTime) {
        console.log("voting has been stopped");
        clearInterval(intervalId);
        return;
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

function Timer() {
   
}

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
            marginTop: "20px",
          }}
        >
          <img src={voteNow} alt="" id={styles.voteNow} />
          <span style={{ fontSize: "2rem" }}> 4 hr 50 min 45 sec</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {Images.map((image, index) => (
            <div key={index} className={styles.eachPartyInfo}>
              <img
                src={image.src}
                alt=""
                style={{ width: "100px", borderRadius: "50%" }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span>{image.about}</span>
                <span>Total votes : {image.votingCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ color: "white" }}>
        me sahil joshi creating footer
        <FontAwesomeIcon icon={faFacebook} style={{ color: "#1877F2" }} />
        <FontAwesomeIcon icon={faTwitter} style={{ color: "#1877F2" }} />
        <FontAwesomeIcon icon={faInstagram} style={{ color: "#d62976" }} />
      </footer>
    </>
  );
}

export default Dashboard;
