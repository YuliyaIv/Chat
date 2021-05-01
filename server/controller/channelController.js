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

// server.get('/api/v1/channelsData', async (req, res) => {
//   const dataChannels = await readingFile('channelsData.json')
//   res.send(dataChannels)
// })
