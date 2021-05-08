import express from 'express'

import channelsController from '../controller/channelController'

const router = express.Router()

router.route('/').post(channelsController.createChannel).get(channelsController.getChannels)

router
  .route('/:id')
  .patch(channelsController.changeNameOrDescription)
  .delete(channelsController.deleteChannel)
  .post(channelsController.createMessage)

router
  .route('/:id/:idMess')
  .patch(channelsController.changeMessage)
  .delete(channelsController.deleteMessage)

module.exports = router
