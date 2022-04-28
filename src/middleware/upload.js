const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    },
})

const filter = (req, file, cb) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploads = multer({
    storage: storage,
    fileFilter: filter,
})

module.exports = uploads
