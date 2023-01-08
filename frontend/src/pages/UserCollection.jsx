import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import TopNav from '../components/TopNav';
import UserCollectionContext from '../context/UserCollectionContext';
import { FiDelete } from "react-icons/fi";


function Book({ book }) {

    return (
        <div className='flex flex-col justify-center w-56 items-center my-2 py-4 bg-primary rounded-lg drop-shadow-2xl text-white'>
            <button title='Remove from collection' className='mb-3 text-white'><FiDelete size={25} /></button>
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


function UserCollection() {

    const { userCollection:books, setUserCollection } = useContext(UserCollectionContext);

    useEffect(() => {
        const fetchUserBooks = async () => {
            const response = await fetch("http://localhost:4000/api/users/collection");
            const json = await response.json();

            if (!response.ok) {
                return console.log(json.error)
            }

            if (response.ok) {
                setUserCollection(json);
            }
        }

        fetchUserBooks();
    }, []);

    return (
        <div>
            <TopNav />

            <h1 className='text-center text-2xl font-bold mt-10'>Your collection</h1>

            <div className='flex flex-wrap justify-around gap-4 items-center mt-10'>
            {
                books && books.map(book => (
                    <Book key={book._id} book={book} />
                ))
            }
          </div>
            
        </div>
    );
}

export default UserCollection;