import Message from '../modelsDB/messageModel'

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

exports.createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body)
    successfulAnswer(res, newMessage, 200)
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
