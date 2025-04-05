import { Schema, model } from "mongoose";

const adminSchema = new Schema({

    adminName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,

    },

    salting: {
        type: String,
    },



}, { timestamps: true });



const partySchema = new Schema({

    partyName: {
        type: String,
        required: true,
        unique: true
    },

    partyColor: {
        type: String,
        required: true
    },

    CandiateNames: {
        type: [String],
        required: true
    },

    panelCode: {
        type: String,
        required: true,
        unique: true

    },


}, { timestamps: true })

const adminAccountDoc = model("adminAccount", adminSchema);
const partyListDoc = model("parties", partySchema);


export { adminAccountDoc, partyListDoc }