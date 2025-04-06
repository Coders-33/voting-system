import { Request, Response } from "express";
import { adminAccountDoc, partyListDoc } from "../models/admin";
import { GenerateToken } from "../authentication/authenticate";
import crypto from "crypto";
import fs from "node:fs";
import path from "node:path";
import votesDoc from "../models/votesDoc";

const timerPath = path.resolve(path.join(__dirname, "votingTiming.json"));


async function AdminLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(404).json({ error: "Email And Password required", success: false });
        return;
    }

    try {
        const admin: any = await adminAccountDoc.findOne({ email });
        if (!admin) {
            res.status(404).json({ error: "Admin Not Found!", success: false });
            return;
        }

        const currentHashPass = admin.password;
        const salting = admin.salting;
        const newHashPass = crypto.createHmac("sha256", salting).update(password).digest("hex");
        if (currentHashPass != newHashPass) {
            res.status(404).json({ error: "Incorrect passcode!", success: false });
            return;
        }
        const data: any = {
            adminName: admin.adminName,
            adminEmail: email
        }
        const token = GenerateToken(data);
        data.token = token;



        res.cookie("adminAuth-token", data, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({ msg: "logged in ", data: data, success: true });
    }
    catch (error) {
        res.status(505).json({ error: `Internal error try later! : ${error}` });
    }

}

async function handleAddNewParty(req: Request, res: Response) {


    try {

        const { partyName,
            partyColor,
            presidentName,
            vicePresidentName,
            generalSecretaryName,
            jointSecretaryName,
            panelCode
        } = req.body;


        if (!partyName || !partyColor || !presidentName || !vicePresidentName
            || !jointSecretaryName || !panelCode || !generalSecretaryName) {
            res.status(404).json({ error: "Fields can't be empty provide full info !" });
            return;
        }



        const data = {
            partyName,
            partyColor,
            CandiateNames: [presidentName, vicePresidentName, generalSecretaryName, jointSecretaryName],
            panelCode
        }

       
        const check: any = await partyListDoc.find({partyName});

        if (check.length > 0 || check != "") {
            console.log(check);
            res.status(404).json({ error: "Duplicate Parties are not Allowed!" });
            return;
        }
        


         const duplicacy = await checkForDuplictePanel(panelCode);
        if (duplicacy) {
            res.status(404).json({ error: "Duplicate Panel Codes are not Allowed!" });
            return;
        }



        const party = await partyListDoc.create(data);
        if (!party) {
            res.status(404).json({ error: "failed to add party" });
        }

        res.status(200).json({ data: party });

    }
    catch (error) {
        res.status(505).json({ error });
    }

}

async function handleAdminSignUp(req: Request, res: Response): Promise<void> {

    const { adminName, email, password } = req.body;
    const { ADMIN_KEY_ID } = req.params;

    if (ADMIN_KEY_ID != process.env.ADMIN_SECRET_KEY || !ADMIN_KEY_ID) {
        res.status(404).json({ msg: "FAILED TO AUTHENTICATE !" });
        return;
    }

    if (!adminName || !email || !password) {
        res.status(404).json({ msg: "Info required before login", success: false });
        return;
    }

    const data = SaltedPassword(password);

    const accountData = {
        adminName,
        email,
        password: data.hashedPassword,
        salting: data.salt
    }

    try {

        const admin: any = await adminAccountDoc.create(accountData);

        if (!admin || admin == "") {
            res.status(404).json({ error: "failed to Sign UP" });
            return;
        }

        res.status(200).json({ admin });

    }
    catch (error) {
        res.status(505).json({ error: `Sever Database error ${error}` })

    }




}

async function handlePartyRemoval(req: Request, res: Response): Promise<void> {

    try {
        const { partyName, panelCode } = req.body;
        if (!partyName || !panelCode) {
            res.status(404).json({ error: "Empty Fields!" });
            return;
        }

        const query = {
            $and: [
                { partyName },
                { panelCode }
            ]
        }

        const removedParty: any = await partyListDoc.deleteOne(query);

        if (removedParty == null || removedParty == "") {
            res.status(404).json({ error: "Party Not found!" });
            return;
        }

        res.status(200).json({ message: "party removed successfully" })
    }
    catch (error: any) {

    }

}


export async function handleUpdateVotingTimes(req: Request, res: Response) {

    const { startingTime, endingTime } = req.body;

    const timeData = {
        startingTime,
        endingTime
    }

    fs.writeFile(timerPath, JSON.stringify(timeData), (error) => {
        if (error) {
            res.status(505).json({ error: "failed to update time try again" });
            return;
        }
    });


    await clearPreviousVotings();
    res.status(202).json({ message: "Timings Updated!" });



}


async function clearPreviousVotings() {
    try {
        const allvotes = await votesDoc.deleteMany({});
        console.log(allvotes);
    }
    catch (error) {
        console.log(error);
    }
}

export function handleEndVotings(req: Request, res: Response) {

    const timeData = {
        startingTime: 0,
        endingTime: 0
    }

    fs.writeFile(timerPath, JSON.stringify(timeData), (error) => {
        if (error) {
            res.status(505).json({ error: "failed to update time try again" });
            return;
        }
    });

    res.status(200).json({ msg: "voting time cleared!" });

}

export async function handleGetVotingTimes(req: Request, res: Response) {

    const time = fs.readFileSync(timerPath, "utf-8");

    if (!time || time == "") {
        res.status(404).json({ error: "failed to fetch timings" });
        return;
    }

    const parsedTime = JSON.parse(time);

    res.status(202).json({ timings: parsedTime });

}



async function checkForDuplictePanel(panelCode: string): Promise<Boolean> {


    let duplicatePanel: boolean = false;

    try {


        const allPanels = await partyListDoc.find({}, { _id: 0, panelCode: 1 });

        outerLoop:
        for (const each of allPanels) {
            const code = each.panelCode;

            for (let i = 0; i < panelCode.length; i++) {
                if (panelCode[i] == code[i]) {
                    duplicatePanel = true;
                    break outerLoop;
                }
            }
        }


    }
    catch (error) {
        return duplicatePanel;
    }

    return duplicatePanel;



}


function SaltedPassword(password: string) {

    const salt: string = crypto.randomBytes(30).toString("hex");

    const hashedPassword: string = crypto.createHmac("sha256", salt).update(password).digest("hex");

    return {
        hashedPassword,
        salt
    }

}

export { AdminLogin, handleAdminSignUp, handleAddNewParty, handlePartyRemoval }