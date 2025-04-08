import styles from "../Styling/Dashboard.module.css";  // for styling
import voteNow from "../images/vote-now.png"; // vote image
// parties images 
import p1 from "../images/e1.jpg";
import p2 from "../images/e2.jpg";
import p3 from "../images/e3.jpg";
import p4 from "../images/e4.jpg";
// footer imports 
import FooterImage from "../images/footerImage.jpg";
import Footer from "./Footer";

import { Images } from "../script/GetImages";
import { useEffect, useRef, useState } from "react";
import Navbar from "../Small-components/Navbar";
import Preloader from "../Small-components/PreLoader";
import { formatTimings } from "../script/FormatTime";
import { useAuthContext } from "../Context/UserContext";


let intervalId: any;

function Dashboard() {
  const [leftHours, setLeftHours] = useState<number>(0);
  const [leftMinutes, setLeftMinutes] = useState<number>(0);
  const [leftSeconds, setLeftSeconds] = useState<number>(0);
  const [scrollAmount, setScrollAmount] = useState<number>(0);

  const [votingDate, setVotingDate] = useState<{ date: string, hours: any }>({ date: "", hours: "" });

  const partyRef1 = useRef<HTMLDivElement>(null);
  const partyRef2 = useRef<HTMLDivElement>(null);
  const partyRef3 = useRef<HTMLDivElement>(null);
  const partyRef4 = useRef<HTMLDivElement>(null);

  const [showMain, setShowMain] = useState(false);
  const { MAX_TIME, START_TIME, END_TIME } = useAuthContext();

  const localStyles: any = {

    NOT_STARTED: {
      fontWeight: "bolder",
      display: "flex",
      fontFamily: "Arial , Helvetica , sans-serif",
      fontSize: "2rem",
      color: "black",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "20px",
    },

    VOTING_END: {
      fontWeight: "bolder",
      display: "flex",
      fontSize: "2rem",
      color: 'white',
      flexDirection: "column",
      alignItems: "center",
      gap: "30px",
      marginTop: "20px",
    },

    VOTE_NOW: {
      fontWeight: "bolder",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "30px",
      marginTop: "20px",
    },

    VOTING_ENDS_IN: {
      fontSize: "2rem", color: 'red', display: "flex",
      justifyContent: "center", gap: "5px",
      alignItems: "center", flexWrap: "wrap"
    }


  }

  // LOADER FOR LOADING COMPONENTS
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  // SETTING VOTE TIMINGS
  useEffect(() => {

    async function getTimings() {
      const timeData = formatTimings(START_TIME);
      setVotingDate({
        date: timeData.votingDateTimes,
        hours: timeData.formatedHours,

      })
    }

    getTimings();
  }, [START_TIME]);


  // START THE TIMER ONCE YOU GET IT 
  useEffect(() => {
    if (START_TIME > 0) {
      intervalId = setInterval(() => {
        Timer();
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [START_TIME , END_TIME]);


  useEffect(() => {
    window.addEventListener("scroll", handleOnWindowScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleOnWindowScroll);
    };
  }, []);


  // PARTIES SHOW ANIMATION 
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


  // TIME FORMATING 
  function Timer() {
    const currentTime = Date.now();
    const calTime = MAX_TIME - currentTime;

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

      {

        showMain ?

          <div>
            {/* nav bar */}

            <Navbar />

            <div className={styles.bannerBackground}></div>
            <div className={styles.spaceOccuppied}></div>

            <div className={styles.bottomContainer}>

              {/* VOTE NOW TIMER  */}
              {
                Date.now() < START_TIME ?

                  // IF VOTING START SOON 
                  <div style={localStyles.NOT_STARTED}>
                    <p>Voting Starts on</p>
                    <p>{votingDate?.date} at {votingDate.hours}</p>
                  </div>
                  :

                  <div>
                    {
                      Date.now() > END_TIME ?

                        // IF VOTING ENDED 
                        <div style={localStyles.VOTING_END}>VOTING ENDED</div>

                        :

                        // VOTE TIMER BINKING 
                        <div style={localStyles.VOTE_NOW}>
                          <img src={voteNow} alt="" id={styles.voteNow} />
                          <p style={localStyles.VOTING_ENDS_IN}>
                            <span style={{ color: "white" }} >Voting End's In :</span>
                            <span  >
                              {formatTime(leftHours)} hr {formatTime(leftMinutes)} min{" "}
                              {formatTime(leftSeconds)} sec
                            </span>
                          </p>
                        </div>
                    }
                  </div>


              }


              {/* parties info */}

              <div className={styles.partyInfoContainer}  >

                <div className={styles.eachPartyInfo}>

                  <div ref={partyRef1} className={styles.party} id={styles.party1}>
                    <img
                      src={Images[0].src}
                      alt=""
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <span  >{Images[0].about}</span>

                  </div>

                  <img className={styles.voteCircleImage} src={p1} alt="" />
                </div>

                <div className={styles.eachPartyInfo}>
                  <img src={p2} alt="" className={styles.voteCircleImage} />

                  <div ref={partyRef2} className={styles.party} id={styles.party2}>
                    <img
                      src={Images[1].src}
                      alt=""
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <span>{Images[1].about}</span>
                  </div>
                </div>

                <div className={styles.eachPartyInfo}>
                  <div ref={partyRef3} className={styles.party} id={styles.party3}>
                    <img src={Images[2].src} alt="" style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <span>{Images[2].about}</span>
                  </div>

                  <img
                    src={p3}
                    alt=""
                    className={styles.voteCircleImage}
                  />
                </div>

                <div className={styles.eachPartyInfo}>
                  <img src={p4} alt="" className={styles.voteCircleImage}
                  />

                  <div ref={partyRef4} className={styles.party} id={styles.party4}>
                    <img
                      src={Images[3].src}
                      alt=""
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                    <span>{Images[3].about}</span>
                  </div>
                </div>



              </div>
            </div>

            {/* election image */}

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
          </div>
          :
          <Preloader />
      }




    </>
  );
}

export default Dashboard;
