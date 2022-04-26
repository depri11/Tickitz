const models = require('../models/users')
const response = require('../helpers/response')
const { hashPasswords } = require('../helpers/hash')
const users = {}

users.getAll = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const data = await models.getData()
            return response(res, 200, data)
        } catch (error) {
            return response(res, 500, error)
        }
    } else {
        return response(res, 403, 'Maaf anda bukan admin')
    }
}

users.Create = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email, password, profile_image } = req.body
        const hashPassword = await hashPasswords(password)
        const data = await models.addData({ first_name, last_name, phone_number, email, hashPassword, profile_image })
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = users
