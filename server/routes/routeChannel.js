import express from 'express'

import channelsController from '../controller/channelController'

const router = express.Router()

router.route('/').post(channelsController.createChannel).get(channelsController.getChannels)

router.route('/channellist/:idUser').get(channelsController.getUserChannels)

router
  .route('/:id')
  .get(channelsController.getChannel)
  .patch(channelsController.changeNameOrDescription)
  .delete(channelsController.deleteChannel)
  .post(channelsController.addIdMessage)

module.exports = router
