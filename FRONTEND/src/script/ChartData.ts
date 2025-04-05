import { VotesType } from "./GetData";

export interface PartyDataPayload {

    partyName: string;
    panelCode: string;
};



export function arrangeAllVotes(partyData: any, votesData: VotesType[]): any {



    let newVotes: number[] = [];
    for (let i = 0; i < partyData.length; i++) {
        newVotes.push(0);
    }


    votesData.forEach((each) => {
        const code = each.panelCode;

        checkForPresidentPost(partyData, code[0], newVotes);
        checkForVicePresidentPost(partyData, code[1], newVotes);
        checkForGeneralPost(partyData, code[2], newVotes);
        checkForJointSecretaryPost(partyData, code[3], newVotes);
    });


    return newVotes;


}




function checkForPresidentPost(partyData: PartyDataPayload[], vote: string, newVotes: any[]) {
    let presidentIndex = 0;
    partyData.forEach((each: any, index: number) => {
        const panelcode = each.panelCode;
        const item = panelcode[presidentIndex];
        if (item == vote) {
            newVotes[index] += 1;
            return;
        }
    })


}

function checkForVicePresidentPost(partyData: PartyDataPayload[], vote: string, newVotes: any[]) {
    let presidentIndex = 1;
    partyData.forEach((each: any, index: number) => {
        const panelcode = each.panelCode;
        const item = panelcode[presidentIndex];
        if (item == vote) {
            newVotes[index] += 1;
            return;
        }
    })

}

function checkForGeneralPost(partyData: PartyDataPayload[], vote: string, newVotes: any[]) {
    let presidentIndex = 2;
    partyData.forEach((each: any, index: number) => {
        const panelcode = each.panelCode;
        const item = panelcode[presidentIndex];
        if (item == vote) {
            newVotes[index] += 1;
            return;
        }
    })

}

function checkForJointSecretaryPost(partyData: PartyDataPayload[], vote: string, newVotes: any[]) {
    let presidentIndex = 3;
    partyData.forEach((each: any, index: number) => {
        const panelcode = each.panelCode;
        const item = panelcode[presidentIndex];
        if (item == vote) {
            newVotes[index] += 1;
            return;
        }
    })

}