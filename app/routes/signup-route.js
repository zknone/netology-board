const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModule = require('../modules/users');
const SALT_ROUNDS = 10;

router.post('/', async (req, res) => {
  const { email, password, name, contactPhone } = req.body;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const newUser = await UserModule.create({
      email,
      name,
      contactPhone,
      passwordHash: hashedPassword,
    });

    return res.send({
      data: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        contactPhone: newUser.contactPhone,
      },
      status: 'ok',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Email is already used',
      status: 'error',
    });
  }
});

module.exports = router;
