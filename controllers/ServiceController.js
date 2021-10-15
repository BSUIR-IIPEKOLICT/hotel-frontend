const Service = require('../models/Service')
const Type = require('../models/Type')
const Order = require('../models/Order')

class ServiceController {
    async get(req, res) {
        const services = await Service.find({}).lean()
        return res.json(services)
    }

    async create(req, res) {
        const {name, price} = req.body

        const service = await new Service({name, price})
        await service.save()

        return res.json(service)
    }

    async delete(req, res) {
        const {_id} = req.body
        const service = await Service.findById(_id).lean()

        await Type.updateMany({}, {$pull: {_services: _id}})
        await Order.updateMany({}, {$pull: {_services: _id}})
        await Service.deleteOne(service)

        return res.json('Success')
    }
}

module.exports = new ServiceController()
