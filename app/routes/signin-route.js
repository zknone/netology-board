const express = require('express')
const UserModel = require('../models/usermodel')
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await UserModel.find().select('-__v');
    res.send(users);
})

module.exports = router;