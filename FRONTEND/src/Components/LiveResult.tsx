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
import { usePartyContext } from "../Context/PartyContext";
import { arrangeAllVotes } from "../script/ChartData"
import { cacheTime } from "../script/GetData";

ChartJS.register(BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);



const LiveResult: React.FC = () => {


  const { fetchAllVotes, getPartyDetails } = usePartyContext();
  const [parties, setParties] = useState<string[]>([]);
  const [votes, setVotes] = useState<number[]>([]);
  const [partiesColor, setPartiesColor] = useState<string[]>([]);



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




  return (
    <>
      <div style={{ height: "100px", width: "100vw" }}>
        <Navbar />
      </div>

      <div className={styles.votingResultContainer}>
        <div className={styles.allPartiesVotes}>
          <h3>🗳️ All Votes</h3>
          <table className={styles.voteTable}>
            <tbody>
              {parties.map((each, index) => {
                const voteCount = votes[index];
                let voteClass = styles.gray; // default

                if (voteCount > 0) voteClass = styles.red;
                if (voteCount >= 3) voteClass = styles.green;

                return (
                  <tr key={index}>
                    <td>{each}</td>
                    <td>
                      <span className={`${styles.vote} ${voteClass}`}>
                        {voteCount} {voteCount === 1 ? "vote" : "votes"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>



        <div className={styles.votingGraph}>
          <h2>Live Voting Result</h2>
          <Bar key={JSON.stringify(votes)} data={data} options={options} />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default LiveResult;
