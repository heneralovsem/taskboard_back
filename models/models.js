const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Board = sequelize.define('board', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
})

const Column = sequelize.define('column', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
})
const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
})

const BoardUsers = sequelize.define('board_user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
})









User.hasMany(Board, {as: 'boards', foreignKey: 'ownerId'})
User.hasMany(Task, {as: 'tasks', foreignKey: 'assignedUserId'})
User.belongsToMany(Board, {through: BoardUsers, as: 'userBoards'})

Board.belongsTo(User, {as: 'owner', foreignKey: 'ownerId'})
Board.hasMany(Column, {as: 'columns'})
Board.belongsToMany(User, {through: BoardUsers, as: 'boardUsers'})

Column.belongsTo(Board, {as: 'board'})
Column.hasMany(Task, {as: 'tasks'})

Task.belongsTo(User, {as: 'assignedUser', foreignKey: 'assignedUserId'})
Task.belongsTo(Column, {as: 'column'})
Task.hasMany(Comment, {as: 'comments'})

Comment.belongsTo(Task, {as: 'task'})
Comment.belongsTo(User, {as: 'author'})


module.exports = {
    User,
    Board,
    Column,
    Task,
    BoardUsers,
    Comment
}