const Router = require('express')

const router = new Router()
const columnController = require('../controllers/columnController')

router.post('/', columnController.createColumn)
router.get('/', columnController.getAll)



module.exports = router