const db = require('../configs/db')
const format = require('pg-format')
const models = {}

models.getMovie = async (req, res) => {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM movie')
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

// Get Models All Data Movie
models.getAll = async ({ page, limit, order }) => {
    try {
        let query = format('SELECT * FROM movie')

        if (order) {
            query = format(query + ' ORDER BY movie_id %s', order)
        }

        if (page && limit) {
            const offset = (page - 1) * limit
            query = format(query + ' LIMIT %s OFFSET %s', limit, offset)
        }

        const { rows } = await db.query('SELECT COUNT(movie_id) as "count" FROM public.movie')
        console.log(rows)
        const counts = rows[0].count

        if (order === undefined) {
            order = 'desc'
        }

        const meta = {
            next: page == Math.ceil(counts / limit) ? null : `/api/v1/movies/all?order=${order}&page=${Number(page) + 1}&limit=${limit}`,
            prev: page == 1 ? null : `/api/v1/movies/all?order=${order}&page=${Number(page) - 1}&limit=${limit}`,
            counts,
        }

        const prods = await db.query(query)
        return { data: prods.rows, meta }
    } catch (error) {
        console.log(error)
    }
}

// Get Models A Data Movie
models.getData = function (id) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM movie WHERE movie_id = ${id}`)
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

// Create Models Data Movie
models.addData = function ({ title, description, release_date, directed_by, duration, casts, category, price, images }) {
    return new Promise(function (resolve, reject) {
        db.query('INSERT INTO movie (title, description,release_date,directed_by,duration,casts,category, price,images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *', [
            title,
            description,
            release_date,
            directed_by,
            duration,
            casts,
            category,
            price,
            images,
        ])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

// Update Models Data
models.updateData = function ({ id, title, description, release_date, directed_by, duration, casts, category, price, images }) {
    return new Promise(function (resolve, reject) {
        db.query(`UPDATE public.movie SET title=$1, description=$2, release_date=$3, directed_by=$4, duration=$5, casts=$6, category=$7, price=$8, images=$9, updated_at=now() WHERE movie_id=${id} returning *`, [
            title,
            description,
            release_date,
            directed_by,
            duration,
            casts,
            category,
            price,
            images,
        ])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err.message))
    })
}

// Delete Models Data
models.deleteData = function ({ id }) {
    return new Promise(function (resolve, reject) {
        db.query(`DELETE FROM movie WHERE movie_id=${id}`)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => reject(err))
    })
}

// Search Movie
models.searchData = function ({ lowercase, page }) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM movie WHERE LOWER(title) LIKE '%${lowercase}%' ORDER BY release_date desc LIMIT 5 OFFSET (($1-1) * 5)`, [page])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => reject(err))
    })
}

module.exports = models
