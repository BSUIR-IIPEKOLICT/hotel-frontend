const Type = require('../models/Type')
const Room = require('../models/Room')
const Building = require('../models/Building')
const Order = require('../models/Order')

class TypeController {
    async get(req, res) {
        const types = await Type.find({}).lean()
        return res.json({types})
    }

    async create(req, res) {
        const {_services, name, places} = req.body

        new Type({
            _services,
            name,
            places
        }).save()

        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body
        const type = Type.findById(_id)
        const rooms = Room.find({_type: type['_id']})

        await rooms.map(v => {
            Building.updateMany({}, {$pull: {_rooms: v['_id']}})
            Order.deleteOne({_room: v['_id']})
        })

        await Type.deleteOne({_id})

        return res.json({message: 'Success'})
    }
}

module.exports = new TypeController()
