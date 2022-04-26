const db = require('../configs/db')
const models = {}

models.getData = function () {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.users ORDER BY user DESC')
            .then((data) => {
                resolve(data.rows)
            })
            .catch((ers) => {
                console.log(ers)
                reject(ers)
            })
    })
}

models.getByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM public.users WHERE email=$1', [email])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.addData = function ({ first_name, last_name, phone_number, email, hashPassword }) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO public.users (first_name, last_name, phone_number, email, "password") VALUES($1, $2, $3, $4, $5)', [first_name, last_name, phone_number, email, hashPassword])
            .then(() => {
                resolve('Data berhasil disimpan')
            })
            .catch((ers) => {
                reject(ers)
            })
    })
}

module.exports = models
