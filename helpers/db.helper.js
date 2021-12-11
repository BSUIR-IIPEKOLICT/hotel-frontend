import { config } from 'dotenv'
import mongoose from 'mongoose'

config()

export const connect = (callback) => {
  mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel',
    (err) => {
      if (err) {
        return console.error(`Mongo error: ${err.message}`)
      }
      console.log('Success connect to mongo.')
      callback()
    }
  )
}
