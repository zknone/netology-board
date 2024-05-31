const express = require('express');
const router = express.Router();
const Advertisement = require('../modules/advertisments');
const AdModel = require('../models/admodel');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

router.get('/', async (req, res) => {
  const ads = await AdModel.find().select('-__v');

  res.send({ data: ads, status: 'ok' });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const ad = await AdModel.findById(id);
  res.send({ data: ad, status: 'ok' });
});

router.post('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const advertisementToDelete = await Advertisement.remove(id);
    res.status(201).json(advertisementToDelete);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete advertisement' });
  }
});

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const data = req.body;
    const advertisement = await Advertisement.create(data);
    res.status(201).json(advertisement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create advertisement' });
  }
});

module.exports = router;
