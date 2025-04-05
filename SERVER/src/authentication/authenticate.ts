import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


interface AuthRequest extends Request {
    user?: any;
}

export function GenerateToken(data: any) {

    if (!process.env.SECRET_KEY) return;

    const key = process.env.SECRET_KEY;
    const token = jwt.sign(data, key, { expiresIn: "1hr" });

    return token;
}

export async function ValidateToken(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { authName } = req.query;
    if (!authName) return;

    if (req.query.authName === "user") {
        const userAuth = req.cookies['userAuth-token'];
        const cookieName = 'adminAuth-token';
        tokenValidation(cookieName, userAuth, req, res, next);
    }
    if (req.query.authName === "admin") {
        const userAuth = req.cookies['adminAuth-token'];
        const cookieName = 'userAuth-token';
        tokenValidation(cookieName, userAuth, req, res, next);
    }





}


function tokenValidation(cookieName: string, userAuth: any, req: Request, res: Response, next: NextFunction) {
    if (!userAuth) {
        clearCookies(cookieName, req, res);
        res.status(404).json({ error: "Log in again", success: false });
        return;
    }
    const userEmail = userAuth.email;
    const token = typeof userAuth === "string" ? JSON.parse(userAuth).token : userAuth.token;
    const KEY = process.env.SECRET_KEY;

    if (!token || !KEY) {
        clearCookies(cookieName, req, res);
        res.status(404).json({ error: "Log in again", success: false });
        return;
    }

    try {
        jwt.verify(token, KEY, (error: any, decoded: any) => {
            if (error) {
                clearCookies(cookieName, req, res);
                res.status(403).json({ error: "Invalid token" });
                return;
            }
            if (userEmail != decoded.email) {
                clearCookies(cookieName, req, res);
                res.status(403).json({ error: "info mismatch" });
                return;
            }
            res.status(200).json({ data: userAuth, credientials: true });
            next();
        });

    }
    catch (error) {
        clearCookies(cookieName, req, res);
        res.status(505).json({ error: "Internal error !" });
    }
}

export function logoutUser(req: AuthRequest, res: Response, next: NextFunction) {
    const authName = req.query.authName;
    if (!authName) return;

    if (authName == "user") {
        const notCookie = "adminAuth-token";
        clearCookies(notCookie, req, res);
        res.status(200).json({ msg: "user logout successfull" });
        return;
    }
    if (authName == "admin") {
        const notCookie = "userAuth-token";
        clearCookies(notCookie, req, res);
        res.status(200).json({ msg: "admin logout successfull" });
        return;
    }



}

export function Authentication(req: AuthRequest, res: Response, next: NextFunction) {

    const token = req.headers["authorization"];
    if (!token) {
        res.status(403).json({ error: "Access Denied" });
        return;
    }

    const mainToken = token.split(" ")[1];

    const key = process.env.SECRET_KEY;
    if (!key) {
        res.status(404).json({ error: "failed internal issue" });
        return;
    }

    jwt.verify(mainToken, key, (error, decoded) => {
        if (error) {
            res.status(403).json({ error: "Invalid token" });
            return;
        }

        req.user = decoded;
        next();
    })


}



function clearCookies(cookieName: string, req: Request, res: Response) {
    if (req.cookies) {
        Object.keys(req.cookies).forEach(cookie => {
            if (cookie == cookieName) {
                return;
            }
            res.clearCookie(cookie, { path: "/" });


        });
    }

}