const Router = require('express')

const router = new Router()
const commentController = require('../controllers/commentController')

router.post('/', commentController.createComment )
router.get('/', commentController.getTaskComments)



module.exports = router