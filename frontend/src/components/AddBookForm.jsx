import React from 'react';
import { useState } from 'react';

function AddBookForm() {

    const [authorName, setAuthorName] = useState("");
    const [bookName, setBookName] = useState("");
    const [image, setImage] = useState("");
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='flex justify-center items-center py-16'>
            <div className='bg-primary  relative w-[400px] h-[450px] shadow-2xl flex flex-col items-center rounded-2xl p-5'>
                <h2>Register your account.</h2>
                <form className='w-full mt-4 relative' onSubmit={handleSubmit}>
                    <div className='flex justify-between z-0 items-center pr-3 relative w-[85%] m-auto border border-gray rounded-md my-4 overflow-hidden'>
                        <input className='w-[90%] outline-none p-2' type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} />
                    </div>

                    <div className='flex justify-between items-center pr-3 relative w-[85%] m-auto border border-gray rounded-md my-4 overflow-hidden'>
                        <input className='w-[90%] outline-none p-2' type="text" value={bookName} onChange={e => setBookName(e.target.value)} />
                    </div>

                    <div className='flex justify-between items-center pr-3 relative w-[85%] m-auto border border-gray rounded-md overflow-hidden'>
                        <input type="file" className='w-[90%] outline-none p-2' onChange={e => {}} />
                    </div>
                    
                    <div className='flex justify-center items-center my-6'>
                        <button className='bg-orange-400 text-white w-[200px] p-2 rounded-xl text-center'>Add Book</button>
                    </div>

                    {
                        err && (
                            <div className='text-white text-center my-5'>
                                { err }
                            </div>
                        )
                    }

                </form>
            </div>
        </div>
    );
}

export default AddBookForm;