import mongoose from 'mongoose'
const options = {
  dbUrl: 'mongodb://localhost:27017/restaurant-api'
}

export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
}
