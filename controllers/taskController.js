const {Task, User} = require('../models/models')
const ApiError = require('../error/ApiError')

class TaskController {
    async createTask (req, res, next) {
        const {title, description, columnId, email} = req.body
        if (email) {
            const user = await User.findOne({
                where: {email}
            })
            if (!user) {
                next(ApiError.badRequest('User with this email does not exist'))
            }
            const task = await Task.create({title, description, columnId, assignedUserId: user.id})
            return res.json(task)
        }
        const task = await Task.create({title, description, columnId})
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
}

module.exports = new TaskController()