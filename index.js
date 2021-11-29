require('dotenv').config()
const { connect } = require('./db')
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000
const { resolve } = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', require('./routes/index'))
app.use(express.static(resolve(__dirname, 'static')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, 'client', 'build')))
  app.get('*', require('./utils/rootRouter'))
}

app.use(require('./middleware/ErrorHandler'))

const start = async () => {
  try {
    await connect()
    app.listen(port, () => console.log(`Server started on port ${port}.`))
  } catch (e) {
    console.log('Server error:', e.message)
    process.exit(1)
  }
}

start().then()
