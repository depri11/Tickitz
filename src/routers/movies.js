const express = require('express')
const routers = express.Router()
const controller = require('../controllers/movie')
const validate = require('../middleware/validate')
const upload = require('../middleware/upload')

routers.get('/', controller.getData)
routers.get('/all', controller.getAll)
routers.get('/search', controller.getTitle)
routers.get('/:id', controller.getMovie)
routers.post('/', validate(['admin']), upload.single('images'), controller.createData)
routers.put('/:id', validate(['admin']), upload.single('images'), controller.updateData)
routers.delete('/:id', validate(['admin']), controller.deleteMovie)

module.exports = routers
