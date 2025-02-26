import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ChartData,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Footer from "./Footer";
import styles from "../Styling/LiveResult.module.css";
import Navbar from "../Small-components/Navbar";

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const LiveResult: React.FC = () => {
  const [votes, setVotes] = useState<number[]>([10, 25, 15, 30]);
  const [parties ,setParties] = useState<string[]>( ["KCSU", "CSF", "INSO", "ISO"]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVotes(votes.map((vote) => vote + Math.floor(Math.random() * 5)));
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [votes]);

  const data: ChartData<"bar"> = {
    labels: ["KCSU", "CSF", "INSO", "ISO"],

    datasets: [
      {
        label: "Votes",
        data: votes,
        backgroundColor: [
          "rgb(43, 255, 43)",
          "rgb(255, 43, 43)",
          "rgb(3, 141, 12)",
          "rgb(187, 244, 17)",
        ],
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
         {parties.map((each , index) =>  (
          <div key={index}  style={{display :"flex" , gap :"10px" , alignItems :"center" }} >
              <span>{each} : </span>
              <span style={ { color: "red" } } >{votes[index]}</span>
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
