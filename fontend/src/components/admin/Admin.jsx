import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.Token.token);

    const allUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/admin/alluserdata', {
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
            {loading ? (
                <p>Loading users...</p>
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
