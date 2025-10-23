const Router = require('express')

const router = new Router()
const taskController = require('../controllers/taskController')

router.post('/', taskController.createTask )
router.get('/', taskController.getAll)
router.put('/', taskController.assignUser)



module.exports = router