const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const boardRouter = require('./boardRouter')
const columnRouter = require('./columnRouter')
const taskRouter = require('./taskRouter')
const commentRouter = require('./commentRouter')

router.use('/user', userRouter)
router.use('/boards', boardRouter)
router.use('/columns', columnRouter)
router.use('/tasks', taskRouter)
router.use('/comments', commentRouter)


module.exports = router