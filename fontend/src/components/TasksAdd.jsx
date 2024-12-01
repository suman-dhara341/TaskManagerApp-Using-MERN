import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';

const Tasks = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.Token.token);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = id
        ? await axios.patch(`${import.meta.env.VITE_BACKENDURL}/api/updatetask/${id}`, task, {
          headers: { Authorization: token },
        })
        : await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/taskadd`, task, {
          headers: { Authorization: token },
        });

      if (response.status === 200) {
        toast.success(response.data.message);
        setTask({ title: '', description: '', status: 'pending' });
        navigate('/tasks');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const taskUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/onetaskshow/${id}`, {
        headers: { Authorization: token },
      });

      if (response.status === 200 && response.data.task) {
        setTask(response.data.task);
        toast.success(response.data.message);
      } else {
        toast.error('Task not found.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching task.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      taskUpdate();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        </div>
      ) : (

        <div className="px-24 pt-4 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 transition duration-300">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Status</label>
              <select
                id="status"
                name="status"
                value={task.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
              />
            </div>
            <div className='flex items-center justify-between'>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition duration-300">
                {id ? 'Update' : 'Add Task'}
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition duration-300 mb-4">
                <NavLink to={'/tasks'}>Back</NavLink>
              </button>
            </div>

          </form>
        </div>
      )}
    </>
  );
};

export default Tasks;
