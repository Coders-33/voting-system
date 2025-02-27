import {  Schema ,  model  } from "mongoose";


const votingSchema = new Schema({
     
studentId : { 
    type  : Number,
    required : true,
    unique : true,
},

panelCode : { 
    type  : String,
    required : true
}

} , { timestamps : true  });



export default  model("Votes" , votingSchema);