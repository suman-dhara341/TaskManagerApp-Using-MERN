import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


const Admin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.Token.token);

    const allUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/admin/alluserdata`, {
                headers: {
                    Authorization: token
                }
            });
            if (response.status === 200) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            allUsers();
        }
    }, [token]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition duration-300 mb-4">
                <NavLink to={'/tasks'}>Go to Home Page</NavLink>
            </button>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
                </div>
            ) : users.length > 0 ? (
                <ul>
                    <li>Total Users: {users.length}</li>
                    {users.map((user) => (
                        <li key={user._id} className="mb-2 border-b pb-2">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Phone Number:</strong> {user.phone}</p>
                            <p><strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users available</p>
            )}
        </div>
    );
};

export default Admin;
