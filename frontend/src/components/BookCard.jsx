import React from 'react';

function BookCard({ book }) {
    return (
        <div className='flex items-center gap-3 my-2 bg-primary p-5 rounded-lg drop-shadow-2xl text-white'>
            <img className='w-20' src={ book.image } alt="book" />
            <div>
                <p className='font-bold text-lg'>{ book.authorName }</p>
                <p>{ book.bookName }</p>
            </div>
        </div>
    );
}

export default BookCard;