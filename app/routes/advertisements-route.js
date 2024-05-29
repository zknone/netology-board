const express = require('express');
const router = express.Router();
const Advertisement = require('../modules/advertisments')

router.get('/:id', (req, res) => {
    res.send('Advertisements route by id');
  })

router.get('/', (req, res) => {
  res.send('Advertisements route');
})

router.post('/', async (req, res) => {
  try{
    const data = req.body;
    const advertisement = await Advertisement.create(data);
    res.status(201).json(advertisement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create advertisement' });
  }
})

router.delete('/:id', async (req, res) => {
  const {id} = req.body;
  try {
    const advertisementToDelete = await Advertisement.remove(id);
    res.status(201).json(advertisementToDelete);
  } catch(error) {
    res.status(500).json({ error: 'Failed to delete advertisement' });
  }
  
})

module.exports = router
