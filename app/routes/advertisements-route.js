const express = require('express');
const router = express.Router();
const Advertisement = require('../modules/advertisments');
const AdModel = require('../models/admodel');
const UserModel = require('../models/usermodel');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

router.get('/', async (req, res) => {
  try {
    const ads = await Advertisement.find();
    const transformedAds = await Promise.all(
      ads.map(async (el) => {
        const user = await UserModel.findById(el.userId);
        const userName = user ? user.name : 'Unknown User';
        return {
          id: el._id,
          shortTitle: el.shortText,
          description: el.description,
          images: el.images,
          user: {
            id: el.userId,
            name: userName,
          },
          createdAt: el.createdAt,
        };
      }),
    );
    res.send({ data: transformedAds, status: 'ok' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch advertisements' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await AdModel.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    const user = await UserModel.findById(ad.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send({
      data: {
        id,
        shortTitle: ad.shortText,
        description: ad.description,
        images: ad.images,
        user: {
          id: user._id,
          name: user.name,
        },
        createdAt: ad.createdAt,
      },
      status: 'ok',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch advertisement' });
  }
});

router.post('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await AdModel.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    const userId = req.user._id;
    if (ad.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You don't have rights to delete this advertisement" });
    }
    await Advertisement.remove(id);
    res.status(201).json({ message: 'Advertisement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete advertisement' });
  }
});

router.post(
  '/',
  isAuthenticated,
  upload.array('images', 99),
  async (req, res) => {
    try {
      const { shortText, description, tags, isDeleted } = req.body;
      const images = req.files.map((file) => file.path);
      const userId = req.user._id;
      const data = {
        shortText,
        description,
        userId,
        tags,
        isDeleted,
        images,
      };
      const advertisement = await Advertisement.create(data);
      res.status(201).json(advertisement);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create advertisement' });
    }
  },
);

module.exports = router;
