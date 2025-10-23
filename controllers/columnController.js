const {Column} = require('../models/models')
const ApiError = require('../error/ApiError')

class ColumnController {
    async createColumn (req, res) {
        const {title, boardId} = req.body
        const column = await Column.create({title, boardId})
        return res.json(column)
    }

    async getAll (req, res) {
        const columns = await Column.findAll()
        return res.json(columns)
    }
}

module.exports = new ColumnController()