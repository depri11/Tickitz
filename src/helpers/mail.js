const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            auth: {
                user: 'dave.muller3@ethereal.email',
                pass: 'WRcNJmVHAEuz97xNPy',
            },
        })

        await transporter.sendMail({
            from: 'wirlandikadevri@gmail.com',
            to: email,
            subject: subject,
            text: text,
        })
        console.log('Email sent Successfully')
    } catch (error) {
        console.log('Email not sent')
        console.log(error)
    }
}
