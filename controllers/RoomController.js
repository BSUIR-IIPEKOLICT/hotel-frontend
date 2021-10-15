const Room = require('../models/Room')
const Building = require('../models/Building')
const Order = require('../models/Order')
const Basket = require('../models/Basket')
const {objectId} = require('../db')

class RoomController {
    async get(req, res) {
        let {_building, _type, page, limit} = req.query

        page = page || 1
        limit = limit || 20
        const offset = page * limit - limit

        let rooms
        if (!_building && !_type) rooms = await Room.find({}).skip(offset).limit(limit).lean()
        if (_building && !_type) rooms = await Room.find({_building}).skip(offset).limit(limit).lean()
        if (!_building && _type) rooms = await Room.find({_type}).skip(offset).limit(limit).lean()
        if (_building && _type) rooms = await Room.find({_building, _type}).skip(offset).limit(limit).lean()

        return res.json(rooms)
    }

    async current(req, res) {
        const {_id} = req.params
        const room = await Room.findById(_id).populate('_type').populate('_building').lean()

        return res.json(room)
    }

    async create(req, res) {
        const {_building, _type} = req.body
        const id = objectId()

        const room = await new Room({
            _id: id,
            _building,
            _type,
            isFree: true,
            population: 0
        })

        await room.save()
        await Building.updateOne({_id: _building}, {$push: {_rooms: id}})

        return res.json(room)
    }

    async delete(req, res) {
        const {_id} = req.body
        const room = await Room.findById(_id).populate('_order').lean()

        await Building.updateOne({_id: room._building}, {$pull: {_rooms: _id}})
        const order = await Order.findById(room._order._id).lean()

        if (order) {
            await Basket.updateOne({_id: order._basket}, {$pull: {_orders: order._id}})
            await Order.deleteOne(order)
        }

        await Room.deleteOne({_id: room._id})

        return res.json('Success')
    }
}

module.exports = new RoomController()
