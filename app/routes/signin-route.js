//POST /api/signin — залогиниться.

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User login')
})

module.exports = router;