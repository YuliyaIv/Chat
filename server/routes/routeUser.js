import express from 'express'

import userController from '../controller/userController'

const router = express.Router()

router.route('/').get(userController.getUsers).post(userController.createUser)

module.exports = router
