import { createContext } from "react";


const BookContext = createContext();


const BookContextProvider = ({ children }) => {

    console.log("Book init")

    return (
        <BookContext.Provider value={{}}>
            { children }
        </BookContext.Provider>
    )
}



export default BookContext;