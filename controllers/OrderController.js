const Order = require('../models/Order')
const Basket = require('../models/Basket')
const Room = require('../models/Room')
const { objectId } = require('../db')

class OrderController {
    async get(req, res) {
        const { _basket } = req.params

        const order = await Order.find({ _basket })
            .populate('_room')
            .populate('_services')
            .lean()
        return res.json(order)
    }

    async create(req, res) {
        const { _basket, _room, _services, population, date } = req.body
        const id = objectId()

        const order = await new Order({
            _id: id,
            _basket,
            _room,
            _services,
            population,
            date,
        })

        await order.save()
        await Basket.updateOne({ _id: _basket }, { $push: { _orders: id } })
        await Room.updateOne({ _id: _room }, { $set: { isFree: false } })
        await Room.updateOne({ _id: _room }, { $set: { population } })

        return res.json(order)
    }

    async delete(req, res) {
        const { _id } = req.body
        const order = await Order.findById(_id).lean()

        await Basket.updateOne(
            { _id: order._basket },
            { $pull: { _orders: _id } }
        )
        await Room.updateOne({ _id: order._room }, { $set: { isFree: true } })
        await Room.updateOne({ _id: order._room }, { $set: { population: 0 } })
        await Order.deleteOne(order)

        return res.json('Success')
    }
}

module.exports = new OrderController()
