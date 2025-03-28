import React, { useEffect, useRef, useState } from "react";
import styles from "../Styling/Dashboard.module.css";
import logo from "../images/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { cacheTime } from "../script/GetData"
import { ACTIONS, useAuthContext } from "../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars, faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const { user, dispatch } = useAuthContext();
  const [leftSideBarEnable, setLeftSideBarEnable] = useState<boolean>(false);
  const leftBarRef = useRef<HTMLDivElement>(null);
  const [enableProfileOptions, setEnableProfileOptions] = useState<boolean>(false);

const userIconStyle : any= {   
   padding : "8px",
   cursor :"pointer",
   display : "flex",
   alignItem : "center",
   justifyContent : "center",
   width : "20px",
   height :"20px",
   backgroundColor : "black",
   borderRadius : "50%"
}

  function checkVotingEnded() {

    const currentTime = Date.now();
    if (currentTime > cacheTime) return;

    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/voting/${user?.email}`);
  }

  useEffect(() => {
    function toogleLeftSideBar() {

      if (document.body.getBoundingClientRect().width < 700) {
        if (leftSideBarEnable) {
          if (leftBarRef.current) {
            leftBarRef.current.style.transform = "translateX(0%)";
          }
        }
        else {
          if (leftBarRef.current) {
            leftBarRef.current.style.transform = "translateX(-100%)";
          }
        }
      }

    }
    toogleLeftSideBar();

  }, [leftSideBarEnable])


  function handleLogoutUser() {
    dispatch({ type: ACTIONS.REMOVE_USER });
    localStorage.removeItem("user-token");
  }



  return (

    <nav className={styles.navBar}>

      <FontAwesomeIcon onClick={() => setLeftSideBarEnable(true)} icon={faBars} id={styles.optionsLeft} />

      <div ref={leftBarRef} className={styles.navLeftSideItems}>
        <FontAwesomeIcon onClick={() => setLeftSideBarEnable(false)} icon={faArrowLeft} id={styles.closeLeftBar} />
        <img onClick={() => navigate("/")} src={logo} alt="" id={styles.homeIconImage} />
        <span onClick={() => navigate("/about")} >About</span>
        <span onClick={() => !user ? navigate("/login") : navigate("/live-result")} >Live Result</span>
        <span onClick={() => navigate("/contact")}>Contact</span>
        <span onClick={() => navigate("/help")}>Help</span>
      </div>

      <div className={styles.navRightSideItems}>
        <button onClick={checkVotingEnded}  >Vote now</button>
        {
          user ?

            <div onClick={() => setEnableProfileOptions(prev => !prev)} style={{ position  : "relative" }} >
              <FontAwesomeIcon icon={faUser} style={userIconStyle} />
              {
                enableProfileOptions &&

                <div className={styles.profileOptionsContainer} >
                  <p>Hi ,{user?.email.split("@")[0] || "User"} </p>
                  <button>Account</button>
                  <button onClick={handleLogoutUser} >Log out</button>
                </div>

              }
            </div>

            :

            <button onClick={() => navigate("/login")} >Login</button>
        }

      </div>

    </nav>

  );
}

export default Navbar;
