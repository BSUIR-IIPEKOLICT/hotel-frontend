const Service = require('../models/Service')

class ServiceController {
    async get(req, res) {
        const services = await Service.find({}).lean()
        return res.json({services})
    }

    async create(req, res) {
        const {name, price} = req.body

        await new Service({name, price}).save()
        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body

        await Service.deleteOne({_id})
        return res.json({message: 'Success'})
    }
}

module.exports = new ServiceController()
