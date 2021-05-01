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
