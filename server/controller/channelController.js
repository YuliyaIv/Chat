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
    data: {
      dataName
    }
  })
}

exports.createChannel = async (req, res) => {
  try {
    const newChannel = await Channel.create(req.body)
    successfulAnswer(res, newChannel, 200)
    res.send(newChannel)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.find()
    successfulAnswer(res, channels, 200)
    res.send(channels)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

exports.changeNameOrDescription = async (req, res) => {
  try {
    const { body: updatedData } = req
    const { id } = req.params

    const channel = await Channel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    })
    successfulAnswer(res, channel, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

exports.deleteChannel = async (req, res) => {
  try {
    const { id } = req.params
    const channel = await Channel.deleteOne({
      _id: id
    })
    successfulAnswer(res, channel, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

exports.createMessage = async (req, res) => {
  try {
    const { id } = req.params
    const createMessage = req.body
    const message = await Channel.findOneAndUpdate(
      { _id: id },
      { $push: { chatDataMessage: createMessage } }
    )
    successfulAnswer(res, message, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

exports.changeMessage = async (req, res) => {
  try {
    const { id, idMess } = req.params
    const { newMessageText } = req.body
    const message = await Channel.findOneAndUpdate(
      { _id: id, 'chatDataMessage._id': idMess },
      { $set: { 'chatDataMessage.$.textMessage': newMessageText } },
      {
        new: true,
        runValidators: true
      }
    )
    console.log(message)
    successfulAnswer(res, message, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    const { id, idMess } = req.params
    const message = await Channel.findOneAndUpdate(
      { _id: id },
      { $pull: { chatDataMessage: { _id: idMess } } }
    )
    successfulAnswer(res, message, 200)
  } catch (err) {
    errAnswer(res, err, 404)
  }
}
