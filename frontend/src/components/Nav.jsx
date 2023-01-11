import React from 'react';
import { useContext } from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const CustomLink = ({ to, children}) => {

    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return (
        <div className='relative mx-4'>
            <Link className='text-sm' to={to}>
                { children }
            </Link>
           {
            isActive ?  <div className='w-full h-[3px] bg-[#385ae0] absolute rounded-md -bottom-2'></div> : ""
           }
        </div>
    )
}

function Nav() {

    const { dispatch } = useContext(AuthContext);

    const handleLogout =  () => {
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT"})
    }

    return (
        <nav className='flex justify-between items-center py-5 px-10 bg-primary text-white'>
            <h2 className='text-xl'>Admin Control</h2>

            <ul className='flex'>
                <CustomLink to="/admin" children="Display Books" />
                <CustomLink to="/admin/addbooks" children="Add Books" />
                <CustomLink to="/admin/deletebooks" children="Delete Books" />
                <CustomLink to="/admin/allusers" children="Display Users" />
            </ul>

            <button onClick={handleLogout} className='bg-red-300 px-5 py-2 rounded-lg shadow-2xl drop-shadow-2xl duration-200 active:scale-90'>Logout</button>
        </nav>
    );
}

export default Nav;