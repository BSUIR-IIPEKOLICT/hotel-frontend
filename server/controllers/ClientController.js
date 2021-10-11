const Client = require('../models/Client')

class ClientController {
    async get(req, res) {
        const clients = await Client.find({}).lean()
        return res.json({clients})
    }

    async current(req, res) {
        const {_user} = req.body

        const client = await Client.findOne({_user})
        return res.json({client})
    }

    async create(req, res) {
        const {_user, name} = req.body

        await new Client({_user, name}).save()
        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body

        await Client.deleteOne({_id})
        return res.json({message: 'Success'})
    }
}

module.exports = new ClientController()
