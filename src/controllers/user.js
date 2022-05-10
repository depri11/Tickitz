const models = require('../models/users')
const response = require('../helpers/response')
const { hashPasswords } = require('../helpers/hash')
const fs = require('fs')
// const sendMail = require('../helpers/mail')
const crypto = require('crypto')
const users = {}

users.getData = async (req, res) => {
    try {
        const data = await models.getUser()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

users.getAll = async (req, res) => {
    try {
        const query = {
            page: req.query.page || 1,
            limit: req.query.limit || 5,
            order: req.query.order,
        }
        const data = await models.getData(query)
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error.message)
    }
}

users.Verify = async (req, res) => {
    try {
        const id = req.params.id
        const user = await models.getById(id)
        if (user.length === 0) {
            return response(res, 400, 'Invalid link')
        }

        const checkToken = req.params.token
        const userId = user[0].user_id
        const token = await models.verifyToken(userId, checkToken)
        if (token.length <= 0) {
            return response(res, 400, 'Invalid link')
        }

        await models.updateVerify(userId)
        await models.deleteVerify(userId, checkToken)
        return response(res, 200, 'Verifikasi email berhasil')
    } catch (error) {
        return response(res, 500, error.message)
    }
}

users.Create = async (req, res) => {
    try {
        let profile_image = null
        if (req.file !== undefined) {
            profile_image = req.file.path
        } else {
            return response(res, 400, 'Please upload your image file')
        }

        const { first_name, last_name, phone_number, email, password } = req.body
        const hashPassword = await hashPasswords(password)
        // const cekEmail = await models.getByEmail(email)
        const data = await models.addData({ first_name, last_name, phone_number, email, hashPassword, profile_image })
        const userId = data[0].user_id
        const token = crypto.randomBytes(32).toString('hex')
        const createToken = await models.createToken(userId, token)

        // const userEmail = data[0].email
        const url = `${process.env.BASE_URL}/users/${userId}/verify/${createToken[0].token}`
        // const mail = await sendMail(userEmail, 'Verify Mail', url)
        console.log(url)
        return response(res, 200, 'An email sent to your account please verify')
    } catch (error) {
        return response(res, 500, error.message)
    }
}

users.Update = async (req, res) => {
    try {
        const id = req.params.id
        const data = await models.getById(id)
        if (data.length === 0) {
            return response(res, 404, 'Data not found')
        }
        if (req.user.user_id == data[0].user_id || req.user.role == 'admin') {
            let profile_image = req.user.profile_image
            if (req.file !== undefined) {
                profile_image = req.file.path
            }
            const { first_name, last_name, phone_number, email, password } = req.body
            const hashPassword = await hashPasswords(password)
            const result = await models.updateData({ first_name, last_name, phone_number, email, hashPassword, profile_image, id })
            return response(res, 200, result)
        } else {
            return response(res, 403, 'Your not permitted to access')
        }
    } catch (error) {
        return response(res, 500, error.message)
    }
}

users.Delete = async (req, res) => {
    try {
        const id = req.params.id
        const data = await models.getById(id)
        if (data.length < 1) {
            return response(res, 404, 'Data not found')
        }

        fs.unlink(data[0].profile_image, function (err) {
            if (err) throw err
        })
        await models.deleteData(id)
        return response(res, 200, 'Data berhasil di delete')
    } catch (error) {
        return response(res, 500, error.message)
    }
}

module.exports = users
