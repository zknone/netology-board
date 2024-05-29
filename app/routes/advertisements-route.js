const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    res.send('Advertisements route by id');
  });

router.get('/', (req, res) => {
  res.send('Advertisements route');
});

router.post('/', (req, res) => {
    const { title, description } = req.body;

    const newAd = new AdModel({
        title,
        description,
    });

    // try {
    //     await newBook.save();
    // } catch (error) {
    //     console.error('Error:', error);
    // }
})

router.delete('/:id', (req, res) => {

})

module.exports = router;
