import Navbar from "../Small-components/Navbar";
import styles from "../Styling/Voting.module.css";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL, GetVotingTimings, startingTime, } from "../script/GetData";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Context/UserContext";
import { usePartyContext } from "../Context/PartyContext";
import Preloader from "../Small-components/PreLoader";

function Voting() {

  const { user, START_TIME, END_TIME } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedPresident, setSelectedPresident] = useState<string>("");
  const [selectedVicePresident, setVicePresident] = useState<string>("");
  const [selectedGeneralSect, setGeneralSect] = useState<string>("");
  const [selectedJoinSect, setJoinSect] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [voteError, setVoteError] = useState<string | null>("");
  const [verficationError, setVerificationError] = useState<string | null>(null);
  const [verficationMessage, setVerificationMessage] = useState<string | null>(null);

  const [presidentCode, setPresidentCode] = useState<number | null>(null);
  const [vicePresidentCode, setVicePresidentCode] = useState<number | null>(null);
  const [generalSecetCode, setGeneralSecetCode] = useState<number | null>(null);
  const [jointSecetCode, setJointSecetCode] = useState<number | null>(null);

  const [studentId, setStudentId] = useState<string>("");
  const [emailId, setEmailId] = useState<string>(`${user?.email}`);
  const [password, setPassword] = useState<string>("");



  const [enableVerification, setEnableVerification] = useState<boolean>(false);
  const [voteDoneStatus, setVoteDoneStatus] = useState<boolean>(false);
  const [voteResult, setVoteResult] = useState<boolean>(false);
  const [enableVote, setEnableVote] = useState<boolean>(false);
  const [voteConfirmation, setVoteConfirmation] = useState<boolean>(false);

  const [DATA_studentid, setDataStudentId] = useState<number | null>(null);

  const { fetchParties } = usePartyContext();
  const [allParties, setAllParties] = useState<any | null>(null);


  const [showMain, setShowMain] = useState<boolean>(false);
  // const [START_TIME, setSTART_TIME] = useState<number>(0);
  // const [END_TIME, setEND_TIME] = useState<number>(0);


  useEffect(() => {
    const timer = setTimeout(() => {
      // true  after two seconds
      setShowMain(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {

    function clearUi() {

      const timeoutId = setTimeout(() => {
        setError(null);
        setMessage(null);
        setVerificationError(null);
        setVerificationMessage(null);
      }, 1500);



      return () => {
        clearTimeout(timeoutId)
      }
    }

    clearUi();

  }, [error, message, verficationError, verficationMessage])


  useEffect(() => {

    async function GetAllParties() {
      const parties = await fetchParties();

      setAllParties(parties);
    }


    // async function GetVotingTime() {

    //   const data = await GetVotingTimings();

    //   setSTART_TIME(data.startingTimeStamps);
    //   setEND_TIME(data.endingTimeStamps);
    // }

    // GetVotingTime();

    GetAllParties();

  }, [])



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

  async function HandleOnSubmitVote() {


    if (!presidentCode || !vicePresidentCode ||
      !generalSecetCode || !jointSecetCode
    ) {
      setError("Select Candidate from each post");
      return;
    }
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    })
    setEnableVerification(true);
  }

  async function verifyStudentLogin(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (studentId == "" || emailId == "" || password == "") {
      setError("Fields can't be empty");
      return;
    }

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("email", emailId);
    formData.append("password", password);

    try {

      const response = await fetch(`${BACKEND_URL}/accounts/login`, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        setVerificationMessage("Verified");
        handleResetValues();
        setTimeout(() => {
          setEnableVerification(false);
          setEnableVote(true);
        }, 1500);
        return;
      }
      if (!response.ok) {
        setVerificationError(result.error);
      }
    }
    catch (error: any) {
      setVerificationError(error);
    }

  }

  function handleResetValues() {
    setDataStudentId(Number(studentId));
    setStudentId("");
    setEmailId("");
    setPassword("");
  }

  async function addVote() {

    const panelcode = `${presidentCode}${vicePresidentCode}${generalSecetCode}${jointSecetCode}`;

    const votingData = {
      studentId: DATA_studentid,
      studentEmail: user?.email,
      panelCode: panelcode
    }

    try {

      const response = await fetch(`${BACKEND_URL}/votes/add-new-vote`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(votingData)
      });

      const result = await response.json();

      if (response.ok) {
        document.body.style.overflowY = "auto";
        setVoteResult(true);
        setVoteConfirmation(true);
        setVoteDoneStatus(true);
        setTimeout(() => {
          navigate("/")
        }, 2000);

      }
      if (!response.ok) {
        document.body.style.overflowY = "auto";
        setVoteConfirmation(true);
        setVoteResult(true);
        setVoteError(result.error);

        setTimeout(() => {
          navigate("/")
        }, 2000);
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  if (START_TIME) {
    if (Date.now() < START_TIME) {
      window.location.href = "/";
      navigate("/");
      return;
    }
  }

  if (user?.userId != id) {
    window.location.href = "/error";
    navigate("/error");
    return;
  }



  if (!showMain) {
    return <Preloader />
  }



  return (
    <div>

      {enableVerification &&
        <div>
          <div className={styles.verificationPopUp} >
          </div>

          <form onSubmit={verifyStudentLogin} className={styles.verificationBox} >
            <div id={styles.cancelButton} >
              <p>VERIFICATION</p>
              <span onClick={function () {
                setEnableVerification(false);
                document.body.style.overflowY = "auto";

              }} >x</span>
            </div>
            <input type="text" required placeholder="Enter student id" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
            <input type="email"
              style={{ color: "white", userSelect: "none" }}
              disabled={true} placeholder="Enter email id" value={user?.email} onChange={(e) => setEmailId(e.target.value)} />
            <input type="password" required placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" >Verify</button>
            <div>
              {verficationError && <p style={{ color: 'red' }}>{verficationError}</p>}
              {verficationMessage && <p style={{ color: 'green' }}>{verficationMessage}</p>}
            </div>
          </form>

        </div>
      }

      {

        enableVote &&
        <div>
          <div className={styles.verificationPopUp} >
          </div>

          <div className={styles.verificationBox} >
            {voteConfirmation ?

              <>
                {
                  voteResult ?

                    <>

                      {

                        voteDoneStatus ?


                          <div style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: "10px" }} >
                            <p style={{ fontSize: "1.5rem" }} >THANK YOU FOR VOTING</p>
                            <p style={{ fontWeight: 'bolder' }}>Your vote has been Counted</p>
                            <FontAwesomeIcon icon={faCheck} style={{
                              backgroundColor: 'green',
                              width: "40px", height: "40px", padding: "10px", borderRadius: "50%"
                            }} />
                          </div>
                          :

                          <div style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: "10px" }} >
                            <FontAwesomeIcon icon={faXmark} style={{
                              backgroundColor: 'red',
                              width: "40px", height: "40px", padding: "10px", borderRadius: "50%"
                            }} />
                            <p>{voteError || "FAILED TO ADD VOTE , PLEASE TRY AGAIN"}</p>
                          </div>
                      }

                    </>

                    :

                    "LOADING"

                }


              </>

              :

              <div className={styles.verificationBox} >
                <div id={styles.cancelButton} >
                  <p>VOTE NOW</p>
                  <span onClick={function () {
                    setEnableVote(false);
                    document.body.style.overflowY = "auto";
                  }} >x</span>
                </div>
                <p style={{ fontSize: "1.5rem" }} >PANEL CODE - {presidentCode}{vicePresidentCode}{generalSecetCode}{jointSecetCode}</p>
                <div style={{ width: "100%", display: 'flex', gap: "10px", alignItems: 'center', justifyContent: 'center' }}  >
                  <button onClick={addVote} >Vote</button>
                </div>
                {voteError && <p>error</p>}
                <strong  >Important : </strong>
                <p style={{
                  color: "red",
                  wordWrap: "break-word",
                  fontSize: "1.1rem",
                  width: 'inherit',
                  display: 'inline-block',
                  textAlign: 'center'
                }}>
                  Once a vote has been cast, it cannot be reverted. <br />
                  So, check the panel code before voting.
                </p>
              </div>

            }

          </div>

        </div>

      }


      <Navbar />

      <div className={styles.votingContainer}>
        {allParties != null ?
          <div className={styles.votingBoxItems}>

            <div className={styles.boxContainer}>

              <div id={styles.innerBoxs}>
                <p id={styles.CandidatePost}>PRESIDENT</p>
                <div className={styles.eachSectionCandidate}>

                  {allParties.presidents.map((each: any, index: any) => (
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
                </div>
              </div>

              <div id={styles.innerBoxs} >
                <p id={styles.CandidatePost}>GENERAL SECRETARY</p>
                <div className={styles.eachSectionCandidate}>
                  {allParties.generalSecretaries.map((each: any, index: any) => (
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

                </div>
              </div>
            </div>

            <div className={styles.boxContainer}>

              <div id={styles.innerBoxs} >
                <p id={styles.CandidatePost}>VICE PRESIDENT</p>
                <div className={styles.eachSectionCandidate}>
                  {allParties.vicePresidents.map((each: any, index: any) => (
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

                </div>
              </div>

              <div id={styles.innerBoxs}>
                <p id={styles.CandidatePost}>JOINT SECRETARY</p>
                <div className={styles.eachSectionCandidate}>
                  {allParties.jointSecretaries.map((each: any, index: any) => (
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

                </div>
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
              <button onClick={HandleOnSubmitVote}
                className={styles.SubmitVote}>Submit Vote</button>
              <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'greens' }} >{message}</p>}
              </div>
            </div>

          </div>
          :
          <div>CANDIDATES OR MEMBERS ARE NOT ADDED YET</div>
        }
      </div>
      <Footer />
    </div>
  );
}

export default Voting;
