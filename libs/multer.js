const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
// uuidv4(); 

const storage = multer.diskStorage({
    destination: 'uploadas',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

module.exports = multer({ storage });