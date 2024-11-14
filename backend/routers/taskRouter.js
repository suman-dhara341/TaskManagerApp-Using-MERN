const express=require('express')
const { taskAdd, showTask, deleteTask, updateTask, onetaskshow } = require('../controllers/taskController')
const tokenMiddleware = require('../middlewares/tokenMiddleware')
const router=express.Router()


router.route('/taskadd').post(tokenMiddleware,taskAdd)
router.route('/showtask').get(tokenMiddleware, showTask)
router.route('/deletetask/:id').delete(tokenMiddleware, deleteTask)
router.route('/updatetask/:id').patch(tokenMiddleware, updateTask)
router.route('/onetaskshow/:id').get(tokenMiddleware, onetaskshow);


module.exports=router