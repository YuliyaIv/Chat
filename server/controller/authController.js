import jwt from 'jsonwebtoken'
import NewObjUser from '../../client/helperFunction/mainFunctionCreateUser'
import config from '../config'
import User from '../modelsDB/userModel'

exports.auth = async (req, res) => {
  console.log('exports.auth controller req.body.data', req.body.data)

  try {
    const user = await User.findAndValidateUser(req.body.data)
    console.log('exports.auth user', user)
    console.log('exports.auth user', user)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    console.log('exports.auth token', token)
    delete user.password
    res.cookie('token', token, { maxAge: 4000 * 60 * 60 * 48 })
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
