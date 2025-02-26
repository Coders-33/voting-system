import jwt from "jsonwebtoken";
import { Request, Response } from "express";

type TokenDataType = {
    email: string;
}

export function GenerateToken(data: TokenDataType) {

    // console.log(process.env.)
if(!process.env.SECRET_KEY)return;

    const key = process.env.SECRET_KEY;
    const token = jwt.sign(data, key, { expiresIn: "1hr" });

    return token;
}

export async function ValidateToken(req: Request, res: Response): Promise<void> {
    
    const { token, email } = req.body;

    console.log(token);
    if (!token || !email) {
        res.status(401).json({ message: "Access Denied" });
        return;
    }

    const tokenKey = process.env.SECRET_KEY;

    console.log(tokenKey);
    if (!tokenKey) {
        res.status(500).json({ message: "Server error: Secret key is missing" });
        return;
    }

    try {
        const decoded =  jwt.verify(token, tokenKey);
        res.status(200).json({ message: "Token is valid", decoded });
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }

}





export function Authentication() {


}