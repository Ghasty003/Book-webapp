import React,  { useState } from 'react';
import avatar from '../assets/addAvatar.png';


function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) =>  {
            reject(error)
        }
    })
}

function AddBookForm() {

    const [authorName, setAuthorName] = useState("");
    const [bookName, setBookName] = useState("");
    const [image, setImage] = useState("");
    const [err, setErr] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImage(base64);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const response = await fetch("http://localhost:4000/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({authorName, bookName, image})
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            return setErr(json.error);
        }

        if (response.ok) {
           setIsUploaded(true);
           setAuthorName("");
           setBookName("");
           setImage("");
           setIsLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center py-16'>
            <div className='bg-primary  relative w-[400px] h-fit shadow-2xl flex flex-col items-center rounded-2xl p-5'>
                <h2 className='text-white text-xl'>Add New Book</h2>
                <form className='w-full mt-4 relative' onSubmit={handleSubmit}>
                    <div className='flex flex-col justify-center items-start gap-2 relative w-[85%] m-auto my-4'>
                        <label className='text-white' htmlFor="author">Author name</label>
                        <input id='author' className='w-full outline-none p-2 border-none rounded-xl' type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} />
                    </div>

                    <div className='flex flex-col justify-center items-start gap-2 relative w-[85%] m-auto my-4'>
                        <label className='text-white' htmlFor="book">Book name</label>
                        <input id='book' className='w-full outline-none p-2 border-none rounded-xl' type="text" value={bookName} onChange={e => setBookName(e.target.value)} />
                    </div>

                    <div>
                        <label className='flex flex-col items-center text-white cursor-pointer' htmlFor="image">
                            <img className='w-[60px]' src={image ||avatar} alt="choose image" />
                            <p>Choose book image</p>
                        </label>
                        <input id='image' type="file" className='hidden' onChange={e => handleUpload(e)} />
                    </div>

                    {
                        err && (
                            <div className='text-white text-center my-5'>
                                { err }
                            </div>
                        )
                    }

                    {
                        isUploaded && (
                            <div className='text-white text-center my-5'>
                                Upload successful
                            </div>
                        )
                    }
                    
                    <div className='flex justify-center items-center my-6'>
                        <button disabled={isLoading} className='bg-orange-400 text-white w-[200px] p-2 rounded-xl text-center'>
                            {isLoading ? "Loading..." : "Add Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddBookForm;