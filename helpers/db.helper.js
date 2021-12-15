import { config } from 'dotenv'
import mongoose from 'mongoose'
import {
  LOCAL_MONGODB_URL,
  SUCCESS_CONNECT_MONGO,
} from '../shared/constants.js'

config()

export default function dbHelper(callback) {
  mongoose.connect(process.env.MONGODB_URI || LOCAL_MONGODB_URL, (err) => {
    if (err) {
      return console.error(`Mongo error: ${err.message}`)
    }
    console.log(SUCCESS_CONNECT_MONGO)
    callback()
  })
}
