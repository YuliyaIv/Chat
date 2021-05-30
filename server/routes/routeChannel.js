import express from 'express'

import channelsController from '../controller/channelController'

const router = express.Router()

router.route('/').post(channelsController.createChannel).get(channelsController.getChannels)

router.route('/userlist/:idUser').get(channelsController.getUserChannels)

// need new method 'add message id'
router
  .route('/:id')
  .get(channelsController.getChannel)
  .patch(channelsController.changeNameOrDescription)
  .delete(channelsController.deleteChannel)
  .post(channelsController.addIdMessage)

// delete / have new schema and route for message
router
  .route('/:id/:idMess')
  .patch(channelsController.changeMessage)
  .delete(channelsController.deleteMessage)

module.exports = router
