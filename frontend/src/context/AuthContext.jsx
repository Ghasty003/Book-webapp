import { createContext } from "react";



const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    

    return (
        <AuthContext.Provider>
            { children }
        </AuthContext.Provider>
    )
}


export default AuthContext;