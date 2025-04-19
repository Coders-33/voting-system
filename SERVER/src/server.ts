import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import http from "http";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
dotenv.config();

// Routes
import StudentRoute from "./routes/student";
import AuthRoute from "./routes/auth";
import VotingRoute from "./routes/voting";
import AdminRoute from "./routes/admin";

// This is for mail to the other students and user
export const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },

});


const localurl = process.env.LOCAL_URL;
const networkurl = process.env.NETWORK_URL;
let allowedOrigins: any = [];
if (localurl || networkurl) {
    allowedOrigins = [localurl, networkurl];
}


function createAndStartServer() {

    const PORT = process.env.PORT;
    const NETWORK_PORT: any = process.env.NETWORK_PORT;
    const app = express();
    const server = http.createServer(app);





    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }))




    app.use("/auth", AuthRoute);
    app.use("/accounts", StudentRoute);
    app.use("/votes", VotingRoute);
    app.use("/admin", AdminRoute)





    server.listen(PORT, NETWORK_PORT, async () => {

        try {
            await connect("mongodb://127.0.0.1:27017/VotingSystem");
            console.log(`Mongodb Connected And Server running at   http://0.0.0.0:${PORT}`);
        }
        catch (error) {
            console.log("Database connection error : ", error);
        }
    });


}

createAndStartServer();