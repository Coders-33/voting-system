import React, { useState } from "react";
import styles from "../Styling/Dashboard.module.css";
import logo from "../images/logo.jpeg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [partyListBox, setPartyListBox] = useState<boolean>(false);

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.navLeftSideItems}>
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt=""
            style={{ width: "70px", borderRadius: "50%", cursor: "pointer" }}
          />
          <p id={styles.partiesList}>
            <span
              onMouseOver={() => setPartyListBox(true)}
              onMouseLeave={() => setPartyListBox(false)}
            >
              {" "}
              Parties List
            </span>
            <div
              onMouseOver={() => setPartyListBox(true)}
              onMouseLeave={() => setPartyListBox(false)}
              style={{ display: partyListBox ? "block" : "none" }}
              id={styles.partiesListBox}
            >
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "bolder",
                }}
              >
                Make a Direct To your favourite Party -
              </div>
              <p style={{ color: "#04fb0c" }}>
                INSO (3112) {"=> Indian National Students Organization "}
              </p>
              <p style={{ color: "red" }}>
                CSF (1231) {"=> College Sudent Front"}
              </p>
              <p style={{ color: "yellow" }}>
                SOI (3312) {"=> Student Organization of India"}
              </p>
              <p style={{ color: "#04fb73" }}>
                KCSU (2121) {"=> Khalsa College Student Union"}
              </p>
            </div>
          </p>
          <span>About</span>
          <span onClick={() => navigate("/live-result")} >Live Result</span>
          <span onClick={() => navigate("/contact")}>Contact</span>
          <span onClick={() => navigate("/help")}>Help</span>
        </div>

        <div className={styles.navRightSideItems}>
          <button onClick={() => navigate("/voting/1230fdj1o2f1")}>
            Vote now
          </button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
