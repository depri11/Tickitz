const models = require('../models/users')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const token = require('../models/refreshToken')
const auth = {}

function genToken(id, email, role) {
    const payload = {
        user_id: id,
        email: email,
        role: role,
    }

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: '15s' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '1y' })

    return {
        accessToken,
        refreshToken,
    }
}

auth.Login = async (req, res) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const password_db = await models.getByEmail(req.body.email)
        if (password_db.length <= 0) {
            return response(res, 404, 'Email tidak ditemukan')
        }

        if (!password_db[0].verified) {
            return response(res, 401, 'Please verification your email')
        }

        const password_user = req.body.password
        const check = await bcrypt.compare(password_user, password_db[0].password)
        const { user_id, email, role } = password_db[0]
        if (check) {
            const token = genToken(user_id, email, role)
            return response(res, 200, token)
        } else {
            return response(res, 401, 'Password anda salah')
        }
    } catch (error) {
        throw error
    }
}

auth.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.token
        if (!refreshToken) {
            return response(res, 401, 'Silahkan login terlebih dahulu')
        }
        const verifToken = await token.verifyRefreshToken(refreshToken)
        const newPayload = {
            user_id: verifToken.user_id,
            email: verifToken.email,
            role: verifToken.role,
        }
        const accToken = jwt.sign(newPayload, process.env.JWT_ACCESS, { expiresIn: '50d' })
        // const refToken = jwt.sign(newPayload, process.env.JWT_REFRESH, { expiresIn: '1y' })
        return response(res, 200, accToken)
    } catch (error) {
        return response(res, 401, error)
    }
}

module.exports = auth
