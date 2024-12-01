import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeToken } from '../redux/counterSlice';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(removeToken());
        toast.success("See You Again")
    }, [dispatch]);

    return <Navigate to="/" />;
};

export default Logout;
