const Order = require('../models/Order')
const Basket = require('../models/Basket')
const Room = require('../models/Room')

class OrderController {
    async get(req, res) {
        const {_basket} = req.body

        const orders = await Order.find({_basket}).lean()
        return res.json({orders})
    }

    async current(req, res) {
        const {_id} = req.body

        const order = await Order.findById(_id)
        return res.json({order})
    }

    async create(req, res) {
        const {_basket, _room, _services, population, date} = req.body

        const order = await new Order({
            _basket,
            _room,
            _services,
            population,
            date
        })

        await order.save()
        await Basket.updateOne({_id: _basket}, {$push: {_orders: order['_id']}})
        await Room.updateOne({_id: _room}, {$set: {isFree: false}})
        await Room.updateOne({_id: _room}, {$set: {population}})

        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body
        const order = await Order.findById(_id)

        await Basket.updateOne({_id: order['_basket']}, {$pull: {_orders: order['_id']}})
        await Room.updateOne({_id: order['_room']}, {$set: {isFree: true}})
        await Order.deleteOne(order)

        return res.json({message: 'Success'})
    }
}

module.exports = new OrderController()
