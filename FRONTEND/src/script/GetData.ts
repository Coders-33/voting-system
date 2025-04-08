
// for all device that are in current network
export const BACKEND_URL = "http://192.168.1.5:5000";

// only for the system 
// export const BACKEND_URL = "http://localhost:5000";

import { ChartData } from "chart.js";

export let cacheTime: any = 0;
export let startingTime: any = 0;
export let endingTime: any = 0;



export const maxTime = 1741885245406 + 0.6 * 60 * 60 * 1000;


export type VotesType = {
  studentId: number;
  panelCode: string;
};


export async function GetVotingTimings() {


  let times;
  let startingTimeStamps = startingTime;
  let endingTimeStamps = endingTime;
  let differtime = startingTime + (endingTime - startingTime);

  try {
    const response = await fetch(`${BACKEND_URL}/admin/voting-times`, { method: "GET" });
    const result = await response.json();


    if (result.timings) {
      times = result.timings;
      startingTimeStamps = new Date(times.startingTime).getTime();
      endingTimeStamps = new Date(times.endingTime).getTime();

      differtime = startingTimeStamps + (endingTimeStamps - startingTimeStamps);
      cacheTime = differtime;
      startingTime = startingTimeStamps;
      endingTime = endingTimeStamps;
    }

    return { startingTimeStamps, endingTimeStamps, cacheTime };


  }
  catch (error) {
    return { startingTimeStamps, endingTimeStamps, cacheTime };
  }

}

export async function EndVotings(): Promise<any> {
  try {

    cacheTime = 0;
    startingTime = 0;

    const res = await fetch(`${BACKEND_URL}/admin/end-voting`, { method: "POST" });
    if (res.ok) {

      return 'timings cleared!'
    }
    if (!res.ok) return 'failed to clear timings!'
  }
  catch (error) {
    return 'failed to clear timings!'
  }
}


export function clearCookies() {
  document.cookie.split(";").forEach(cookie => {
    let name = cookie.split("=")[0].trim();
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  });

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

export const commonResponses = {
  "How to vote?": "Find the voting page under the 'Vote Now' section on the homepage.",

  "Can I change my vote after submission?": "Votes can't be changed once submitted.",
  "What should I do if I face issues while voting?": "Try refreshing the page. Contact support if needed.",
  "Can I vote using my mobile phone?": "Yes, you can vote on mobile.",

  "Reset password": "Click 'Forgot Password' on the login page to reset via email.",

  "What if I don't receive the password reset email?": "Check your spam folder if you don't see the reset email.",
  "Can I use my old password again?": "You can't reuse your old password after resetting it.",
  "How long does it take to reset a password?": "Password reset takes a few minutes. Wait for 10 minutes before retrying.",
  "Is there a way to recover my account without an email?": "Account recovery is only possible through email.",

  "Registration issue": "Make sure you are using your college email ID to register.",

  "Why is my email not being accepted during registration?": "Ensure your email is in the correct format and a valid college email.",
  "What documents are required for registration?": "Documents required: student ID and college email. Check registration page.",
  "Can I edit my details after registering?": "Yes, you can edit your registration details later.",
  "What should I do if I receive an error while registering?": "Make sure all fields are filled and meet registration criteria.",
  "How can I verify if my registration was successful?": "Check your email for confirmation. Look in your spam folder if not received.",

  "Hello": "Hello! How can I help you today?",

  "How can you help me?": "I can help with voting, registration, and general support.",
  "What kind of support do you provide?": "I provide help with voting, passwords, registration, and more.",
  "Can I talk to a human representative?": "You can talk to a human representative if needed.",
  "What are the support hours?": "Support hours are from 9 AM to 6 PM, Monday to Friday.",
  "Is there a phone number for support?": "We don't have phone support, but you can reach us by email.",

  "Bye": "Goodbye! Have a great day!",

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


export async function fetchCountofStudents(): Promise<number> {

  let count: number = 0;

  try {

    const response = await fetch(`${BACKEND_URL}/accounts/students-count`);

    const result = await response.json();
    if (result.studentsCount) {
      count = result.studentsCount;
      return count;
    }

    return count;
  }
  catch (error: any) {
    throw new Error(error);
  }


}

export async function fetchCountofVotedStudents() {
  let count: number = 0;

  try {

    const response = await fetch(`${BACKEND_URL}/votes/voted-students`);

    const result = await response.json();
    if (result.votedStudentsCount) {
      count = result.votedStudentsCount;
      return count;
    }

    return count;
  }
  catch (error: any) {
    throw new Error(error);
  }
}


export function ChartOptions(parties: any, partiesColor: any, votes: any, studentVotes: any) {

  const barData: ChartData<"bar"> = {
    labels: parties,
    datasets: [
      {
        label: "Votes",
        data: votes,
        backgroundColor: partiesColor,
      },
    ],
  };


  const barOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };


  const pieData: ChartData<"pie"> = {
    labels: Object.keys(studentVotes),
    datasets: [
      {
        label: 'Votes by Party',
        data: Object.values(studentVotes),
        backgroundColor: ['#3b82f6', '#facc15', '#a855f7', '#ef4444'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        font: {
          size: 18,
        },
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold' as const,
          size: 14,
        },
      },
    },
  };

  return { barData , pieData , barOptions , pieOptions }

}