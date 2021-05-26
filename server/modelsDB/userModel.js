import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    nameUser: {
      type: String,
      unique: [true, 'A name must be unique'],
      required: [true, 'User must have a name'],
      maxlength: [40, 'The name must have less or equal then 40 characters']
    },

    avatar: {
      type: String
    },
    role: {
      type: [String],
      default: ['user']
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
      required: [true, 'Please confirm ypur password'] // must be  deletet after confirm
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
    channelsAccess: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Channel'
      }
    ],
    channelsOvner: [String],
    userMetaDate: {
      defaultAvatar: String,
      statusActivity: String
    }
  },
  {
    timestamp: true
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 12)
  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw Error('No email')
    }
    if (!password) {
      throw Error('No password')
    }

    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new Error('No User')
    }
    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('PasswordInCorrect')
    }

    return user
  }
}

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'channelsAccess'
  })

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
