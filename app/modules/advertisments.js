const AdModel = require('../models/admodel');

const Advertisements = {
  async find(params = {}) {
    const { shortText, description, userId, tags } = params;
    try {
      const query = { isDeleted: false };

      if (shortText) {
        query.shortText = shortText;
      }
      if (description) {
        query.description = description;
      }
      if (userId) {
        query.userId = userId;
      }
      if (tags) {
        query.tags = tags;
      }

      const foundAds = await AdModel.find(query);
      return foundAds;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async create(data) {
    try {
      const newAd = new AdModel(data);
      await newAd.save();
      return newAd;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async remove(id) {
    try {
      await AdModel.findByIdAndUpdate(id, { isDeleted: true });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
};

module.exports = Advertisements;
