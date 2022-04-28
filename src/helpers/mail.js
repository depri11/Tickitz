const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'wirlandikadevri@gmail.com',
                pass: 'WRcNJmVHAEuz97xNPy',
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false,
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
