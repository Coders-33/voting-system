import { Request, Response } from "express"
import votesDoc from "../models/votesDoc";
import fs from "node:fs";
import path from "node:path";

const timerPath = path.resolve(path.join(__dirname , "votingTiming.json"));


export async function handleAddNewVote(req: Request, res: Response): Promise<void> {

    const { studentId, panelCode } = req.body;

    if (!studentId || !panelCode) {
        res.status(404).json({ error: "failed to count vote missing values" });
        return;
    }

    try {

 
         const  checkAlready : any = await votesDoc.findOne({ studentId : studentId });
         if(checkAlready) { 
            res.status(404).json({ error : "Your Vote has Already Counted" });
            return;
         }

        const countedVoteEntry: any = await votesDoc.create({ studentId, panelCode });
        if (!countedVoteEntry || countedVoteEntry == "") {
            res.status(404).json({ error: "Failed to count vote , try again" })
            return;
        }

        res.status(200).json({ message: "vote counted thankyou for voting" });

    }
    catch (error) {
        res.status(404).json({ error: error })
    }



}

export async function fetchAllVotes(req: Request, res: Response): Promise<void> {

    try {

        const allVotes: any = await votesDoc.find({});
        if (!allVotes || allVotes == "") {
            res.status(404).json({ error: "No votes at this counted" });
            return;
        }
        res.status(200).json({ allVotes : allVotes });
    }
    catch (error) {
        res.status(404).json({ error: "Internal Error" })
        console.log(error);
    }

}

export async function handleUpdateVotingTimes(req : Request , res : Response) { 

    const {startingTime , endingTime}  = req.body;
    console.log(req.body);

   const timeData = { 
    startingTime,
    endingTime
   }

   fs.writeFile(timerPath , JSON.stringify(timeData) , (error) => { 
    if(error) {
         console.log("failed to update time try again");
          res.status(505).json({ error : "failed to update time try again"});
          return;
    }
   });
   
   res.status(202).json({ message : "Timings Updated!" });



}

export async function handleGetVotingTimes(req : Request , res : Response) {
     
const time = fs.readFileSync(timerPath  , "utf-8");

if(!time  || time == "") {
res.status(404).json({ error : "failed to fetch timings" });
return;
}

const parsedTime = JSON.parse(time);

res.status(202).json({ timings : parsedTime });

}