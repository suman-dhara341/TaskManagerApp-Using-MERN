import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../redux/counterSlice';

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        phone: '',
        password: '',
        cpassword: ''
    });

    const dispatch = useDispatch()
    const token = useSelector((state) => state.Token.token)



    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (user.password !== user.cpassword) {
                toast.error("Passwords do not match!");
                return;
            }
            const respond = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/register`, user)
            if (respond.status === 200) {
                toast.success(respond.data.message)
                dispatch(setToken(respond.data.Token))
                setUser({
                    name: '',
                    phone: '',
                    password: '',
                    cpassword: ''
                })

            }
        } catch (error) {
            toast.error(error.response.data.message)
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
                            <label htmlFor="name">Enter Your name</label>
                            <input id='name'
                                className='p-2 rounded-lg w-52 my-2'
                                type="text"
                                placeholder='Enter Your name'
                                name='name'
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>
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
                        <div className='flex flex-col'>
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input id='cpassword'
                                className='p-2 rounded-lg w-52 my-2'
                                type="password"
                                placeholder='Confirm Your Password'
                                name='cpassword'
                                value={user.cpassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col mt-3'>
                            <button
                                type="submit"
                                className='bg-[#268D77] text-white p-3 rounded-xl h-12 mb-3'
                            >
                                Sign Up
                            </button>
                            <NavLink to={'/'}>Login here</NavLink>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
