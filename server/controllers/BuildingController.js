const Building = require('../models/Building')

class BuildingController {
    async get(req, res) {
        const buildings = await Building.find({}).lean()
        return res.json({buildings})
    }

    async create(req, res) {
        const {address} = req.body

        await new Building({address: address}).save()
        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body

        await Building.deleteOne({_id})
        return res.json({message: 'Success'})
    }
}

module.exports = new BuildingController()
