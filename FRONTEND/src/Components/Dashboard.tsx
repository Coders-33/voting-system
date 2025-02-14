import { useNavigate } from "react-router-dom";
import styles from "../Styling/Dashboard.module.css";
import logo from "../images/logo.jpeg";
import voteNow from "../images/vote-now.png";
import election from "../images/election.jpg";
import { Images } from "../script/GetImages";
import { useEffect, useState } from "react";

const maxTime = 1739531889756 + 5 * 60 * 60 * 1000;

let intervalId: any;

function Dashboard() {
  const navigate = useNavigate();
  const [leftHours, setLeftHours] = useState<number>(0);
  const [leftMinutes, setLeftMinutes] = useState<number>(0);
  const [leftSeconds, setLeftSeconds] = useState<number>(0);

  useEffect(() => {
    intervalId = setInterval(() => {
      Timer();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function Timer() {
    const currentTime = Date.now();
    const calTime = maxTime - currentTime;

    if (calTime <= 0) {
      setLeftHours(0);
      setLeftMinutes(0);
      setLeftSeconds(0);
      clearInterval(intervalId);
      return;
    }

    let seconds = Math.floor(calTime / 1000) % 60;
    let minutes = Math.floor(calTime / (1000 * 60)) % 60;
    let hours = Math.floor(calTime / (1000 * 60 * 60)) % 24;

    setLeftSeconds(seconds);
    setLeftMinutes(minutes);
    setLeftHours(hours);
  }

  function formatTime(time: number) {
    return time.toString().padStart(2, "0");
  }

  return (
    <>
      {/* nav bar */}

      <nav className={styles.navBar}>
        <div className={styles.navLeftSideItems}>
          <img
            src={logo}
            alt=""
            style={{ width: "70px", borderRadius: "50%" }}
          />
          <span>Parties List</span>
          <span>About</span>
          <span>Live Result</span>
          <span>Contact</span>
          <span>Help</span>
        </div>

        <div className={styles.navRightSideItems}>
          <button>Vote now</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>

      {/* bottom items */}

      <div className={styles.bottomContainer}>
        {/* vote now image */}
        <div
          style={{
            fontWeight: "bolder",
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          <img src={voteNow} alt="" id={styles.voteNow} />
          <span style={{ fontSize: "2rem" }}>
            {" "}
            {formatTime(leftHours)} hr {formatTime(leftMinutes)} min{" "}
            {formatTime(leftSeconds)} sec
          </span>
        </div>

        {/* parties info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginTop: "20px",
          }}
        >
          {Images.map((image, index) => (
            <div key={index} className={styles.parties}  >
              <img src={image.src} alt="" id={styles.partyImage} />
              <div
                style={{
                  display: "flex",
                    alignItems : "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bolder",
                    color: "#1877f2",
                  }}
                >
                  {image.partyName}
                </span>
                <span style={{ fontStyle :"italic" }} >{image.about}</span>
                <span style={{ borderTop : "1px solid white" , padding : "10px 20px", borderBottom :"1px solid white" }} >
                  <span style={{ color: "green"  ,  fontWeight : "bolder"  }}>Total Votes : </span>
                  <span style={{ color: "green" , fontSize : "1.2rem"  }}>{image.votingCount}</span>
                </span>
                <button className={styles.VoteButton} >VOTE NOW</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* election image */}

      <div style={{ width: "100vw", height: "350px", marginTop: "20px" }}>
        <img
          src={election}
          alt=""
          style={{ width: "100%", height: "inherit" }}
        />
      </div>

      {/* footer */}

      <footer>
        <div className={styles.footerItems}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWO5X5wTypXs_GdWc2lTJTvtVv-mjfXh8hPg&s"
            alt="instagram "
          />
          <img
            src="https://e7.pngegg.com/pngimages/708/311/png-clipart-twitter-twitter-thumbnail.png"
            alt="Twitter"
          />
          <img
            src="https://images.vexels.com/media/users/3/137253/isolated/preview/90dd9f12fdd1eefb8c8976903944c026-facebook-icon-logo.png"
            alt="facebook"
          />
        </div>
      </footer>
    </>
  );
}

export default Dashboard;
