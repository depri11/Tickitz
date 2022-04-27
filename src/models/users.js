const { user } = require('pg/lib/defaults')
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

models.getById = function (id) {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM public.users WHERE user_id=$1', [id])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.addData = function ({ first_name, last_name, phone_number, email, hashPassword, profile_image }) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.users (first_name, last_name, phone_number, email, "password", profile_image, role, verified) VALUES($1, $2, $3, $4, $5, $6, 'user', '0')`, [
            first_name,
            last_name,
            phone_number,
            email,
            hashPassword,
            profile_image,
        ])
            .then(() => {
                resolve('Data berhasil disimpan')
            })
            .catch((ers) => {
                reject(ers.message)
            })
    })
}

models.updateData = function ({ id, first_name, last_name, phone_number, email, hashPassword, profile_image }) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE public.users SET first_name=$1, last_name=$2, phone_number=$3, email=$4, "password"=$5, profile_image=$6, updated_at=now() WHERE user_id=${id}`, [
            first_name,
            last_name,
            phone_number,
            email,
            hashPassword,
            profile_image,
        ])
            .then(() => {
                resolve('Data berhasil diupdate')
            })
            .catch((ers) => {
                reject(ers.message)
            })
    })
}

models.deleteData = function (id) {
    return new Promise(function (resolve, reject) {
        db.query('DELETE FROM public.users WHERE user_id=$1', [id])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

module.exports = models
