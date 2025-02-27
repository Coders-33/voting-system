import { Request, Response } from "express"
import votesDoc from "../models/votesDoc"

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