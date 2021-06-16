import express from 'express'

import authController from '../controller/authController'

const router = express.Router()

router.route('/').post(authController.auth).get(authController.verify)
router.route('/register/:validEmail').get(authController.verifyEmail)
module.exports = router
