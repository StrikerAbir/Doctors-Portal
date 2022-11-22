import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const {logOut}=useContext(AuthContext);
    const handleLogout = () =>{
        logOut()
            .then(() => { })
        .catch((err)=>console.log(err))
    }
    return (
        <div>
            <p className='text-red-500'> Something went wrong!!</p>
            <p className='text-red-500'>{error.statusText || error.message}</p>
            <p className='text-3xl'>Please <button className='btn btn-primary' onClick={handleLogout}>Log out</button> and log back in.</p>
        </div>
    );
};

export default DisplayError;