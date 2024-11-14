const Users = require('../models/authModdle')
const userDataGet = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "User Data Get Problems" });
    }
}


const allUserData = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(500).json({ message: "User Not found" })
        }

        if (!user.isAdmin) {
            return res.status(500).json("You are not authorize person")
        }
        const allUsers = await Users.find({},{password:0})
        return res.status(200).json(allUsers)
    } catch (error) {

    }
}

module.exports = { userDataGet, allUserData };