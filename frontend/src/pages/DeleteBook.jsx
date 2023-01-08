import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Nav from '../components/Nav';
import BookContext from '../context/BookContext';
import { FcSearch } from "react-icons/fc";

const Book = ({ book }) => {
    return (
        <div className='flex w-56 items-center my-2 py-4 bg-primary rounded-lg drop-shadow-2xl text-white'>
            <img className='w-20 mx-3 h-20 object-contain drop-shadow-2xl' src={ book.image } alt="book" />
            <div>
                <p className='font-bold text-lg'>{ book.authorName }</p>
                <p className='text-sm whitespace-nowrap'>{ book.bookName }</p>
            </div>
        </div>
    )
}

function DeleteBook() {

    const [query, setQuery] = useState("");

    const [bookQuery, setBookQuery] = useState([]);

    const { books } = useContext(BookContext);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const deletebook = books.filter(book => {
            return book.bookName === "the nights"
        });

        setBookQuery(deletebook);
    }

    return (
        <div>
            <Nav />

            <h1 className='text-center text-2xl font-bold mt-10'>Search for books to delete.</h1>

            <div className='mt-10'>
                <form onSubmit={handleSubmit} className='flex items-center justify-center gap-2 bg-primary w-80 p-4 rounded-lg mx-auto'>
                    <input className='outline-none border-none rounded px-2 py-1' placeholder='Search by book name...' type="text" value={query} onChange={e => setQuery(e.target.value)} />
                    <button><FcSearch size={23} /></button>
                </form>

                <div className='flex flex-wrap justify-around gap-2 mt-8'>
                    {
                        bookQuery && bookQuery.map(book => (
                            <Book key={book._id} book={book} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default DeleteBook;