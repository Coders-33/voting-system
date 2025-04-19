import  { useEffect, useRef, useState } from "react";
import styles from "../Styling/Dashboard.module.css";
import logo from "../images/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL, cacheTime, clearCookies, endingTime, startingTime } from "../script/GetData"
import { ACTIONS, useAuthContext } from "../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import StudentProfile from "./StudentProfile";

function Navbar() {
  const navigate = useNavigate();

  const { user, admin, dispatch, setUserLoginStatus, setUserLoggedIn } = useAuthContext();
  const [leftSideBarEnable, setLeftSideBarEnable] = useState<boolean>(false);
  const leftBarRef = useRef<HTMLDivElement>(null);
  const [enableProfileOptions, setEnableProfileOptions] = useState<boolean>(false);

  const [viewStudentProfile, setViewStudentProfile] = useState<boolean>(false);

  const userIconStyle: any = {
    padding: "10px",
    cursor: "pointer",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    width: "26px",
    height: "26px",
    backgroundColor: "blue",
    borderRadius: "50%"
  }

  function checkVotingEnded() {

    if (Date.now() < startingTime) return;
    if (Date.now() > endingTime) return;

    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/voting/${user?.userId}`);
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
    setUserLoginStatus("FALSE");
    setUserLoggedIn("FALSE");

    clearCookies();
    DeleteHttpCookie();
  }


  async function DeleteHttpCookie() {
    const res = await fetch(`${BACKEND_URL}/auth/logout/?authName=user`, {
      method: "POST",
      credentials: "include"
    });

    if (res.ok) alert("Logout Successfully");

  }

  function OpenUserProfile(toogleValue: boolean) {

    setViewStudentProfile(prev => !prev);
    if (toogleValue) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    }
  }


   function liveResult() {

     if(Date.now() < startingTime) {
       return;
      }
      if(Date.now() > cacheTime) {
          return;
      }
    !user ? navigate("/login") : navigate("/live-result");
     

   }


  return (

    <>

      {viewStudentProfile &&
        <StudentProfile toogleView={OpenUserProfile} />
      }
      <nav className={styles.navBar}>

        <FontAwesomeIcon onClick={() => setLeftSideBarEnable(true)} icon={faBars} id={styles.optionsLeft} />

        <div ref={leftBarRef} className={styles.navLeftSideItems}>
          <FontAwesomeIcon onClick={() => setLeftSideBarEnable(false)} icon={faArrowLeft} id={styles.closeLeftBar} />
          {!leftSideBarEnable ?
            <img onClick={() => navigate("/")} src={logo} alt="" id={styles.homeIconImage} />
            :
            <span onClick={function () {
              navigate("/");
              setLeftSideBarEnable(false);
            }}>Home</span>
          }
          <span onClick={() => navigate("/about")} >About</span>
          <span onClick={liveResult} >Live Result</span>
          <span onClick={() => !admin ? navigate("/admin-login") : navigate("/admin-access")} >Admin</span>
          <span onClick={() => navigate("/contact")}>Contact</span>
          <span onClick={() => navigate("/help")}>Help</span>
          <span onClick={() =>  {
             if(Date.now() < cacheTime) {
               return;
             }
             navigate("/election-result");
          }} >Election Result</span>
        </div>

        <div className={styles.navRightSideItems}>
          <button  title="vote-now" onClick={checkVotingEnded}  >Vote now</button>
          {
            user ?

              <div onClick={() => setEnableProfileOptions(prev => !prev)} style={{ position: "relative" }} >
                <FontAwesomeIcon icon={faUser} style={userIconStyle} />
                {
                  enableProfileOptions &&

                  <div className={styles.profileOptionsContainer} >
                    <button onClick={() => OpenUserProfile(true)} >Account</button>
                    <button onClick={handleLogoutUser} >Log out</button>
                  </div>

                }
              </div>

              :

              <button onClick={() => navigate("/login")} >Login</button>
          }

        </div>

      </nav>

    </>
  );


}

export default Navbar;
