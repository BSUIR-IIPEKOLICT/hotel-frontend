const uuid = require('uuid')
const {resolve} = require('path')

module.exports = {
    imgLoader: img => {
        const name = `${uuid.v4()}.jpg`
        img.mv(resolve(__dirname, '..', 'static', name)).then()

        return name
    }
}
