const {connect} = require('./db')
const express = require('express')
const port = process.env.PORT || require('./config.json').PORT
const {resolve} = require('path')
const fileLoader = require('express-fileupload')

const app = express()

app.use(express.json())
app.use('/api', require('./routes/index'))
app.use(express.static(resolve(__dirname, 'static')))
app.use(fileLoader({}))

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
        console.log('Server error:' , e.message)
        process.exit(1)
    }
}

start().then()
