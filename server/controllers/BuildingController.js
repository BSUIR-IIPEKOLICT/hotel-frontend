const Building = require('../models/Building')
const Room = require('../models/Room')
const Order = require('../models/Order')
const Basket = require('../models/Basket')

class BuildingController {
    async get(req, res) {
        const buildings = await Building.find({}).lean()
        return res.json({buildings})
    }

    async create(req, res) {
        const {address} = req.body

        await new Building({address}).save()
        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body
        const building = Building.findById(_id).lean()
        const rooms = Room.find({_building: building['_id']}).lean()

        await rooms.map(v => {
            const order = Order.findOne({_room: v['_id']}).lean()

            Basket.updateOne({_id: order['_basket']}, {$pull: {_orders: order['_id']}})
            Order.deleteOne(order)
        })

        await Room.deleteMany({_building: building['_id']})
        await Building.deleteOne({_id})

        return res.json({message: 'Success'})
    }
}

module.exports = new BuildingController()
