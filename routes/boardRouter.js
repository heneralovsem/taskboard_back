const Router = require('express')

const router = new Router()
const boardController = require('../controllers/boardController')

router.post('/', boardController.createBoard)
router.post('/users', boardController.inviteUser)
router.get('/', boardController.getAll)
router.get('/:id', boardController.getOneBoard)
router.delete('/:id', boardController.deleteBoard)
router.delete('/users/:id', boardController.removeUser)



module.exports = router