import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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
import Footer from "./Footer";
import styles from "../Styling/LiveResult.module.css";
import Navbar from "../Small-components/Navbar";
import { BACKEND_URL } from "../script/GetData";
import { useAuthContext } from "../Context/UserContext";

ChartJS.register(BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

type VotesType = {
  studentId: number;
  panelCode: string;
};

const LiveResult: React.FC = () => {


  const { user } = useAuthContext();
  const [parties] = useState<string[]>(["KCSU", "CSF", "INSO", "ISO"]);
  const [allVotes, setAllVotes] = useState<VotesType[]>([]);
  const [votes, setVotes] = useState<number[]>([0, 0, 0, 0]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setVotes((prevVotes) =>
  //       prevVotes.map((vote) => vote + Math.floor(Math.random() * 10) + 1)
  //     );
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const fetchAllVotes = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/votes/fetch-all-votes`, {
           method : "GET",
           headers : { 
            "Authorization" : `Bearer ${user?.token}`
           }
        });
        const result = await response.json();
  
        if (response.ok) {
          setAllVotes(result.allVotes);
          arrangeAllVotes(result.allVotes);
        } else {
          console.log(result.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAllVotes(); 
  
    const intervalId = setInterval(fetchAllVotes, 5000); 
    return () => clearInterval(intervalId); 
  }, []);
  

  function arrangeAllVotes(votesData: VotesType[]) {
    const newVotes = [0, 0, 0, 0];

    votesData.forEach((each) => {
      const code = each.panelCode;

      checkForPresidentPost(code[0], newVotes);
      checkForVicePresidentPost(code[1], newVotes);
      checkForGeneralPost(code[2], newVotes);
      checkForJointSecretaryPost(code[3], newVotes);
    });

    setVotes(newVotes);
  }

  function checkForPresidentPost(vote: string, newVotes: number[]) {
    if (vote === "1") newVotes[2] += 1;
    else if (vote === "2") newVotes[0] += 1;
    else if (vote === "3") newVotes[1] += 1;
    else if (vote === "4") newVotes[3] += 1;
  }

  function checkForVicePresidentPost(vote: string, newVotes: number[]) {
    if (vote === "1") newVotes[2] += 1;
    else if (vote === "2") newVotes[0] += 1;
    else if (vote === "3") newVotes[3] += 1;
    else if (vote === "4") newVotes[1] += 1;
  }

  function checkForGeneralPost(vote: string, newVotes: number[]) {
    if (vote === "1") newVotes[0] += 1;
    else if (vote === "2") newVotes[2] += 1;
    else if (vote === "3") newVotes[1] += 1;
    else if (vote === "4") newVotes[3] += 1;
  }

  function checkForJointSecretaryPost(vote: string, newVotes: number[]) {
    if (vote === "1") newVotes[2] += 1;
    else if (vote === "2") newVotes[1] += 1;
    else if (vote === "3") newVotes[0] += 1;
    else if (vote === "4") newVotes[3] += 1;
  }

  const data: ChartData<"bar"> = {
    labels: ["KCSU", "CSF", "INSO", "ISO"],
    datasets: [
      {
        label: "Votes",
        data: votes,
        backgroundColor: ["rgb(43, 255, 43)", "rgb(255, 43, 43)", "rgb(3, 141, 12)", "rgb(187, 244, 17)"],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <>
      <div style={{ height: "100px", width: "100vw" }}>
        <Navbar />
      </div>

      <div className={styles.votingResultContainer}>
        <div className={styles.allPartiesVotes}>
          <p>All Votes :</p>
          {parties.map((each, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span>{each} -{">"} </span>
              <span style={{ color: "red" }}>{votes[index]} votes</span>
            </div>
          ))}
        </div>

        <div className={styles.votingGraph}>
          <h2>Live Voting Result</h2>
          <Bar data={data} options={options} />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default LiveResult;
