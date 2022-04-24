const models = require('../models/bookings')
const response = require('../helpers/response')
const bookings = {}

bookings.getAll = async (req, res) => {
    try {
        const data = await models.getAll()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

bookings.createData = async (req, res) => {
    try {
        const { date_time, seat, movie_id, total_payment, cinema_name, ticket } = req.body
        const data = await models.addData({ date_time, seat, movie_id, total_payment, cinema_name, ticket })
        return response(res, 201, data)
    } catch (error) {
        return response(res, 500, error)
    }
}

bookings.getData = async (req, res) => {
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

bookings.updateData = async (req, res) => {
    try {
        const { id } = req.params
        const { date_time, seat, movie_id, total_payment, cinema_name, ticket } = req.body
        const data = await models.updateData({ id, date_time, seat, movie_id, total_payment, cinema_name, ticket })
        if (!data.length) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, data)
        }
    } catch (error) {
        return response(res, 500, error)
    }
}

bookings.deleteData = async (req, res) => {
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

// Search booking
// bookings.searchBooking = async (req, res) => {
//   try {
//     const { title } = req.query;
//     const lowercase = title.toLowerCase();
//     const data = await models.searchData({ lowercase });
//     if (!data.length) {
//       return response(res, 404, "Data tidak ditemukan");
//     } else {
//       return response(res, 200, data);
//     }
//   } catch (error) {
//     return response(res, 500, error);
//   }
// };

module.exports = bookings
