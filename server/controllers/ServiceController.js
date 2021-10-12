const Service = require('../models/Service')
const Type = require('../models/Type')
const Order = require('../models/Order')

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
        const service = await Service.findById(_id)

        await Type.updateMany({}, {$pull: {_services: service['_id']}})
        await Order.updateMany({}, {$pull: {_services: service['_id']}})
        await Service.deleteOne({_id})

        return res.json({message: 'Success'})
    }
}

module.exports = new ServiceController()
