const response = require('../helpers/response')
const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const { auth_token } = req.headers

    if (!auth_token) {
        return response(res, 401, 'Silahkan login terlebih dahulu')
    }

    jwt.verify(auth_token, process.env.JWT_ACCESS, (err, decode) => {
        if (err) {
            return response(res, 401, err)
        }
        req.user = decode
        next()
    })
}

module.exports = validateToken
