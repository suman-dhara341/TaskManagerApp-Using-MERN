import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeToken } from '../redux/counterSlice';
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();

    

    useEffect(() => {
        dispatch(removeToken());
    }, [dispatch]); 

    return <Navigate to="/" />;
};

export default Logout;
