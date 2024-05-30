const express = require('express')
const UserModel = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.get('/', async (req, res) => {
    const {email, password, name, contactPhone} = req.body

    const hashedPassword = bcrypt.hash(password, 10)

    try {
        const newUser = await UserModel.create({
            email,
            name,
            contactPhone,
            passwordHash: hashedPassword
        });

        return res.send({
                "data": {
                  "id": newUser._id,
                  "email": newUser.email,
                  "name": newUser.name,
                  "contactPhone": newUser.contactPhone
                },
                "status": "ok"
        })

    } catch (error) {
        return res.status(500).send({
            "error": "email занят",
            "status": "error"
        });
    }





})

module.exports = router;