const respone = require('../helpers/response')
const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const { auth_token } = req.headers

    if (!auth_token) {
        return respone(res, 401, { msg: 'silahkan login dulu' })
    }

    jwt.verify(auth_token, process.env.JWT_KEYS, (err, decode) => {
        if (err) {
            return respone(res, 401, err)
        }
        req.user = decode

        next()
    })
}

module.exports = validateToken
