import { Request, Response } from "express"
import votesDoc from "../models/votesDoc";

import { partyListDoc } from "../models/admin";






export async function handleAddNewVote(req: Request, res: Response): Promise<void> {

    const { studentId, panelCode } = req.body;

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

