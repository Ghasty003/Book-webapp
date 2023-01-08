import { useState } from "react";
import { createContext } from "react";


const UserCollectionContext = createContext();


export const UserCollectionContextProvider = ({ children }) => {

    const [userCollection, setUserCollection] = useState([]);

    return (
        <UserCollectionContext.Provider value={{userCollection, setUserCollection}}>
            { children }
        </UserCollectionContext.Provider>
    )
}



export default UserCollectionContext;