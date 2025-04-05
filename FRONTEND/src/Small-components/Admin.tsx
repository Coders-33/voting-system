import React, { useEffect, useState } from 'react'
import styles from "../Styling/Admin.module.css";
import { BACKEND_URL, cacheTime, clearCookies, EndVotings } from '../script/GetData';
import { usePartyContext } from '../Context/PartyContext';
import { Bar } from "react-chartjs-2";
import { arrangeAllVotes } from '../script/ChartData';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { ACTIONS, useAuthContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
ChartJS.register(BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

function SetTimer() {

  const [startingTime, setStartingTime] = useState<string>("");
  const [endingTime, setEndingTime] = useState<string>("");


  const [partyColor, setPartyColor] = useState<string>("");
  const [votes, setVotes] = useState<number[]>([]);


  //  party 
  const [partyName, setPartyName] = useState<string>("");
  const [presidentName, setPresidentName] = useState<string>("");
  const [vicePresidentName, setvicePresidentName] = useState<string>("");
  const [generalSecretaryName, setgeneralSecretaryName] = useState<string>("");
  const [jointSecretaryName, setjointSecretaryName] = useState<string>("");

  const [panelCode, setPanelCode] = useState<string>("");
  const [parties, setParties] = useState<string[]>([]);
  const [partiesColor, setPartiesColor] = useState<string[]>([]);

  const [removalPartyName, setRemovalPartyName] = useState<string>("");
  const [removalPanelCode, setRemovalPanelCode] = useState<string>("");

  const { getPartyDetails, fetchAllVotes } = usePartyContext();
  const { admin, setAdminLoginStatus, dispatch, setAdminLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {

    const GetAllVotes = async () => {
      const allvotes = await fetchAllVotes();
      const partyData = await getPartyDetails();
      SetpartyNames(partyData);
      SetPartyColors(partyData);
      const newvotes = arrangeAllVotes(partyData, allvotes);
      setVotes(newvotes);

      checkVotingTimes(intervalId);

    };

    GetAllVotes();
    const intervalId = setInterval(GetAllVotes, 5000);
    return () => clearInterval(intervalId);
  }, []);

  function checkVotingTimes(intervalId: any) {
    console.log("this is the cache time", cacheTime);
    if (Date.now() > cacheTime) {
      clearInterval(intervalId);
      return;
    }
  }

  function SetpartyNames(partyData: any) {
    let partyNames: any = [];
    partyData.map((each: any) => {
      partyNames.push(each.partyName);
    });
    setParties(partyNames);
    partyNames = [];
  }

  function SetPartyColors(partyData: any) {
    let partyColors: any = [];
    partyData.map((each: any) => {
      partyColors.push(each.partyColor);
    });
    setPartiesColor(partyColors);
    partyColors = [];
  }

  async function updateVotingTimes() {

    if (!checkFields()) return;

    const timeData = {
      startingTime,
      endingTime
    }

    try {

      const response = await fetch(`${BACKEND_URL}/admin/update-votingTimes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timeData)
      })
      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      }
      if (!response.ok) alert(result.error);
    }

    catch (error: any) {
      console.log(error);
      alert("Failed to update voting times");
    }

  }

  function checkFields() {

    if (startingTime == "" || endingTime == "") {
      alert("Fields can't be empty");
      return false;
    }
    if (new Date(startingTime) >= new Date(endingTime)) {
      alert("Starting time must be before the ending time");
      return false;
    }

    return true;

  }

  async function EndVoting() {
    const status = confirm("Are you sure to end votings right now")

    if (status) {
      const msg = await EndVotings();
      alert(msg);
      return;
    }
    alert("Failed to end votings");

  }

  async function createNewParty(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("partyName", partyName);
    formdata.append("partyColor", partyColor);
    formdata.append("presidentName", presidentName);
    formdata.append("vicePresidentName", vicePresidentName);
    formdata.append("generalSecretaryName", generalSecretaryName);
    formdata.append("jointSecretaryName", jointSecretaryName);
    formdata.append("panelCode", panelCode);




    try {
      const response = await fetch(`${BACKEND_URL}/admin/add-new-party`, {
        method: 'POST',
        body: formdata
      });

      const result = await response.json();
      if (response.ok) {
        alert(`New Party Added with Party-Name => ${partyName}`);
        emptyFields();
        return;
      }
      if (!response.ok) alert(result.error)
    }
    catch (error: any) {
      console.log(error);
      alert(`Failed to Add Party : ${error.message}`);
    }


  }

  async function handleRemoveParty(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const confirmation = confirm("Confirm Before Removing Party!");
    if (!confirmation) {
      alert("Failed to Remove!");
      return;
    }

    const data = {
      partyName: removalPartyName,
      panelCode: removalPanelCode
    }

    try {
      const response = await fetch(`${BACKEND_URL}/admin/remove-party`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

      });
      const result = await response.json();
      if (response.ok) {
        alert(`${result.message ? `${result.message}` : "Party removed successfully!"}`);
        return;
      }
      if (!response.ok) {
        alert(`Failed to Remove : ${result.error}`);

      }
    }
    catch (error: any) {
      alert(`Server Internal Error : ${error.message}`)
      console.log(error);
    }


  }

  function checkPanelCode(e: React.ChangeEvent<HTMLInputElement>) {
    const code = Number(e.target.value);

    if (isNaN(code) || e.target.value.length > 4) return;

    setPanelCode(e.target.value);

  }


  function emptyFields() {
    setPanelCode("");
    setPartyName("");
    setPresidentName("");
    setvicePresidentName("");
    setgeneralSecretaryName("");
    setjointSecretaryName("");
    setPartyColor("");
  }

  function handleAdminLogout() {
    setAdminLoggedIn("FALSE");
    setAdminLoginStatus("FALSE");
    clearCookies();
    dispatch({ type: ACTIONS.REMOVE_ADMIN });
    DeleteHttpCookie();
    navigate("/");

  }

  async function DeleteHttpCookie() {
    const res = await fetch(`${BACKEND_URL}/auth/logout/?authName=admin`, {
      method: "POST",
      credentials: "include"
    });



  }

  const data: ChartData<"bar"> = {
    labels: parties,
    datasets: [
      {
        label: "Votes",
        data: votes,
        backgroundColor: partiesColor,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (!admin) {
    navigate("/admin-login");
    return;
  }


  return (

    <div className={styles.adminContainer}>

      <div style={{
        display: 'flex', padding: "20px", borderBottom: "1px solid #ffffff3b"
        , width: "100vw", justifyContent: "space-around"
      }}>
        <h1>ADMIN PANEL</h1>
        <button
          onClick={handleAdminLogout}
          style={{ alignContent: "flex-end" }}>Log Out</button>
      </div>


      <div className={styles.allItems}>
        {/* update timings */}
        <div className={styles.updateVotingTimes} >
          <h1>Update Voting Time</h1>
          Starting Time :  <input type="datetime-local" value={startingTime} onChange={(e) => setStartingTime(e.target.value)} /> <br />
          Ending Time : <input type="datetime-local" value={endingTime} onChange={(e) => setEndingTime(e.target.value)} /> <br />
          <button
            style={{ borderRadius: "5px" }}
            onClick={updateVotingTimes} >Update Timings</button>
        </div>

        {/* add parties  */}
        <div className={styles.AddPartiesContainer} >
          <h1>ADD PARTIES</h1>
          <form onSubmit={createNewParty} style={{ display: 'flex', flexDirection: "column", gap: "14px" }}>
            <label htmlFor="">
              <span style={{ color: "#00FFFF", fontWeight: "bolder", fontSize: "1.2rem" }}>PARTY NAME : </span>
              <input required value={partyName} onChange={(e) => {
                const value = e.target.value.toString().toUpperCase();
                setPartyName(value);
              }}
                style={{ borderRadius: "10px", padding: "5px", border: 'none', outline: "none" }}
                type="text" placeholder='party name' />
            </label>

            <label htmlFor="">
              <span style={{ color: "#00FFFF", fontWeight: "bolder", fontSize: "1.2rem" }}>PARTY COLOR : </span>
              <input required value={partyColor} onChange={(e) => setPartyColor(e.target.value)}
                style={{ borderRadius: "10px", padding: "5px", border: 'none', outline: "none" }}
                type="color" placeholder='select party color' />
            </label>

            <div className={styles.candiateDiv} >
              <span>PRESIDENT NAME :</span>
              <input required type="text" placeholder='enter President'
                value={presidentName} onChange={(e) => setPresidentName(e.target.value)} />

            </div>
            <div className={styles.candiateDiv} >
              <span>VICE-PRESIDENT :</span>
              <input required type="text" placeholder='enter Vice-president'
                value={vicePresidentName} onChange={(e) => setvicePresidentName(e.target.value)} />

            </div>

            <div className={styles.candiateDiv} >
              <span>GENERAL SECRETARY :</span>
              <input required type="text" placeholder='enter General Secretary'
                value={generalSecretaryName} onChange={(e) => setgeneralSecretaryName(e.target.value)} />

            </div>

            <div className={styles.candiateDiv} >
              <span>JOINT SECRETARY :</span>
              <input required type="text" placeholder='enter Joint Secretary'
                value={jointSecretaryName} onChange={(e) => setjointSecretaryName(e.target.value)} />

            </div>

            <div className={styles.candiateDiv} >
              <span>PANEL CODE :</span>
              <input required type="text" placeholder='panel code'
                value={panelCode} onChange={checkPanelCode} />

            </div>
            <button type="submit" style={{ borderRadius: "5px" }} >ADD TO LIST</button>
          </form>
        </div>

        {/* stop voting or end immediately */}
        <div className={styles.endVoting} >
          <h1>End Voting Immediately!</h1>
          <button onClick={EndVoting} >END NOW</button>

          <form onSubmit={handleRemoveParty}
            style={{
              alignItems: "center ", justifyContent: "center",
              display: "flex", flexDirection: "column", gap: "10px"
            }}
          >
            <h1>Remove Party from List!</h1>
            <div>
              <span>Party-Name : </span>
              <input type="text" required
                value={removalPartyName} onChange={(e) => setRemovalPartyName(e.target.value)}
                placeholder='enter party name' />
            </div>

            <div>
              <span>Panel Code : </span>
              <input type="text" required
                value={removalPanelCode} onChange={(e) => {
                  const code = Number(e.target.value);
                  if (isNaN(code) || e.target.value.length > 4) return;
                  setRemovalPanelCode(e.target.value);
                }}
                placeholder='enter panel code' />
            </div>
            <button style={{ width: "100px" }} >Remove</button>

          </form>

        </div>
        {/* view parties votes chart */}

        <div className={styles.votingChart}>
          <div className={styles.votingGraph}>
            <h2 style={{ color: "white" }} >Live Voting Result</h2>
            <Bar key={JSON.stringify(votes)} data={data} options={options} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default SetTimer









// {error && <p>{error}</p>}
// { message && <p>{message}</p> }