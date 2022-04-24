const models = require('../models/movies')
const response = require('../helpers/response')
const movies = {}

// Get all Movies
movies.getAll = async (req, res) => {
    try {
        const { page, sort } = req.query
        const data = await models.getAll({ page, sort })
        if (!data.length) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, data)
        }
    } catch (error) {
        return response(res, 500, error)
    }
}

// Get a Movie
movies.getMovie = async (req, res) => {
    try {
        const { id } = req.params
        const data = await models.getData({ id })
        if (!data.length) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, data)
        }
    } catch (error) {
        return response(res, 500, error)
    }
}

// Create a Movie
movies.createData = async (req, res) => {
    try {
        const { title, description, release_date, directed_by, duration, casts, images, category, price } = req.body
        const data = await models.addData({ title, description, release_date, directed_by, duration, casts, images, category, price })
        return response(res, 201, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

// Update a Movie (BELUM FIX)
movies.updateData = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, release_date, directed_by, duration, casts, images, price, category } = req.body
        const data = await models.updateData({ id, title, description, release_date, directed_by, duration, casts, images, price, category })
        if (!data.length) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, data)
        }
    } catch (error) {
        return response(res, 500, error)
    }
}

// Delete a Movie
movies.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params
        const data = await models.deleteData({ id })
        if (data.rowCount < 1) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, 'Data berhasil di Delete')
        }
    } catch (error) {
        return response(res, 500, error)
    }
}

// Search Movie by Title
movies.getTitle = async (req, res) => {
    try {
        const { title, page } = req.query
        const lowercase = title.toLowerCase()
        const data = await models.searchData({ lowercase, page })
        if (!data.length) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, data)
        }
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = movies
