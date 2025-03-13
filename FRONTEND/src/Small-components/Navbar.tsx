import React, { useState } from "react";
import styles from "../Styling/Dashboard.module.css";
import logo from "../images/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { maxTime } from "../script/GetData"
import { ACTIONS, useAuthContext } from "../Context/UserContext";

function Navbar() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  function checkVotingEnded() {

    const currentTime = Date.now();
    if (currentTime > maxTime) return;

    navigate('/voting/124');
  }

  return (

    <nav className={styles.navBar}>
      <div className={styles.navLeftSideItems}>
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt=""
          style={{ width: "70px", borderRadius: "50%", cursor: "pointer" }}
        />

        <span>About</span>
        <span onClick={() => navigate("/live-result")} >Live Result</span>
        <span onClick={() => navigate("/contact")}>Contact</span>
        <span onClick={() => navigate("/help")}>Help</span>
      </div>

      <div className={styles.navRightSideItems}>
        <button onClick={checkVotingEnded}>
          Vote now
        </button>
        {user ?

          <div>{user.email}</div>
          :

          <button onClick={() => navigate("/login")}>Login</button>

        }
      </div>
    </nav>

  );
}

export default Navbar;
