import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Nav from '../components/Nav';
import BookContext from '../context/BookContext';

function DeleteBook() {

    const [query, setQuery] = useState("");

    const { books } = useContext(BookContext);

    const deletebook = books.filter(book => {
        return book.bookName === query
    });

    return (
        <div>
            <Nav />

            <h1 className='text-center text-2xl font-bold mt-10'>Search for books to delete.</h1>

            <form className='mt-10 flex items-center justify-center bg-primary w-80 p-4 rounded-lg mx-auto'>
                <input className='outline-none border-none rounded px-2 py-1' type="text" value={query} onChange={e => setQuery(e.target.value)} />
                <button>search</button>
            </form>
        </div>
    );
}

export default DeleteBook;