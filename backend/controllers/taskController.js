const Task = require('../models/taskModdles');

const taskAdd = async (req, res) => {
    try {
        const { title, description, status } = req.body;


        if (!title || !description || !status) {
            return res.status(500).json({ message: "Title, description, and status are required" });
        }

        const { userId } = req.user;
        if (!userId) {
            return res.status(500).json({ message: "User ID required" });
        }

        const newTask = new Task({
            title,
            description,
            status,
            assignedTo: userId
        });
        await newTask.save();

        return res.status(200).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        return res.status(500).json({ message: "Task add problem. Please try again later." });
    }
};


const showTask = async (req, res) => {
    try {
        const { userId } = req.user

        if (!userId) {
            return res.status(500).json({ message: "User ID required" });
        }

        const findTask = await Task.find({ assignedTo: userId })

        return res.status(200).json({ task: findTask });

    } catch (error) {
        res.status(500).json({ message: "Task find Problem" })

    }
}




const deleteTask = async (req, res) => {
    try {
        const { userId } = req.user
        const id = req.params.id
        if (!userId || !id) {
            return req.status(500).json({ message: "User ID and Task ID are required" })
        }

        const task = await Task.findOneAndDelete({ _id: id, assignedTo: userId });

        if (!task) {
            return req.status(500).json({ message: "Task not found" })
        }
        return res.status(200).json({ message: "Task deleted successfully" })


    } catch (error) {
        res.status(500).json({ message: "Task deletion problem. Please try again later." })
    }
}



const updateTask = async (req, res) => {
    try {
        const { userId } = req.user
        const id = req.params.id

        if (!userId || !id) {
            return req.status(500).json({ message: "User ID and Task ID are required" })
        }

        const { title, description, status } = req.body
        if (!title || !description || !status) {
            return res.status(500).json({ message: "Title, description, and status are required" });
        }


        const updatedTask = await Task.updateOne({ _id: id, assignedTo: userId },
            {
                $set: {
                    title,
                    description,
                    status
                }
            })

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found or you are not authorized to update it" });
        }

        return res.status(200).json({ message: "Task updated successfully", task: updatedTask });


    } catch (error) {
        res.status(500).json({ message: "Task update problem. Please try again later." })
    }
}


const onetaskshow = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const task = await Task.findById(id);
        return res.status(200).json({ task });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Update problem" });
    }
};


module.exports = { taskAdd, showTask, deleteTask, updateTask, onetaskshow };
