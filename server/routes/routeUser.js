import express from 'express'

import userController from '../controller/userController'

const router = express.Router()

router.route('/').post(userController.createUser).get(userController.getUsers)

module.exports = router
