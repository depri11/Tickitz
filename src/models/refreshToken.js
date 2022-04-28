const jwt = require('jsonwebtoken')
const response = require('../helpers/response')
const models = {}

models.verifyRefreshToken = (refreshToken) => {
    return new Promise(function (resolve, reject) {
        jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, decode) => {
            if (err) {
                return reject(err)
            }
            resolve(decode)
        })
    })
}

module.exports = models
