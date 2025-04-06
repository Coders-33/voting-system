import React from "react";
interface ResultCardProps {
  title: string;
  name: string;
  partyName: string;
  votes: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ partyName, title, name, votes }) => {
  return (
    <div style={{
      fontWeight: "bolder", color: "white", display: 'flex', alignItems: "center", flexDirection: "column",
      background: "linear-gradient(to top right, #1d4ed8, #10b981, #facc15)"
      , width: "400px", borderRadius: "20px" , overflow:"hidden"
    }} >
      <h2 style={{ color: "blue" }}>{title}</h2>
      <p >{name}</p>
      <p>{partyName}</p>
      <p >Votes: {votes}</p>
    </div>
  );
};

export default ResultCard;
