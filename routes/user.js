const { userGetController } = require('../controllers/user')

const router = require('express').Router()

router.get('/:userId',userGetController)

module.exports = router