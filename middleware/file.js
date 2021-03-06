const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/text')
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
});


const allowedTypes = ['text/plain', 'application/pdf', 'application/octet-stream', 'application/epub+zip'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

module.exports = multer({
  storage, fileFilter
});