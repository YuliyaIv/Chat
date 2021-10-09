import express from 'express'

import authController from '../controller/authController'

const router = express.Router()

router.route('/').post(authController.auth).get(authController.verify)
router.route('/register/:validLogin').get(authController.verifyLogin)

module.exports = router
