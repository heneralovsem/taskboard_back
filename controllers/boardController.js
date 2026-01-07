const {Board, BoardUsers, User, Column, Task} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op} = require('sequelize')

class BoardController {
    async createBoard (req, res) {
        const {title, ownerId} = req.body
        const board = await Board.create({title, ownerId})
        await BoardUsers.create({
            boardId: board.id,
            userId: ownerId,
        })
        return res.json(board)
    }

    async getAll (req, res) {
        const {userId} = req.query

        const userBoards = await BoardUsers.findAll({
            where: {userId},
            attributes: ['boardId'],
        })
        const userBoardIds = userBoards.map((board) => board.boardId)
        const boards = await Board.findAll(
            {
                where: {
                id: {[Op.in]: userBoardIds}
            },
                include: [{model: User, as: 'boardUsers', attributes: ['id', 'userName', 'email']}]
            }
        )
        return res.json(boards)
    }
    async getOneBoard (req, res) {
        const {id} = req.params

        const board = await Board.findOne({
            where: {id},
            include: [
                {model: Column, as: 'columns', include: [{model: Task, as: 'tasks'}]},
                {model: User, as: 'boardUsers', attributes: ['id', 'userName', 'email']}
            ],
            order: [
                [{model: Column, as: 'columns'}, 'order', 'ASC'],
                [{model: Column, as: 'columns'}, {model: Task, as: 'tasks'}, 'order', 'ASC']
            ]
        })
        res.json(board)
    }

    async deleteBoard (req, res) {
        const {id} = req.params

        const deletedBoard = await Board.destroy({
            where: {id}
        })
        return res.json(deletedBoard)
    }

    async inviteUser (req, res) {
        const {boardId, userId} = req.body
       const newUser =  await BoardUsers.create({
            boardId: boardId,
            userId: userId,
        })
        return res.json(newUser)
    }
    async removeUser (req, res) {
        const {id} = req.params

        const removedUser = await BoardUsers.destroy({
            where: {id}
        })
        return res.json(removedUser)
    }
}

module.exports = new BoardController()