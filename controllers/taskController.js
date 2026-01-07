const {Task, User} = require('../models/models')
const ApiError = require('../error/ApiError')

class TaskController {
    async createTask (req, res, next) {
        const {title, description, columnId, email} = req.body
        const count = await Task.count({
            where: {columnId}
        })
        if (email) {
            const user = await User.findOne({
                where: {email}
            })
            if (!user) {
                next(ApiError.badRequest('User with this email does not exist'))
            }
            const task = await Task.create({title, description, order: count, columnId, assignedUserId: user.id})
            return res.json(task)
        }
        const task = await Task.create({title, description, order: count, columnId})
        return res.json(task)
    }

    async getAll (req, res) {
        const tasks = await Task.findAll()
        return res.json(tasks)
    }
    async deleteTask (req, res) {
        const {id} = req.params

        const deletedTask = await Task.destroy({
            where: {id}
        })
        return res.json(deletedTask)
    }
    async assignUser(req, res) {
        const {taskId, email} = req.body
        const user = await User.findOne({
            where: {email}
        })
        const assignedUser = await Task.update(
            {
                assignedUserId: user.id
            },
            {
                where: {id:taskId},
                returning: true
            }
        )
        return res.json(assignedUser)
    }
    async reorderTasks(req, res) {
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
    await Promise.all(newOrder.map((task) => Task.update({order: task.order, columnId: task.columnId}, {where: {id: task.id}})))
    const updatedTasks = await Task.findAll({
        where: {columnId},
        order: [['order', 'ASC']]
    })
    return res.json({tasks: updatedTasks})
    // return res.json({message: 'a'})
        }
        catch (error) {
            res.json({message: 'Failed to reorder tasks'})
        }
       
    }
}

module.exports = new TaskController()