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
            const response = await fetch("https://book-webapp.onrender.com/api/books");
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

           <h1 className='text-center text-2xl font-bold mt-10'>All Books</h1>

          <div className='flex flex-wrap justify-around gap-4 items-center mt-10'>
            {
                books && books.map(book => (
                    <BookCard key={book._id} book={book} />
                ))
            }
          </div>
        </div>
    );
}

export default AdminHomePage;