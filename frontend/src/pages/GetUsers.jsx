import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Nav from '../components/Nav';


const Div = ({ user }) => {
    return (
        <div className='flex justify-between my-5'>
            <p className='text-start'>{ user.email }</p>
            <p>{ user.userName }</p>
        </div>
    )
}

function GetUsers() {

    const [users, setUsers] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:4000/api/users/getUsers");
            const json = await response.json();

            if (!response.ok) {
                console.log(json.error)
            }

            if (response.ok) {
                setUsers(json);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <Nav />

            <h1 className='text-center text-2xl font-bold mt-10'>All Users</h1>

            <div className='mt-10 w-96 mx-auto'>
                <div className='flex justify-between'>
                    <p className='font-bold text-2xl'>Email</p>
                    <p className='font-bold text-2xl'>Username</p>
                </div>
                {
                    users && users.map(user => (
                        <Div key={user._id} user={user} />
                    ))
                }
            </div>
        </div>
    );
}

export default GetUsers;