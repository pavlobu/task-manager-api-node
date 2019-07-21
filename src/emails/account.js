const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pavlobuidenkov@yandex.ru',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pavlobuidenkov@yandex.ru',
        subject: `Sorry to see you go ${name}`,
        text: `Goodbye from our app, ${name}. Let me know if I can improve anything.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}