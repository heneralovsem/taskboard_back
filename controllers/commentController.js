const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError')

class CommentController {
    async createComment (req, res) {
        const {text, taskId, userId} = req.body
        const comment = await Comment.create({text, taskId, authorId: userId})
        return res.json(comment)
    }

    async getTaskComments (req, res) {
        const {taskId} = req.query
        const comments = await Comment.findAndCountAll({
            where: {taskId}
        })
        return res.json(comments)
    }
}

module.exports = new CommentController()