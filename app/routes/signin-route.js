const express = require('express')
const passport = require('passport')
const router = express.Router()

router.post('/', passport.authenticate('local'))

module.exports = router;