import React from 'react';
import { useContext } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import { BsFillBookFill, BsCollectionFill } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";


const CustomLink = ({ to, children }) => {

    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return (
        <div className='relative mx-4 text-xl px-4'>
            <div className='flex items-center gap-1'>
                { to === "/" ? <BsFillBookFill /> : to === "/collection" ? <BsCollectionFill /> : <RiUserSettingsLine />}
                <Link to={to}>
                    { children }
                </Link>
            </div>

            {
                isActive ? <div className='w-full h-[3px] bg-[#385ae0] absolute rounded-md -bottom-3'></div> : ""
            }
        </div>
    )
}

function TopNav() {

    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT"})
    }
    

    return (
        <nav className='bg-primary p-5'>
            <div className='flex justify-between px-8 items-center text-white'>
                <h1 className='text-xl'>Book Web</h1>
                <button onClick={handleLogout} className='bg-red-300 px-5 text-sm py-2 rounded-lg shadow-2xl drop-shadow-2xl duration-200 active:scale-90'>Logout</button>
            </div>

            <ul className='flex justify-around px-10 mt-10 text-white'>
                <CustomLink to="/" children="Library" />
                <CustomLink to="/collection" children="Collection" />
                <CustomLink to="/settings" children="Settings" />
            </ul>
        </nav>
    );
}

export default TopNav;