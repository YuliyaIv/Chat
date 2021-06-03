import Message from '../modelsDB/messageModel'
import Channel from '../modelsDB/channelModel'

const errAnswer = (response, err, statusCode) => {
  return response.status(statusCode).json({
    status: 'fail',
    error: err.message
  })
}

const successfulAnswer = (response, dataName, statusCode) => {
  return response.status(statusCode).json({
    status: 'success',
    data: dataName
  })
}

// i dont know why i return newMessage and updatedChannel,must check it later=)
exports.createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body)
    const updatedChannel = await Channel.findOneAndUpdate(
      { _id: req.body.channelOvner },
      { $push: { chatDataMessage: newMessage._id } },
      {
        new: true,
        runValidators: true
      }
    )
    const channels = await Channel.find({
      listUsersAccess: { $in: req.body.idUserPostedMessage }
    })
    successfulAnswer(res, { updatedChannel, newMessage, channels }, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

// must be with filter {mess, mess, mess ...}
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
    successfulAnswer(res, messages, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}
