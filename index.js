// const parties = [
//     {
//       partyName: 'CSF',
//       partyColor: '#ff0000',
//       CandiateNames: ['Manjeet', 'Kulvinder', 'Nitin', 'Yash'],
//       panelCode: '2131'
//     },
//     {
//       partyName: 'SOI',
//       partyColor: '#e1ff00',
//       CandiateNames: ['Diljit', 'Surjeet', 'Rajat', 'Amit'],
//       panelCode: '3444'
//     },
//     {
//       partyName: 'INSO',
//       partyColor: '#00ad2b',
//       CandiateNames: ['Harry', 'Gurpesh', 'Navneet', 'Harjeet'],
//       panelCode: '1322'
//     },
//     {
//       partyName: 'KCSU',
//       partyColor: '#00ff1e',
//       CandiateNames: ['Karan', 'Sumit', 'Priyanshu', 'Mankirat'],
//       panelCode: '4213'
//     }
//   ];

//   const votes = [
//     "3123",
//     "3311",
//     "2131",
//     "4412",
//     "3124",
//     "2231",
//     "1341",
//     "1312",
//     "3112"
//   ];

//   const positions = ['President', 'VicePresident', 'GeneralSecretary', 'JointSecretary'];

//   const candidateVotes = {};


//   positions.forEach((pos, index) => {
//     for (let i = 1; i <= 4; i++) {
//       candidateVotes[pos] = candidateVotes[pos] || {};
//       candidateVotes[pos][i] = { name: '', votes: 0 };
//     }
//   });

//   parties.forEach(party => {
//     const code = party.panelCode;
//     positions.forEach((pos, index) => {
//       const option = Number(code[index]);
//       const name = party.CandiateNames[index];
//       candidateVotes[pos][option].name = name;
//     });
//   });

//   votes.forEach(vote => {
//     vote.split('').forEach((num, index) => {
//       const pos = positions[index];
//       const option = Number(num);
//       if (candidateVotes[pos] && candidateVotes[pos][option]) {
//         candidateVotes[pos][option].votes++;
//       }
//     });
//   });




// const winners = {};

// positions.forEach(pos => {
//   let maxVotes = 0;
//   let winner = '';

//   for (let option in candidateVotes[pos]) {
//     const candidate = candidateVotes[pos][option];
//     if (candidate.votes > maxVotes) {
//       maxVotes = candidate.votes;
//       winner = candidate.name;
//     }
//   }

//   winners[pos] = { name: winner, votes: maxVotes };
// });

// console.log(winners); 

// { panelCode: '4213' }


const codes = [
  { panelCode: '2131' },
  { panelCode: '3444' },
  { panelCode: '1322' },
];

const testingcode = '4223';

let bug = '';


outerLoop:
for (const each of codes) {
  const panelCode = each.panelCode;

  for (let i = 0; i < panelCode.length; i++) {
    if (testingcode[i] == panelCode[i]) {
      bug = each;
      break outerLoop;
    }
  }
}

console.log(bug);


