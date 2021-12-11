import { resolve } from 'path'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import serve from './helpers/serve.helper.js'
import { connect } from './helpers/db.helper.js'
import errorMiddleware from './middleware/error.middleware.js'
import ApiRouter from './routes/index.js'

config()
const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', ApiRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve('client', 'build')))
  app.get('*', serve)
}

app.use(errorMiddleware)

const bootstrap = async () => {
  try {
    await connect(() =>
      app.listen(port, () => console.log(`Server started on port ${port}`))
    )
  } catch (e) {
    console.log(`Server error: ${e.message}`)
    process.exit(1)
  }
}

bootstrap().then()
