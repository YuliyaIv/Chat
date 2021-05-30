import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    timeCreateMessage: {
      type: String, // must be  Date
      default: 'now'
    },
    timeDeleteMessage: {
      type: String // must be  Date
    },
    idUserPostedMessage: {
      type: String
    },
    textMessage: {
      type: String,
      maxlength: [1500, 'The text message must have less or equal then 1500 characters'],
      minlength: [1, 'The text message must have more or equal then 1 characters'],
      trim: true
    },
    channelOvner: {
      type: mongoose.Schema.ObjectId,
      ref: 'Channel'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
