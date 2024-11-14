import React, { useEffect, useState } from 'react';
import { CiDark, CiLight } from "react-icons/ci";
import { NavLink, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
import Signup from './Signup';
import TasksAdd from './TasksAdd';
import ErrorPage from './ErrorPage';
import Logout from './Logout';
import Tasks from './Tasks';
import Admin from './admin/Admin';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    const token = useSelector((state) => state.Token.token)
    const user = useSelector((state) => state.Token.user)

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className={`min-h-screen bg-white text-[#268D77] dark:bg-black`}>
            <nav className="p-4 flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li className='font-bold text-2xl'>{user && token ? `Welcome To ${user.name}` : "Task Manager"}</li>

                </ul>
                <ul className='flex items-center gap-8 text-xl'>
                    {
                        token ?
                            <li>
                                <NavLink
                                    to="/logout"
                                    className={({ isActive }) => isActive ? 'font-bold underline' : ''}
                                >
                                    Logout
                                </NavLink>
                            </li>

                            :
                            <>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => isActive ? 'font-bold underline' : ''}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/signup"
                                        className={({ isActive }) => isActive ? 'font-bold underline' : ''}
                                    >
                                        Signup
                                    </NavLink>
                                </li>

                            </>
                    }
                    {
                        user && user.isAdmin ?
                            <li>
                                <NavLink
                                    to="/admin"
                                    className={({ isActive }) => isActive ? 'font-bold underline' : ''}
                                >
                                    Admin
                                </NavLink>
                            </li> : ""
                    }

                    <button
                        className="bg-[#268D77] dark:bg-[#268D77] text-white px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-400 transition-all"
                        onClick={handleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <CiDark className="text-white" /> : <CiLight className="text-black" />}
                    </button>
                </ul>
            </nav>
            <div>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/tasks' element={<Tasks />} />
                    <Route path='/taskadd/:id' element={<TasksAdd />} />
                    <Route path='/taskadd' element={<TasksAdd />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default Navbar;
