import mongoose from 'mongoose'
import Message from './messageModel'

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: [true, 'The channel must have a name'],
      unique: true,
      trim: true,
      maxlength: [20, 'The channel name must have less or equal then 20 characters'],
      minlength: [5, 'The channel name must have more or equal then 5 characters']
    },
    channelAdmin: {
      type: String,
      required: [true, 'Admin must be']
    },
    description: {
      type: String,
      maxlength: [40, 'The channel description must have less or equal then 40 characters']
    },
    listUsersAccess: {
      type: [String],
      required: [true, 'At least must be admin']
    },
    chatDataMessage: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Message'
      }
    ],
    metaDataChannel: {
      timeCreateChannel: {
        type: Date,
        default: Date.now()
      },
      timeDeleteChannel: {
        type: String
        // must be  Date
      },
      defaultAvatartChannel: {
        type: String,
        required: [true, 'Avatar must be']
      },
      avatarChannel: {
        type: String
      }
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

channelSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'chatDataMessage'
  })

  next()
})

channelSchema.pre('save', async function (next) {
  const firstMessage = await Message.create({
    idUserPostedMessage: 'serviceBot',
    textMessage: 'You create the channel',
    channelOvner: this._id
  })
  this.chatDataMessage = [firstMessage.id]

  next()
})

// virtual data
// channelSchema.virtual('message', {
//   ref: 'Message',
//   foreignField: '_id',
//   localField: 'chatDataMessage'
// })

const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel
