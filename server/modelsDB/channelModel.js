import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema({
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
  metaDataChannel: {
    timeCreateChannel: {
      type: String
      // Date
    },
    timeDeleteChannel: {
      type: String
      // Date
    },
    defaultAvatartChannel: {
      type: String,
      required: [true, 'Avatar must be']
    },
    avatarChannel: {
      type: String
    }
  },
  chatDataMessage: {
    type: [
      {
        idMessage: {
          type: Number,
          required: [true, 'Id message must be']
        },
        idUserPostedMessage: {
          type: String,
          required: [true, 'Id user posted message must be']
        },
        textMessage: {
          type: String,
          maxlength: [1500, 'The text message must have less or equal then 1500 characters'],
          minlength: [1, 'The text message must have more or equal then 1 characters'],
          trim: true
        },
        metaDataMessage: {
          timeCreateMessage: {
            type: String
            // Date
          },
          timeDeleteMessage: {
            type: String
            // Date
          }
        }
      }
    ]
  }
})
const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel
