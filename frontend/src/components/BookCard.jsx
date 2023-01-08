import React from 'react';

function BookCard({ book }) {
    return (
        <div className='flex w-56 items-center my-2 py-4 bg-primary rounded-lg drop-shadow-2xl text-white'>
            <img className='w-20 mx-3 h-20 object-contain drop-shadow-2xl rounded-2xl' src={ book.image } alt="book" />
            <div>
                <p className='font-bold text-lg'>{ book.authorName }</p>
                <p className='text-sm whitespace-nowrap'>{ book.bookName }</p>
            </div>
        </div>
    );
}

export default BookCard;