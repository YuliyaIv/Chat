import mongoose from 'mongoose'
import config from '../config'

mongoose.connection.on('connected', () => {
  console.log(`db is connection!!!!`.green)
})

mongoose.connection.on('error', (err) => {
  console.log(`can not connect to db :( ${err}`.red)
  process.exit(1)
})

exports.connect = async (DB = config.dataBase) => {
  mongoose.connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  return mongoose.connection
}
