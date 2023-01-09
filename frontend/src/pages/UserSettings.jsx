import React, { useContext } from 'react';
import TopNav from '../components/TopNav';
import AuthContext from '../context/AuthContext';
import { FaUser } from "react-icons/fa";
import { BsKeyFill } from "react-icons/bs";
import { MdEmail, MdDelete } from "react-icons/md";

const Lists = ({ text, index }) => {

    const handleClick = () => {
        
    }

    return (
        <div className='flex items-center gap-2'>
            {index == 0 ? <FaUser size={20} /> : index == 1 ? <BsKeyFill size={20} /> : index == 2 ? <MdEmail size={20} /> : <MdDelete color='red' size={20} />}
            <li onClick={handleClick} index={index} className={`${index == 3 ? "text-red-600" : ""} cursor-pointer`}>{ text }</li>
        </div>
    )
}

function UserSettings() {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <TopNav />
            
            <h1 className='text-center text-2xl font-bold mt-10'>Hi, {user.userName}</h1>

            <ul className='flex flex-col gap-6 ml-44 mt-14'>
                <Lists text="Change Username" index="0" />
                <Lists text="Change Password" index="1" />
                <Lists text="Change Email address" index="2" />
                <Lists text="Delete account" index="3" />
            </ul>
        </div>
    );
}

export default UserSettings;