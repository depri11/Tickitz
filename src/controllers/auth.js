const models = require('../models/users')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function genToken(id, email, role) {
    const payload = {
        user_id: id,
        email: email,
        role: role,
    }

    const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: 3600 })

    return {
        token,
        message: 'Token berhasil dibuat',
    }
}

async function Login(req, res) {
    try {
        const password_db = await models.getByEmail(req.body.email)
        if (password_db.length <= 0) {
            return response(res, 401, 'Email tidak ditemukan')
        }

        const password_user = req.body.password
        const check = await bcrypt.compare(password_user, password_db[0].password)
        const role = password_db[0].role
        if (check) {
            const token = genToken(password_db[0].user_id, req.body.email, role)
            return response(res, 200, token)
        } else {
            return response(res, 401, 'Password anda salah')
        }
    } catch (error) {
        throw error
    }
}

module.exports = Login
