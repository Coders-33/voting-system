import React, { useState } from 'react'
import styles from "../Styling/Admin.module.css";
import { BACKEND_URL , GetVotingTimings } from '../script/GetData';

function SetTimer() {


  const [startingTime, setStartingTime] = useState<string>("");
  const [endingTime, setEndingTime] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [message , setMessage] = useState<string | null>(null);


  async function updateVotingTimes() {

    if (!checkFields()) return;

    const timeData = {
      startingTime,
      endingTime
    }

    try {

     const response  = await fetch(`${BACKEND_URL}/votes/update-votingTimes` ,  {
       method : "POST",
       headers : { 
        "Content-Type" : "application/json",
       },
       body : JSON.stringify(timeData)
     })
  const result  = await response.json();

     if(response.ok) { 
           setMessage(result.message);
           alert(result.message);
     }
     if(!response.ok) setError(result.error);
    }

    catch (error: any) {
      console.log(error);
      setError("Failed to update voting times");
    }

  }


  function checkFields() {

    if (startingTime == "" || endingTime == "") {
      setError("Fields can't be empty");
      return false;
    }
    if (new Date(startingTime) >= new Date(endingTime)) {
      setError("Starting time must be before the ending time");
      return false;
    }

    return true;

  }

  return (

    <div className={styles.adminContainer}>
      <h1>Update Voting Timer</h1>
      Starting Time :  <input type="datetime-local" value={startingTime} onChange={(e) => setStartingTime(e.target.value)} /> <br />
      Ending Time : <input type="datetime-local" value={endingTime} onChange={(e) => setEndingTime(e.target.value)} /> <br />
      <button onClick={updateVotingTimes} >Update Timings</button>
      <button onClick={GetVotingTimings} >Get times</button>
      {error && <p>{error}</p>}
      { message && <p>{message}</p> }
    </div>
  )
}

export default SetTimer
