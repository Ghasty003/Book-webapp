import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaTimes, FaBars } from "react-icons/fa";

const CustomLink = ({ to, children}) => {

    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return (
        <div className='relative mx-4'>
            <Link className='text-sm mobile:text-base' to={to}>
                { children }
            </Link>
           {
            isActive ?  <div className='w-full h-[3px] mobile:hidden bg-[#385ae0] absolute rounded-md -bottom-2'></div> : ""
           }
        </div>
    )
}

function Nav() {

    const { dispatch } = useContext(AuthContext);

    const div = useRef("");
    const open = useRef("");

    const handleLogout =  () => {
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT"})
    }

    const navBarSlideIn = [
        {left: "0%", opacity: 1},
        {left: "-50%", opacity: 0}
    ]

    const navBarSlideOut = [
        {left: "-50%", opacity: 0},
        {left: 0, opacity: 1}
    ]

    const navBarAnimationOption = {
        duration: 300,
        iterations: 1
    }

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (!div.current.contains(e.target) && 
                !div.current.classList.contains("mobile:-left-1/2")
                && !open.current.contains(e.target)
            ) {
                div.current.animate(navBarSlideIn, navBarAnimationOption);
                div.current.classList.add("mobile:-left-1/2");
            }
        })
    }, []);

    const closeNav = () => {
        div.current.animate(navBarSlideIn, navBarAnimationOption);
        div.current.classList.add("mobile:-left-1/2");
    }

    const openNav = () => {
        div.current.animate(navBarSlideOut, navBarAnimationOption);
        div.current.classList.replace("mobile:-left-1/2", "mobile:left-0");
    }

    return (
        <nav className='flex relative gap-10 items-center py-5 px-10 bg-primary text-white'>
            <h2 className='text-xl relative z-0'>Admin Control</h2>

            <button ref={open} onClick={openNav} className='absolute right-10 hidden mobile:block'><FaBars size={25} /></button>

            <div ref={div} className='flex justify-around lg:w-4/5 items-center mobile:-left-1/2 mobile:fixed mobile:top-0 mobile:bg-primary 
                mobile:flex-col mobile:z-10 mobile:h-screen mobile:justify-center 
                mobile:items-start mobile:pl-5 mobile:w-1/2 mobile:drop-shadow-2xl'>

                    <button onClick={closeNav} className='absolute right-10 top-16 hidden mobile:block'><FaTimes size={25} /></button>

                <ul className='flex mobile:flex-col mobile:gap-8'>
                    <CustomLink to="/admin" children="Display Books" />
                    <CustomLink to="/admin/addbooks" children="Add Books" />
                    <CustomLink to="/admin/deletebooks" children="Delete Books" />
                    <CustomLink to="/admin/allusers" children="Display Users" />
                </ul>

                <button onClick={handleLogout} 
                    className='bg-red-300 px-5 py-2 rounded-lg shadow-2xl drop-shadow-2xl duration-200 active:scale-90
                    mobile:absolute mobile:bottom-10'>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Nav;