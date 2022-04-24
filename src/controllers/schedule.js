const models = require('../models/schedules')
const response = require('../helpers/response')
const schedule = {}

// Get all Schedule
schedule.getAll = async (req, res) => {
    try {
        const data = await models.getAll()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

// Get a Schedule
schedule.getData = async (req, res) => {
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

// Create Schedule
schedule.createData = async (req, res) => {
    try {
        const { booking_id, movie_id } = req.body
        const data = await models.addData({ booking_id, movie_id })
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

// Delete Schedule
schedule.deleteData = async (req, res) => {
    try {
        const { id } = req.params
        const data = await models.deleteData({ id })
        if (data.rowCount < 1) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, 'Data berhasil di Delete')
        }
    // return response(res, 200, data);
    } catch (error) {
        return response(res, 500, error)
    }
}

// Update Schedule
schedule.updateData = async (req, res) => {
    try {
        const { id } = req.params
        const { booking_id, movie_id } = req.body
        const data = await models.updateData({ id, booking_id, movie_id })
        if (!data.length) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, data)
        }
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = schedule
