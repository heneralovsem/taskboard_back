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

    async deleteColumn (req, res) {
        const {id} = req.params

        const deletedColumn = await Column.destroy({
            where: {id}
        })
        return res.json(deletedColumn)
    }
}

module.exports = new ColumnController()