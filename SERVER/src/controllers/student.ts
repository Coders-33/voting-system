import { Request, Response } from "express";
import studentDoc from "../models/studentDoc";
import crypto from "crypto";
import { transporter } from "../server";
import { GenerateToken } from "../authentication/authenticate";

type CandidateType = {
    _id: string,
    email: string,
}

type OTPStorageType = {

    OTP: number,
    expirationTime: number

};

const OTP_STORAGE: Record<string, OTPStorageType> = {};

export async function handleStudentLogin(req: Request, res: Response): Promise<void> {

    if (req.body) {
        if (!req.body.studentId || req.body.studentId == "") {
            res.status(404).send("Data Missing");
            return;
        }
        if (!req.body.email || req.body.email == "") {
            res.status(404).send("Data Missing");
            return;
        }
        if (!req.body.password || req.body.password == "") {
            res.status(404).send("Data Missing");
            return;
        }
    }

    const { studentId, email, password } = req.body;

    const candidateId = Number(studentId);

    const query = {
        $and: [
            { studentId: candidateId },
            { email: email }
        ]
    };

    try {

        const candiate: any = await studentDoc.findOne(query);
        if (!candiate || candiate == "") {
            res.status(404).json({ error: "Invalid email or Student Id" });
            return;
        }

        const hashPassword = candiate.password;
        const salting = candiate.salting;

        const PassHash = crypto.createHmac("sha256", salting).update(password).digest("hex");
        if (hashPassword != PassHash) {
            res.status(404).json({ error: "Incorrect Password" });
            return;
        }

        // authentication 

        const tokenData = {
            email: candiate.email
        }

        const token = GenerateToken(tokenData);

        const loginData = {
            userId: candiate._id,
            token: token,
            studentName: candiate.studentName,
            email: candiate.email
        }

        res.cookie("userAuth-token", loginData, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({ data: loginData, message: "Logged In Successfuly" });

    }
    catch (error) {
        res.status(404).json({ error: "Failed to login internal fault" })
    }


}

export async function handleSignUp(req: Request, res: Response): Promise<void> {

    const { studentName, studentId, email, password } = req.body;

    const data = SaltedPassword(password);

    const accountData = {
        studentName,
        studentId,
        email,
        password: data.hashedPassword,
        salting: data.salt
    }

    try {

        const createdStudent: any = await studentDoc.create(accountData);

        if (!createdStudent || createdStudent == "") {
            res.status(404).json({ error: "failed to Sign UP" });
            return;
        }

        res.status(200).json({ createdStudent });

    }
    catch (error) {
        res.status(505).json({ error: `Sever Database error ${error}` })

    }




}


export async function handleSendOTP(req: Request, res: Response): Promise<void> {


    const { email } = req.body;

    if (!email || email == "") {
        res.status(404).json({ error: "Email Required" });
        return;
    }

    if (OTP_STORAGE[email]) {
        res.status(404).json({ error: "OTP already sent" });
        return;
    }

    try {
        const candiate: CandidateType | any = await studentDoc.findOne({ email: email });
        if (!candiate || candiate == "") {
            res.status(404).json({ error: "Email Doesn't Exists" });
            return;
        }

        //  send the otp to user with that email
        const candidateId = candiate._id;
        const OTP: number = GenerateOTP(email);

        if (!OTP) {
            res.status(404).json({ error: "failed to generate OTP" });
            return;
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP By SGGS Voting Campus",
            text: `Your OTP for password reset is: ${OTP}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(505).json({ error: "Failed to Send OTP" })
                return;
            }
        });

        res.status(200).json({ message: "OTP sent successfully", candidateId: candidateId });

    }
    catch (error) {
        res.status(505).json({ error: "Internal Error Failed" });
    }

}


export async function handleVerificationOfOTP(req: Request, res: Response): Promise<void> {

    const { id, email, enteredOTP } = req.body;

    try {

        if (!OTP_STORAGE[email]) {
            res.status(401).json({ message: "Invalid OTP, request a new one." });
            return;
        }

        const { expirationTime, OTP } = OTP_STORAGE[email];

        if (Date.now() > expirationTime) {
            res.status(410).json({ message: "OTP expired, try again later" });
            return
        }

        if (OTP != enteredOTP) {
            res.status(400).json({ message: "Wrong OTP" });
            return;
        }


        delete OTP_STORAGE[email];
        let keyId = "9210abf84eb0c263f78170b6c5092a54dbdc62af5fe27f27bda2f9a76b26";

        if (process.env.OTP_KEY) {
            keyId = crypto
                .createHmac("sha256", process.env.OTP_KEY)
                .update(id)
                .digest("hex");
        }


        res.status(202).json({ message: "OTP verified", keyId: keyId });

    } catch (error) {
        res.status(500).json({ error: error });
    }




}


export async function handleChangePasscode(req: Request, res: Response): Promise<void> {

    const { candidateId, newPassword } = req.body;

    if (!candidateId || candidateId == "") {
        res.status(404).json({ error: "Invalid Id" });
        return;

    }
    if (!newPassword || newPassword == "") {
        res.status(404).json({ error: "Password required" });
        return;
    }

    try {

        const candidate: any = await studentDoc.findOne({ _id: candidateId });
        if (!candidate || candidate == "") {
            res.status(404).json({ error: "failed to change Password" });
            return;
        }
        const salting = candidate.salting;
        const newHashPassword = crypto.createHmac("sha256", salting).update(newPassword).digest("hex");


        // save new password to database after changing
        const updatedCandidate: any = await studentDoc.findByIdAndUpdate(
            candidateId,
            { password: newHashPassword },
            { new: true }
        );

        if (!updatedCandidate || updatedCandidate == "") {
            res.status(404).json({ error: "failed to change Password" });
            return;
        }

        res.status(202).json({ message: "Password Change successfully" });

    }
    catch (error) {
        res.status(505).json({ error: "Internal Error " });
    }


}


export async function handleStudentQuery(req: Request, res: Response) {
    try {

        const { name, email, message } = req.body;

        if (!email || !message) {
            res.status(404).json({ error: "query rejected!" });
            return;
        }

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // your own inbox
            subject: `Student Query from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            replyTo: email 
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(505).json({ error: "Failed to Send OTP" })
                return;
            }
        });

        res.status(202).json({ msg: "Query Sended Successfully!" });
    }
    catch (error) {
        res.status(505).json({ error });
    }
}



// ----------  Other Logic Functions   -------  //


function SaltedPassword(password: string) {

    const salt: string = crypto.randomBytes(30).toString("hex");

    const hashedPassword: string = crypto.createHmac("sha256", salt).update(password).digest("hex");

    return {
        hashedPassword,
        salt
    }

}

function GenerateOTP(email: string) {

    const OTP = Math.floor(Math.random() * 90000) + 10000;
    StoreOTPAndCleanUp(OTP, email);
    return OTP;
}

function StoreOTPAndCleanUp(OTP: number, email: string, defaultExpTime = 60000) {

    OTP_STORAGE[email] = {
        OTP: OTP,
        expirationTime: Date.now() + defaultExpTime

    };


    setTimeout(() => {

        delete OTP_STORAGE[email]

    }, defaultExpTime);

    return;
}