import express from 'express'
import auth from '../middleware/auth'
import userInfoController from '../controller/userInfoController'

const router = express.Router()

router.route('/').get(auth(), userInfoController.userInfo)

module.exports = router
