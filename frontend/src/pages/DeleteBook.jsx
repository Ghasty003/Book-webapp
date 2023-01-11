import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Nav from '../components/Nav';
import BookContext from '../context/BookContext';
import { FcSearch } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";

const Book = ({ book, setBookQuery, bookQuery }) => {

    const handleDelete = async () => {
        const response = await fetch("https://book-webapp.onrender.com/api/books/" + book._id , {
            method: "DELETE",
        });

        const json = await response.json();

        if (!response.ok) {
            console.log(json.error)
        }

        if (response.ok) {
            const newQuery = bookQuery.filter(q => q._id !== json._id);
            setBookQuery(newQuery);
            console.log(json)
            console.log("book deleted")
        }
    }

    return (
        <div className='flex flex-col justify-center w-56 items-center my-2 py-4 bg-primary rounded-lg drop-shadow-2xl text-white'>
            <button onClick={handleDelete} className='mb-3'><AiFillDelete size={25}color="yellow" /></button>
            <div className='flex items-center'>
                <img className='w-20 mx-3 h-20 object-contain drop-shadow-2xl' src={ book.image } alt="book" />
                <div>
                    <p className='font-bold text-lg'>{ book.authorName }</p>
                    <p className='text-sm whitespace-nowrap'>{ book.bookName }</p>
                </div>
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
            return book.bookName === query
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
                            <Book key={book._id} book={book} setBookQuery={setBookQuery} bookQuery={bookQuery} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default DeleteBook;