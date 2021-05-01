import User from '../modelsDB/userModel'

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.status(200).json({
      status: 'success',
      data: {
        newUser
      }
    })
    res.send(newUser)
  } catch (err) {
    console.error(new Error(err))
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    })
    res.send(users)
  } catch (err) {
    console.error(new Error(err))
  }
}
