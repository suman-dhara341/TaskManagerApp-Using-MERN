const mongoose = require('mongoose')

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSEDB)
        console.log("DB connaction successful");

    } catch (error) {
        console.error("DB connection error:", error.message);
        process.exit(1); 
    }
}

module.exports = DB