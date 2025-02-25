import express, { Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import http from "http";
import nodemailer from "nodemailer";
import  { connect } from "mongoose";
dotenv.config();

// Routes
import StudentRoute from "./routes/student";


export const transporter = nodemailer.createTransport({
     
    service : "gmail",
    
    auth :  { 
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASSWORD
    },
    
});




const PORT = process.env.PORT;
const NETWORK_PORT: any = process.env.NETWORK_PORT;
const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const io = new Server(server, {

    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true

    },
    maxHttpBufferSize: 1e8

})

app.use(cors({

    origin: "*",
    methods: ["GET", "POST"],
    credentials: true

}))

app.use("/socket.io", (req: Request, res: Response, next: Function) => {
    res.set("Cache-Control", "no-store")
    next();
})



app.use("/accounts" , StudentRoute);



server.listen(PORT, NETWORK_PORT, async () => {

    try {
        await connect("mongodb://127.0.0.1:27017/VotingSystem");
        console.log(`Mongodb Connected And Server running at   http://0.0.0.0:${PORT}`);
    }
    catch (error) {
        console.log("Database connection error : ", error);
    }
});

