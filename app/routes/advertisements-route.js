const express = require('express');
const router = express.Router();
const Advertisement = require('../modules/advertisments')
const AdModel = require('../models/admodel');

router.get('/', async (req, res) => {
  const ads = await AdModel.find().select('-__v')
  res.send(ads)
})

router.get('/:id', async (req, res) => {
  const {id} = req.params
  const ad = await AdModel.findById(id)
  res.send({ad: ad, id: id})
})

router.post('/', async (req, res) => {
  try{
    const data = req.body
    const advertisement = await Advertisement.create(data)
    res.status(201).json(advertisement)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create advertisement' })
  }
})

router.delete('/:id', async (req, res) => {
  const {id} = req.body
  try {
    const advertisementToDelete = await Advertisement.remove(id)
    res.status(201).json(advertisementToDelete)
  } catch(error) {
    res.status(500).json({ error: 'Failed to delete advertisement' })
  }
  
})

module.exports = router
