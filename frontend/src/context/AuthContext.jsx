import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";


const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            }

        case "LOGOUT":
            return {
                user: null
            }

        default:
            return state;
    }
}


const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            dispatch({type: "LOGIN", payload: user});
        }
    }, []);

    // console.log(state.user)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}


export default AuthContext;