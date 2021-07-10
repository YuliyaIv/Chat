import jwt from 'jsonwebtoken'
import NewObjUser from '../../client/helperFunction/mainFunctionCreateUser'
import config from '../config'
import User from '../modelsDB/userModel'

exports.auth = async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body.data)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error auth', err })
  }
}

exports.verify = async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

exports.verifyEmail = async (req, res) => {
  try {
    const email = req.params.validEmail
    const findEmail = await User.findOne({ email })
    const isEmail = findEmail ? 'Email already been taken' : 'Email available'
    res.json({ msg: isEmail })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}
