const db = require('../configs/db')
const models = {}

models.getAll = function () {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM booking ORDER BY id ')
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.addData = function ({ date_time, seat, movie_id, total_payment, cinema_name, ticket }) {
    return new Promise(function (resolve, reject) {
        db.query('INSERT INTO booking (date_time, seat, movie_id, total_payment, cinema_name, ticket) VALUES ($1, $2, $3, $4, $5, $6) returning *', [date_time, seat, movie_id, total_payment, cinema_name, ticket])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.getData = function ({ booking_id }) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM public.booking join public.movie using(movie_id) where booking_id = ${booking_id}`)
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.updateData = function ({ id, date_time, seat, movie_id, total_payment, cinema_name, ticket }) {
    return new Promise(function (resolve, reject) {
        db.query(`UPDATE booking SET date_time=$1, seat=$2, movie_id=$3, total_payment=$4, cinema_name=$5, ticket=$6, updated_at=now() WHERE id = ${id} returning *`, [date_time, seat, movie_id, total_payment, cinema_name, ticket])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.deleteData = function ({ id }) {
    return new Promise(function (resolve, reject) {
        db.query('DELETE FROM booking WHERE id = $1', [id])
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// models.searchData = function ({ lowercase }) {
//   return new Promise(function (resolve, reject) {
//     db.query(`SELECT * FROM movie WHERE LOWER(title) LIKE '${lowercase}%'`)
//       // db.query("SELECT * FROM movie ORDER BY id ASC")
//       .then((data) => {
//         resolve(data.rows);
//       })
//       .catch((err) => reject(err));
//   });
// };

module.exports = models
