import React from 'react';

function BookCard({ book }) {
    return (
        <div className='flex items-center gap-2'>
            <img className='w-20' src={ book.image } alt="book" />
            <div>
                <p className='font-bold text-lg'>{ book.authorName }</p>
                <p>{ book.bookName }</p>
            </div>
        </div>
    );
}

export default BookCard;