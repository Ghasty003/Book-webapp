import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEyeOff, FiUser } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const { dispatch } = useContext(AuthContext);

    const [seePass, setSeePass] = useState(false);
    const [err, setErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const passwordInput = useRef("");
    const emailInput = useRef("");
    const usernameInput = useRef("");
    const p0 = useRef("");
    const p1 = useRef("");
    const p2 = useRef("");

    const seePassword = () => {
        setSeePass(true);
        passwordInput.current.type = "text";
    }

    const hidePassword = () => {
        setSeePass(false);
        passwordInput.current.type = "password";
    }

    useEffect(() => {

        p2.current.addEventListener("click", () => {
            passwordInput.current.focus();
        });

        p1.current.addEventListener("click", () => {
            emailInput.current.focus();
        })

        p0.current.addEventListener("click", () => {
            usernameInput.current.focus();
        })

        const input = document.querySelectorAll("input:not(#file)");
        input.forEach((ele, index) => {
            ele.addEventListener("focus", () => {
                if (index === 0) {
                    if(p0.current.classList.contains("top-1")) {
                        p0.current.classList.replace("top-1", "-top-1");
                        p0.current.classList.add("text-[10px]");
                    }
                }

                if (index === 1) {
                    if(p1.current.classList.contains("top-1")) {
                        p1.current.classList.replace("top-1", "-top-1");
                        p1.current.classList.add("text-[10px]");
                    }
                }

                if (index === 2) {
                    if(p2.current.classList.contains("top-1")) {
                        p2.current.classList.replace("top-1", "-top-1");
                        p2.current.classList.add("text-[10px]");
                    }
                }
            })

            ele.addEventListener("blur", () => {
                if(index === 0 && input[0].value == "" && p0.current.classList.contains("-top-1")) {
                    p0.current.classList.replace("-top-1", "top-1");
                    p0.current.classList.remove("text-[10px]");
                }

                if(index === 1 && input[1].value == "" && p1.current.classList.contains("-top-1")) {
                    p1.current.classList.replace("-top-1", "top-1");
                    p1.current.classList.remove("text-[10px]");
                }

                if(index === 2 && input[2].value == "" && p2.current.classList.contains("-top-1")) {
                    p2.current.classList.replace("-top-1", "top-1");
                    p2.current.classList.remove("text-[10px]");
                }
            });
        })
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await fetch("https://book-webapp.onrender.com/api/users/signup", {
            method: "POST",
            body: JSON.stringify({email, password, userName}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();

        if (!response.ok) {
            console.log(json.error)
            setErr(json.error)
            setIsLoading(false);
        }

        if (response.ok) {
            setEmail("");
            setPassword("");
            setUserName("");
            setErr("");
            setIsLoading(false);

            dispatch({type: "LOGIN", payload: json});
            localStorage.setItem("user", JSON.stringify(json));
        }
    }

    return (
        <div className='flex justify-center items-center py-16'>
            <div className='bg-primary relative mobile:w-80 sm:w-[400px] h-[450px] shadow-2xl flex flex-col items-center rounded-2xl p-5'>
                <h2 className='text-white text-xl'>Register your account.</h2>
                <form className='w-full mt-4 relative' onSubmit={handleRegister}>
                    <div className='flex justify-between z-0 items-center pr-3 relative w-[85%] m-auto border border-gray rounded-md my-4 overflow-hidden'>
                        <input ref={usernameInput} className='w-[90%] outline-none p-2' type="text" required value={userName} onChange={e => setUserName(e.target.value)} />
                        <p ref={p0} className='absolute z-40 top-1 text-gray-500 text- left-3'>Username</p>
                        <FiUser color='white' />
                    </div>
                    <div className='flex justify-between items-center pr-3 relative w-[85%] m-auto border border-gray rounded-md my-4 overflow-hidden'>
                        <input ref={emailInput} className='w-[90%] outline-none p-2' type="text" required value={email} onChange={e => setEmail(e.target.value)} />
                        <p ref={p1} className='absolute top-1 text-gray-500 bg-white left-3'>Email</p>
                        <AiOutlineMail color='white' />
                    </div>

                    <div className='flex justify-between items-center pr-3 relative w-[85%] m-auto border border-gray rounded-md overflow-hidden'>
                        <input type="password" className='w-[90%] outline-none p-2' ref={passwordInput} required value={password} onChange={e => setPassword(e.target.value)} />
                        <p ref={p2} className='absolute top-1 text-gray-500 bg-white left-3'>Password</p>
                        { seePass ? <FiEyeOff color='white' className='cursor-pointer' onClick={hidePassword} />
                            : <IoEyeOutline color='white' className='cursor-pointer' onClick={seePassword} />
                        }
                    </div>
                    
                    <div className='flex justify-center items-center my-6'>
                        <button disabled={isLoading} className='bg-orange-400 text-white w-[200px] p-2 rounded-xl text-center'>{isLoading ? "Registering" : "Register" }</button>
                    </div>

                    {
                        err && (
                            <div className='text-white text-center my-5'>
                                { err }
                            </div>
                        )
                    }

                    <div className='text-center text-white text-sm'>
                        <p>Already have an account? <Link to="/login" className='text-orange-400 font-bold'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;