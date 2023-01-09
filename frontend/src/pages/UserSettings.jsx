import React, { useContext } from 'react';
import TopNav from '../components/TopNav';
import AuthContext from '../context/AuthContext';

function UserSettings() {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <TopNav />
            
            <h1 className='text-center text-2xl font-bold mt-10'>Hi, {user.userName}</h1>
        </div>
    );
}

export default UserSettings;