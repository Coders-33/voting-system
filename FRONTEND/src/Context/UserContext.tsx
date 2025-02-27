import { useContext, createContext, ReactNode, useReducer, Dispatch, useEffect } from "react"
import { BACKEND_URL } from "../script/GetData";

type AuthContextProviderType = {
    children: ReactNode
}

export const ACTIONS = {

    SET_USER: 'set',
    REMOVE_USER: 'remove',

} as const;


type UserType = {
    email: string;
    token: string;
}

type State = {

    user: UserType | null;
    logout: boolean;
}

type ACTIONS = {

    type: typeof ACTIONS[keyof typeof ACTIONS];
    payload?: UserType | null;
}


type UserContextType = {

    user: UserType | null;
    dispatch: Dispatch<ACTIONS>
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
            return { ...state, user: actions.payload || null, logout: false }

        case ACTIONS.REMOVE_USER:
            return { ...state, user: null, logout: true }

        default: return state
    }


}


export function AuthContextProvider({ children }: AuthContextProviderType) {

    const [state, dispatch] = useReducer(Reducer, { user: null, logout: false });


    useEffect(() => {

        async function CheckToken() {

            const token = localStorage.getItem("user-token");
            if (token) {


                try {

                    const response = await fetch(`${BACKEND_URL}/validate-token`, {

                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: token

                    });
                    const result = await response.json();
                    if (response.ok) {
                        const parsedToken = JSON.parse(token);
                        dispatch({ type: ACTIONS.SET_USER, payload: parsedToken });
                    }
                    if (!response.ok) {
                        localStorage.removeItem("user-token");
                        dispatch({ type: ACTIONS.REMOVE_USER });
                    }

                }
                catch (error) {
                    console.log(error)
                    dispatch({ type: ACTIONS.REMOVE_USER });
                }

            }


        }

        CheckToken();


        const handleStorageChange = (event : StorageEvent) => {
            if (event.key === "email" || event.key === "token") {
              localStorage.removeItem("user-token");
            }
          };
      
          window.addEventListener("storage", handleStorageChange);
          return () => {
            window.removeEventListener("storage", handleStorageChange);
          };

    }, [])


    return (

        <AuthContext.Provider value={{ user: state.user, dispatch }} >
            {children}
        </AuthContext.Provider>
    )

}