import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { dispatch } = useContext(AuthContext);

    const [seePass, setSeePass] = useState(false);
    const [err, setErr] = useState(false);
    const passwordInput = useRef("");
    const emailInput = useRef("");
    const usernameInput = useRef("");
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

        const input = document.querySelectorAll("input:not(#file)");
        input.forEach((ele, index) => {
            ele.addEventListener("focus", () => {

                if (index === 0) {
                    if(p1.current.classList.contains("top-1")) {
                        p1.current.classList.replace("top-1", "-top-1");
                        p1.current.classList.add("text-[10px]");
                    }
                }

                if (index === 1) {
                    if(p2.current.classList.contains("top-1")) {
                        p2.current.classList.replace("top-1", "-top-1");
                        p2.current.classList.add("text-[10px]");
                    }
                }
            })

            ele.addEventListener("blur", () => {

                if(index === 0 && input[0].value == "" && p1.current.classList.contains("-top-1")) {
                    p1.current.classList.replace("-top-1", "top-1");
                    p1.current.classList.remove("text-[10px]");
                }

                if(index === 1&& input[1].value == "" && p2.current.classList.contains("-top-1")) {
                    p2.current.classList.replace("-top-1", "top-1");
                    p2.current.classList.remove("text-[10px]");
                }
            });
        })
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:4000/api/users/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();

        if (!response.ok) {
            console.log(json.error)
            return setErr(json.error)
        }

        if (response.ok) {
            setEmail("");
            setPassword("");
            setErr("");

            dispatch({type: "LOGIN", payload: json});
            localStorage.setItem("user", JSON.stringify(json));
            console.log(json)
        }
    }

    return (
        <div className='flex justify-center items-center py-16'>
            <div className='bg-primary  relative w-[400px] h-[400px] shadow-2xl flex flex-col items-center rounded-2xl p-5'>
                <h2>Login to your account.</h2>
                <form className='w-full mt-4 relative' onSubmit={handleRegister}>
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
                        <button className='bg-orange-400 text-white w-[200px] p-2 rounded-xl text-center'>Register</button>
                    </div>

                    {
                        err && (
                            <div className='text-white text-center my-5'>
                                { err }
                            </div>
                        )
                    }

                    <div className='text-center text-sm'>
                        <p>Already have an account? <Link to="/register" className='text-orange-400'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;