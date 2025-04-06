import { Request, Response } from "express"
import votesDoc from "../models/votesDoc";

import { partyListDoc } from "../models/admin";
import { transporter } from "../server";


interface PartyDataPayload {
  partyName: string;
  CandiateNames: string[],
  panelCode: string;
}

interface VotesPayload {
  panelCode: string;
}



export async function handleAddNewVote(req: Request, res: Response): Promise<void> {

  const { studentEmail, studentId, panelCode } = req.body;

  if (!studentId || !panelCode) {
    res.status(404).json({ error: "failed to count vote missing values" });
    return;
  }

  try {


    const checkAlready: any = await votesDoc.findOne({ studentId: studentId });
    if (checkAlready) {
      res.status(404).json({ error: "Your Vote has Already Counted" });
      return;
    }

    const countedVoteEntry: any = await votesDoc.create({ studentId, panelCode });
    if (!countedVoteEntry || countedVoteEntry == "") {
      res.status(404).json({ error: "Failed to count vote , try again" })
      return;
    }

    notifyStudent(studentEmail);
    res.status(200).json({ message: "vote counted thankyou for voting" });

  }
  catch (error) {
    res.status(404).json({ error: error })
  }



}


export async function handleGetAllParties(req: Request, res: Response) {

  try {

    const parties: any = await partyListDoc.find({}, { _id: 0, CandiateNames: 1, panelCode: 1 });
    if (parties == "" || parties == null) {
      res.status(404).json({ msg: "No parties there!" });
      return;
    }
    const sortedData: any = {
      presidents: [],
      vicePresidents: [],
      generalSecretaries: [],
      jointSecretaries: []
    };

    parties.forEach((entry: any, index: number) => {

      sortedData.presidents.push({ Name: entry.CandiateNames[0], Position: entry.panelCode[0] })
      sortedData.vicePresidents.push({ Name: entry.CandiateNames[1], Position: entry.panelCode[1] })
      sortedData.generalSecretaries.push({ Name: entry.CandiateNames[2], Position: entry.panelCode[2] })
      sortedData.jointSecretaries.push({ Name: entry.CandiateNames[3], Position: entry.panelCode[3] })


    });

    // sort the data candidates according to position
    Object.entries(sortedData).map(([key, value]: any) => {
      sortedData[key] = value.sort((a: any, b: any) => a.Position - b.Position);
    });



    res.status(200).json({ data: sortedData });
  }
  catch (error) {
    res.status(505).json({ error })
  }

}


export async function handlePartyDetails(req: Request, res: Response) {

  try {

    const partyData = await partyListDoc.find({}, { _id: 0, partyName: 1, panelCode: 1, partyColor: 1 });
    res.status(200).json({ data: partyData });
  } catch (error) {
    res.status(505).json({ error })
  }
}


export async function fetchAllVotes(req: Request, res: Response): Promise<void> {

  try {

    const allVotes: any = await votesDoc.find({}, { _id: 0, panelCode: 1 });
    if (!allVotes || allVotes == "") {
      res.status(404).json({ error: "No votes at this counted" });
      return;
    }
    res.status(200).json({ allVotes: allVotes });
  }
  catch (error) {
    res.status(404).json({ error: "Internal Error" })
  }

}

export async function getAllWinnerAndResult(req: Request, res: Response) {

  try {

    const parties: any = await partyListDoc.find({}, {
      _id: 0, partyName: 1,
      CandiateNames: 1, panelCode: 1
    })

    const votes = await votesDoc.find({}, { _id: 0, panelCode: 1 });


    const data = handleSortData(parties, votes);

    res.status(202).json({ data: data });



  }
  catch (error) {

    console.log(error);
  }

}

function handleSortData(parties: any[], votes: any[]) {
  const positions = ['President', 'VicePresident', 'GeneralSecretary', 'JointSecretary'];

  const candidateVotes: any = {
    President: {},
    VicePresident: {},
    GeneralSecretary: {},
    JointSecretary: {}
  };

  const partyVotes: Record<string, number> = {}; // for total votes per party

  // Initialize candidate names and vote counts
  parties.forEach(party => {
    const code = party.panelCode;
    const candidates = party.CandiateNames;

    code.split('').forEach((num: string, index: number) => {
      const position = positions[index];
      const option = num;
      candidateVotes[position][option] = {
        name: candidates[index],
        votes: 0,
        partyName: party.partyName
      };
    });

    // Initialize party votes to 0
    partyVotes[party.partyName] = 0;
  });

  // Count votes
  votes.forEach(item => {
    const code = item.panelCode;
    code.split('').forEach((num: string, index: number) => {
      const position = positions[index];
      if (candidateVotes[position][num]) {
        candidateVotes[position][num].votes++;

        // Add vote to that candidate's party
        const partyName = candidateVotes[position][num].partyName;
        partyVotes[partyName]++;
      }
    });
  });

  // Get winners
  const winners: any = {};
  positions.forEach(position => {
    let maxVotes = -1;
    let winner = { name: '', votes: 0, partyName: '' };

    Object.values(candidateVotes[position]).forEach((candidate: any) => {
      if (candidate.votes > maxVotes) {
        maxVotes = candidate.votes;
        winner = candidate;
      }
    });

    winners[position] = {
      name: winner.name,
      votes: winner.votes,
      party: winner.partyName
    };
  });

  // Get party with most total votes
  let maxPartyVotes = -1;
  let winningParty = '';

  for (let party in partyVotes) {
    if (partyVotes[party] > maxPartyVotes) {
      maxPartyVotes = partyVotes[party];
      winningParty = party;
    }
  }

  return {
    positionWinners: winners,
    partyVotes,
    winningParty: {
      name: winningParty,
      votes: maxPartyVotes
    }
  };
}



function notifyStudent(studentMail: string) {


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: studentMail,
    subject: "Thank You for Voting!",
    text: "We appreciate your participation. Thank you for voting!",

  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return;
    }
  });
}