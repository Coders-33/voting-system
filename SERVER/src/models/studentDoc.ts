import { Schema, model } from "mongoose"


const CandidateSchema = new Schema({

    studentName: {
        type: String,
        required: true
    },
    studentId: {
        type: Number,
        unique : true,
        required: true
    },
    email: {
        type: String,
        unique : true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    salting: {
        type: String,
        required: true
    }



}, { timestamps: true });


export default model("StudentAccounts", CandidateSchema);