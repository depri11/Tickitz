const db = require('../configs/db')
const models = {}

models.getAll = function () {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM schedule ORDER BY id ASC')
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.getData = function ({ id }) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM schedule WHERE id = ${id}`)
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.addData = function ({ booking_id, movie_id }) {
    return new Promise(function (resolve, reject) {
        db.query('INSERT INTO schedule (booking_id, movie_id) VALUES($1, $2) returning *', [booking_id, movie_id])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

models.deleteData = function ({ id }) {
    return new Promise(function (resolve, reject) {
        db.query(`DELETE FROM schedule WHERE id=${id}`)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => reject(err))
    })
}

models.updateData = function ({ id, booking_id, movie_id }) {
    return new Promise(function (resolve, reject) {
        db.query(`UPDATE schedule SET booking_id=$1, movie_id=$2 WHERE id = ${id} returning *`, [booking_id, movie_id])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

module.exports = models
