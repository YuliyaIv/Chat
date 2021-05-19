import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  timeCreateMessage: {
    type: String // must be  Date
  },
  timeDeleteMessage: {
    type: String // must be  Date
  },
  idMessage: {
    type: Number // delete after,
  },
  idUserPostedMessage: {
    type: String
  },
  textMessage: {
    type: String,
    maxlength: [1500, 'The text message must have less or equal then 1500 characters'],
    minlength: [1, 'The text message must have more or equal then 1 characters'],
    trim: true
  }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
