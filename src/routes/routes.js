const express = require('express')
const router_users = require('./User.routes')
const router = express.Router()

router.use('/users', router_users)

module.exports = router