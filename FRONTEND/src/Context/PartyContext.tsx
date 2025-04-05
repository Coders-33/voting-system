import { useContext, createContext, ReactNode } from "react"
import { BACKEND_URL } from "../script/GetData";
import { useAuthContext } from "./UserContext"

type PartyContextPayload = {

    fetchAllVotes: () => Promise<any>;
    fetchParties: () => Promise<any>;
    getPartyDetails: () => Promise<any>;
}




const partyContext = createContext<PartyContextPayload | undefined>(undefined);


export function usePartyContext() {
    const context = useContext(partyContext);
    if (!context) {
        throw new Error("the party context not avaiable");
    }
    return context;
}



export function PartyContextProvider({ children }: { children: ReactNode }) {

    const { user } = useAuthContext();

    async function fetchAllVotes() {
        try {
            const response = await fetch(`${BACKEND_URL}/votes/fetch-all-votes`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });
            const result = await response.json();

            if (response.ok) {
                return result.allVotes;
            } else {
                console.log(result.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchParties() {

        const response = await fetch(`${BACKEND_URL}/votes/get-all-parties`);

        const result = await response.json();
        if (response.ok) {
            return result.data;
        }

    }

    async function getPartyDetails() {

        const response = await fetch(`${BACKEND_URL}/votes/party-details`);

        const result = await response.json();
        if (response.ok) {
            return result.data;
        }

    }


    return (
        <partyContext.Provider value={{ fetchAllVotes, fetchParties, getPartyDetails }}>
            {children}
        </partyContext.Provider>
    )

}
