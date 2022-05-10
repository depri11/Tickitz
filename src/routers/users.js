const express = require('express')
const routers = express.Router()
const controller = require('../controllers/user')
const validate = require('../middleware/validate')
const upload = require('../middleware/upload')

routers.get('/', validate(['admin']), controller.getData)
routers.get('/all', controller.getAll)
routers.get('/:id/verify/:token', controller.Verify)
routers.post('/', upload.single('profile_image'), controller.Create)
routers.put('/:id', validate(['admin', 'user']), upload.single('profile_image'), controller.Update)
routers.delete('/:id', validate(['admin']), controller.Delete)

module.exports = routers
