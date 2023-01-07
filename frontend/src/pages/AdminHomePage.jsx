import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import BookCard from '../components/BookCard';
import Nav from '../components/Nav';
import BookContext from '../context/BookContext';

function AdminHomePage() {

    const { dispatch, books} = useContext(BookContext);


    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch("http://localhost:4000/api/books");
            const json = await response.json();

            if (!response.ok) {
                console.log(json.error)
            }

            if (response.ok) {
                dispatch({type: "FETCH BOOKS", payload: json})
            }
        }

        fetchBooks();
    }, [dispatch])

    return (
        <div>
           <Nav />

           {
            books && books.map(book => (
                <BookCard key={book._id} book={book} />
            ))
           }
        </div>
    );
}

export default AdminHomePage;