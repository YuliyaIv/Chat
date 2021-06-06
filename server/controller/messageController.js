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
    successfulAnswer(res, { updatedChannel, newMessage }, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

// must be with filter {mess, mess, mess ...} or delete it
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
    successfulAnswer(res, messages, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    const { idChannel, idMessage } = req.params
    const updateChannel = await Channel.findOneAndUpdate(
      { _id: idChannel },
      { $pull: { chatDataMessage: idMessage } },
      {
        new: true,
        runValidators: true
      }
    )
    await Message.deleteOne({ _id: idMessage })
    successfulAnswer(res, updateChannel, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

exports.changeMessage = async (req, res) => {
  try {
    const { idMessage } = req.params
    const newMessageText = req.body.textMessage
    const updatedMessage = await Message.findOneAndUpdate(
      { _id: idMessage },
      { $set: { textMessage: newMessageText } },
      {
        new: true,
        runValidators: true
      }
    )
    successfulAnswer(res, updatedMessage, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}
