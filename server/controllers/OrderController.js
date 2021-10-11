const Order = require('../models/Order')
const Client = require('../models/Client')
const Room = require('../models/Room')

class OrderController {
    async get(req, res) {
        const {_client} = req.body

        const orders = await Order.find({_id: _client}).lean()
        return res.json({orders})
    }

    async current(req, res) {
        const {_id} = req.body

        const order = await Order.findById(_id)
        return res.json({order})
    }

    async create(req, res) {
        const {_client, _room, _services, population, date} = req.body

        const order = await new Order({
            _client,
            _room,
            _services,
            population,
            date
        })

        await order.save()
        await Client.updateOne({_id: _client}, {$push: {_orders: order['_id']}})
        await Room.updateOne({_id: _room}, {$set: {isFree: false}})
        await Room.updateOne({_id: _room}, {$set: {population}})

        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body
        const order = await Order.findById(_id)

        await Room.updateOne({_id: order['_room']}, {$set: {isFree: true}})
        await Order.deleteOne({_id})

        return res.json({message: 'Success'})
    }
}

module.exports = new OrderController()
