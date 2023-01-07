import { useReducer } from "react";
import { createContext } from "react";


const BookContext = createContext();


const bookReducer = (state, action) => {
    switch (action.type) {
        case "FETCH BOOKS":
            return {
                books: action.payload
            }
        case "ADD BOOK":
            return {
                books: [action.payload, ...state.books]
            }
        
        default:
            return state;
    }
}


export const BookContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(bookReducer, {
        books: null
    })

    return (
        <BookContext.Provider value={{...state, dispatch}}>
            { children }
        </BookContext.Provider>
    )
}



export default BookContext;