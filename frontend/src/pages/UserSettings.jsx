import React, { useContext, useState } from 'react';
import TopNav from '../components/TopNav';
import AuthContext from '../context/AuthContext';
import { FaUser } from "react-icons/fa";
import { BsKeyFill } from "react-icons/bs";
import { MdEmail, MdDelete } from "react-icons/md";

const Lists =  ({ text, index, setResponse }) => {

    const { user, dispatch } = useContext(AuthContext);

    const handleClick = async () => {
        if (index == 3) {
           const response = await deleteUser();
           console.log(response);
           setResponse(response);
           setTimeout(() => {
            localStorage.removeItem("user");
            dispatch({type: "LOGOUT"});
           }, 2000);
        }
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

    return (
        <div className='flex items-center gap-2'>
            {index == 0 ? <FaUser size={20} /> : index == 1 ? <BsKeyFill size={20} /> : index == 2 ? <MdEmail size={20} /> : <MdDelete color='red' size={20} />}
            <li onClick={handleClick} index={index} className={`${index == 3 ? "text-red-600" : ""} cursor-pointer`}>{ text }</li>
        </div>
    )
}

function UserSettings() {

    const [response, setResponse] = useState("");

    const { user } = useContext(AuthContext);

    return (
        <div>
            <TopNav />
            
            <h1 className='text-center text-2xl font-bold mt-10'>Hi, {user.userName}</h1>

            <ul className='flex flex-col gap-6 ml-44 mt-14'>
                <Lists text="Change Username" index="0" />
                <Lists text="Change Password" index="1" />
                <Lists text="Change Email address" index="2" />
                <Lists setResponse={setResponse} text="Delete account" index="3" />
            </ul>

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