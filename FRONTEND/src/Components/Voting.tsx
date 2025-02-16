import Navbar from "../Small-components/Navbar";
import styles from "../Styling/Voting.module.css";
import Footer from "./Footer";
import {
  President,
  VicePresident,
  GeneralSecretary,
  JointSecretary,
} from "../script/GetData";
import { useState } from "react";

function Voting() {
  const [selectedPresident, setSelectedPresident] = useState<string>("");
  const [selectedVicePresident, setVicePresident] = useState<string>("");
  const [selectedGeneralSect, setGeneralSect] = useState<string>("");
  const [selectedJoinSect, setJoinSect] = useState<string>("");

  const [error ,setError] = useState<string | null>(null);

  const [presidentCode, setPresidentCode] = useState<number | null>(null);
  const [vicePresidentCode, setVicePresidentCode] = useState<number | null>(null);
  const [generalSecetCode, setGeneralSecetCode] = useState<number | null>(null);
  const [jointSecetCode, setJointSecetCode] = useState<number | null>(null);

  function SelectPresidentAndCode(PresName: string, code: number) {
    setSelectedPresident(PresName);
    setPresidentCode(code);
  }

  function SelectedVicePresAndCode(VicePresName: string, code: number) {
    setVicePresident(VicePresName);
    setVicePresidentCode(code);
  }

  function SelectedGeneralSecAndCode(GeneralSecName: string, code: number) {
    setGeneralSect(GeneralSecName);
    setGeneralSecetCode(code);
  }

  function SelectedJoinSecAndCode(JoinSecName: string, code: number) {
    setJoinSect(JoinSecName);
    setJointSecetCode(code);
  }

 function HandleOnSubmitVote() {
    
    if(presidentCode  && vicePresidentCode &&
       generalSecetCode && jointSecetCode 
     ) {
         setError("Submitted")
     }
    else { 
        setError("Select Each Member of Post");
    }
    

 }

  return (
    <>
      <Navbar />

      <div className={styles.votingContainer}>
        <div className={styles.votingBoxItems}>
          <div>
            <p id={styles.CandidatePost}>PRESIDENT</p>
            <div className={styles.eachSectionCandidate}>
              {President.map((each, index) => (
                <label key={index} className={styles.eachInfoSection}>
                  <input
                    type="radio"
                    className={styles.hiddenRadio}
                    value={each.Name}
                    name="presidentPost"
                    checked={selectedPresident == each.Name}
                    onChange={() =>
                      SelectPresidentAndCode(each.Name, each.Position)
                    }
                  />
                  <span className={styles.customRadioBtn}></span>
                  <span>( {each.Position} )</span>
                  <span
                    style={{
                      fontWeight:
                        selectedPresident == each.Name ? "bolder" : "normal",
                      transform:
                        selectedPresident == each.Name ? "scale(1.4)" : "none",
                      transition: "transform 200ms",
                    }}
                  >
                    {each.Name}
                  </span>
                </label>
              ))}
              <p>
                {selectedPresident} , {presidentCode}
              </p>
            </div>
          </div>

          <div>
            <p id={styles.CandidatePost}>VICE PRESIDENT</p>
            <div className={styles.eachSectionCandidate}>
              {VicePresident.map((each, index) => (
                <label key={index} className={styles.eachInfoSection}>
                  <input
                    type="radio"
                    className={styles.hiddenRadio}
                    value={each.Name}
                    name="vicePresidentPost"
                    checked={selectedVicePresident == each.Name}
                    onChange={() =>
                      SelectedVicePresAndCode(each.Name, each.Position)
                    }
                  />
                  <span className={styles.customRadioBtn}></span>
                  <span>( {each.Position} )</span>
                  <span
                    style={{
                      fontWeight:
                        selectedVicePresident == each.Name
                          ? "bolder"
                          : "normal",
                      transform:
                        selectedVicePresident == each.Name
                          ? "scale(1.4)"
                          : "none",
                      transition: "transform 200ms",
                    }}
                  >
                    {each.Name}
                  </span>
                </label>
              ))}
              <p>
                {selectedVicePresident},{vicePresidentCode}
              </p>
            </div>
          </div>

          <div>
            <p id={styles.CandidatePost}>GENERAL SECRETARY</p>
            <div className={styles.eachSectionCandidate}>
              {GeneralSecretary.map((each, index) => (
                <label key={index} className={styles.eachInfoSection}>
                  <input
                    type="radio"
                    className={styles.hiddenRadio}
                    value={each.Name}
                    name="generalSecPost"
                    checked={selectedGeneralSect == each.Name}
                    onChange={() =>
                      SelectedGeneralSecAndCode(each.Name, each.Position)
                    }
                  />
                  <span className={styles.customRadioBtn}></span>
                  <span>( {each.Position} )</span>
                  <span
                    style={{
                      fontWeight:
                        selectedGeneralSect == each.Name ? "bolder" : "normal",
                      transform:
                        selectedGeneralSect == each.Name
                          ? "scale(1.4)"
                          : "none",
                      transition: "transform 200ms",
                    }}
                  >
                    {each.Name}
                  </span>
                </label>
              ))}
              <p>
                {selectedGeneralSect} , {generalSecetCode}
              </p>
            </div>
          </div>

          <div>
            <p id={styles.CandidatePost}>JOINT SECRETARY</p>
            <div className={styles.eachSectionCandidate}>
              {JointSecretary.map((each, index) => (
                <label key={index} className={styles.eachInfoSection}>
                  <input
                    type="radio"
                    className={styles.hiddenRadio}
                    value={each.Name}
                    name="joinSecPost"
                    checked={selectedJoinSect == each.Name}
                    onChange={() =>
                      SelectedJoinSecAndCode(each.Name, each.Position)
                    }
                  />
                  <span className={styles.customRadioBtn}></span>
                  <span>( {each.Position} )</span>
                  <span
                    style={{
                      fontWeight:
                        selectedJoinSect == each.Name ? "bolder" : "normal",
                      transform:
                        selectedJoinSect == each.Name ? "scale(1.4)" : "none",
                      transition: "transform 200ms",
                    }}
                  >
                    {each.Name}
                  </span>
                </label>
              ))}
              <p>
                {selectedJoinSect} , {jointSecetCode}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
                fontWeight: "bolder",
                fontSize: "2rem",
              }}
            >
              <span> PANEL CODE -</span>
              <span style={{ color: "red", display: "flex", gap: "6px" }}>
                <span
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {presidentCode}
                </span>
                <span
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {vicePresidentCode}
                </span>
                <span
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {generalSecetCode}
                </span>
                <span
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {jointSecetCode}
                </span>
              </span>
            </p>
            <button  onClick={HandleOnSubmitVote}
            className={styles.SubmitVote}>Submit Vote</button>
            <p>{error}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Voting;
