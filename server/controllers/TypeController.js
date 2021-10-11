const Type = require('../models/Type')

class TypeController {
    async get(req, res) {
        const types = await Type.find({}).lean()
        return res.json({types})
    }

    async create(req, res) {
        const {_services, name, places} = req.body

        await new Type({
            _services,
            name,
            places
        }).save()

        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body

        await Type.deleteOne({_id})
        return res.json({message: 'Success'})
    }
}

module.exports = new TypeController()
