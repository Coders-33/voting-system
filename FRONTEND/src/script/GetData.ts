export const BACKEND_URL  = "http://localhost:5000";


export let cacheTime : any = 0;
export let startingTime : any = 0;



export const maxTime = 1741885245406 + 0.6 * 60 * 60 * 1000;


export async function GetVotingTimings() { 

try {
   const response  = await fetch(`${BACKEND_URL}/votes/voting-times` , {  method : "GET"});
   const result = await response.json();
   if(response.ok) {
     const times  = result.timings;
     const startingTimeStamps = new Date(times.startingTime).getTime();
     const endingTimeStamps = new Date(times.endingTime).getTime();

     const differtime = startingTimeStamps + (endingTimeStamps - startingTimeStamps);
       cacheTime = differtime;
      startingTime = startingTimeStamps;
     return {startingTimeStamps , cacheTime};
   }

}
catch(error) { 
  return cacheTime;
}

}


export function ScrollToTheTop(behaviourType: any) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: behaviourType,
  });
}

export const commonQuestions = {
  Hello: [
    "How can you help me?",
    "What kind of support do you provide?",
    "Can I talk to a human representative?",
    "What are the support hours?",
    "Is there a phone number for support?",
  ],

  "How to vote?": [
    "Can I change my vote after submission?",
    "What should I do if I face issues while voting?",
    "Is there a deadline for voting?",
    "Can I vote using my mobile phone?",
  ],
  "Reset password": [
    "What if I don't receive the password reset email?",
    "Can I use my old password again?",
    "How long does it take to reset a password?",
    "Is there a way to recover my account without an email?",
  ],
  "Registration issue": [
    "Why is my email not being accepted during registration?",
    "What documents are required for registration?",
    "Can I edit my details after registering?",
    "What should I do if I receive an error while registering?",
    "How can I verify if my registration was successful?",
  ],
  Bye: [
    "Will you be here if I need more help?",
    "Can I come back later for support?",
    "How do I contact you again?",
    "Do you have any other support channels?",
    "Is there anything else I should know before leaving?",
  ],
  
};

export let generatedQuestions: string[] = [
  "How to vote?",
  "Reset password",
  "Registration issue",
  "Hello",
  "Bye",
];

export const commonResponses   = {
  "How to vote?": "Find the voting page under the 'Vote Now' section on the homepage.",
 
  "Can I change my vote after submission?": "Votes can't be changed once submitted.",
  "What should I do if I face issues while voting?": "Try refreshing the page. Contact support if needed.",
  "Is there a deadline for voting?": "The voting deadline is [insert date]. Be sure to vote before then.",
  "Can I vote using my mobile phone?": "Yes, you can vote on mobile.",
  
  "Reset password": "Click 'Forgot Password' on the login page to reset via email.",
  
  "What if I don't receive the password reset email?": "Check your spam folder if you don't see the reset email.",
  "Can I use my old password again?": "You can't reuse your old password after resetting it.",
  "How long does it take to reset a password?": "Password reset takes a few minutes. Wait for 10 minutes before retrying.",
  "Is there a way to recover my account without an email?": "Account recovery is only possible through email.",
  
  "Registration issue" :  "Make sure you are using your college email ID to register.",

  "Why is my email not being accepted during registration?": "Ensure your email is in the correct format and a valid college email.",
  "What documents are required for registration?": "Documents required: student ID and college email. Check registration page.",
  "Can I edit my details after registering?": "Yes, you can edit your registration details later.",
  "What should I do if I receive an error while registering?": "Make sure all fields are filled and meet registration criteria.",
  "How can I verify if my registration was successful?": "Check your email for confirmation. Look in your spam folder if not received.",
  
  "Hello" : "Hello! How can I help you today?",

  "How can you help me?": "I can help with voting, registration, and general support.",
  "What kind of support do you provide?": "I provide help with voting, passwords, registration, and more.",
  "Can I talk to a human representative?": "You can talk to a human representative if needed.",
  "What are the support hours?": "Support hours are from 9 AM to 6 PM, Monday to Friday.",
  "Is there a phone number for support?": "We don't have phone support, but you can reach us by email.",
  
  "Bye" : "Goodbye! Have a great day!", 

  "Will you be here if I need more help?": "I'll be here if you need help later.",
  "Can I come back later for support?": "Come back anytime for more support.",
  "How do I contact you again?": "Contact us again via the help page or contact form.",
  "Do you have any other support channels?": "We offer email, live chat, and help page support.",
  "Is there anything else I should know before leaving?": "Check the FAQ for more self-help info."
};

export function GenerateRelaventQuestion(question: string) {
  
  let newQuestions = Object.entries(commonQuestions)
  .map(([key, value]) => (key === question ? value : null))
  .filter((item) => item != null);


  const [suggestedQuestions] = newQuestions;

  return suggestedQuestions;
}


export const President = [

{
  Name : "Harry",
  Position : 1,
  srcImage : "", 
},

{
  Name : "Gurminder",
  Position : 2,
  srcImage : "", 
},


{
  Name : "Diljit",
  Position : 3,
  srcImage : "", 
},

{ 
  Name : 'Bhupinder',
  Position : 4,
 srcImage : "",
}


]

export const VicePresident = [

  {
    Name : "Ravinder",
    Position : 1,
    srcImage : "", 
  },
  
  {
    Name : "Surjeet",
    Position : 2,
    srcImage : "", 
  },
  
  
  {
    Name : "Harjeet",
    Position : 3,
    srcImage : "", 
  },

  { 
    Name : 'Sahil',
    Position : 4,
   srcImage : "",
  }
  
  
]

export const GeneralSecretary = [

  {
    Name : "Kulvinder",
    Position : 1,
    srcImage : "", 
  },
  
  {
    Name : "Mankirat",
    Position : 2,
    srcImage : "", 
  },
  
  
  {
    Name : "Manjeet",
    Position : 3,
    srcImage : "", 
  },


  { 
    Name : 'Priyanshu',
    Position : 4,
   srcImage : "",
  }
  
  
]

export const JointSecretary = [

  {
    Name : "Rajat",
    Position : 1,
    srcImage : "", 
  },
  
  {
    Name : "Navneet",
    Position : 2,
    srcImage : "", 
  },
  
  
  {
    Name : "Karan",
    Position : 3,
    srcImage : "", 
  },
  
  { 
    Name : 'Gurpesh',
    Position : 4,
   srcImage : "",
  }
  
]