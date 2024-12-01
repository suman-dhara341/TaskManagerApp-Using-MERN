import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setToken } from '../redux/counterSlice';

const Login = () => {
    const [user, setUser] = useState({
        phone: '',
        password: ''
    });

    const dispatch = useDispatch()
    const token = useSelector((state) => state.Token.token)
    const loading = useSelector((state) => state.Token.loading);


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            dispatch(setLoading(true));
            
            const respond = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/login`, user)
            if (respond.status === 200) {
                toast.success(respond.data.message)
                dispatch(setToken(respond.data.Token))
                setUser({
                    phone: '',
                    password: ''
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    };

    if (token) {
        return <Navigate to='/tasks' />
    }

    return (
        <div className='h-full flex justify-center'>
            <div className='h-[30rem] w-[60rem] flex justify-center items-center flex-col bg-gray-400 rounded-lg'>
                <h1 className='mb-7'>Welcome to Task Manager App</h1>
                <div className='flex justify-center items-center gap-8'>
                    <img className='h-96 rounded-lg hidden md:block' src="https://static.vecteezy.com/system/resources/previews/010/925/681/large_2x/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-identification-in-internet-vector.jpg" alt="" />
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label htmlFor="phone">Phone Number</label>
                            <input id='phone'
                                className='p-2 rounded-lg w-52 my-2'
                                type="number"
                                placeholder='Enter Your Number'
                                name='phone'
                                value={user.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password">Password</label>
                            <input id='password'
                                className='p-2 rounded-lg w-52 my-2'
                                type="password"
                                placeholder='Enter Your Password'
                                name='password'
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col mt-3'>
                            <button
                                type="submit"
                                className='bg-[#268D77] text-white p-3 rounded-xl h-12 mb-3'
                            >
                                {loading ? "Please Wait..." : "Login"}
                            </button>
                            <NavLink to={'/signup'}>Signup here</NavLink>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
