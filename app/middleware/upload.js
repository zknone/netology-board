const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user._id;
    const uploadPath = path.join('uploads', userId.toString());

    // eslint-disable-next-line node/prefer-promises/fs
    fs.access(uploadPath, (error) => {
      if (error) {
        // eslint-disable-next-line node/prefer-promises/fs
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
          if (err) {
            console.error('Failed to create directory', err);
            return cb(err);
          }
          cb(null, uploadPath);
        });
      } else {
        cb(null, uploadPath);
      }
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
