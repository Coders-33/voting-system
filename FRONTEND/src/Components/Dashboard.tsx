import { useNavigate } from "react-router-dom";
import styles from "../Styling/Dashboard.module.css";
import voteNow from "../images/vote-now.png";
import p1 from "../images/e1.jpg";
import p2 from "../images/e2.jpg";
import p3 from "../images/e3.jpg";
import p4 from "../images/e4.jpg";
import FooterImage from "../images/footerImage.jpg";
import { Images } from "../script/GetImages";
import { ScrollToTheTop , maxTime } from "../script/GetData";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Navbar from "../Small-components/Navbar";


let intervalId: any;

function Dashboard() {
  const navigate = useNavigate();
  const [leftHours, setLeftHours] = useState<number>(0);
  const [leftMinutes, setLeftMinutes] = useState<number>(0);
  const [leftSeconds, setLeftSeconds] = useState<number>(0);
  const [scrollAmount, setScrollAmount] = useState<number>(0);

  const partyRef1 = useRef<HTMLDivElement>(null);
  const partyRef2 = useRef<HTMLDivElement>(null);
  const partyRef3 = useRef<HTMLDivElement>(null);
  const partyRef4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollToTheTop("instant");

    intervalId = setInterval(() => {
      Timer();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleOnWindowScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleOnWindowScroll);
    };
  }, []);

  function handleOnWindowScroll() {
    if (window.scrollY > 454) {
      if (partyRef1.current) {
        partyRef1.current.style.transform = "translateX(0%)";
      }
    }

    if (window.scrollY > 1000) {
      if (partyRef2.current) {
        partyRef2.current.style.transform = "translateX(0%)";
      }
    }

    if (window.scrollY > 1400) {
      if (partyRef3.current) {
        partyRef3.current.style.transform = "translateX(0%)";
      }
    }

    if (window.scrollY > 1900) {
      if (partyRef4.current) {
        partyRef4.current.style.transform = "translateX(0%)";
      }
    }

    setScrollAmount(Math.floor(window.scrollY));
  }

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

      <Navbar />

      <div className={styles.bannerBackground}></div>

      <div className={styles.bottomContainer}>
        {/* vote now image */}

      { 
        Date.now() > maxTime  ?

        <div        
        style={{
          fontWeight: "bolder",
          display: "flex",
          fontSize : "2rem",
          color : 'red',
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          marginTop: "20px",
        }}
        >VOTING ENDED</div>

        :

        <div
        style={{
          fontWeight: "bolder",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        <img src={voteNow} alt="" id={styles.voteNow} />
        <span style={{ fontSize: "2rem" , color : 'red' }}>Voting End's in :
          {" "}
          {formatTime(leftHours)} hr {formatTime(leftMinutes)} min{" "}
          {formatTime(leftSeconds)} sec
        </span>
      </div>
      }


        {/* parties info */}

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            width: "100%",
            padding: "10px 0px",
            height: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div ref={partyRef1} className={styles.party1}>
              <img
                src={Images[0].src}
                alt=""
                style={{ width: "100px", borderRadius: "50%" }}
              />
              <span>{Images[0].about}</span>
              <span>Total Votes : {Images[0].votingCount}</span>
            </div>
            <img
              src={p1}
              alt=""
              style={{
                width: "400px",
                height: "400px",
                flexShrink: "0",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={p2}
              alt=""
              style={{
                width: "400px",
                height: "400px",
                flexShrink: "0",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />

            <div ref={partyRef2} className={styles.party2}>
              <img
                src={Images[1].src}
                alt=""
                style={{ width: "100px", borderRadius: "50%" }}
              />
              <span>{Images[1].about}</span>
              <span>Total Votes : {Images[1].votingCount}</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div ref={partyRef3} className={styles.party3}>
              <img
                src={Images[2].src}
                alt=""
                style={{ width: "100px", borderRadius: "50%" }}
              />
              <span>{Images[2].about}</span>
              <span>Total Votes : {Images[2].votingCount}</span>
            </div>

            <img
              src={p3}
              alt=""
              style={{
                width: "400px",
                height: "400px",
                flexShrink: "0",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={p4}
              alt=""
              style={{
                width: "400px",
                height: "400px",
                flexShrink: "0",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />

            <div ref={partyRef4} className={styles.party4}>
              <img
                src={Images[3].src}
                alt=""
                style={{ width: "100px", borderRadius: "50%" }}
              />
              <span>{Images[3].about}</span>
              <span>Total Votes : {Images[3].votingCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* election image */}
      {/* <div style={{ width: "100vw", height: "350px", marginTop: "20px" }}>
        <img
          src={election}
          alt=""
          style={{ width: "100%", height: "inherit" }}
        />
      </div> */}

      <img
        src={FooterImage}
        alt=""
        style={{
          width: "100vw",
          objectFit: "contain",
          objectPosition: "center",
          marginTop: "20px",

          marginBottom: "20px",
        }}
      />

      {/* footer */}

      <div style={{ height: "auto" }}>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
