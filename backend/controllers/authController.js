const User = require('../models/authModdle');

const userRegister = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        if (!name || !phone || !password) {
            return res.status(500).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(500).json({ message: "Phone number already registered" });
        }

        const newUser = await User.create({
            name,
            phone,
            password
        });

        const Token = await newUser.generateToken();

        return res.status(200).json({ message: "User registered successfully", Token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "User registration problem. Please try again later." });
    }
};



const userLogin = async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(500).json({ message: "Phone and password are required" });
        }

        const userFind = await User.findOne({ phone });
        if (!userFind) {
            return res.status(500).json({ message: "Wrong credentials" });
        }

        const matchPassword = await userFind.matchPassword(password);
        if (!matchPassword) {
            return res.status(500).json({ message: "Wrong credentials" });
        }

        const Token = await userFind.generateToken();

        return res.status(200).json({ message: "Login successful", Token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "User login problem. Please try again later." });
    }
};





module.exports = { userRegister, userLogin };
