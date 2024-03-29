import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    nameUser: {
      type: String,
      unique: [true, 'A name must be unique'],
      required: [true, 'User must have a name'],
      maxlength: [15, 'The name must have less or equal than 15 characters'],
      minlength: [5, 'The name must be at least 5 characters'],
      trim: true
    },
    login: {
      type: String,
      unique: [true, 'A login must be unique '],
      required: [true, 'User must have a login'],
      maxlength: [15, 'The login must have less or equal than 15 characters'],
      minlength: [6, 'The login must be at least 6 characters'],
      lovercase: true,
      trim: true
    },
    avatar: {
      type: String,
      default: 'default'
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
      maxlength: [10, 'max 10 symbols'],
      minlength: [6, 'min 6 symbols']
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
      minlength: 11
    },
    channelsAccess: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Channel'
      }
    ],
    channelsOvner: [String],
    statusActivity: {
      type: String
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
  async findAndValidateUser({ login, password }) {
    console.log('findAndValidateUser login, password', login, password)
    if (!login) {
      throw Error('No login')
    }
    if (!password) {
      throw Error('No password')
    }

    const user = await this.findOne({ login }).exec()
    if (!user) {
      throw new Error('No User')
    }
    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('PasswordInCorrect')
    }

    return user
  },
  async checkUniqueDataUser({ login, email }) {
    console.log(login, email)
    const userLogin = await this.findOne({ login }).exec()
    if (userLogin) {
      return 'login already exists'
    }
    return 'success'
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
