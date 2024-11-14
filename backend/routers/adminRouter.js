const express = require('express')
const tokenMiddleware = require('../middlewares/tokenMiddleware')
const { userDataGet, allUserData }=require('../controllers/adminController')

const router = express.Router()


router.route('/user').get(tokenMiddleware, userDataGet)
router.route('/alluserdata').get(tokenMiddleware, allUserData)

module.exports = router