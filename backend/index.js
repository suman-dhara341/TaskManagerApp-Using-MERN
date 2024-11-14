const express = require('express')
require('dotenv').config()
const cors = require('cors')
const DB = require('./configs/mongodb')

const app = express()
app.use(cors())
const PORT = 3000
app.use(express.json())


const authRouter=require('./routers/authRouter')
app.use('/api',authRouter)

const taskRouter = require('./routers/taskRouter')
app.use('/api', taskRouter)

const adminRouter=require('./routers/adminRouter')
app.use('/api/admin', adminRouter)



DB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);

    })
}).catch((error) => {
    console.log("DB connaction problem",error.message);
    process.exit(1)
})
