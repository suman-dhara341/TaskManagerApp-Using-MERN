import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '../redux/counterSlice';


const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.Token.token);
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const getTasks = async () => {
    try {
      const respond = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/showtask`, {
        headers: {
          Authorization: token
        }
      });
      if (respond.status === 200) {
        setTasks(respond.data.task);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };




  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
    setLoading(true)
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKENDURL}/api/deletetask/${id}`, {
        headers: {
          Authorization: token
        }
      });

      if (response.status === 200) {
        toast.success("Task deleted successfully");
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting task");
    } finally {
      setLoading(false);
    }
  };



  const getUserData = async () => {
    try {
      const respond = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/admin/user`, {
        headers: {
          Authorization: token
        }
      });
      if (respond.status === 200) {

        dispatch(setUser(respond.data))
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching tasks");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (task) => {
    navigate(`/taskAdd/${task._id}`);
  };

  useEffect(() => {
    if (token) {
      getTasks();
      getUserData()
    }
  }, [token]);


  if (!token) {
    return <Navigate to='/' />;
  } else {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className='flex items-center justify-between mb-6'>
          <h1 className="text-3xl font-bold text-center">Task List</h1>
          <button
            onClick={() => navigate('/taskadd')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
          </div>
        ) : (
          tasks.length === 0 ? (
            <p className="text-center text-gray-500">No Data Found</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 transition-all hover:shadow-lg"
                >
                  <h2 className="text-xl font-semibold text-[#268D77] dark:text-[#A4F1D9]">
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                    Status: <span className="font-medium text-black dark:text-white">{task.status}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mt-4">
                    {task.description}
                  </p>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    );
  }
};

export default Task;
