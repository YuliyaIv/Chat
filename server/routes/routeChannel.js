import express from 'express'

import channelsController from '../controller/channelController'

const router = express.Router()

router.route('/').post(channelsController.createChannel)

module.exports = router
