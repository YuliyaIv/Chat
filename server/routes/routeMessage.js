import express from 'express'

import messageController from '../controller/messageController'

const router = express.Router()

router.route('/').get(messageController.getMessages).post(messageController.createMessage)

router
  .route('/:idChannel/:idMessage')
  .delete(messageController.deleteMessage)
  .patch(messageController.changeMessage)

module.exports = router
