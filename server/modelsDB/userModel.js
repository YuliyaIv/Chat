import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nameUser: {
    type: String,
    unique: [true, 'A name must be unique'],
    required: [true, 'User must have a name'],
    maxlength: [40, 'The name must have less or equal then 40 characters']
  },

  avatar: {
    type: String
  },
  aboutUser: {
    type: String,
    maxlength: [60, 'The aboutUser must have less or equal then 60 characters']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    maxlength: [40, 'max 40 symbols'],
    minlength: [8, 'min 8 symbols']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm ypur password']
  },
  email: {
    type: String,
    unique: [true, 'A email must be unique '],
    required: [true, 'User must have a email'],
    // validate: [validator.isEmail, 'Please prowide a walid Email'],
    lovercase: true
  },
  phone: {
    type: String,
    // required: [true, 'Please provide a phone'],
    minlength: 11
  },
  channelsAccess: [String],
  channelsOvner: [String],
  userMetaDate: {
    defaultAvatar: String,
    statusActivity: String
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User


