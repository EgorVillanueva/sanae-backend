const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
// uuidv4();

// const uploadFile = () => {
//     const storage = multer.diskStorage({
//         destination: 'uploads',
//         filename: (req, file, cb) => {
//             cb(null, uuidv4() + path.extname(file.originalname));
//         }
//     });

//     const upload = multer({ storage: storage }).single('image');
//     return upload;
// }

// module.exports = uploadFile;

// module.exports = storage;
// module.exports = multer({ storage })

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

exports.default = multer({ storage });