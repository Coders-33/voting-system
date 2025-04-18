import { useContext, createContext, ReactNode, useReducer, Dispatch, useEffect, useState } from "react"
import { BACKEND_URL, GetVotingTimings } from "../script/GetData";
import { clearCookies } from "../script/GetData";
type AuthContextProviderType = {
    children: ReactNode
}

export const ACTIONS = {

    SET_USER: 'SET_USER',
    SET_ADMIN: 'SET_ADMIN',
    REMOVE_ADMIN: 'REMOVE_ADMIN',
    REMOVE_USER: 'REMOVE_USER',

} as const;


type UserType = {
    userId: string;
    studentName: string;
    email: string;
    token: string;
}

type State = {

    user: UserType | null;
    admin: UserType | null;


}

type ACTIONS = {

    type: typeof ACTIONS[keyof typeof ACTIONS];
    payload?: UserType | null;
}


type UserContextType = {

    user: UserType | null;
    admin: UserType | null;
    dispatch: Dispatch<ACTIONS>
    setUserLoggedIn: any;
    setAdminLoggedIn: any;
    setAdminLoginStatus: (status: string) => void;
    setUserLoginStatus: (status: string) => void;
    START_TIME : number;
    END_TIME : number;
    MAX_TIME : number;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {

        throw new Error("context not there");
    }

    return context;

}

function Reducer(state: State, actions: ACTIONS) {

    switch (actions.type) {
        case ACTIONS.SET_USER:
            return { ...state, user: actions.payload || null }

        case ACTIONS.REMOVE_USER:
            return { ...state, user: null }

        case ACTIONS.SET_ADMIN:
            return { ...state, admin: actions.payload || null }

        case ACTIONS.REMOVE_ADMIN:
            return { ...state, admin: null }


        default: return state
    }


}


export function AuthContextProvider({ children }: AuthContextProviderType) {

    const [state, dispatch] = useReducer(Reducer, { user: null, admin: null });
    const [userLoggedIn, setUserLoggedIn] = useState<string>("FALSE");
    const [adminLoggedIn, setAdminLoggedIn] = useState<string>("FALSE");
    const [START_TIME, setSTART_TIME] = useState<number>(0);
    const [END_TIME, setEND_TIME] = useState<number>(0);
    const [MAX_TIME , setMAX_TIME] = useState<number>(0);


    useEffect(() => {

        GETVotingTimings();
        getUserLoginStatus();
        getAdminLoginStatus();

    }, []);


    useEffect(() => {

        async function CheckAndValidateUserToken() {

            // check by the server verify token 
            try {
                const response = await fetch(`${BACKEND_URL}/auth/validate-token/?authName=user`, {
                    method: "POST",
                    credentials: "include",


                });
                const result = await response.json();

                if (response.ok) {
                    setUserLoginStatus("TRUE");
                    dispatch({ type: ACTIONS.SET_USER, payload: result.data });

                }
                if (!response.ok) {
                    setUserLoginStatus("FALSE");
                    dispatch({ type: ACTIONS.REMOVE_USER });
                    clearCookies();


                }
            }
            catch (error) {
                console.log(error);
                setUserLoginStatus("FALSE");
                dispatch({ type: ACTIONS.REMOVE_USER });
                clearCookies();
            }

        }


        if (userLoggedIn == "TRUE") {
            CheckAndValidateUserToken();
        }




    }, [userLoggedIn]);


    useEffect(() => {

        async function CheckAndValidateAdminToken() {

            // check by the server verify token 
            try {
                const response = await fetch(`${BACKEND_URL}/auth/validate-token/?authName=admin`, {
                    method: "POST",
                    credentials: "include",


                });
                const result = await response.json();

                if (response.ok) {
                    setAdminLoginStatus("TRUE");
                    dispatch({ type: ACTIONS.SET_ADMIN, payload: result.data });

                }
                if (!response.ok) {
                    setAdminLoginStatus("FALSE");
                    dispatch({ type: ACTIONS.REMOVE_ADMIN });
                    clearCookies();


                }
            }
            catch (error) {
                console.log(error);
                setAdminLoginStatus("FALSE");
                dispatch({ type: ACTIONS.REMOVE_ADMIN });
                clearCookies();
            }

        }

        if (adminLoggedIn == "TRUE") {
            CheckAndValidateAdminToken();
        }

    }, [adminLoggedIn])


    function setUserLoginStatus(status: string) {
        localStorage.setItem("UserloggedIn", status);
    }

    function getUserLoginStatus() {
        const status = localStorage.getItem("UserloggedIn");
        if (status) {
            setUserLoggedIn(status);
        }



    }

    function setAdminLoginStatus(status: string) {
        localStorage.setItem("AdminloggedIn", status);
    }

    function getAdminLoginStatus() {
        const status = localStorage.getItem("AdminloggedIn");
        console.log("getting admine status", status);
        if (status) {
            setAdminLoggedIn(status);
        }

    }


    async function GETVotingTimings() {

        const data = await GetVotingTimings();
        const { cacheTime,  endingTimeStamps, startingTimeStamps } = data;

        setSTART_TIME(startingTimeStamps);
        setEND_TIME(endingTimeStamps);
        setMAX_TIME(cacheTime);

    }



    return (

        <AuthContext.Provider value={{ START_TIME , END_TIME, MAX_TIME,
            admin: state.admin, user: state.user, setUserLoggedIn,
            dispatch, setAdminLoginStatus, setUserLoginStatus, setAdminLoggedIn
        }} >
            {children}
        </AuthContext.Provider>
    )

}