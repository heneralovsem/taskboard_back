const {Column} = require('../models/models')
const ApiError = require('../error/ApiError')

class ColumnController {
    async createColumn (req, res) {
        const {title, boardId} = req.body
        const count = await Column.count({
            where: {boardId}
        })
        const column = await Column.create({title, order:count, boardId})
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
    async reorderColumns(req, res) {
        try {
             const {boardId, newOrder} = req.body
             if(!Array.isArray(newOrder)) {
                
                return res.status(400).json({ message: 'Invalid payload' });
             }
    //     const updatedTasks = newOrder.map((task) => Task.update(
    //     {
    //         order:task.order
    //     },
    //     {where: {id: task.id, columnId}}
    // ))
    await Promise.all(newOrder.map((col) => Column.update({order: col.order}, {where: {id: col.id}})))
    const updatedColumns = await Column.findAll({
        where: {boardId},
        order: [['order', 'ASC']]
    })
    return res.json({updatedColumns})
    // return res.json({message: 'a'})
        }
        catch (error) {
            res.json({message: 'Failed to reorder columns'})
        }
       
    }
}

module.exports = new ColumnController()