const models = require('../models/users')
const response = require('../helpers/response')
const { hashPasswords } = require('../helpers/hash')
const fs = require('fs')
const users = {}

users.getAll = async (req, res) => {
    try {
        const data = await models.getData()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

users.Create = async (req, res) => {
    try {
        let profile_image = null
        if (req.file !== undefined) {
            profile_image = req.file.path
        }

        const { first_name, last_name, phone_number, email, password } = req.body
        const hashPassword = await hashPasswords(password)
        const data = await models.addData({ first_name, last_name, phone_number, email, hashPassword, profile_image })
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

users.Update = async (req, res) => {
    try {
        if (req.file !== undefined) {
            profile_image = req.file.path
        }
        const { id } = req.params

        const { first_name, last_name, phone_number, email, password } = req.body
        const hashPassword = await hashPasswords(password)
        const data = await models.updateData({ first_name, last_name, phone_number, email, hashPassword, profile_image, id })
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

users.Delete = async (req, res) => {
    try {
        const id = req.params.id
        const data = await models.getById(id)
        fs.unlink(data[0].profile_image, function (err) {
            if (err) throw err
            console.log('File deleted!')
        })
        await models.deleteData(id)
        return response(res, 200, 'Data berhasil di delete')
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = users
