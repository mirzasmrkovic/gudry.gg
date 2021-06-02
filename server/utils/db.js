import mongoose from 'mongoose'

export const connection = async (url, opts = {}) => {
  try {
    return await mongoose.connect(url, {
      ...opts,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}
