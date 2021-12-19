import User from '../modelsDB/userModel'

// dont know what is this
exports.getUsers = async (req, res) => {
  try {
    await User.find({}, (err, result) => {
      if (err) throw new Error(err)
      const updatedResult = result.reduce((acc, rec) => {
        return { ...acc, [rec._id]: rec }
      }, {})
      res.status(200).json({
        status: 'success',
        updatedResult
      })
    })
  } catch (err) {
    console.error(new Error(err))
  }
}

exports.createUser = async (req, res) => {
  try {
    const validateUniqueUserData = await User.checkUniqueDataUser(req.body)
    if (validateUniqueUserData === 'success') {
      await User.create(req.body, (err, result) => {
        if (err) res.send(err)
        else {
          res.status(200).send({
            status: validateUniqueUserData
          })
        }
      })
    } else {
      res.status(200).send({
        status: validateUniqueUserData
      })
    }
  } catch (err) {
    console.error(new Error(err))
  }
}
