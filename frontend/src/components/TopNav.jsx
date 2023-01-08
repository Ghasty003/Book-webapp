import React from 'react';
import { useContext } from 'react';
import AuthContext from "../context/AuthContext";

function TopNav() {

    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT"})
    }

    return (
        <nav className='bg-primary p-5'>
            <div className='flex justify-around items-center text-white'>
                <h1 className='text-xl'>Book Web</h1>
                <button onClick={handleLogout} className='bg-red-300 px-5 text-sm py-2 rounded-lg shadow-2xl drop-shadow-2xl duration-200 active:scale-90'>Logout</button>
            </div>
            
            <ul>

            </ul>
        </nav>
    );
}

export default TopNav;