import React, { useContext, useEffect } from 'react';
import TopNav from '../components/TopNav';
import BookContext from "../context/BookContext";
import { IoMdAdd } from "react-icons/io";
import { MdDone } from "react-icons/md";

function Book({ book }) {

    const handleAdd = async () => {
       const authorName = book.authorName;
       const bookName = book.bookName;
       const image = book.image;

       const response = await fetch("http://localhost:4000/api/users/collection", {
        method: "POST",
        body: JSON.stringify({authorName, bookName, image}),
        headers: {
            "Content-Type": "application/json"
        }
       });

       const json = await response.json();

       if (!response.ok) {
        console.log(json.error);
       }

       if (response.ok) {
        console.log(json)
       }
    }

    return (
        <div className='flex flex-col justify-center w-56 items-center my-2 py-4 bg-primary rounded-lg drop-shadow-2xl text-white'>
            <button title='Add to collection' onClick={handleAdd} className='mb-3 text-white'><IoMdAdd size={25} /></button>
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

function UserHomePage() {

    const { books, dispatch:bookDispatch } = useContext(BookContext);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch("http://localhost:4000/api/books");
            const json = await response.json();

            if (!response.ok) {
                return console.log(json);
            }

            if (response.ok) {
                bookDispatch({type: "FETCH BOOKS", payload: json});
            }
        }

        fetchBooks();
    }, [bookDispatch]);

    return (
        <div>
           <TopNav />

           <h1 className='text-center text-2xl font-bold mt-10'>All Books</h1>

           <div className='flex flex-wrap justify-around gap-4 items-center mt-10'>
            {
                books && books.map(book => (
                    <Book key={book._id} book={book} />
                ))
            }
          </div>

          <div className='fixed bottom-8 border border-l-green-500 border-l-2 animate-bounce timing rounded-md py-3 px-6 left-[50%] -translate-x-[50%] flex items-center gap-2 bg-white shadow-2xl'>
            <div className='bg-green-500 rounded-full p-1 text-white'><MdDone /></div>
            <div>Book added to collection</div>
          </div>
        </div>
    );
}

export default UserHomePage;