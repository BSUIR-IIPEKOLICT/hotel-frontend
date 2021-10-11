const Room = require('../models/Room')
const Building = require('../models/Building')

class RoomController {
    async get(req, res) {
        const {_building} = req.body

        const rooms = await Room.find({_building}).lean()
        return res.json({rooms})
    }

    async current(req, res) {
        const {_id} = req.query

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
        await Building.updateOne({_id: _building}, {$push: {_rooms: room['_id']}})

        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body

        await Room.deleteOne({_id})
        return res.json({message: 'Success'})
    }
}

module.exports = new RoomController()
