import Channel from '../modelsDB/channelModel'

exports.createChannel = async (req, res) => {
  try {
    const newChannel = await Channel.create(req.body)
    res.status(200).json({
      status: 'success',
      data: {
        newChannel
      }
    })
    res.send(newChannel)
  } catch (err) {
    console.error(new Error(err))
  }
}

exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.find()
    res.status(200).json({
      status: 'success',
      data: {
        channels
      }
    })
    res.send(channels)
  } catch (err) {
    console.error(new Error(err))
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
    res.status(200).json({
      status: 'success',
      data: {
        channel
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err.message
    })
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
    res.status(200).json({
      status: 'success',
      data: {
        message
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err.message
    })
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    const { id, idMess } = req.params
    const message = await Channel.findOneAndUpdate(
      { _id: id },
      { $pull: { chatDataMessage: { _id: idMess } } }
    )
    console.log(message)
    res.status(200).json({
      status: 'success',
      data: {
        message
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err.message
    })
  }
}
