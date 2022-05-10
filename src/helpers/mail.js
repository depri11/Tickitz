const nodemailer = require('nodemailer')
const response = require('../helpers/response')

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'jamaal.treutel8@ethereal.email',
                pass: '2YCKzp1afHYW3yP387',
            },
        })

        await transporter.sendMail({
            from: 'wirlandikadevri@gmail.com',
            to: email,
            subject: subject,
            text: text,
        })
        return response(res, 200, 'Email sent successfully')
    } catch (error) {
        return response(res, 400, error)
    }
}
