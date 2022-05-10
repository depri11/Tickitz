const db = require('../configs/db')
const format = require('pg-format')
const models = {}

models.getUsers = function () {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM users')
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.getUser = function (id) {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM public.users WHERE user_id=$1', [id])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.getData = async ({ page, limit, order }) => {
    try {
        let query = format('SELECT * FROM users')

        if (order) {
            query = format(query + ' ORDER BY user_id %s', order)
        }

        if (page && limit) {
            const offset = (page - 1) * limit
            query = format(query + ' LIMIT %s OFFSET %s', limit, offset)
        }

        const { rows } = await db.query('SELECT COUNT(user_id) as "count" FROM public.users')
        console.log(rows)
        const counts = rows[0].count

        if (order === undefined) {
            order = 'desc'
        }

        const meta = {
            next: page == Math.ceil(counts / limit) ? null : `/api/v1/users/all?order=${order}&page=${Number(page) + 1}&limit=${limit}`,
            prev: page == 1 ? null : `/api/v1/users/all?order=${order}&page=${Number(page) - 1}&limit=${limit}`,
            counts,
        }

        const prods = await db.query(query)
        return { data: prods.rows, meta }
    } catch (error) {
        console.log(error.message)
    }
}

models.getByEmail = function (checkEmail) {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM public.users WHERE email=$1', [checkEmail])
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
        db.query("INSERT INTO public.users (first_name, last_name, phone_number, email, \"password\", profile_image, role, verified) VALUES($1, $2, $3, $4, $5, $6, 'user', '0') returning *", [
            first_name,
            last_name,
            phone_number,
            email,
            hashPassword,
            profile_image,
        ])
            .then((data) => {
                resolve(data.rows)
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
                resolve(data)
            })
            .catch((err) => reject(err))
    })
}

models.createToken = function (userId, token) {
    return new Promise(function (resolve, reject) {
        db.query('INSERT INTO public."token" (user_id, "token", created_at)VALUES($1, $2, now()) returning token', [userId, token])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.verifyToken = function (userId, checkToken) {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM public.token Where (user_id=$1 and token=$2)', [userId, checkToken])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.updateVerify = function (userId) {
    return new Promise(function (resolve, reject) {
        db.query('UPDATE public.users SET verified=true WHERE user_id=$1', [userId])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

models.deleteVerify = function (userId, checkToken) {
    return new Promise(function (resolve, reject) {
        db.query('DELETE FROM public.token WHERE (user_id=$1 and token=$2)', [userId, checkToken])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

module.exports = models
