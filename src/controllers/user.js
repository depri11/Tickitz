const models = require('../models/users')
const response = require('../helpers/response')
const { hashPasswords } = require('../helpers/hash')
const fs = require('fs')
const sendMail = require('../helpers/mail')
const crypto = require('crypto')
const sign = require('jsonwebtoken/sign')
const jwt = require('jsonwebtoken')
const refreshTokens = require('./auth')
const users = {}

users.getAll = async (req, res) => {
    try {
        const data = await models.getData()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

users.Verify = async (req, res) => {
    try {
        const id = req.params.id
        const user = await models.getById(id)
        if (!user) return response(res, 400, 'Invalid link')

        const checkToken = req.params.token
        const userId = user[0].user_id
        const token = await models.verifyToken(userId, checkToken)
        if (!token) return response(res, 400, 'Invalid link')

        await models.updateVerify(userId)
        await models.deleteVerify(userId, checkToken)
        return response(res, 200, 'Verifikasi email berhasil')
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

        const userId = data[0].user_id
        const token = crypto.randomBytes(32).toString('hex')
        const createToken = await models.createToken(userId, token)

        const userEmail = data[0].email
        const url = `${process.env.BASE_URL}users/${userId}/verify/${createToken[0].token}`
        await sendMail(userEmail, 'Verify Mail', url)
        return response(res, 200, 'An email sent to your account please verify')
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
