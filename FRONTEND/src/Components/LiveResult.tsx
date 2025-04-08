import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Footer from "./Footer";
import styles from "../Styling/LiveResult.module.css";
import Navbar from "../Small-components/Navbar";
import { usePartyContext } from "../Context/PartyContext";
import { arrangeAllVotes } from "../script/ChartData"
import { cacheTime, ChartOptions,  fetchCountofStudents, fetchCountofVotedStudents } from "../script/GetData";
import { useNavigate } from "react-router-dom";
import Preloader from "../Small-components/PreLoader";
import { useAuthContext } from "../Context/UserContext";

ChartJS.register(BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface StudentVotePayload {
  "REMAINING-STUDENTS": number,
  "VOTED-STUDENTS": number
}


const LiveResult: React.FC = () => {


  const { fetchAllVotes, getPartyDetails } = usePartyContext();
  const [parties, setParties] = useState<string[]>([]);

  const [votes, setVotes] = useState<number[]>([]);
  const [partiesColor, setPartiesColor] = useState<string[]>([]);
  const [allChartData, setAllChartData] = useState<any>();
  const [studentVotes, setStudentVotes] = useState<StudentVotePayload>({
    "REMAINING-STUDENTS": 0,
    "VOTED-STUDENTS": 0

  });

  const navigate = useNavigate();
  const { START_TIME , END_TIME } = useAuthContext();

  let totalStudents : number = 0;
  const [showMain, setShowMain] = useState<boolean>(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {

    async function getTotalstudents() {
      const studentsCount: any = await fetchCountofStudents();
      totalStudents = studentsCount;

    }

   
    getTotalstudents();

  }, []);

  useEffect(() => {

    function ChartData() {
      const allData = ChartOptions(parties, partiesColor, votes, studentVotes);
      setAllChartData(allData);
    }

    ChartData();

  }, [parties, partiesColor, votes, studentVotes])

  useEffect(() => {

    const GetAllVotes = async () => {

      const [allvotes, partyData, votedStudents]: any = await Promise.all([
        fetchAllVotes(),
        getPartyDetails(),
        fetchCountofVotedStudents()
      ]);

      setStudentVotes(prev => ({ ...prev, "VOTED-STUDENTS": votedStudents }));
      setStudentVotes(prev => ({ ...prev, "REMAINING-STUDENTS": totalStudents - votedStudents }));
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


  if (START_TIME && END_TIME) {

    if (Date.now() < START_TIME || Date.now() > END_TIME) {
      navigate("/");
      return;
    }

  }


  if (!showMain) {
    return <Preloader />
  }


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



        <div className={styles.votingGraph} >
          <h2 style={{ color: "black" }}>Students Votes Analysis</h2>
          {allChartData && <Pie key={JSON.stringify(studentVotes)} data={allChartData?.pieData} options={allChartData?.pieOptions} />}
        </div>

        <div className={styles.votingGraph}>
          <h2 style={{ color: "black" }} >Live Voting Result</h2>
          {allChartData && <Bar style={{ width: "300px" }} key={JSON.stringify(votes)} data={allChartData?.barData} options={allChartData?.barOptions} />}
        </div>



      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default LiveResult;
