const Room = require('../models/Room')
const Building = require('../models/Building')
const Order = require('../models/Order')
const Basket = require('../models/Basket')

class RoomController {
    async get(req, res) {
        const {_building} = req.body

        const rooms = await Room.find({_building}).lean()
        return res.json({rooms})
    }

    async current(req, res) {
        const {_id} = req.param

        const item = await Room.findById(_id).lean()
        return res.json({item})
    }

    async create(req, res) {
        const {_building, _type} = req.body

        const room = await new Room({
            _building,
            _type,
            isFree: true,
            population: 0
        })

        await room.save()
        await Building.updateOne({_id: _building}, {$push: {_rooms: room.id}})

        return res.json({message: 'Success', id: room.id})
    }

    async delete(req, res) {
        const {_id} = req.body
        const room = await Room.findById(_id).lean()

        await Building.updateOne({_id: room['_building']}, {$pull: {_rooms: room['_id']}})
        const order = await Order.find({_room: room['_id']}).lean()

        if (order) {
            await Basket.updateOne({_id: order['_basket']}, {$pull: {_orders: order['_id']}})
            await Order.deleteOne(order)
        }

        await Room.deleteOne(room)

        return res.json({message: 'Success'})
    }
}

module.exports = new RoomController()
