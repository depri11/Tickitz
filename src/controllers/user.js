const models = require('../models/users')
const response = require('../helpers/response')
const { hashPasswords } = require('../helpers/hash')
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
        const { first_name, last_name, phone_number, email, password } = req.body
        const hashPassword = await hashPasswords(password)
        const data = await models.addData({ first_name, last_name, phone_number, email, hashPassword })
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = users
