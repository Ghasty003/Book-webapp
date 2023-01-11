import React, { useContext, useState, useReducer } from 'react';
import TopNav from '../components/TopNav';
import AuthContext from '../context/AuthContext';
import { FaUser } from "react-icons/fa";
import { BsKeyFill } from "react-icons/bs";
import { MdEmail, MdDelete, MdOutlineFileDownloadDone, MdDone } from "react-icons/md";

const formReducer = (state, action) => {
    switch (action.type) {
        case "USERNAME":
            return {
                username: true,
                password: false,
                email: false
            }

        case "PASSWORD":
            return {
                password: true,
                username: false,
                email: false
            }

        case "EMAIL":
            return {
                email: true,
                password: false,
                username: false
            }

        case "CLOSE":
            return {
                email: false,
                password: false,
                username: false
            }

        default:
            return state;
    }
}

function UserSettings() {

    const [response, setResponse] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const [state, formDispatch] = useReducer(formReducer, {
        username: false,
        email: false,
        password: false
    });

    const { user, dispatch } = useContext(AuthContext);

    const handleDelete = () => {
        setShowMessage(true);
    }

    function deleteUser() {
        return new Promise( async (resolve, reject) => {
         const response = await fetch("http://localhost:4000/api/users/"+ user.userId, {
             method: "DELETE"
         });
 
         const json = await response.json();
 
         if (!response.ok) {
             reject(json.error);
         }
 
         if (response.ok) {
             resolve("Account deleted successfully.");
         }
        })
     }

    const handleUsernameChange = async(e) => {
       e.preventDefault();

       const response = await fetch("http://localhost:4000/api/users/update/"+ user.userId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userName})
       });

       const json = await response.json();

       if (!response.ok) {
        console.log(json.error)
       }

       if (response.ok) {
        setMessage("LogIn again to see the reflection.");
        formDispatch({type: "CLOSE"});
        setIsDone(true);
        setTimeout(() => {
            setIsDone(false);
        }, 2000);
       }
    }

    const handleChangePassword = (e) => {
        e.preventDefault();

        console.log(password)
    }

    const handleChangeEmail = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/api/users/update/"+ user.userId, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        });

        const json = await response.json();

        if (!response.ok) {
            return console.log(json.error)
        }

        if (response.ok) {
            setMessage("Email changed successfully.");
            formDispatch({type: "CLOSE"});
            setIsDone(true);
            setTimeout(() => {
            setIsDone(false);
            }, 2000);
        }
    }

    return (
        <div>
            <TopNav />
            
            <h1 className='text-center text-2xl font-bold mt-10'>Hi, {user.userName}</h1>

            <ul className='flex flex-col p-4 w-fit m-auto items-start gap-6 mt-14'>
                <div>
                    <div className='flex items-center gap-2' onClick={() => formDispatch({type: "USERNAME"})}>
                        <FaUser size={20} />
                        <li className={`cursor-pointer`}>Change Username</li>
                    </div>
                    {
                        state.username && (
                            <form onSubmit={handleUsernameChange} className='flex gap-2 bg-primary w-80 p-4 rounded-lg mt-5'>
                                <input className='outline-none border-none rounded px-2 py-1' placeholder='Enter new username...'
                                 value={userName} onChange={e => setUserName(e.target.value)} />
                                <button title='Done'><MdOutlineFileDownloadDone size={23} color="white" /></button>
                            </form>
                        )
                    }
                </div>

                <div>
                    <div className='flex items-center gap-2' onClick={() => formDispatch({type: "PASSWORD"})}>
                        <BsKeyFill size={20} />
                        <li className={`cursor-pointer`}>Change Password</li>
                    </div>
                    {
                        state.password && (
                            <form onSubmit={handleChangePassword} className='flex gap-2 bg-primary w-80 p-4 rounded-lg mt-5'>
                                <input className='outline-none border-none rounded px-2 py-1' placeholder='Enter new password...'
                                value={password} onChange={e => setPassword(e.target.value)} />
                                <button title='Done'><MdOutlineFileDownloadDone size={23} color="white" /></button>
                            </form>
                        )
                    }
                </div>

                <div>
                   <div className='flex items-center gap-2' onClick={() => formDispatch({type: "EMAIL"})}>
                        <MdEmail size={20} />
                        <li className={`cursor-pointer`}>Change Email Address</li>
                   </div>
                   {
                        state.email && (
                            <form onSubmit={handleChangeEmail} className='flex gap-2 bg-primary w-80 p-4 rounded-lg mt-5'>
                                <input className='outline-none border-none rounded px-2 py-1' placeholder='Enter new email...'
                                value={email} onChange={e => setEmail(e.target.value)} type="email" />
                                <button title='Done'><MdOutlineFileDownloadDone size={23} color="white" /></button>
                            </form>
                        )
                    }
                </div>

                <div className='flex items-center gap-2'>
                    <MdDelete color='red' size={20} />
                    <li onClick={handleDelete} className={`cursor-pointer text-red-600`}>Delete account</li>
                </div>
            </ul>

           {
            showMessage && (
                <div className='fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-center bg-yellow-100 py-6 px-10 shadow-xl rounded-lg'>
                    <h2 className='font-bold text-xl my-4'>Are you sure you want to delete account?</h2>
                    <p className='my-2 font-bold'>This action is irreversible</p>
                    <div className='flex gap-4 justify-end mt-4'>
                        <button onClick={async () => {
                            const response = await deleteUser();
                            setResponse(response);
                            setShowMessage(false);
                            setTimeout(() => {
                            localStorage.removeItem("user");
                            dispatch({type: "LOGOUT"});
                            }, 2000);
                        }} className='bg-red-300 text-white py-1 px-6 rounded-lg'>Yes</button>
                        
                        <button onClick={() => setShowMessage(false)}>Cancel</button>
                    </div>
                </div>
            )
           }

        {
            isDone && (
                <div className='fixed bottom-8 border border-l-green-500 border-l-2 animate-bounce timing rounded-md py-3 px-6 left-[50%] -translate-x-[50%] flex items-center gap-2 bg-white shadow-2xl'>
                    <div className='bg-green-500 rounded-full p-1 text-white'><MdDone /></div>
                    <div>{ message }</div>
                </div>
            )
          }

            {
            response && (
                <div className='fixed bottom-8 border border-l-red-500 border-l-2 animate-bounce timing rounded-md py-3 px-6 left-[50%] -translate-x-[50%] flex items-center gap-2 bg-white shadow-2xl'>
                    <div className='bg-red-500 rounded-full p-1 text-white'><MdDelete /></div>
                    <div>{ response }</div>
                </div>
            )
          }
        </div>
    );
}

export default UserSettings;